import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { TranslationService } from '../../../../core/services/translation.service';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
})
export class HeroSectionComponent {
  readonly tr = inject(TranslationService);

  readonly chips = [
    'I want to rent a property',
    'I want to register my real estate company',
    'I want to verify a title deed',
    'I want to own a property',
    'I want to develop a project',
  ];
}
