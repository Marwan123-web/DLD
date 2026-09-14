import {
  Component,
  ChangeDetectionStrategy,
  inject,
  ElementRef,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { TranslationService } from '../../../../core/services/translation.service';
import { MapsStore } from '../../../../core/services/maps-store.service';

@Component({
  selector: 'app-location-popup',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './location-popup.component.html',
  styleUrl: './location-popup.component.scss',
})
export class LocationPopupComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly tr = inject(TranslationService);
  readonly store = inject(MapsStore);

  @ViewChild('popup') private popupRef!: ElementRef<HTMLDivElement>;
  private keydownHandler?: (e: KeyboardEvent) => void;

  ngOnInit(): void {
    this.keydownHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        this.store.selectLocation(null);
      }
    };
    document.addEventListener('keydown', this.keydownHandler);
  }

  ngAfterViewInit(): void {
    // Move focus into the popup for accessibility
    const firstFocusable = this.popupRef.nativeElement.querySelector<HTMLElement>(
      'button, [href], input, [tabindex]:not([tabindex="-1"])',
    );
    firstFocusable?.focus();
  }

  ngOnDestroy(): void {
    if (this.keydownHandler) {
      document.removeEventListener('keydown', this.keydownHandler);
    }
  }

  close(): void {
    this.store.selectLocation(null);
  }

  viewAnalytics(): void {
    const loc = this.store.selectedLocation();
    if (!loc) return;
    // TODO: route to analytics — wire viewAnalyticsRequested in MapPageComponent
    this.store.requestViewAnalytics(loc.id);
  }

  coordsLabel(): string {
    const loc = this.store.selectedLocation();
    if (!loc) return '';
    return `${loc.lat.toFixed(5)}, ${loc.lng.toFixed(5)}`;
  }

  populationFormatted(): string {
    const loc = this.store.selectedLocation();
    if (!loc?.population) return '';
    return loc.population.toLocaleString('en-US');
  }

  /** Trap Tab key within popup focusable elements. */
  onKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Tab') return;
    const el = this.popupRef.nativeElement;
    const focusable = Array.from(
      el.querySelectorAll<HTMLElement>(
        'button, [href], input, [tabindex]:not([tabindex="-1"])',
      ),
    ).filter(f => !f.hasAttribute('disabled'));
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
}
