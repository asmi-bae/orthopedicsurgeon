import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    MatChipsModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule
  ],
  template: `
    <div class="space-y-10 animate-fade-in pb-24 px-2">
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-8 border-b border-white/5 pb-10">
        <div class="flex items-center gap-6">
          <div class="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center border border-blue-500/30 shadow-2xl shadow-blue-500/10">
            <mat-icon class="text-blue-400 scale-[1.5]">admin_panel_settings</mat-icon>
          </div>
          <div>
            <h1 class="text-4xl font-black text-white tracking-tighter italic uppercase leading-tight">Authority Protocol</h1>
            <div class="flex items-center gap-3 mt-1.5">
              <span class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              <p class="text-primary-500 font-black text-[10px] uppercase tracking-[0.4em]">Advanced user administration, role assignment, and security gatekeeper</p>
            </div>
          </div>
        </div>
        <button mat-flat-button color="primary" class="rounded-2xl h-14 px-10 font-black uppercase tracking-tighter italic shadow-2xl shadow-primary-500/20 premium-border bg-primary-600 hover:bg-primary-500 transition-all shrink-0">
           Authorize New Node
        </button>
      </div>

      <div class="flex flex-col md:flex-row gap-6 items-center animate-slide-up bg-white/[0.01] p-6 rounded-3xl border border-white/5 glass">
          <div class="relative flex-1 w-full">
            <mat-icon class="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 scale-75">search</mat-icon>
            <input type="text" placeholder="QUERY IDENTITY, ROLE, OR SECTOR..." 
                   class="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-xs font-black text-white placeholder:text-white/10 focus:outline-none focus:border-primary-500/30 focus:bg-white/10 transition-all uppercase tracking-widest">
          </div>
          <div class="flex gap-3 w-full md:w-auto">
             <button mat-button class="h-14 px-8 bg-white/5 text-white/40 hover:text-primary-400 hover:bg-primary-500/10 rounded-2xl transition-all border border-white/5 text-[10px] font-black uppercase tracking-widest flex-1 md:flex-none">
                <mat-icon class="scale-75 mr-2">security</mat-icon> Role Matrix
             </button>
             <button mat-button class="h-14 px-8 bg-white/5 text-white/40 hover:text-primary-400 hover:bg-primary-500/10 rounded-2xl transition-all border border-white/5 text-[10px] font-black uppercase tracking-widest flex-1 md:flex-none">
                <mat-icon class="scale-75 mr-2">lock_reset</mat-icon> Gate Reset
             </button>
          </div>
      </div>

      <mat-card class="bg-white/[0.01] border border-white/5 rounded-[40px] glass overflow-hidden animate-slide-up shadow-2xl">
        <div class="overflow-x-auto p-4">
          <table mat-table [dataSource]="users()" class="w-full bg-transparent">
             <ng-container matColumnDef="identity">
                <th mat-header-cell *matHeaderCellDef class="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] py-8 px-10">System Identity</th>
                <td mat-cell *matCellDef="let row" class="py-10 px-10 border-b border-white/[0.03]">
                  <div class="flex items-center gap-5">
                    <div class="w-14 h-14 rounded-2xl bg-secondary-900 flex items-center justify-center border border-white/5 group-hover:border-primary-500/30 transition-all font-black text-white/40 text-lg shadow-inner overflow-hidden uppercase italic">
                      {{row.firstName.charAt(0)}}{{row.lastName.charAt(0)}}
                    </div>
                    <div class="flex flex-col">
                      <span class="text-lg font-black text-white tracking-tight uppercase italic group-hover:text-primary-400 transition-colors">{{row.firstName}} {{row.lastName}}</span>
                      <span class="text-[8px] font-bold text-white/20 uppercase tracking-[0.2em] mt-1 italic">{{row.email}}</span>
                    </div>
                  </div>
                </td>
             </ng-container>

             <ng-container matColumnDef="roles">
                <th mat-header-cell *matHeaderCellDef class="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] py-8">Privilege Nodes</th>
                <td mat-cell *matCellDef="let row" class="py-10 border-b border-white/[0.03]">
                  <div class="flex flex-wrap gap-2">
                    <span *ngFor="let role of row.roles" 
                          class="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[8px] font-black text-white/60 uppercase tracking-widest">
                      {{role}}
                    </span>
                  </div>
                </td>
             </ng-container>

             <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef class="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] py-8">Gate Access</th>
                <td mat-cell *matCellDef="let row" class="py-10 border-b border-white/[0.03]">
                   <span [class]="row.status === 'ACTIVE' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'" 
                         class="px-4 py-2 rounded-xl text-[8px] font-black uppercase tracking-[0.2em] border backdrop-blur-sm">
                    {{row.status === 'ACTIVE' ? 'AUTHORIZED' : 'TERMINATED'}}
                  </span>
                </td>
             </ng-container>

             <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef class="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] py-8 px-10 text-right">Orchestration</th>
                <td mat-cell *matCellDef="let row" class="py-10 px-10 border-b border-white/[0.03] text-right">
                   <div class="flex justify-end gap-3 opacity-20 group-hover:opacity-100 transition-opacity">
                      <button mat-icon-button matTooltip="Modify Credentials" class="w-10 h-10 bg-white/5 text-white/40 hover:text-primary-400 hover:bg-primary-500/10 rounded-xl transition-all border border-white/5">
                        <mat-icon class="scale-75">manage_accounts</mat-icon>
                      </button>
                      <button mat-icon-button matTooltip="Audit Logs" class="w-10 h-10 bg-white/5 text-white/40 hover:text-primary-400 hover:bg-primary-500/10 rounded-xl transition-all border border-white/5">
                        <mat-icon class="scale-75">assignment_ind</mat-icon>
                      </button>
                   </div>
                </td>
             </ng-container>

             <tr mat-header-row *matHeaderRowDef="columns" class="bg-white/[0.02]"></tr>
             <tr mat-row *matRowDef="let row; columns: columns;" class="group hover:bg-white/[0.02] transition-all cursor-pointer border-white/5"></tr>
          </table>
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
export class UserManagementComponent {
  users = signal([
    { id: '1', firstName: 'Admin', lastName: 'User', email: 'admin@orthosync.com', roles: ['SUPER_ADMIN', 'ADMIN'], status: 'ACTIVE' },
    { id: '2', firstName: 'Sarah', lastName: 'Johnson', email: 'sarah.j@orthosync.com', roles: ['DOCTOR'], status: 'ACTIVE' },
    { id: '3', firstName: 'John', lastName: 'Doe', email: 'john.doe@gmail.com', roles: ['PATIENT'], status: 'ACTIVE' },
    { id: '4', firstName: 'Mike', lastName: 'Reception', email: 'mike.r@hospital.com', roles: ['RECEPTIONIST'], status: 'INACTIVE' },
  ]);

  columns = ['identity', 'roles', 'status', 'actions'];
}
