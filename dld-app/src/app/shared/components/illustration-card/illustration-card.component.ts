import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-illustration-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="illus-card" [style.aspect-ratio]="aspectRatio()">
      <img [src]="src()" [alt]="alt()" class="illus-img" loading="lazy" />
    </div>
  `,
  styles: [`
    :host { display: block; }

    .illus-card {
      border-radius: var(--radius-xl);
      overflow: hidden;
      background: var(--color-primary-light);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    }

    .illus-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  `],
})
export class IllustrationCardComponent {
  readonly src = input.required<string>();
  readonly alt = input<string>('');
  readonly aspectRatio = input<string>('1/1');
}
