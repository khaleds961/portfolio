import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // Signal for current theme
  private theme = signal<'light' | 'dark'>('dark');
  
  // Computed signal for theme classes
  themeClasses = computed(() => {
    return this.theme() === 'dark' 
      ? 'bg-gray-900 text-white' 
      : 'bg-gray-50 text-gray-900';
  });
  
  // Computed signal for toggle button text
  toggleText = computed(() => {
    return this.theme() === 'dark' ? '☀️ Light' : '🌙 Dark';
  });
  
  // Computed signal for isDark
  isDark = computed(() => this.theme() === 'dark');
  
  // Method to toggle theme
  toggleTheme() {
    this.theme.set(this.theme() === 'light' ? 'dark' : 'light');
  }
  
  // Getter for current theme
  get currentTheme() {
    return this.theme();
  }
  
  // Public method to get theme for templates
  getTheme() {
    return this.theme();
  }
}
