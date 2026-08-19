import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-org-chart',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="org-chart-section" aria-label="Organization Chart">
      <div class="main-container">
        <h2 class="org-title">Organization Structure</h2>
        <p class="org-note">⚠ AMBIGUITY: org structure inferred from public sources; pending official confirmation.</p>

        <div class="org-tree" role="tree" aria-label="DLD organizational hierarchy">
          <!-- Root -->
          <div class="org-level root-level">
            <div class="org-box root" role="treeitem">
              <strong>Director General</strong>
              <span>H.E. Sultan Butti Bin Mejren</span>
            </div>
          </div>

          <!-- L1 connector -->
          <div class="connector-v"></div>
          <div class="connector-h two-col"></div>

          <!-- Level 1 -->
          <div class="org-level l1-level">
            <div class="org-branch">
              <div class="connector-v-top"></div>
              <div class="org-box l1" role="treeitem">
                <strong>Deputy Director General</strong>
                <span>H.E. Ali Abdullah Al Ali</span>
              </div>
              <div class="connector-v"></div>
              <div class="connector-h three-col"></div>
              <!-- L2 under Deputy DG -->
              <div class="org-level l2-level">
                <div class="org-branch-sm">
                  <div class="connector-v-top"></div>
                  <div class="org-box l2" role="treeitem">
                    <strong>RERA</strong>
                    <span>CEO: H.E. Marwan Bin Ghalita</span>
                  </div>
                </div>
                <div class="org-branch-sm">
                  <div class="connector-v-top"></div>
                  <div class="org-box l2" role="treeitem">
                    <strong>Real Estate Registration</strong>
                    <span>Executive Director</span>
                  </div>
                </div>
                <div class="org-branch-sm">
                  <div class="connector-v-top"></div>
                  <div class="org-box l2" role="treeitem">
                    <strong>Investment Management & Promotion</strong>
                    <span>Executive Director</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="org-branch">
              <div class="connector-v-top"></div>
              <div class="org-box l1" role="treeitem">
                <strong>Corporate Support</strong>
              </div>
              <div class="connector-v"></div>
              <div class="connector-h four-col"></div>
              <!-- L2 under Corporate Support -->
              <div class="org-level l2-level">
                <div class="org-branch-sm">
                  <div class="connector-v-top"></div>
                  <div class="org-box l2 sm" role="treeitem">
                    <strong>HR & OD</strong>
                  </div>
                </div>
                <div class="org-branch-sm">
                  <div class="connector-v-top"></div>
                  <div class="org-box l2 sm" role="treeitem">
                    <strong>Finance & Budget</strong>
                  </div>
                </div>
                <div class="org-branch-sm">
                  <div class="connector-v-top"></div>
                  <div class="org-box l2 sm" role="treeitem">
                    <strong>Information Technology</strong>
                  </div>
                </div>
                <div class="org-branch-sm">
                  <div class="connector-v-top"></div>
                  <div class="org-box l2 sm" role="treeitem">
                    <strong>Strategic Planning</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrl: './org-chart.component.scss',
})
export class OrgChartComponent {}
