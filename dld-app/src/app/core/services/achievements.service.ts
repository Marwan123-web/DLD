import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StatItem } from '../models/stat-item.model';
import { BackendUrls } from '../constants/backend-urls.constants';
import { BaseService } from './base.service';

// TODO(backend): Replace with DLD KPI API. ⚠️ AMBIGUITY: exact values inferred from screenshots.
const MOCK_ACHIEVEMENTS: StatItem[] = [
  { value: 'AED 7,618+', label: 'Billion Total Transaction Value', suffix: 'B' },
  { value: '226,000+',   label: 'Real Estate Transactions (Annual)' },
  { value: '500K+',      label: 'Registered Properties' },
  { value: '190+',       label: 'Nationalities Investing in Dubai' },
];

const MOCK_STATS_BAR: StatItem[] = [
  { value: '500K+',      label: 'Annual Transactions' },
  { value: 'AED 1,288',  label: 'Dubai Real Estate Index' },
  { value: '4.5+',       label: 'Average Service Rating' },
];

@Injectable({ providedIn: 'root' })
export class AchievementsService extends BaseService<StatItem> {
  constructor() {
    super(BackendUrls.achievements, MOCK_ACHIEVEMENTS);
    this.registerMockResource(`${BackendUrls.achievements}/summary`, MOCK_ACHIEVEMENTS);
    this.registerMockResource(`${BackendUrls.achievements}/stats-bar`, MOCK_STATS_BAR);
  }

  getAchievements(): Observable<StatItem[]> {
    return this.api.get<StatItem[]>(`${BackendUrls.achievements}/summary`);
  }

  getStatsBar(): Observable<StatItem[]> {
    return this.api.get<StatItem[]>(`${BackendUrls.achievements}/stats-bar`);
  }
}
