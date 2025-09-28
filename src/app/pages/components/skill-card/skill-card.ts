import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skill-card',
  standalone: true,
  template: `
    <div [class]="dark ? 'bg-gray-800 p-4 rounded-md text-center hover:bg-gray-700 transition-all duration-200 hover:-translate-y-0.5' : 'bg-white p-4 rounded-md text-center hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5'">
      <div class="text-2xl mb-1">{{ emoji }}</div>
      <h3 [class]="dark ? 'text-white font-medium text-sm sm:text-base' : 'text-gray-900 font-medium text-sm sm:text-base'">{{ label }}</h3>
    </div>
  `,
  styles: ``
})
export class SkillCardComponent {
  @Input() emoji = '✨';
  @Input() label = '';
  @Input() dark = false;
}
