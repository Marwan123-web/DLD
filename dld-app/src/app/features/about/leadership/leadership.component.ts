import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../../core/services/translation.service';
import { LeadershipCardComponent, LeadershipCardData } from '../../../shared/components/leadership-card/leadership-card.component';
import { LeadershipMessageModalComponent, LeadershipModalData } from '../../../shared/components/leadership-message-modal/leadership-message-modal.component';
import { PartnersSectionComponent } from '../../home/sections/partners-section/partners-section.component';

@Component({
  selector: 'app-leadership',
  standalone: true,
  imports: [
    RouterLink,
    LeadershipCardComponent,
    LeadershipMessageModalComponent,
    PartnersSectionComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './leadership.component.html',
  styleUrl: './leadership.component.scss',
})
export class LeadershipComponent {
  readonly tr = inject(TranslationService);

  readonly chairmanModalOpen = signal(false);
  readonly dgModalOpen = signal(false);

  readonly chairmanData = computed<LeadershipCardData>(() => ({
    badge: this.tr.t('leadership.chairman_badge'),
    role: this.tr.t('leadership.chairman_role'),
    name: this.tr.t('leadership.chairman_name'),
    excerpt: this.tr.t('leadership.chairman_excerpt'),
    portraitSrc: 'assets/images/chairman-portrait.svg',
    portraitAlt: this.tr.t('leadership.chairman_name'),
    theme: 'green',
  }));

  readonly dgData = computed<LeadershipCardData>(() => ({
    badge: this.tr.t('leadership.dg_badge'),
    role: this.tr.t('leadership.dg_role'),
    name: this.tr.t('leadership.dg_name'),
    excerpt: this.tr.t('leadership.dg_excerpt'),
    portraitSrc: 'assets/images/dg-portrait.svg',
    portraitAlt: this.tr.t('leadership.dg_name'),
    theme: 'navy',
  }));

  readonly chairmanModal = computed<LeadershipModalData>(() => ({
    theme: 'green',
    watermarkLines: [this.tr.t('leadership.chairman_wm1'), this.tr.t('leadership.chairman_wm2')],
    portraitSrc: 'assets/images/chairman-portrait.svg',
    portraitAlt: this.tr.t('leadership.chairman_name'),
    portraitSide: 'start',
    eyebrow: this.tr.t('leadership.chairman_badge'),
    title: this.tr.t('leadership.chairman_modal_title'),
    paragraphs: [
      this.tr.t('leadership.chairman_modal_p1'),
      this.tr.t('leadership.chairman_modal_p2'),
      this.tr.t('leadership.chairman_modal_p3'),
    ],
    signature: this.tr.t('leadership.chairman_signature'),
    breadcrumbs: [
      { label: this.tr.t('leadership.bc_home'), url: '/' },
      { label: this.tr.t('leadership.bc_about'), url: '/about-dld' },
      { label: this.tr.t('leadership.chairman_modal_title') },
    ],
  }));

  readonly dgModal = computed<LeadershipModalData>(() => ({
    theme: 'navy',
    watermarkLines: [this.tr.t('leadership.dg_wm1'), this.tr.t('leadership.dg_wm2')],
    portraitSrc: 'assets/images/dg-portrait.svg',
    portraitAlt: this.tr.t('leadership.dg_name'),
    portraitSide: 'end',
    eyebrow: this.tr.t('leadership.dg_badge'),
    title: this.tr.t('leadership.dg_modal_title'),
    paragraphs: [
      this.tr.t('leadership.dg_modal_p1'),
      this.tr.t('leadership.dg_modal_p2'),
      this.tr.t('leadership.dg_modal_p3'),
      this.tr.t('leadership.dg_modal_p4'),
      this.tr.t('leadership.dg_modal_p5'),
      this.tr.t('leadership.dg_modal_p6'),
    ],
    signature: this.tr.t('leadership.dg_signature'),
    breadcrumbs: [
      { label: this.tr.t('leadership.bc_home'), url: '/' },
      { label: this.tr.t('leadership.bc_about'), url: '/about-dld' },
      { label: this.tr.t('leadership.dg_modal_title') },
    ],
  }));

  printOrgChart(): void {
    window.print();
  }
}
