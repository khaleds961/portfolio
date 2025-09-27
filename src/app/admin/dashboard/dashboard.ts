import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../shared/theme';
import { ProjectsService } from '../../shared/projects.service';
import { StatCardComponent } from '../components/stat-card/stat-card';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, StatCardComponent],
  template: `
    <div [class]="isDark() ? 'min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black' : 'min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100'">
      <!-- Admin Header -->
      <div [class]="isDark() ? 'bg-gray-800 border-b border-gray-700' : 'bg-white border-b border-gray-200'">
        <div class="container mx-auto px-6 py-8">
          <div class="flex items-center justify-between">
            <div>
              <h1 [class]="isDark() ? 'text-3xl font-bold text-white' : 'text-3xl font-bold text-gray-900'">Admin Dashboard</h1>
              <p [class]="isDark() ? 'text-gray-400 mt-2' : 'text-gray-600 mt-2'">Manage your portfolio projects</p>
            </div>
            <div class="flex gap-4">
              <a routerLink="/admin/add" [class]="isDark() ? 'bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors' : 'bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors'">
                + Add Project
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <app-stat-card [dark]="isDark()" title="Total Projects" [value]="allProjects.length" color="#2563eb" icon="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          <app-stat-card [dark]="isDark()" title="Published" [value]="publishedProjects.length" color="#16a34a" icon="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          <app-stat-card [dark]="isDark()" title="Drafts" [value]="draftProjects.length" color="#ca8a04" icon="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </div>

        <!-- Projects Table -->
        <div [class]="isDark() ? 'bg-gray-800 rounded-lg overflow-hidden' : 'bg-white rounded-lg shadow-md overflow-hidden'">
          <div [class]="isDark() ? 'px-6 py-4 border-b border-gray-700' : 'px-6 py-4 border-b border-gray-200'">
            <h2 [class]="isDark() ? 'text-xl font-semibold text-white' : 'text-xl font-semibold text-gray-900'">Recent Projects</h2>
          </div>
          
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead [class]="isDark() ? 'bg-gray-700' : 'bg-gray-50'">
                <tr>
                  <th [class]="isDark() ? 'px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider' : 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'">Project</th>
                  <th [class]="isDark() ? 'px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider' : 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'">Status</th>
                  <th [class]="isDark() ? 'px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider' : 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'">Created</th>
                  <th [class]="isDark() ? 'px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider' : 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y" [class]="isDark() ? 'divide-gray-700' : 'divide-gray-200'">
                @if (isLoading) {
                  <tr>
                    <td colspan="4" [class]="isDark() ? 'px-6 py-8 text-center text-gray-400' : 'px-6 py-8 text-center text-gray-500'">
                      Loading projects...
                    </td>
                  </tr>
                } @else if (hasError) {
                  <tr>
                    <td colspan="4" [class]="isDark() ? 'px-6 py-8 text-center text-red-400' : 'px-6 py-8 text-center text-red-500'">
                      Error loading projects
                    </td>
                  </tr>
                } @else if (allProjects.length === 0) {
                  <tr>
                    <td colspan="4" [class]="isDark() ? 'px-6 py-8 text-center text-gray-400' : 'px-6 py-8 text-center text-gray-500'">
                      No projects yet. <a routerLink="/admin/add" class="text-blue-600 hover:text-blue-500">Create your first project</a>
                    </td>
                  </tr>
                } @else {
                  @for (project of allProjects; track project.id) {
                    <tr>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                          @if (project.images && project.images.length > 0) {
                            <img [src]="project.images[0]" [alt]="project.title" class="h-10 w-10 rounded-lg object-cover">
                          } @else {
                            <div class="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                              <span class="text-white text-xs">📁</span>
                            </div>
                          }
                          <div class="ml-4">
                            <div [class]="isDark() ? 'text-sm font-medium text-white' : 'text-sm font-medium text-gray-900'">{{ project.title }}</div>
                            <div [class]="isDark() ? 'text-sm text-gray-400' : 'text-sm text-gray-500'">{{ project.tags.join(', ') }}</div>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        @if (project.published) {
                          <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Published</span>
                        } @else {
                          <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Draft</span>
                        }
                      </td>
                      <td [class]="isDark() ? 'px-6 py-4 whitespace-nowrap text-sm text-gray-400' : 'px-6 py-4 whitespace-nowrap text-sm text-gray-500'">
                        {{ formatDate(project.createdAt) || 'Unknown' }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <a [routerLink]="['/admin/edit', project.id]" [class]="isDark() ? 'text-blue-400 hover:text-blue-300 mr-3' : 'text-blue-600 hover:text-blue-500 mr-3'">Edit</a>
                        <button (click)="deleteProject(project.id!)" [class]="isDark() ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-500'">Delete</button>
                      </td>
                    </tr>
                  }
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``
})
export class DashboardComponent implements OnInit {
  // Inject services
  themeService = inject(ThemeService);
  projectsService = inject(ProjectsService);
  
  ngOnInit() {
    // Load projects when component initializes
    this.projectsService.loadProjects();
  }
  
  // Helper method for template
  isDark() {
    return this.themeService.isDark();
  }
  
  // Get computed values
  get allProjects() { return this.projectsService.allProjects; }
  get publishedProjects() { return this.projectsService.publishedProjects(); }
  get draftProjects() { return this.projectsService.draftProjects(); }
  get isLoading() { return this.projectsService.isLoading; }
  get hasError() { return this.projectsService.hasError; }
  
  // Format date for display
  formatDate(date: any) {
    try {
      // Handle Firestore timestamps and regular dates
      let dateObj: Date;
      
      if (date && typeof date.toDate === 'function') {
        // Firestore timestamp
        dateObj = date.toDate();
      } else if (date instanceof Date) {
        // Already a Date object
        dateObj = date;
      } else if (date && typeof date === 'string') {
        // String date
        dateObj = new Date(date);
      } else if (date && typeof date === 'number') {
        // Unix timestamp
        dateObj = new Date(date);
      } else {
        // Fallback
        dateObj = new Date();
      }
      
      // Check if date is valid
      if (isNaN(dateObj.getTime())) {
        return 'Invalid Date';
      }
      
      return dateObj.toLocaleDateString();
    } catch (error) {
      console.error('Error formatting date:', error, date);
      return 'Invalid Date';
    }
  }
  
  // Delete project
  async deleteProject(id: string) {
    if (confirm('Are you sure you want to delete this project?')) {
      await this.projectsService.deleteProject(id);
    }
  }
}
