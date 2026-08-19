import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-watermark-text',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="wm-container" aria-hidden="true" [style.color]="color()">
      @for (line of lines(); track line) {
        <span class="wm-word">{{ line }}</span>
      }
    </div>
  `,
  styles: [`
    :host { display: contents; }

    .wm-container {
      position: absolute;
      inset-inline-start: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      pointer-events: none;
      user-select: none;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 0;
      z-index: 0;
    }

    .wm-word {
      display: block;
      font-size: clamp(4rem, 10vw, 9rem);
      font-weight: var(--weight-bold);
      color: inherit;
      line-height: 1.05;
      white-space: nowrap;
      letter-spacing: -0.02em;
    }
  `],
})
export class WatermarkTextComponent {
  readonly lines = input.required<string[]>();
  readonly color = input<string>('rgba(0,167,118,0.08)');
}
