import { Component, inject, OnInit } from '@angular/core';
import { ThemeService } from '../../shared/theme';
import { ProjectsService } from '../../shared/projects.service';
import { SkillCardComponent } from '../components/skill-card/skill-card';

@Component({
  selector: 'app-home',
  imports: [SkillCardComponent],
  template: `
    <div [class]="isDark() ? 'min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black' : 'min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100'">
      <!-- Hero Section -->
      <section class="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <div class="max-w-4xl mx-auto text-center">
          <h1 [class]="isDark() ? 'text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-6' : 'text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 mb-4 sm:mb-6'">
            Hi, I'm <span class="text-blue-600">Khaled</span>
          </h1>
          <p [class]="isDark() ? 'text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 sm:mb-8' : 'text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 sm:mb-8'">
            Full Stack Developer
          </p>
          <p [class]="isDark() ? 'text-base sm:text-lg text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto px-4' : 'text-base sm:text-lg text-gray-500 mb-8 sm:mb-12 max-w-2xl mx-auto px-4'">
            I create beautiful, functional web applications with modern technologies. 
            Passionate about clean code and user experience.
          </p>
          <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <a href="#projects" class="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition-colors text-center">
              View My Work
            </a>
            <a href="#contact" [class]="isDark() ? 'border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition-colors text-center' : 'border border-gray-400 hover:border-gray-500 text-gray-600 hover:text-gray-900 px-6 sm:px-8 py-3 rounded-lg font-semibold transition-colors text-center'">
              Get In Touch
            </a>
          </div>
        </div>
      </section>

      <!-- Skills Section -->
      <section class="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <div class="max-w-6xl mx-auto">
          <h2 [class]="isDark() ? 'text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-8 sm:mb-12' : 'text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8 sm:mb-12'">Skills & Technologies</h2>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            <app-skill-card [dark]="isDark()" emoji="🅰️" label="Angular" />
            <app-skill-card [dark]="isDark()" emoji="🟢" label="Node.js" />
            <app-skill-card [dark]="isDark()" emoji="🔥" label="Firebase" />
            <app-skill-card [dark]="isDark()" emoji="🟡" label="JavaScript" />
            <app-skill-card [dark]="isDark()" emoji="⚛️" label="React.js" />
            <app-skill-card [dark]="isDark()" emoji="🧱" label="Laravel" />
            <app-skill-card [dark]="isDark()" emoji="🐘" label="PHP" />
            <app-skill-card [dark]="isDark()" emoji="🐬" label="MySQL" />
            <app-skill-card [dark]="isDark()" emoji="🔗" label="REST APIs" />
            <app-skill-card [dark]="isDark()" emoji="🧩" label="jQuery" />
            <app-skill-card [dark]="isDark()" emoji="⚡️" label="AJAX" />
          </div>
        </div>
      </section>

      <!-- Projects Preview -->
      <section id="projects" class="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <div class="max-w-6xl mx-auto">
          <h2 [class]="isDark() ? 'text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-8 sm:mb-12' : 'text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8 sm:mb-12'">Featured Projects</h2>
          @if (publishedProjects.length === 0) {
            <div [class]="isDark() ? 'text-center text-gray-400' : 'text-center text-gray-500'">
              <p class="text-lg mb-4">No projects published yet.</p>
              <p class="text-sm">Check back soon for amazing projects!</p>
            </div>
          } @else {
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              @for (project of publishedProjects; track project.id) {
                <div [class]="isDark() ? 'bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors' : 'bg-white rounded-lg overflow-hidden hover:bg-gray-50 transition-colors shadow-md'">
                  @if (project.images && project.images.length > 0) {
                    <div class="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden">
                      <img [src]="project.images[0]" [alt]="project.title" class="w-full h-full object-cover">
                    </div>
                  } @else {
                    <div class="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <div [class]="isDark() ? 'text-white text-4xl' : 'text-white text-4xl'">📁</div>
                    </div>
                  }
                  <div class="p-6">
                    <h3 [class]="isDark() ? 'text-xl font-semibold text-white mb-2' : 'text-xl font-semibold text-gray-900 mb-2'">{{ project.title }}</h3>
                    <p [class]="isDark() ? 'text-gray-400 mb-4' : 'text-gray-500 mb-4'">{{ project.description }}</p>
                    <div class="flex flex-wrap gap-2 mb-4">
                      @for (tag of project.tags; track tag) {
                        <span class="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">{{ tag }}</span>
                      }
                    </div>
                    <div class="flex gap-4">
                      @if (project.links.demo) {
                        <a [href]="project.links.demo" target="_blank" [class]="isDark() ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'">Demo</a>
                      }
                      @if (project.links.repo) {
                        <a [href]="project.links.repo" target="_blank" [class]="isDark() ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-500'">GitHub</a>
                      }
                      @if (project.links.live) {
                        <a [href]="project.links.live" target="_blank" [class]="isDark() ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-500'">Live</a>
                      }
                    </div>
                  </div>
                </div>
              }
            </div>
          }
        </div>
      </section>

      <!-- Contact Section -->
      <section id="contact" class="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <div class="max-w-4xl mx-auto text-center">
          <h2 [class]="isDark() ? 'text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8' : 'text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8'">Let's Work Together</h2>
          <p [class]="isDark() ? 'text-base sm:text-lg text-gray-400 mb-8 sm:mb-12 px-4' : 'text-base sm:text-lg text-gray-500 mb-8 sm:mb-12 px-4'"> 
            I'm always interested in new opportunities and exciting projects.
          </p>
          <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <a href="mailto:khaled@example.com" class="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition-colors text-center">
              Send Email
            </a>
            <a href="https://github.com" target="_blank" [class]="isDark() ? 'border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition-colors text-center' : 'border border-gray-400 hover:border-gray-500 text-gray-600 hover:text-gray-900 px-6 sm:px-8 py-3 rounded-lg font-semibold transition-colors text-center'">
              View GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: ``
})
export class HomeComponent implements OnInit {
  // Inject services
  themeService = inject(ThemeService);
  projectsService = inject(ProjectsService);
  
  ngOnInit() {
    // Load published projects when component initializes
    this.projectsService.loadProjects();
  }
  
  // Helper method for template
  isDark() {
    return this.themeService.isDark();
  }
  
  // Get published projects for display
  get publishedProjects() {
    console.log(this.projectsService.publishedProjects());
    return this.projectsService.publishedProjects();
  }
}
