import { Injectable, signal, computed, effect } from '@angular/core';
import EN from '../../../assets/i18n/en.json';
import AR from '../../../assets/i18n/ar.json';

export type Lang = 'en' | 'ar';

const DICTIONARIES: Record<Lang, Record<string, unknown>> = {
  en: EN as Record<string, unknown>,
  ar: AR as Record<string, unknown>,
};

// Bootstrap RTL stylesheet loaded dynamically on direction switch.
const BOOTSTRAP_RTL_LINK_ID = 'bootstrap-rtl';
const STORAGE_KEY = 'dld_lang';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  readonly currentLang = signal<Lang>(
    (localStorage.getItem(STORAGE_KEY) as Lang | null) === 'ar' ? 'ar' : 'en'
  );
  readonly isRtl = computed(() => this.currentLang() === 'ar');

  constructor() {
    // Persist language, update <html> dir/lang, and toggle Bootstrap RTL
    // whenever currentLang changes.
    effect(() => {
      const lang = this.currentLang();
      const isRtl = lang === 'ar';
      localStorage.setItem(STORAGE_KEY, lang);
      const html = document.documentElement;
      html.setAttribute('lang', lang);
      html.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
      this.toggleBootstrapRtl(isRtl);
    });
  }

  toggleLang(): void {
    this.currentLang.update(l => (l === 'en' ? 'ar' : 'en'));
  }

  setLang(lang: Lang): void {
    this.currentLang.set(lang);
  }

  // Resolves dot-notation key against the active dictionary.
  // Returns the key itself if not found (fail-safe — never throws).
  t(key: string): string {
    const dict = DICTIONARIES[this.currentLang()];
    const result = key.split('.').reduce<unknown>(
      (obj, k) => (obj && typeof obj === 'object' ? (obj as Record<string, unknown>)[k] : undefined),
      dict
    );
    return typeof result === 'string' ? result : key;
  }

  // Interpolate template variables: tInterp('news.showing_count', { shown: 5, total: 91 })
  tInterp(key: string, vars: Record<string, string | number>): string {
    let str = this.t(key);
    Object.entries(vars).forEach(([k, v]) => {
      str = str.replace(new RegExp(`{{${k}}}`, 'g'), String(v));
    });
    return str;
  }

  private toggleBootstrapRtl(enable: boolean): void {
    const existing = document.getElementById(BOOTSTRAP_RTL_LINK_ID);
    if (enable && !existing) {
      const link = document.createElement('link');
      link.id = BOOTSTRAP_RTL_LINK_ID;
      link.rel = 'stylesheet';
      // Uses Bootstrap RTL from the installed package via the assets path.
      // TODO(backend): Confirm asset serving path in production deployment.
      link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5/dist/css/bootstrap.rtl.min.css';
      document.head.appendChild(link);
    } else if (!enable && existing) {
      existing.remove();
    }
  }
}
