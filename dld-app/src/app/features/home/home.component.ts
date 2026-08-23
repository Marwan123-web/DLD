import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HeroSectionComponent } from './sections/hero-section/hero-section.component';
import { PersonaTabsComponent } from './sections/persona-tabs/persona-tabs.component';
import { InitiativesSectionComponent } from './sections/initiatives-section/initiatives-section.component';
import { TransactionsSectionComponent } from './sections/transactions-section/transactions-section.component';
import { AppDownloadSectionComponent } from './sections/app-download-section/app-download-section.component';
import { PartnersSectionComponent } from './sections/partners-section/partners-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroSectionComponent,
    PersonaTabsComponent,
    InitiativesSectionComponent,
    TransactionsSectionComponent,
    AppDownloadSectionComponent,
    PartnersSectionComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main id="main-content">
      <app-hero-section />
      <app-persona-tabs />
      <app-initiatives-section />
      <app-transactions-section />
      <app-app-download-section />
      <app-partners-section />
    </main>
  `,
})
export class HomeComponent {}
