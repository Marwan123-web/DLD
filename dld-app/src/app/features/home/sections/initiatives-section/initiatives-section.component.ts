import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { TranslationService } from '../../../../core/services/translation.service';
import { InitiativesService } from '../../../../core/services/initiatives.service';
import { InitiativeCardComponent } from '../../../../shared/components/initiative-card/initiative-card.component';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';

@Component({
  selector: 'app-initiatives-section',
  standalone: true,
  imports: [InitiativeCardComponent, SectionHeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="initiatives-section" aria-labelledby="initiatives-heading">
      <div class="container">
        <app-section-header
          label="Initiatives"
          title="DLD Initiatives"
          subtitle="Empowering the real estate sector through innovation and strategic programmes."
        />
        <div class="initiatives-scroll" role="list">
          @for (item of initiatives; track item.id) {
            <div role="listitem">
              <app-initiative-card [initiative]="item" />
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styleUrl: './initiatives-section.component.scss',
})
export class InitiativesSectionComponent {
  readonly tr = inject(TranslationService);
  private readonly svc = inject(InitiativesService);
  readonly initiatives = this.svc.getAll();
}
