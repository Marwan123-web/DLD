import { Injectable, signal, computed, effect } from '@angular/core';

export type Theme = 'light' | 'dark' | 'system';

// Renamed from uae-map-poc:theme per DLD override
const STORAGE_KEY = 'dld:theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly theme = signal<Theme>(
    (localStorage.getItem(STORAGE_KEY) as Theme | null) ?? 'system'
  );

  readonly isDark = computed(() => {
    const t = this.theme();
    if (t === 'dark') return true;
    if (t === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  constructor() {
    effect(() => {
      const t = this.theme();
      localStorage.setItem(STORAGE_KEY, t);
      const body = document.body;
      body.classList.remove('theme-light', 'theme-dark');
      if (t === 'light') body.classList.add('theme-light');
      else if (t === 'dark') body.classList.add('theme-dark');
      // 'system' follows prefers-color-scheme via CSS media query — no class needed
    });
  }

  toggle(): void {
    this.theme.update(t => (t === 'dark' ? 'light' : 'dark'));
  }
}
