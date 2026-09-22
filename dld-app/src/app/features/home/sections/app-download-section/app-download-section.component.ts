import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
} from '@angular/core';

@Component({
  selector: 'app-app-download-section',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app-download-section.component.html',
  styleUrl: './app-download-section.component.scss',
})
export class AppDownloadSectionComponent {
  private readonly el = inject(ElementRef);

  constructor() {
    afterNextRender(() => {
      const host = this.el.nativeElement as HTMLElement;

      // Graceful fallback: if observer is unsupported, animate immediately
      if (!('IntersectionObserver' in window)) {
        host.classList.add('is-animating');
        return;
      }

      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            host.classList.add('is-animating');
            io.disconnect();
          }
        },
        { threshold: 0.3 },
      );

      io.observe(host);
    });
  }
}
