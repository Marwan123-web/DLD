import { Component, ChangeDetectionStrategy, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form class="search-bar" (ngSubmit)="onSubmit()" role="search">
      <label class="sr-only" [for]="inputId">{{ placeholder() }}</label>
      <input
        [id]="inputId"
        class="search-input"
        type="search"
        [placeholder]="placeholder()"
        [(ngModel)]="query"
        name="search"
        autocomplete="off"
      />
      <button type="submit" class="search-btn" [attr.aria-label]="submitLabel()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true" width="20" height="20">
          <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
        </svg>
      </button>
    </form>
  `,
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  readonly placeholder  = input<string>('Search…');
  readonly submitLabel  = input<string>('Search');
  readonly inputId = 'site-search';

  protected query = signal('');

  readonly searched = output<string>();

  onSubmit(): void {
    const q = this.query();
    if (q.trim()) this.searched.emit(q.trim());
  }
}
