import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  effect,
  ElementRef,
  ViewChild,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface ModalBreadcrumb {
  label: string;
  url?: string;
}

export interface LeadershipModalData {
  theme: 'green' | 'navy';
  watermarkLines: string[];
  portraitSrc: string;
  portraitAlt: string;
  portraitSide: 'start' | 'end';
  eyebrow: string;
  title: string;
  paragraphs: string[];
  signature: string;
  breadcrumbs?: ModalBreadcrumb[];
}

@Component({
  selector: 'app-leadership-message-modal',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (isOpen()) {
      <div
        class="modal-backdrop"
        (click)="onBackdropClick($event)"
        role="presentation"
      >
        <div
          #dialogRef
          class="modal-dialog"
          [class.theme-green]="data().theme === 'green'"
          [class.theme-navy]="data().theme === 'navy'"
          role="dialog"
          aria-modal="true"
          [attr.aria-label]="data().title"
          (keydown)="onKeydown($event)"
        >
          <!-- Watermark -->
          <div class="modal-watermark" aria-hidden="true">
            @for (line of data().watermarkLines; track line) {
              <span class="mw-line">{{ line }}</span>
            }
          </div>

          <!-- Close button -->
          <button class="modal-close" (click)="close()" aria-label="Close modal" type="button">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="20" height="20">
              <path d="M18 6L6 18M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>

          <!-- Portrait -->
          <div
            class="modal-portrait"
            [class.portrait-start]="data().portraitSide === 'start'"
            [class.portrait-end]="data().portraitSide === 'end'"
            aria-hidden="true"
          >
            <img [src]="data().portraitSrc" [alt]="data().portraitAlt" class="portrait-img" />
          </div>

          <!-- Content -->
          <div class="modal-content-area">
            @if (data().breadcrumbs?.length) {
              <nav class="modal-bc" aria-label="Breadcrumb">
                <ol class="modal-bc__list">
                  @for (crumb of data().breadcrumbs!; track $index; let last = $last) {
                    <li class="modal-bc__item" [class.modal-bc__item--current]="last">
                      @if (crumb.url && !last) {
                        <a [routerLink]="crumb.url" class="modal-bc__link" (click)="close()">{{ crumb.label }}</a>
                      } @else {
                        <span>{{ crumb.label }}</span>
                      }
                      @if (!last) {
                        <span class="modal-bc__sep" aria-hidden="true">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 18l6-6-6-6" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                        </span>
                      }
                    </li>
                  }
                </ol>
              </nav>
            }
            <span class="modal-eyebrow">{{ data().eyebrow }}</span>
            <h2 class="modal-title">{{ data().title }}</h2>
            <div class="modal-underline" aria-hidden="true"></div>
            <div class="modal-body">
              @for (para of data().paragraphs; track $index) {
                <p>{{ para }}</p>
              }
            </div>
            <p class="modal-signature">{{ data().signature }}</p>
          </div>
        </div>
      </div>
    }
  `,
  styleUrl: './leadership-message-modal.component.scss',
})
export class LeadershipMessageModalComponent {
  readonly data = input.required<LeadershipModalData>();
  readonly isOpen = input.required<boolean>();
  readonly closed = output<void>();

  @ViewChild('dialogRef') dialogRef!: ElementRef<HTMLElement>;

  private readonly platformId = inject(PLATFORM_ID);
  private readonly focusableSelectors =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  private lastFocusedElement: HTMLElement | null = null;

  constructor() {
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        if (this.isOpen()) {
          this.lastFocusedElement = document.activeElement as HTMLElement;
          document.body.style.overflow = 'hidden';
          setTimeout(() => {
            const first = this.dialogRef?.nativeElement?.querySelector(
              this.focusableSelectors
            ) as HTMLElement;
            first?.focus();
          }, 50);
        } else {
          document.body.style.overflow = '';
          this.lastFocusedElement?.focus();
        }
      }
    });
  }

  close(): void {
    this.closed.emit();
  }

  onBackdropClick(e: MouseEvent): void {
    if ((e.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.close();
    }
  }

  onKeydown(e: KeyboardEvent): void {
    if (e.key === 'Escape') {
      this.close();
      return;
    }
    if (e.key === 'Tab') {
      const focusable = Array.from(
        this.dialogRef.nativeElement.querySelectorAll(this.focusableSelectors)
      ) as HTMLElement[];
      if (!focusable.length) {
        e.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          last.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    }
  }
}
