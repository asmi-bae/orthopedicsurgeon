import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ZrdCalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type?: 'appointment' | 'surgery' | 'consultation';
}

@Component({
  selector: 'zrd-calendar-view',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white border border-secondary-200 rounded-2xl overflow-hidden shadow-sm">
      <!-- Calendar Header -->
      <div class="p-4 border-b border-secondary-100 flex items-center justify-between">
        <h3 class="text-lg font-bold text-secondary-900">{{ currentMonthYear }}</h3>
        <div class="flex gap-2">
          <button (click)="prevMonth()" class="p-2 rounded-lg hover:bg-secondary-100 text-secondary-600 transition-colors">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <button (click)="today()" class="px-3 py-1.5 text-xs font-bold text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">Today</button>
          <button (click)="nextMonth()" class="p-2 rounded-lg hover:bg-secondary-100 text-secondary-600 transition-colors">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>

      <!-- Days Header -->
      <div class="grid grid-cols-7 border-b border-secondary-100 bg-secondary-50/50">
        <div *ngFor="let day of ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']" class="px-2 py-3 text-center text-[11px] font-bold text-secondary-400 uppercase tracking-wider">
          {{ day }}
        </div>
      </div>

      <!-- Calendar Grid -->
      <div class="grid grid-cols-7">
        <div 
          *ngFor="let day of calendarDays()" 
          class="min-h-[120px] p-2 border-b border-r border-secondary-100 last:border-r-0 relative group hover:bg-secondary-50/30 transition-colors"
          [class.bg-secondary-50/20]="!day.isCurrentMonth"
        >
          <span 
            class="inline-flex items-center justify-center w-7 h-7 text-xs font-bold rounded-full mb-2"
            [class.bg-primary-600.text-white]="day.isToday"
            [class.text-secondary-900]="day.isCurrentMonth && !day.isToday"
            [class.text-secondary-300]="!day.isCurrentMonth"
          >
            {{ day.date.getDate() }}
          </span>

          <div class="space-y-1 overflow-hidden">
            <div 
              *ngFor="let event of day.events" 
              (click)="eventClick.emit(event)"
              class="px-2 py-1 text-[10px] rounded border truncate cursor-pointer transition-all hover:scale-[1.02]"
              [class]="getEventClasses(event)"
            >
              {{ event.title }}
            </div>
          </div>

          <button 
            *ngIf="day.isCurrentMonth"
            (click)="addClick.emit(day.date)"
            class="absolute bottom-2 right-2 p-1 bg-white border border-secondary-200 rounded-md text-secondary-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-primary-600 shadow-sm"
          >
            <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
          </button>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZrdCalendarViewComponent {
  @Input() events: ZrdCalendarEvent[] = [];
  @Output() eventClick = new EventEmitter<ZrdCalendarEvent>();
  @Output() addClick = new EventEmitter<Date>();

  viewDate = signal(new Date());

  get currentMonthYear(): string {
    return this.viewDate().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  calendarDays = signal<any[]>([]);

  constructor() {
    this.generateCalendar();
  }

  ngOnChanges() {
    this.generateCalendar();
  }

  prevMonth() {
    const d = this.viewDate();
    this.viewDate.set(new Date(d.getFullYear(), d.getMonth() - 1, 1));
    this.generateCalendar();
  }

  nextMonth() {
    const d = this.viewDate();
    this.viewDate.set(new Date(d.getFullYear(), d.getMonth() + 1, 1));
    this.generateCalendar();
  }

  today() {
    this.viewDate.set(new Date());
    this.generateCalendar();
  }

  private generateCalendar() {
    const d = this.viewDate();
    const firstDay = new Date(d.getFullYear(), d.getMonth(), 1);
    const lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0);
    
    const start = new Date(firstDay);
    start.setDate(start.getDate() - start.getDay());

    const end = new Date(lastDay);
    end.setDate(end.getDate() + (6 - end.getDay()));

    const days = [];
    let current = new Date(start);

    while (current <= end) {
      const dayEvents = this.events.filter(e => 
        e.start.getDate() === current.getDate() && 
        e.start.getMonth() === current.getMonth() &&
        e.start.getFullYear() === current.getFullYear()
      );

      days.push({
        date: new Date(current),
        isCurrentMonth: current.getMonth() === d.getMonth(),
        isToday: current.toDateString() === new Date().toDateString(),
        events: dayEvents
      });
      current.setDate(current.getDate() + 1);
    }
    this.calendarDays.set(days);
  }

  getEventClasses(event: ZrdCalendarEvent): string {
    switch (event.type) {
      case 'appointment': return 'bg-primary-50 border-primary-100 text-primary-700';
      case 'surgery': return 'bg-red-50 border-red-100 text-red-700';
      case 'consultation': return 'bg-green-50 border-green-100 text-green-700';
      default: return 'bg-secondary-50 border-secondary-100 text-secondary-700';
    }
  }
}
