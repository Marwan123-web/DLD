import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  readonly tr = inject(TranslationService);

  readonly col1Links = [
    { labelKey: 'nav.home',      path: '/'           },
    { labelKey: 'nav.about',     path: '/about'      },
    { labelKey: 'nav.services',  path: '/services'   },
    { labelKey: 'nav.trainings', path: '/trainings'  },
  ];

  readonly col2Links = [
    { labelKey: 'nav.open_data', path: '/open-data' },
    { labelKey: 'nav.news',      path: '/news'      },
    { labelKey: 'nav.help',      path: '/help'      },
  ];

  // TODO(backend): Fetch last updated timestamp from a CMS or deployment metadata endpoint.
  readonly lastUpdated: string = (() => {
    const now = new Date();
    return now.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
      + ' – '
      + now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  })();
}
