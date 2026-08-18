import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { TranslationService } from '../../core/services/translation.service';

// AMBIGUITY: Unclear if all 9 toolbar items are always visible or context-aware.
// Building as always-visible static strip. Mark TODO if dynamic visibility is required.
@Component({
  selector: 'app-bottom-toolbar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './bottom-toolbar.component.html',
  styleUrl: './bottom-toolbar.component.scss',
})
export class BottomToolbarComponent {
  readonly tr = inject(TranslationService);

  readonly items = [
    { labelKey: 'toolbar.chat',          icon: 'chat',         href: '#',             svgPath: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
    { labelKey: 'toolbar.services',      icon: 'services',     href: '/services',     svgPath: 'M4 6h16M4 10h16M4 14h16M4 18h16' },
    { labelKey: 'toolbar.survey',        icon: 'survey',       href: '#',             svgPath: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
    { labelKey: 'toolbar.locations',     icon: 'location',     href: '#',             svgPath: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z' },
    { labelKey: 'toolbar.announcements', icon: 'announcement', href: '#',             svgPath: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z' },
    { labelKey: 'toolbar.contact',       icon: 'contact',      href: '#',             svgPath: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { labelKey: 'toolbar.dubai_ae',      icon: 'globe',        href: 'https://dubai.ae', svgPath: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9' },
    { labelKey: 'toolbar.language',      icon: 'language',     href: '#',             svgPath: 'M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129' },
    { labelKey: 'toolbar.ai',            icon: 'ai',           href: '#',             svgPath: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
  ] as const;
}
