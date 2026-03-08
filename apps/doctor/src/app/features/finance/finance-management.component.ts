import { ZrdCardComponent, ZrdButtonComponent, ZrdInputComponent, ZrdBadgeComponent } from '@ui/components';
import { Component, signal, inject, OnInit, computed } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PAYMENTSService } from '../../core/services/api/payments.service';
import { REPORTSService } from '../../core/services/api/reports.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-finance-management',
  standalone: true,
  imports: [
    CommonModule, 
    CurrencyPipe, 
    ZrdCardComponent, 
    ZrdButtonComponent, 
    ZrdInputComponent,
    ZrdBadgeComponent,
    MatIconModule,
    MatMenuModule,
    MatProgressBarModule
  ],
  providers: [CurrencyPipe],
  template: `
    <div class="space-y-8 animate-in fade-in duration-500">

      <!-- Spartan Page Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 class="text-3xl font-bold text-google-gray-900 dark:text-white tracking-tight">Revenue Operations</h1>
          <p class="text-google-gray-500 dark:text-google-gray-400 mt-1">Monitor billing cycles, provider payouts, and clinical revenue flow.</p>
        </div>
        <zrd-button variant="primary" size="md">
          <mat-icon leftIcon class="text-[20px]">insights</mat-icon>
          Generate Financial Analysis
        </zrd-button>
      </div>

      <!-- Financial Summary Layer -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        @for (s of summary(); track s.label) {
          <zrd-card variant="default" class="group relative overflow-hidden">
            <div class="flex items-center justify-between mb-6">
              <div class="w-12 h-12 rounded-2xl flex items-center justify-center bg-google-gray-50 dark:bg-white/5 transition-colors group-hover:bg-google-blue/10">
                <mat-icon class="text-[24px]" [class]="s.iconColor">{{ s.icon }}</mat-icon>
              </div>
              <zrd-badge [variant]="$any(s.trend >= 0 ? 'success' : 'neutral')" class="font-black text-[10px]">
                {{ s.trend >= 0 ? '+' : '' }}{{ s.trend }}%
              </zrd-badge>
            </div>
            <div class="flex flex-col">
               <span class="text-[10px] font-black uppercase tracking-widest text-google-gray-400">{{ s.label }}</span>
               <span class="text-3xl font-black text-google-gray-900 dark:text-white mt-1 tracking-tight">{{ s.value }}</span>
            </div>
            <!-- Delta Progress Indicator -->
            <div class="h-1 bg-google-gray-100 dark:bg-white/5 mt-6 rounded-full overflow-hidden">
               <div class="h-full bg-google-blue" [style.width.%]="s.trend >= 0 ? 75 : 45"></div>
            </div>
          </zrd-card>
        }
      </div>

      <!-- Transaction Directory Card -->
      <zrd-card variant="default">
        <!-- Directory Strip -->
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <h2 class="text-lg font-black text-google-gray-900 dark:text-white tracking-tight m-0">Ledger Entry Review</h2>
          <div class="w-full sm:w-auto min-w-[300px]">
            <zrd-input 
              placeholder="Search by TX-ID or patient name..." 
              [hasPrefix]="true"
              (keyup)="applyFilter($event)"
            >
              <mat-icon prefix class="text-google-gray-400">payments</mat-icon>
            </zrd-input>
          </div>
        </div>

        @if (loading()) {
          <div class="relative h-1 mb-6 -mx-6 overflow-hidden">
             <mat-progress-bar mode="query" color="primary" class="absolute inset-0"></mat-progress-bar>
          </div>
        }

        <!-- Spartan Ledger Table -->
        <div class="overflow-x-auto -mx-6">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-google-gray-100 dark:border-white/5 bg-google-gray-50/50 dark:bg-white/5">
                <th class="px-6 py-4 text-xs font-bold text-google-gray-500 uppercase tracking-widest pl-10">Entry Hash</th>
                <th class="px-6 py-4 text-xs font-bold text-google-gray-500 uppercase tracking-widest">Remittance Source</th>
                <th class="px-6 py-4 text-xs font-bold text-google-gray-500 uppercase tracking-widest">Calculated Amount</th>
                <th class="px-6 py-4 text-xs font-bold text-google-gray-500 uppercase tracking-widest">Settlement Rank</th>
                <th class="px-6 py-4 text-xs font-bold text-google-gray-500 uppercase tracking-widest text-right pr-10">Ledger Date</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-google-gray-100 dark:divide-white/5">
              @for (row of transactions(); track row.id) {
                <tr class="hover:bg-google-gray-50 dark:hover:bg-white/5 transition-colors group cursor-pointer">
                  <td class="px-6 py-5 pl-10">
                    <span class="font-mono text-xs font-black text-google-gray-400 group-hover:text-google-blue transition-colors">
                      {{ row.id.split('-')[0] }}
                    </span>
                  </td>
                  <td class="px-6 py-5">
                    <div class="flex items-center gap-3">
                      <div class="w-9 h-9 rounded-full bg-google-blue/10 flex items-center justify-center text-[10px] font-black text-google-blue uppercase shrink-0 tracking-tighter">
                        {{ row.patientName?.charAt(0) || 'P' }}
                      </div>
                      <span class="text-sm font-bold text-google-gray-900 dark:text-white tracking-tight">{{ row.patientName }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-5">
                    <span class="text-sm font-black text-google-gray-900 dark:text-white">{{ row.totalAmount | currency }}</span>
                  </td>
                  <td class="px-6 py-5">
                    <zrd-badge [variant]="row.status === 'COMPLETED' || row.status === 'SUCCESS' ? 'success' : 'warning'" class="font-black">
                      {{ (row.status === 'COMPLETED' || row.status === 'SUCCESS') ? 'Settled' : 'Unprocessed' }}
                    </zrd-badge>
                  </td>
                  <td class="px-6 py-5 text-right pr-10">
                    <div class="flex flex-col items-end">
                       <span class="text-sm font-bold text-google-gray-600 dark:text-google-gray-400 tracking-tight">{{ (row.paymentDate || row.createdAt) | date:'mediumDate' }}</span>
                       <span class="text-[10px] uppercase font-black tracking-widest text-google-emerald group-hover:translate-x-[-4px] transition-transform">✓ Audit Verified</span>
                    </div>
                  </td>
                </tr>
              }
            </tbody>
          </table>

          @if (transactions().length === 0 && !loading()) {
            <div class="py-24 text-center">
              <div class="w-16 h-16 bg-google-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <mat-icon class="text-google-gray-400 text-3xl">account_balance_wallet</mat-icon>
              </div>
              <h3 class="font-bold text-google-gray-900 dark:text-white">No Ledger Entries</h3>
              <p class="text-sm text-google-gray-500 max-w-xs mx-auto mt-2">No transaction data found in the current audit cycle.</p>
            </div>
          }
        </div>

        <!-- Ledger Footer -->
        <div class="px-6 py-4 mt-6 border-t border-google-gray-100 dark:border-white/5 flex items-center justify-between">
          <span class="text-xs font-bold text-google-gray-400 uppercase tracking-widest">{{ transactions().length }} Active Transaction(s) Locked</span>
          <div class="flex items-center gap-2">
            <zrd-button variant="outline" size="sm">Download Audit Log</zrd-button>
          </div>
        </div>
      </zrd-card>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class FinanceManagementComponent implements OnInit {
  private paymentService = inject(PAYMENTSService);
  private reportService = inject(REPORTSService);
  private currencyPipe = inject(CurrencyPipe);

  transactions = signal<any[]>([]);
  stats = signal<any>(null);
  loading = signal(false);

  summary = computed(() => {
    const s = this.stats();
    return [
      { 
        label: 'Net Revenue', 
        value: this.currencyPipe.transform(s?.totalRevenue || 0, 'USD', 'symbol', '1.0-0') || '$0', 
        icon: 'payments', 
        iconColor: 'text-google-blue', 
        trend: s?.revenueTrend || 0 
      },
      { 
        label: 'Pending Claims', 
        value: String(s?.pendingClaims || 0), 
        icon: 'pending_actions', 
        iconColor: 'text-google-red', 
        trend: s?.claimsTrend || 0 
      },
      { 
        label: 'Audit Verified', 
        value: this.currencyPipe.transform(s?.verifiedRevenue || 0, 'USD', 'symbol', '1.0-0') || '$0', 
        icon: 'output', 
        iconColor: 'text-google-indigo', 
        trend: s?.verifyTrend || 0 
      },
    ];
  });

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading.set(true);
    
    forkJoin({
      payments: this.paymentService.getAdminPayments(),
      financials: this.reportService.getAdminReportsFinancial()
    }).subscribe({
      next: (res: any) => {
        // Handle payments
        const paymentRes = res.payments;
        const data = paymentRes?.data?.content || paymentRes?.data || [];
        this.transactions.set(Array.isArray(data) ? data : []);
        
        // Handle financial summary
        this.stats.set(res.financials?.data);
        
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  applyFilter(event: Event) {
    // filter logic
  }
}

