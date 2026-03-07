import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ZrdSkeletonShape = 'text' | 'circle' | 'rectangle' | 'card';

@Component({
  selector: 'zrd-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="classes" [ngStyle]="style"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZrdSkeletonComponent {
  @Input() shape: ZrdSkeletonShape = 'text';
  @Input() width?: string;
  @Input() height?: string;

  get classes(): string {
    const base = 'bg-secondary-100 animate-pulse';
    
    const shapes: Record<ZrdSkeletonShape, string> = {
      text: 'h-4 w-full rounded',
      circle: 'rounded-full',
      rectangle: 'rounded-lg',
      card: 'h-48 w-full rounded-xl'
    };

    return `${base} ${shapes[this.shape]}`;
  }

  get style(): any {
    return {
      width: this.width,
      height: this.height
    };
  }
}
