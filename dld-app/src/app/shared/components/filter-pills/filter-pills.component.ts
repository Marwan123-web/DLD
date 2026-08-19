import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';

export interface FilterPill {
  key: string;
  label: string;
}

@Component({
  selector: 'app-filter-pills',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="filter-pills" role="tablist" aria-label="Filter options">
      @for (pill of pills(); track pill.key) {
        <button
          class="fp-pill"
          [class.fp-active]="active() === pill.key"
          role="tab"
          [attr.aria-selected]="active() === pill.key"
          type="button"
          (click)="select(pill.key)"
          (keydown.enter)="select(pill.key)"
          (keydown.space)="select(pill.key); $event.preventDefault()"
        >{{ pill.label }}</button>
      }
    </div>
  `,
  styles: [`
    :host { display: block; }

    .filter-pills {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-3);
    }

    .fp-pill {
      border: 1.5px solid var(--color-primary);
      border-radius: var(--radius-pill);
      padding: 0.5rem 1.25rem;
      font-size: var(--text-sm);
      font-weight: var(--weight-medium);
      color: var(--color-primary);
      background: transparent;
      cursor: pointer;
      transition: background var(--transition-base), color var(--transition-base);
      line-height: 1.4;

      &:hover:not(.fp-active) {
        background: var(--color-primary-light);
      }

      &:focus-visible {
        outline: 2px solid var(--color-primary);
        outline-offset: 2px;
      }
    }

    .fp-active {
      background: var(--color-primary);
      color: var(--color-white);
    }
  `],
})
export class FilterPillsComponent {
  readonly pills = input.required<FilterPill[]>();
  readonly active = input.required<string>();
  readonly selected = output<string>();

  select(key: string): void {
    this.selected.emit(key);
  }
}
