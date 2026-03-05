import { Component, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { 
  ZrdCardComponent, 
  ZrdButtonComponent, 
  ZrdInputComponent,
  ZrdBadgeComponent 
} from '@repo/ui';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';

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
        @for (s of summaryCards; track s.label) {
          <zrd-card variant="default" class="group relative overflow-hidden">
            <div class="flex items-center justify-between mb-6">
              <div class="w-12 h-12 rounded-2xl flex items-center justify-center bg-google-gray-50 dark:bg-white/5 transition-colors group-hover:bg-google-blue/10">
                <mat-icon class="text-[24px]" [class]="s.iconColor">{{ s.icon }}</mat-icon>
              </div>
              <zrd-badge [variant]="s.badge.includes('+') ? 'success' : 'neutral'" class="font-black text-[10px]">
                {{ s.badge }}
              </zrd-badge>
            </div>
            <div class="flex flex-col">
               <span class="text-[10px] font-black uppercase tracking-widest text-google-gray-400">{{ s.label }}</span>
               <span class="text-3xl font-black text-google-gray-900 dark:text-white mt-1 tracking-tight">{{ s.value }}</span>
            </div>
            <!-- Delta Progress Indicator -->
            <div class="h-1 bg-google-gray-100 dark:bg-white/5 mt-6 rounded-full overflow-hidden">
               <div class="h-full bg-google-blue" [style.width.%]="s.badge.includes('+') ? 75 : 45"></div>
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
            >
              <mat-icon prefix class="text-google-gray-400">payments</mat-icon>
            </zrd-input>
          </div>
        </div>

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
                    <span class="font-mono text-xs font-black text-google-gray-400 group-hover:text-google-blue transition-colors">{{ row.id }}</span>
                  </td>
                  <td class="px-6 py-5">
                    <div class="flex items-center gap-3">
                      <div class="w-9 h-9 rounded-full bg-google-blue/10 flex items-center justify-center text-[10px] font-black text-google-blue uppercase shrink-0 tracking-tighter">
                        {{ row.patient.charAt(0) }}
                      </div>
                      <span class="text-sm font-bold text-google-gray-900 dark:text-white tracking-tight">{{ row.patient }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-5">
                    <span class="text-sm font-black text-google-gray-900 dark:text-white">{{ row.amount | currency }}</span>
                  </td>
                  <td class="px-6 py-5">
                    <zrd-badge [variant]="row.status === 'SUCCESS' ? 'success' : 'warning'" class="font-black">
                      {{ row.status === 'SUCCESS' ? 'Settled' : 'Unprocessed' }}
                    </zrd-badge>
                  </td>
                  <td class="px-6 py-5 text-right pr-10">
                    <div class="flex flex-col items-end">
                       <span class="text-sm font-bold text-google-gray-600 dark:text-google-gray-400 tracking-tight">{{ row.date }}</span>
                       <span class="text-[10px] uppercase font-black tracking-widest text-google-emerald group-hover:translate-x-[-4px] transition-transform">✓ Audit Verified</span>
                    </div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
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
export class FinanceManagementComponent {
  summaryCards = [
    { label: 'Net Revenue',         value: '$1.24M', icon: 'payments',         iconBg: 'bg-google-blue/10',   iconColor: 'text-google-blue',  badge: '+12.5%',  badgeClass: 'bg-google-emerald/10 text-google-emerald' },
    { label: 'Pending Claims',      value: '452',    icon: 'pending_actions',  iconBg: 'bg-google-red/10',    iconColor: 'text-google-red',   badge: 'Review',  badgeClass: 'bg-google-red/10 text-google-red'   },
    { label: 'Provider Payouts',    value: '$842k',  icon: 'output',           iconBg: 'bg-google-indigo/10', iconColor: 'text-google-indigo', badge: 'Stable',  badgeClass: 'bg-google-gray-100 text-google-gray-600' },
  ];

  transactions = signal([
    { id: 'TX-500', patient: 'John Doe',      amount: 150.00,  status: 'SUCCESS', date: 'Oct 15, 2024' },
    { id: 'TX-501', patient: 'Jane Smith',    amount: 45.00,   status: 'SUCCESS', date: 'Oct 16, 2024' },
    { id: 'TX-502', patient: 'Robert Wilson', amount: 2450.00, status: 'PENDING', date: 'Oct 18, 2024' },
    { id: 'TX-503', patient: 'Sarah Parker',  amount: 320.00,  status: 'SUCCESS', date: 'Oct 22, 2024' },
    { id: 'TX-504', patient: 'Emily Davis',   amount: 890.00,  status: 'PENDING', date: 'Oct 23, 2024' },
  ]);
}
