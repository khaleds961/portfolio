import { Component, inject, effect } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { ThemeService } from '../theme';
import { AuthService } from '../auth';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav [class]="isDark() ? 'bg-gray-900 shadow-lg border-b border-gray-800' : 'bg-white shadow-sm border-b border-gray-200'">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <a routerLink="/" [class]="isDark() ? 'text-lg sm:text-xl font-bold text-white' : 'text-lg sm:text-xl font-bold text-gray-900'">Portfolio</a>
          </div>
          
          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-2 lg:space-x-4">
            <a routerLink="/" 
               routerLinkActive="text-blue-600" 
               [routerLinkActiveOptions]="{exact: true}"
               [class]="isDark() ? 'text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors' : 'text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors'">
              Home
            </a>
            @if (auth.isAuthed()) {
              <a routerLink="/admin" 
                 routerLinkActive="text-blue-600"
                 [class]="isDark() ? 'text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors' : 'text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors'">
                Admin
              </a>
            }
            <button 
              (click)="themeService.toggleTheme()"
              [class]="isDark() ? 'text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors' : 'text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors'">
              {{ themeService.toggleText() }}
            </button>
            @if (auth.isAuthed()) {
              <button (click)="auth.signOut()" class="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Sign out</button>
            } @else {
              <button (click)="auth.signInWithGoogle()" class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Sign in</button>
            }
          </div>
          
          <!-- Mobile menu button -->
          <div class="md:hidden">
            <button 
              (click)="toggleMobileMenu()"
              [class]="isDark() ? 'text-gray-300 hover:text-white p-2 rounded-md' : 'text-gray-600 hover:text-gray-900 p-2 rounded-md'">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Mobile Navigation -->
        <div [class]="mobileMenuOpen ? 'md:hidden' : 'hidden'">
          <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t" [class]="isDark() ? 'border-gray-700' : 'border-gray-200'">
            <a routerLink="/" 
               routerLinkActive="text-blue-600" 
               [routerLinkActiveOptions]="{exact: true}"
               [class]="isDark() ? 'text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium' : 'text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium'">
              Home
            </a>
            @if (auth.isAuthed()) {
              <a routerLink="/admin" 
                 routerLinkActive="text-blue-600"
                 [class]="isDark() ? 'text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium' : 'text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium'">
                Admin
              </a>
            }
            <button 
              (click)="themeService.toggleTheme()"
              [class]="isDark() ? 'text-gray-300 hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium' : 'text-gray-600 hover:text-gray-900 block w-full text-left px-3 py-2 rounded-md text-base font-medium'">
              {{ themeService.toggleText() }}
            </button>
            @if (auth.isAuthed()) {
              <button (click)="auth.signOut()" class="bg-red-600 hover:bg-red-700 text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium">Sign out</button>
            } @else {
              <button (click)="auth.signInWithGoogle()" class="bg-blue-600 hover:bg-blue-700 text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium">Sign in</button>
            }
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: ``
})
export class NavComponent {
  // Inject services
  themeService = inject(ThemeService);
  auth = inject(AuthService);
  router = inject(Router);
  
  // Mobile menu state
  mobileMenuOpen = false;
  
  constructor() {
    // Watch for auth state changes and redirect if signed out while on admin
    effect(() => {
      const isAuthed = this.auth.isAuthed();
      const currentUrl = this.router.url;
      
      // If user signs out while on admin page, redirect to home
      if (!isAuthed && currentUrl.startsWith('/admin')) {
        this.router.navigateByUrl('/');
      }
    });
  }
  
  // Toggle mobile menu
  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
  
  // Helper method for template
  isDark() {
    return this.themeService.isDark();
  }
}
