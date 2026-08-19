import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-icon-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="icon-list" role="list">
      @for (item of items(); track item) {
        <li class="il-item">
          <span class="il-dot" aria-hidden="true"></span>
          <span class="il-text">{{ item }}</span>
        </li>
      }
    </ul>
  `,
  styles: [`
    :host { display: block; }

    .icon-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
    }

    .il-item {
      display: flex;
      align-items: flex-start;
      gap: var(--space-3);
    }

    .il-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--color-primary);
      flex-shrink: 0;
      margin-block-start: 0.45em;
    }

    .il-text {
      font-size: var(--text-base);
      color: var(--color-body);
      line-height: 1.6;
    }
  `],
})
export class IconListComponent {
  readonly items = input.required<string[]>();
}
