import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { TranslationService } from '../../../../core/services/translation.service';
import { PersonaTab } from '../../../../core/models/persona-tab.model';

const TABS: PersonaTab[] = [
  {
    id: 'popular',
    label: 'Popular Services & Tools',
    icon: 'M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 8a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm8-8a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zm0 8a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z',
    eyebrow: 'All users Features',
    heading: 'Popular Services & Tools',
    subtitle: 'Discover additional tools including property indexes, valuations, certificates, and digital services.',
    ctaLabel: 'View More',
    services: [
      { id: 'rental-index', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: 'Rental Index', description: 'Check average rental values for any area and property type.', link: '#' },
      { id: 'charge-index', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', title: 'Service Charge Index', description: 'View approved service charges for any community and building.', link: '#' },
      { id: 'valuation', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', title: 'Property Valuation', description: 'Get an official DLD-certified property valuation report.', link: '#' },
      { id: 'ejari', icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4', title: 'Download Rental Certificate (Ejari)', description: 'Download your registered Ejari certificate instantly.', link: '#' },
      { id: 'cert', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title: 'To Whom It May Concern Certificate', description: 'Obtain an official DLD certificate confirming your ownership.', link: '#' },
      { id: 'status', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', title: 'Property Status Enquiry', description: 'Check your property status, ownership, and registration.', link: '#' },
    ],
  },
  {
    id: 'owner',
    label: 'Owner',
    icon: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10',
    eyebrow: '12 SERVICES',
    heading: 'Owner Services',
    subtitle: 'Everything you need to manage your properties in Dubai.',
    ctaLabel: 'View All Owner Services',
    services: [
      { id: 'prop-reg', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', title: 'Property Registration', description: 'Register your property with DLD officially and securely.', link: '#' },
      { id: 'title-deed', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title: 'Title Deed Issuance', description: 'Apply for and receive your official DLD title deed.', link: '#' },
      { id: 'svc-charge', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z', title: 'Service Charge Management', description: 'View, pay, and manage all property service charges.', link: '#' },
      { id: 'owner-status', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', title: 'Property Status Enquiry', description: 'Check your property status, ownership, and registration.', link: '#' },
      { id: 'owner-val', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', title: 'Property Valuation', description: 'Get an official DLD-certified property valuation report.', link: '#' },
      { id: 'rental-reg', icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4', title: 'Rental Contract Registration', description: 'Register your tenancy contract via Ejari easily.', link: '#' },
    ],
  },
  {
    id: 'tenant',
    label: 'Tenant',
    icon: 'M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4',
    eyebrow: '8 SERVICES',
    heading: 'Tenant Services',
    subtitle: 'Access all services you need as a tenant in Dubai.',
    ctaLabel: 'View All Tenant Services',
    services: [
      { id: 'ejari-reg', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title: 'Ejari Registration', description: 'Register your tenancy contract online quickly and easily.', link: '#' },
      { id: 'rent-dispute', icon: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3', title: 'Rental Dispute Resolution', description: 'File and track rental disputes with the Rental Disputes Centre.', link: '#' },
      { id: 'tenant-status', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', title: 'Property Status Check', description: 'Verify the legal status of any property you intend to rent.', link: '#' },
      { id: 'rent-index', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: 'Rental Index', description: 'Check fair market rent for any area before signing a contract.', link: '#' },
      { id: 'ejari-cert', icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4', title: 'Download Ejari Certificate', description: 'Download your official Ejari registration certificate.', link: '#' },
      { id: 'noc', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', title: 'NOC Request', description: 'Request a No Objection Certificate for your rental property.', link: '#' },
    ],
  },
  {
    id: 'broker',
    label: 'Broker',
    icon: 'M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c.956 0 1.845.294 2.578.8',
    eyebrow: '10 SERVICES',
    heading: 'Broker Services',
    subtitle: 'Tools and services for real estate brokers and agents.',
    ctaLabel: 'View All Broker Services',
    services: [
      { id: 'rera-reg', icon: 'M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0', title: 'RERA Registration', description: 'Register as a certified real estate broker with RERA.', link: '#' },
      { id: 'listing', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title: 'Property Listings', description: 'List and manage your property listings on the DLD portal.', link: '#' },
      { id: 'broker-cert', icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4', title: 'Broker Certificate', description: 'Download your official RERA broker certificate.', link: '#' },
      { id: 'mou', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', title: 'MOU Generation', description: 'Generate and manage Memoranda of Understanding for transactions.', link: '#' },
      { id: 'commission', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z', title: 'Commission Calculator', description: 'Calculate commissions based on transaction type and value.', link: '#' },
      { id: 'training', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', title: 'Training Programs', description: 'Enroll in RERA-approved training programs and certifications.', link: '#' },
    ],
  },
  {
    id: 'developer',
    label: 'Developer',
    icon: 'M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z',
    eyebrow: '14 SERVICES',
    heading: 'Developer Services',
    subtitle: 'Comprehensive services for property developers in Dubai.',
    ctaLabel: 'View All Developer Services',
    services: [
      { id: 'project-reg', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', title: 'Project Registration', description: 'Register your real estate development project with DLD.', link: '#' },
      { id: 'escrow', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z', title: 'Escrow Account', description: 'Open and manage escrow accounts for your projects.', link: '#' },
      { id: 'oqood', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title: 'Oqood Registration', description: 'Register off-plan units through the Oqood system.', link: '#' },
      { id: 'progress', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: 'Construction Progress', description: 'Update and track project construction progress reports.', link: '#' },
      { id: 'permits', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', title: 'Permit Applications', description: 'Apply for construction and development permits online.', link: '#' },
      { id: 'sales-report', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', title: 'Sales Reports', description: 'Generate and submit quarterly project sales reports.', link: '#' },
    ],
  },
  {
    id: 'management',
    label: 'Management Companies',
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    eyebrow: '9 SERVICES',
    heading: 'Management Company Services',
    subtitle: 'Services for building and community management companies.',
    ctaLabel: 'View All Management Services',
    services: [
      { id: 'co-reg', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', title: 'Company Registration', description: 'Register your real estate management company with RERA.', link: '#' },
      { id: 'svc-budgets', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z', title: 'Service Charge Budgets', description: 'Submit and manage annual service charge budgets.', link: '#' },
      { id: 'owner-assoc', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-2.239', title: "Owner's Association", description: "Manage owner's association files and meeting records.", link: '#' },
      { id: 'reserve-fund', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: 'Reserve Fund Management', description: 'Track and report on building reserve fund allocations.', link: '#' },
      { id: 'inspection', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', title: 'Building Inspection', description: 'Schedule and track RERA building inspection appointments.', link: '#' },
      { id: 'complaints', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', title: 'Complaints Management', description: 'Receive and resolve owner and tenant complaints efficiently.', link: '#' },
    ],
  },
  {
    id: 'partners',
    label: 'Partners',
    icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-2.239',
    eyebrow: '6 SERVICES',
    heading: 'Partner Services',
    subtitle: 'Exclusive services for DLD strategic partners and institutions.',
    ctaLabel: 'View All Partner Services',
    services: [
      { id: 'data-access', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: 'Market Data Access', description: 'Access DLD\'s comprehensive real estate market datasets.', link: '#' },
      { id: 'api-access', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', title: 'API Integration', description: 'Integrate DLD services into your platform via secure APIs.', link: '#' },
      { id: 'partner-portal', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z', title: 'Partner Portal', description: 'Access the exclusive DLD partner collaboration portal.', link: '#' },
      { id: 'mou-partner', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title: 'MOU Framework', description: 'Establish formal partnerships via the DLD MOU framework.', link: '#' },
      { id: 'co-branding', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', title: 'Co-Branding Programs', description: 'Participate in joint marketing and co-branding initiatives.', link: '#' },
      { id: 'innovation', icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4', title: 'Innovation Lab Access', description: 'Collaborate with DLD\'s PropTech Innovation Lab.', link: '#' },
    ],
  },
];

@Component({
  selector: 'app-persona-tabs',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './persona-tabs.component.html',
  styleUrl: './persona-tabs.component.scss',
})
export class PersonaTabsComponent {
  readonly tr = inject(TranslationService);
  readonly tabs = TABS;
  readonly activeTabId = signal<string>('popular');

  setTab(id: string): void {
    this.activeTabId.set(id);
  }

  onKeydown(e: KeyboardEvent, currentId: string): void {
    const ids = this.tabs.map(t => t.id);
    const idx = ids.indexOf(currentId);
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      this.setTab(ids[(idx + 1) % ids.length]);
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      this.setTab(ids[(idx - 1 + ids.length) % ids.length]);
    }
  }
}
