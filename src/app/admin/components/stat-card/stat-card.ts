import { Component, Input } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [NgStyle],
  template: `
    <div [class]="dark ? 'bg-gray-800 p-6 rounded-lg' : 'bg-white p-6 rounded-lg shadow-md'">
      <div class="flex items-center">
        <div class="p-3 rounded-lg" [ngStyle]="{ backgroundColor: color }">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="icon"></path>
          </svg>
        </div>
        <div class="ml-4">
          <p [class]="dark ? 'text-gray-400 text-sm' : 'text-gray-600 text-sm'">{{ title }}</p>
          <p [class]="dark ? 'text-2xl font-bold text-white' : 'text-2xl font-bold text-gray-900'">{{ value }}</p>
        </div>
      </div>
    </div>
  `,
  styles: ``
})
export class StatCardComponent {
  @Input() dark = false;
  @Input() title = '';
  @Input() value: number | string = '';
  @Input() color = '#2563eb'; // default blue-600
  @Input() icon = '';
}
