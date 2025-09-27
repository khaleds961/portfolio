import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ThemeService } from '../../shared/theme';
import { ProjectsService } from '../../shared/projects.service';
import { Project } from '../../shared/models/project';

@Component({
  selector: 'app-edit-project',
  imports: [FormsModule],
  template: `
    <div [class]="isDark() ? 'min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black' : 'min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100'">
      <div class="container mx-auto px-6 py-8">
        <div class="max-w-2xl mx-auto">
          <!-- Header -->
          <div class="mb-8">
            <h1 [class]="isDark() ? 'text-3xl font-bold text-white mb-2' : 'text-3xl font-bold text-gray-900 mb-2'">Edit Project</h1>
            <p [class]="isDark() ? 'text-gray-400' : 'text-gray-600'">Update your project details</p>
          </div>

          <!-- Form -->
          <form [class]="isDark() ? 'bg-gray-800 p-6 rounded-lg' : 'bg-white p-6 rounded-lg shadow-md'" (ngSubmit)="onSubmit()">
            <!-- Title -->
            <div class="mb-6">
              <label [class]="isDark() ? 'block text-sm font-medium text-white mb-2' : 'block text-sm font-medium text-gray-700 mb-2'">Project Title</label>
              <input 
                type="text" 
                [(ngModel)]="project.title" 
                name="title"
                required
                [class]="isDark() ? 'w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500' : 'w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500'"
                placeholder="Enter project title"
              >
            </div>

            <!-- Description -->
            <div class="mb-6">
              <label [class]="isDark() ? 'block text-sm font-medium text-white mb-2' : 'block text-sm font-medium text-gray-700 mb-2'">Description</label>
              <textarea 
                [(ngModel)]="project.description" 
                name="description"
                rows="4"
                required
                [class]="isDark() ? 'w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500' : 'w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500'"
                placeholder="Describe your project..."
              ></textarea>
            </div>

            <!-- Tags -->
            <div class="mb-6">
              <label [class]="isDark() ? 'block text-sm font-medium text-white mb-2' : 'block text-sm font-medium text-gray-700 mb-2'">Tags (comma-separated)</label>
              <input 
                type="text" 
                [(ngModel)]="tagsInput" 
                name="tags"
                [class]="isDark() ? 'w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500' : 'w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500'"
                placeholder="React, Angular, Node.js, etc."
              >
            </div>

            <!-- Links -->
            <div class="mb-6">
              <h3 [class]="isDark() ? 'text-lg font-medium text-white mb-4' : 'text-lg font-medium text-gray-900 mb-4'">Project Links</h3>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label [class]="isDark() ? 'block text-sm font-medium text-white mb-2' : 'block text-sm font-medium text-gray-700 mb-2'">Demo URL</label>
                  <input 
                    type="url" 
                    [(ngModel)]="project.links.demo" 
                    name="demo"
                    [class]="isDark() ? 'w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500' : 'w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500'"
                    placeholder="https://demo.example.com"
                  >
                </div>
                
                <div>
                  <label [class]="isDark() ? 'block text-sm font-medium text-white mb-2' : 'block text-sm font-medium text-gray-700 mb-2'">Repository URL</label>
                  <input 
                    type="url" 
                    [(ngModel)]="project.links.repo" 
                    name="repo"
                    [class]="isDark() ? 'w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500' : 'w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500'"
                    placeholder="https://github.com/user/repo"
                  >
                </div>
                
                <div>
                  <label [class]="isDark() ? 'block text-sm font-medium text-white mb-2' : 'block text-sm font-medium text-gray-700 mb-2'">Live URL</label>
                  <input 
                    type="url" 
                    [(ngModel)]="project.links.live" 
                    name="live"
                    [class]="isDark() ? 'w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500' : 'w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500'"
                    placeholder="https://live.example.com"
                  >
                </div>
              </div>
            </div>

            <!-- Images -->
            <div class="mb-6">
              <label [class]="isDark() ? 'block text-sm font-medium text-white mb-2' : 'block text-sm font-medium text-gray-700 mb-2'">Project Images</label>
              <input 
                type="file" 
                multiple
                accept="image/*"
                (change)="onImageChange($event)"
                [class]="isDark() ? 'w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700' : 'w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700'"
              >
              <p [class]="isDark() ? 'text-sm text-gray-400 mt-1' : 'text-sm text-gray-500 mt-1'">Select multiple images for your project</p>
              
              <!-- Existing Images -->
              @if (project.images && project.images.length > 0 && imagePreviews.length === 0) {
                <div class="mt-4">
                  <h4 [class]="isDark() ? 'text-sm font-medium text-white mb-2' : 'text-sm font-medium text-gray-700 mb-2'">Current Images:</h4>
                  <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                    @for (imageUrl of project.images; track imageUrl) {
                      <div class="relative">
                        <img [src]="imageUrl" [alt]="'Project image'" class="w-full h-32 object-cover rounded-lg border" [class]="isDark() ? 'border-gray-600' : 'border-gray-300'">
                        <p [class]="isDark() ? 'text-xs text-gray-400 mt-1 truncate' : 'text-xs text-gray-500 mt-1 truncate'">Current Image</p>
                      </div>
                    }
                  </div>
                  <p [class]="isDark() ? 'text-xs text-gray-400 mt-2' : 'text-xs text-gray-500 mt-2'">Select new images above to replace current ones</p>
                </div>
              }
              
              <!-- New Image Previews -->
              @if (imagePreviews.length > 0) {
                <div class="mt-4">
                  <h4 [class]="isDark() ? 'text-sm font-medium text-white mb-2' : 'text-sm font-medium text-gray-700 mb-2'">New Images:</h4>
                  <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                    @for (preview of imagePreviews; track preview.name) {
                      <div class="relative">
                        <img [src]="preview.url" [alt]="preview.name" class="w-full h-32 object-cover rounded-lg border" [class]="isDark() ? 'border-gray-600' : 'border-gray-300'">
                        <p [class]="isDark() ? 'text-xs text-gray-400 mt-1 truncate' : 'text-xs text-gray-500 mt-1 truncate'">{{ preview.name }}</p>
                      </div>
                    }
                  </div>
                </div>
              }
            </div>

            <!-- Published toggle -->
            <div class="mb-6">
              <label class="flex items-center">
                <input 
                  type="checkbox" 
                  [(ngModel)]="project.published" 
                  name="published"
                  class="mr-3"
                >
                <span [class]="isDark() ? 'text-white' : 'text-gray-900'">Publish this project (make it visible on the public site)</span>
              </label>
            </div>

            <!-- Error message -->
            @if (error()) {
              <div class="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                {{ error() }}
              </div>
            }

            <!-- Buttons -->
            <div class="flex gap-4">
              <button 
                type="submit" 
                [disabled]="projectsService.isLoading"
                class="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                @if (projectsService.isLoading) {
                  Updating...
                } @else {
                  Update Project
                }
              </button>
              
              <button 
                type="button" 
                (click)="goBack()"
                [class]="isDark() ? 'bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors' : 'bg-gray-200 hover:bg-gray-300 text-gray-900 px-6 py-2 rounded-lg font-semibold transition-colors'"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: ``
})
export class EditProjectComponent implements OnInit {
  // Inject services
  themeService = inject(ThemeService);
  projectsService = inject(ProjectsService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  
  // Form state
  project: Project = {
    id: '',
    title: '',
    description: '',
    tags: [],
    links: {},
    images: [],
    published: false,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  tagsInput = '';
  error = signal<string | null>(null);
  imagePreviews: { name: string; url: string; file: File }[] = [];
  
  ngOnInit() {
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      const project = this.projectsService.allProjects.find(p => p.id === projectId);
      if (project) {
        this.project = { ...project };
        this.tagsInput = project.tags.join(', ');
        
        // Show existing images if any
        if (project.images && project.images.length > 0) {
          console.log('Existing project images:', project.images);
        }
      } else {
        this.router.navigateByUrl('/admin');
      }
    }
  }
  
  // Helper method for template
  isDark() {
    return this.themeService.isDark();
  }
  
  async onSubmit() {
    this.error.set(null);
    
    // Convert tags string to array
    this.project.tags = this.tagsInput
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
    
    try {
      // Upload images if any were selected
      if (this.imagePreviews.length > 0) {
        const files = this.getSelectedFiles();
        console.log('Files to upload:', files);
        if (files.length > 0) {
          const imageUrls = await this.projectsService.uploadImages(files);
          console.log('Uploaded image URLs:', imageUrls);
          
          // Make sure we're storing URLs, not filenames
          this.project.images = imageUrls.filter(url => url.startsWith('http'));
          console.log('Final images array:', this.project.images);
        }
      }
      
      console.log('Project data before updating:', this.project);
      await this.projectsService.updateProject(this.project.id!, this.project);
      this.router.navigateByUrl('/admin');
    } catch (err) {
      console.error('Error updating project:', err);
      this.error.set('Failed to update project. Please try again.');
    }
  }
  
  onImageChange(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      // Store the actual File objects and create preview URLs
      this.imagePreviews = Array.from(files).map((file: any) => ({
        name: file.name,
        url: URL.createObjectURL(file),
        file: file
      }));
      
      // Clear any previous images array since we're uploading new ones
      this.project.images = [];
    }
  }
  
  getSelectedFiles(): File[] {
    return this.imagePreviews.map(preview => preview.file);
  }
  
  goBack() {
    this.router.navigateByUrl('/admin');
  }
}
