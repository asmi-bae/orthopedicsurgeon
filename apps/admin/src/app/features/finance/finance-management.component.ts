import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-finance-management',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    MatChipsModule,
    MatTooltipModule
  ],
  template: `
    <div class="space-y-10 animate-fade-in pb-24 px-2">
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-8 border-b border-white/5 pb-10">
        <div class="flex items-center gap-6">
          <div class="w-16 h-16 bg-amber-600/20 rounded-2xl flex items-center justify-center border border-amber-500/30 shadow-2xl shadow-amber-500/10">
            <mat-icon class="text-amber-400 scale-[1.5]">account_balance_wallet</mat-icon>
          </div>
          <div>
            <h1 class="text-4xl font-black text-white tracking-tighter italic uppercase leading-tight">Fiscal Flux</h1>
            <div class="flex items-center gap-3 mt-1.5">
              <span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              <p class="text-primary-500 font-black text-[10px] uppercase tracking-[0.4em]">Oversee system revenue, hospital billings, and insurance claims</p>
            </div>
          </div>
        </div>
        <div class="flex gap-4">
          <button mat-flat-button color="primary" class="rounded-2xl h-14 px-10 font-black uppercase tracking-tighter italic shadow-2xl shadow-primary-500/20 premium-border bg-primary-600 hover:bg-primary-500 transition-all shrink-0">
             Generate Fiscal Audit
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 animate-slide-up">
        <mat-card class="bg-white/[0.01] border border-white/5 rounded-[32px] glass p-8 group hover:border-emerald-500/30 transition-all shadow-xl">
          <div class="flex items-center justify-between mb-6">
            <div class="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
              <mat-icon class="text-emerald-400">payments</mat-icon>
            </div>
            <span class="text-[8px] font-black text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20 uppercase tracking-widest">+12.5%</span>
          </div>
          <h3 class="text-4xl font-black text-white tracking-tighter italic mb-1">$1.24M</h3>
          <p class="text-white/20 font-black text-[9px] uppercase tracking-[0.3em]">Net Operational Revenue</p>
        </mat-card>

        <mat-card class="bg-white/[0.01] border border-white/5 rounded-[32px] glass p-8 group hover:border-amber-500/30 transition-all shadow-xl">
          <div class="flex items-center justify-between mb-6">
            <div class="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
              <mat-icon class="text-amber-400">pending_actions</mat-icon>
            </div>
            <span class="text-[8px] font-black text-amber-500 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/20 uppercase tracking-widest">CRITICAL</span>
          </div>
          <h3 class="text-4xl font-black text-white tracking-tighter italic mb-1">452</h3>
          <p class="text-white/20 font-black text-[9px] uppercase tracking-[0.3em]">Pending Insurance Claims</p>
        </mat-card>

        <mat-card class="bg-white/[0.01] border border-white/5 rounded-[32px] glass p-8 group hover:border-primary-500/30 transition-all shadow-xl">
          <div class="flex items-center justify-between mb-6">
            <div class="w-12 h-12 rounded-2xl bg-primary-500/10 flex items-center justify-center border border-primary-500/20">
              <mat-icon class="text-primary-400">output</mat-icon>
            </div>
            <span class="text-[8px] font-black text-primary-400 bg-primary-500/10 px-3 py-1 rounded-lg border border-primary-500/20 uppercase tracking-widest">STABLE</span>
          </div>
          <h3 class="text-4xl font-black text-white tracking-tighter italic mb-1">$842k</h3>
          <p class="text-white/20 font-black text-[9px] uppercase tracking-[0.3em]">Provider Payout Aggregate</p>
        </mat-card>
      </div>

      <mat-card class="bg-white/[0.01] border border-white/5 rounded-[40px] glass overflow-hidden animate-slide-up shadow-2xl">
        <div class="overflow-x-auto p-4">
          <table mat-table [dataSource]="transactions()" class="w-full bg-transparent">
             <ng-container matColumnDef="id">
                <th mat-header-cell *matHeaderCellDef class="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] py-8 px-10">Transaction ID</th>
                <td mat-cell *matCellDef="let row" class="py-10 px-10 border-b border-white/[0.03]">
                  <span class="text-sm font-black text-primary-400 bg-primary-500/10 px-4 py-2 rounded-xl border border-primary-500/20 uppercase tracking-[0.1em] italic">
                    {{row.id}}
                  </span>
                </td>
             </ng-container>

             <ng-container matColumnDef="patient">
                <th mat-header-cell *matHeaderCellDef class="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] py-8">Associated Subject</th>
                <td mat-cell *matCellDef="let row" class="py-10 border-b border-white/[0.03]">
                  <div class="flex items-center gap-4">
                    <div class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 font-black text-white/20 text-[10px]">
                      {{row.patient.charAt(0)}}
                    </div>
                    <span class="text-sm font-black text-white uppercase italic tracking-tighter">{{row.patient}}</span>
                  </div>
                </td>
             </ng-container>

             <ng-container matColumnDef="amount">
                <th mat-header-cell *matHeaderCellDef class="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] py-8">Quantum</th>
                <td mat-cell *matCellDef="let row" class="py-10 border-b border-white/[0.03]">
                  <span class="text-base font-black text-white tracking-tight uppercase italic">{{row.amount | currency}}</span>
                </td>
             </ng-container>

             <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef class="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] py-8">Verification</th>
                <td mat-cell *matCellDef="let row" class="py-10 border-b border-white/[0.03]">
                   <span [class]="row.status === 'SUCCESS' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'" 
                         class="px-4 py-2 rounded-xl text-[8px] font-black uppercase tracking-[0.2em] border backdrop-blur-sm">
                    {{row.status === 'SUCCESS' ? 'SETTLED' : 'VERIFYING'}}
                  </span>
                </td>
             </ng-container>

             <ng-container matColumnDef="date">
                <th mat-header-cell *matHeaderCellDef class="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] py-8 px-10 text-right">Timestamp</th>
                <td mat-cell *matCellDef="let row" class="py-10 px-10 border-b border-white/[0.03] text-right">
                   <span class="text-[10px] font-black text-white/40 uppercase tracking-widest italic">{{row.date}}</span>
                </td>
             </ng-container>

             <tr mat-header-row *matHeaderRowDef="columns" class="bg-white/[0.02]"></tr>
             <tr mat-row *matRowDef="let row; columns: columns;" class="group hover:bg-white/[0.02] transition-all cursor-pointer border-white/5"></tr>
          </table>
          
          <div *ngIf="transactions().length === 0" class="py-48 text-center bg-white/[0.01]">
             <mat-icon class="text-white/5 scale-[5] mb-14 animate-pulse">no_sim</mat-icon>
             <p class="text-white/20 font-black uppercase tracking-[0.6em] text-[10px]">No ledger data in current cycle</p>
          </div>
        </div>
      </mat-card>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .glass { backdrop-filter: blur(40px); }
    ::ng-deep .mat-mdc-table { background: transparent !important; }
  `]
})
export class FinanceManagementComponent {
  transactions = signal([
    { id: 'TX-500', patient: 'John Doe', amount: 150.00, status: 'SUCCESS', date: '2024-10-15' },
    { id: 'TX-501', patient: 'Jane Smith', amount: 45.00, status: 'SUCCESS', date: '2024-10-16' },
    { id: 'TX-502', patient: 'Robert Wilson', amount: 2450.00, status: 'PENDING', date: '2024-10-18' },
    { id: 'TX-503', patient: 'Sarah Parker', amount: 320.00, status: 'SUCCESS', date: '2024-10-22' }
  ]);
  
  columns = ['id', 'patient', 'amount', 'status', 'date'];
}
