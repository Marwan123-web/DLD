import { Injectable } from '@angular/core';
import { ServiceCard } from '../models/service-card.model';

// TODO(backend): Replace mock data with DLD Services API response mapped through ServiceAdapter.
const MOCK_SERVICES: ServiceCard[] = [
  // --- Popular / shared across all categories ---
  { id: 'rental-index',   iconName: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: 'Rental Index',                         description: 'Check average rental values for any area and property type',                category: 'popular' as const, linkUrl: '#' },
  { id: 'charge-index',   iconName: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', title: 'Service Charge Index',                  description: 'View average service charges for any community and building',             category: 'popular' as const, linkUrl: '#' },
  { id: 'valuation',      iconName: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', title: 'Property Valuation',                      description: 'Get an official DLD-certified property valuation report',                  category: 'popular' as const, linkUrl: '#' },
  { id: 'ejari',          iconName: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4',                                                                                         title: 'Download Rental Certificate (Ejari)',   description: 'Download your registered Ejari certificate instantly',                      category: 'popular' as const, linkUrl: '#' },
  { id: 'cert',           iconName: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',                                   title: 'To Whom It May Concern Certificate',   description: 'Obtain an official DLD certificate confirming your ownership',             category: 'popular' as const, linkUrl: '#' },
  { id: 'status',         iconName: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',                                                                                                              title: 'Property Status Enquiry',             description: 'Check your property status, ownership, and registration',                  category: 'popular' as const, linkUrl: '#' },
  // --- Owner ---
  { id: 'prop-reg',       iconName: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',                                  title: 'Property Registration',               description: 'Register your property with Dubai Land Department',                        category: 'owner'   as const, linkUrl: '#' },
  { id: 'title-deed',     iconName: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',                                   title: 'Title Deed Issuance',                 description: 'Apply for and download your official title deed document',                  category: 'owner'   as const, linkUrl: '#' },
  { id: 'transfer',       iconName: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4',                                                                                                        title: 'Property Transfer',                   description: 'Transfer property ownership to a new owner with DLD',                      category: 'owner'   as const, linkUrl: '#' },
  { id: 'mortgage-reg',   iconName: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',                                                                 title: 'Mortgage Registration',               description: 'Register your property mortgage with the land department',                  category: 'owner'   as const, linkUrl: '#' },
  { id: 'owner-status',   iconName: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',                                                                                                              title: 'Property Status Enquiry',             description: 'Check your property status, ownership, and registration details',          category: 'owner'   as const, linkUrl: '#' },
  { id: 'owner-val',      iconName: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',  title: 'Property Valuation',                  description: 'Get a certified DLD property valuation for your property',                  category: 'owner'   as const, linkUrl: '#' },
  // --- Tenant ---
  { id: 'tenant-ejari',   iconName: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4',                                                                                          title: 'Ejari Registration',                  description: 'Register your rental contract with Ejari',                                  category: 'tenant'  as const, linkUrl: '#' },
  { id: 'rental-idx',     iconName: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: 'Rental Index',                        description: 'Check standard rental prices for your area and unit type',                  category: 'tenant'  as const, linkUrl: '#' },
  { id: 'rent-cert',      iconName: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',                                   title: 'Rental Certificate',                  description: 'Download your rental contract certificate instantly',                       category: 'tenant'  as const, linkUrl: '#' },
  { id: 'dispute',        iconName: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3',    title: 'Rental Dispute',                      description: 'File a rental dispute case with the rental dispute centre',                 category: 'tenant'  as const, linkUrl: '#' },
  { id: 'eviction',       iconName: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',                                                                                               title: 'Eviction Notice Check',               description: 'Verify and check eviction notice status for your tenancy',                  category: 'tenant'  as const, linkUrl: '#' },
  { id: 'service-chg',    iconName: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',           title: 'Service Charge Index',                description: 'Find out service charge rates for your building and community',             category: 'tenant'  as const, linkUrl: '#' },
];

@Injectable({ providedIn: 'root' })
export class ServicesDataService {
  getByCategory(category: ServiceCard['category']): ServiceCard[] {
    return MOCK_SERVICES.filter(s => s.category === category);
  }

  getPopular(limit = 6): ServiceCard[] {
    return this.getByCategory('popular').slice(0, limit);
  }
}
