import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ZrdPageHeaderComponent, ZrdCardComponent, ZrdInputComponent, ZrdButtonComponent, ZrdSelectComponent, ZrdBadgeComponent, ZrdSelectItem } from '@ui/components';
import { DoctorWebsiteService } from '@core/services/api/doctor-website.service';
import { BehaviorSubject, combineLatest, map, startWith } from 'rxjs';

interface TranslationItem {
  key: string;
  value: string;
  lang: string;
  category: string;
  isPublic: boolean;
}

@Component({
  selector: 'app-language-management',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,
    MatIconModule, 
    MatSnackBarModule,
    ZrdPageHeaderComponent,
    ZrdCardComponent,
    ZrdInputComponent,
    ZrdButtonComponent,
    ZrdSelectComponent,
    ZrdBadgeComponent
  ],
  template: `
    <div class="space-y-8 animate-in fade-in duration-500 pb-20">
      
      <zrd-page-header 
        title="Language Management" 
        subtitle="Manage dynamic website content and translations across available languages.">
        <div class="flex items-center gap-3">
           <zrd-select 
             label="Language"
             [options]="languageOptions"
             [(ngModel)]="selectedLang"
             (ngModelChange)="loadTranslations()"
             class="min-w-[150px]"
           ></zrd-select>
        </div>
      </zrd-page-header>

      <zrd-card variant="default">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div class="relative w-full md:w-96">
            <mat-icon class="absolute left-3 top-1/2 -translate-y-1/2 text-google-gray-400">search</mat-icon>
            <input 
              type="text" 
              placeholder="Search keys or values..." 
              class="w-full pl-10 pr-4 py-2 rounded-xl border border-google-gray-200 dark:border-white/10 bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-google-blue/20 transition-all text-sm"
              [(ngModel)]="searchTerm"
              (ngModelChange)="onSearchChange($event)"
            >
          </div>
          
          <div class="flex items-center gap-2">
            <zrd-badge variant="info" size="md">
              {{ (filteredTranslations$ | async)?.length || 0 }} Items
            </zrd-badge>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-google-gray-100 dark:border-white/5">
                <th class="py-4 px-4 text-xs font-bold text-google-gray-500 uppercase tracking-wider">Key</th>
                <th class="py-4 px-4 text-xs font-bold text-google-gray-500 uppercase tracking-wider">Content Value</th>
                <th class="py-4 px-4 text-xs font-bold text-google-gray-500 uppercase tracking-wider w-32">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of filteredTranslations$ | async" class="border-b border-google-gray-50 dark:border-white/5 hover:bg-google-gray-50/50 dark:hover:bg-white/5 transition-colors">
                <td class="py-4 px-4">
                  <span class="text-sm font-mono text-google-blue font-medium">{{ item.key }}</span>
                  <div class="text-[10px] text-google-gray-400 mt-1 uppercase">{{ item.category }}</div>
                </td>
                <td class="py-4 px-4">
                  <zrd-input 
                    [(ngModel)]="item.value"
                    placeholder="Enter translation..."
                  ></zrd-input>
                </td>
                <td class="py-4 px-4">
                  <zrd-button 
                    variant="primary" 
                    size="sm" 
                    (click)="saveTranslation(item)"
                    [loading]="savingKey === item.key"
                  >
                    Save
                  </zrd-button>
                </td>
              </tr>
              <tr *ngIf="(filteredTranslations$ | async)?.length === 0">
                <td colspan="3" class="py-20 text-center text-google-gray-500">
                  <mat-icon class="text-4xl mb-2 opacity-20">find_in_page</mat-icon>
                  <p>No translation units found matching your search vector.</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </zrd-card>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class LanguageManagementComponent implements OnInit {
  private websiteService = inject(DoctorWebsiteService);
  private snackBar = inject(MatSnackBar);

  selectedLang = 'EN';
  searchTerm = '';
  savingKey: string | null = null;

  languageOptions: ZrdSelectItem[] = [
    { label: 'English (US)', value: 'EN' },
    { label: 'Bengali (BD)', value: 'BN' }
  ];

  private translations$ = new BehaviorSubject<TranslationItem[]>([]);
  private searchFilter$ = new BehaviorSubject<string>('');

  filteredTranslations$ = combineLatest([
    this.translations$,
    this.searchFilter$
  ]).pipe(
    map(([translations, term]) => {
      if (!term) return translations;
      const lowerTerm = term.toLowerCase();
      return translations.filter(t => 
        t.key.toLowerCase().includes(lowerTerm) || 
        t.value.toLowerCase().includes(lowerTerm)
      );
    })
  );

  ngOnInit() {
    this.loadTranslations();
  }

  loadTranslations() {
    this.websiteService.getTranslations(this.selectedLang).subscribe({
      next: (items) => {
        // Filter only those that are likely i18n keys (have a dot or are in I18N category)
        const i18nItems = items.filter((item: any) => 
          item.key.includes('.') || item.category === 'I18N' || item.category === 'WEBSITE'
        );
        this.translations$.next(i18nItems);
      },
      error: () => {
        this.snackBar.open('Failed to load translations from registry', 'Close', { duration: 3000 });
      }
    });
  }

  onSearchChange(term: string) {
    this.searchFilter$.next(term);
  }

  saveTranslation(item: TranslationItem) {
    this.savingKey = item.key;
    this.websiteService.updateTranslation(item.key, this.selectedLang, item.value).subscribe({
      next: () => {
        this.snackBar.open(`Updated unit: ${item.key}`, 'OK', { duration: 2000 });
        this.savingKey = null;
      },
      error: () => {
        this.snackBar.open(`Failed to commit unit: ${item.key}`, 'Retry', { duration: 3000 });
        this.savingKey = null;
      }
    });
  }
}
