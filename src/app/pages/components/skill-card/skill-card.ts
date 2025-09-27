import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skill-card',
  standalone: true,
  template: `
    <div [class]="dark ? 'bg-gray-800 p-6 rounded-lg text-center hover:bg-gray-700 transition-colors' : 'bg-white p-6 rounded-lg text-center hover:bg-gray-50 transition-colors shadow-md'">
      <div class="text-3xl mb-2">{{ emoji }}</div>
      <h3 [class]="dark ? 'text-white font-semibold' : 'text-gray-900 font-semibold'">{{ label }}</h3>
    </div>
  `,
  styles: ``
})
export class SkillCardComponent {
  @Input() emoji = '✨';
  @Input() label = '';
  @Input() dark = false;
}
