import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslationService } from './core/services/translation.service';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- <a href="#main-content" class="skip-to-content">{{ tr.t('common.skip_to_content') }}</a> -->
    <app-navbar />
    <router-outlet />
    <app-footer />
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly tr = inject(TranslationService);
}
