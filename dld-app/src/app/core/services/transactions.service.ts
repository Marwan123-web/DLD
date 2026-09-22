import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface TransactionSegment {
  key: string;
  labelKey: string;
  percent: number;
  colorToken: string;
  tooltipValue?: string;
}

export interface TransactionBreakdown {
  key: string;
  labelKey: string;
  value: string;
  percent: number;
  accentToken: string;
  tintToken: string;
  pillTintToken: string;
  icon: 'sales' | 'mortgaged' | 'gifts';
}

export interface TransactionAnalytics {
  totalValue: string;
  asOf: string;
  tooltipSegmentKey: string;
  segments: TransactionSegment[];
  breakdown: TransactionBreakdown[];
}

const MOCK: TransactionAnalytics = {
  totalValue: '1.64 B',
  asOf: '12th May 2025',
  tooltipSegmentKey: 'mortgaged',
  segments: [
    {
      key: 'sales',
      labelKey: 'transactions.sales_label',
      percent: 69.8,
      colorToken: 'var(--chart-green)',
    },
    {
      key: 'mortgaged',
      labelKey: 'transactions.mortgaged_label',
      percent: 26.5,
      colorToken: 'var(--chart-blue)',
      tooltipValue: '435',
    },
    {
      key: 'gifts',
      labelKey: 'transactions.gifts_label',
      percent: 3.9,
      colorToken: 'var(--chart-purple)',
    },
  ],
  breakdown: [
    {
      key: 'sales',
      labelKey: 'transactions.sales_label',
      value: '1.14 B',
      percent: 69.8,
      accentToken: 'var(--color-analytics-sales-accent)',
      tintToken: 'var(--color-analytics-sales-tint)',
      pillTintToken: 'var(--color-analytics-sales-pill-bg)',
      icon: 'sales',
    },
    {
      key: 'mortgaged',
      labelKey: 'transactions.mortgaged_label',
      value: '434.99 M',
      percent: 26.5,
      accentToken: 'var(--color-analytics-mort-accent)',
      tintToken: 'var(--color-analytics-mort-tint)',
      pillTintToken: 'var(--color-analytics-mort-pill-bg)',
      icon: 'mortgaged',
    },
    {
      key: 'gifts',
      labelKey: 'transactions.gifts_label',
      value: '63.99 M',
      percent: 3.9,
      accentToken: 'var(--color-analytics-gift-accent)',
      tintToken: 'var(--color-analytics-gift-tint)',
      pillTintToken: 'var(--color-analytics-gift-pill-bg)',
      icon: 'gifts',
    },
  ],
};

@Injectable({ providedIn: 'root' })
export class TransactionsService {
  getAnalytics(): Observable<TransactionAnalytics> {
    // TODO: replace with HttpClient call, e.g.:
    // return this.http.get<TransactionAnalytics>('/api/v1/transactions/analytics');
    return of(MOCK).pipe(delay(300));
  }
}
