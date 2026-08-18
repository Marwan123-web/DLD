import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { TranslationService } from '../../../../core/services/translation.service';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { TabGroupComponent, Tab } from '../../../../shared/components/tab-group/tab-group.component';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import * as L from 'leaflet';

const TABS: Tab[] = [
  { id: 'analytics', label: 'Analytics' },
  { id: 'map',       label: 'Map' },
];

const CHART_DATA: ChartData<'doughnut'> = {
  labels: ['Villas & Houses', 'Apartments', 'Commercial', 'Land Plots'],
  datasets: [{
    data: [38, 44, 11, 7],
    backgroundColor: ['#22A87C', '#192032', '#3ABFA0', '#6B7280'],
    borderWidth: 0,
    hoverOffset: 6,
  }],
};

const CHART_OPTIONS: ChartOptions<'doughnut'> = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '68%',
  plugins: {
    legend: {
      position: 'right',
      labels: {
        font: { family: 'Dubai, sans-serif', size: 13 },
        padding: 16,
        usePointStyle: true,
        pointStyleWidth: 10,
      },
    },
    tooltip: {
      callbacks: {
        label: (ctx) => ` ${ctx.label}: ${ctx.raw}%`,
      },
    },
  },
};

// Dubai Marina approximate center
const MAP_CENTER: L.LatLngTuple = [25.0819, 55.1367];
const MOCK_PINS = [
  { latlng: [25.0776, 55.1390] as L.LatLngTuple, title: 'Palm Jumeirah — AED 4.2M' },
  { latlng: [25.0855, 55.1402] as L.LatLngTuple, title: 'Dubai Marina — AED 1.8M' },
  { latlng: [25.0690, 55.1350] as L.LatLngTuple, title: 'JBR — AED 2.3M' },
  { latlng: [25.0944, 55.1534] as L.LatLngTuple, title: 'JLT — AED 1.1M' },
  { latlng: [25.0611, 55.1277] as L.LatLngTuple, title: 'Discovery Gardens — AED 0.7M' },
];

@Component({
  selector: 'app-transactions-section',
  standalone: true,
  imports: [SectionHeaderComponent, TabGroupComponent, BaseChartDirective, LeafletModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="transactions-section" aria-labelledby="transactions-heading">
      <div class="container">
        <app-section-header
          label="Transactions"
          title="Real Estate Transactions"
          subtitle="Live analytics and map view of Dubai's real estate transaction data."
        />

        <app-tab-group
          [tabs]="tabs"
          initialId="analytics"
          ariaLabel="Transaction view"
          (tabChange)="onTabChange($event)"
        />

        @if (activeTab() === 'analytics') {
          <div class="chart-wrap" aria-label="Transaction type breakdown donut chart">
            <canvas baseChart
              [data]="chartData"
              [options]="chartOptions"
              type="doughnut"
            ></canvas>
          </div>
        }

        @if (activeTab() === 'map') {
          <div
            class="map-wrap"
            leaflet
            [leafletOptions]="mapOptions"
            [leafletLayers]="mapLayers"
          ></div>
        }
      </div>
    </section>
  `,
  styleUrl: './transactions-section.component.scss',
})
export class TransactionsSectionComponent {
  readonly tr = inject(TranslationService);
  readonly tabs = TABS;
  readonly activeTab = signal('analytics');
  readonly chartData = CHART_DATA;
  readonly chartOptions = CHART_OPTIONS;

  readonly mapOptions: L.MapOptions = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }),
    ],
    zoom: 13,
    center: L.latLng(...MAP_CENTER),
  };

  // Marker overlays added separately so mapOptions stays declarative
  readonly mapLayers: L.Layer[] = MOCK_PINS.map(pin =>
    L.marker(pin.latlng).bindPopup(pin.title)
  );

  onTabChange(id: string): void {
    this.activeTab.set(id);
  }
}
