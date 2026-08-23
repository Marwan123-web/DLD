import { Component, ChangeDetectionStrategy, input, output, signal, effect } from '@angular/core';

export interface Tab {
  id: string;
  label: string;
}

@Component({
  selector: 'app-tab-group',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="tab-group" role="tablist" [attr.aria-label]="ariaLabel()">
      @for (tab of tabs(); track tab.id) {
        <button
          role="tab"
          class="tab-pill"
          [class.active]="activeId() === tab.id"
          [attr.aria-selected]="activeId() === tab.id"
          [attr.tabindex]="activeId() === tab.id ? 0 : -1"
          (click)="select(tab.id)"
        >{{ tab.label }}</button>
      }
    </div>
  `,
  styleUrl: './tab-group.component.scss',
})
export class TabGroupComponent {
  readonly tabs      = input.required<Tab[]>();
  readonly ariaLabel = input<string>('Tabs');
  readonly initialId = input<string>('');

  readonly tabChange = output<string>();

  readonly activeId = signal('');

  constructor() {
    effect(() => {
      const init = this.initialId();
      if (init) this.activeId.set(init);
      else {
        const first = this.tabs()[0];
        if (first) this.activeId.set(first.id);
      }
    }, { allowSignalWrites: true });
  }

  select(id: string): void {
    this.activeId.set(id);
    this.tabChange.emit(id);
  }
}
