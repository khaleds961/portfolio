import { Injectable, inject, signal, computed } from '@angular/core';
import { Firestore, collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, where, orderBy } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL, deleteObject } from '@angular/fire/storage';
import { Project } from './models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private firestore = inject(Firestore);
  private storage = inject(Storage);
  
  // Signals for reactive state
  private projects = signal<Project[]>([]);
  private loading = signal(false);
  private error = signal<string | null>(null);
  
  // Computed signals
  publishedProjects = computed(() => 
    this.projects().filter(p => p.published)
  );
  
  draftProjects = computed(() => 
    this.projects().filter(p => !p.published)
  );
  
  // Getters
  get allProjects() { return this.projects(); }
  get isLoading() { return this.loading(); }
  get hasError() { return this.error(); }
  
  // Load all projects
  async loadProjects() {
    this.loading.set(true);
    this.error.set(null);
    
    try {
      const projectsRef = collection(this.firestore, 'projects');
      const q = query(projectsRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      
      const projects = snapshot.docs.map(doc => {
        const data = doc.data();
        console.log('Raw Firestore data:', data);
        
        const project = {
          id: doc.id,
          ...data,
          // Convert Firestore timestamps to Date objects
          createdAt: data['createdAt']?.toDate ? data['createdAt'].toDate() : data['createdAt'],
          updatedAt: data['updatedAt']?.toDate ? data['updatedAt'].toDate() : data['updatedAt']
        } as Project;
        
        console.log('Processed project:', project);
        return project;
      });
      
      this.projects.set(projects);
    } catch (err) {
      this.error.set('Failed to load projects');
      console.error('Error loading projects:', err);
    } finally {
      this.loading.set(false);
    }
  }
  
  // Add new project
  async addProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) {
    this.loading.set(true);
    this.error.set(null);
    
    try {
      const now = new Date();
      const projectData = {
        ...project,
        createdAt: now,
        updatedAt: now
      };
      
      console.log('Saving project to Firestore:', projectData);
      
      const projectsRef = collection(this.firestore, 'projects');
      const docRef = await addDoc(projectsRef, projectData);
      
      console.log('Project saved with ID:', docRef.id);
      
      // Add to local state
      const newProject: Project = {
        id: docRef.id,
        ...projectData
      };
      
      this.projects.update(projects => [newProject, ...projects]);
      
      return docRef.id;
    } catch (err) {
      this.error.set('Failed to add project');
      console.error('Error adding project:', err);
      throw err;
    } finally {
      this.loading.set(false);
    }
  }
  
  // Update project
  async updateProject(id: string, updates: Partial<Project>) {
    this.loading.set(true);
    this.error.set(null);
    
    try {
      const projectRef = doc(this.firestore, 'projects', id);
      const updateData = {
        ...updates,
        updatedAt: new Date()
      };
      
      await updateDoc(projectRef, updateData);
      
      // Update local state
      this.projects.update(projects => 
        projects.map(p => p.id === id ? { ...p, ...updateData } : p)
      );
    } catch (err) {
      this.error.set('Failed to update project');
      console.error('Error updating project:', err);
      throw err;
    } finally {
      this.loading.set(false);
    }
  }
  
  // Delete project
  async deleteProject(id: string) {
    this.loading.set(true);
    this.error.set(null);
    
    try {
      const project = this.projects().find(p => p.id === id);
      
      // Delete images from storage first
      if (project?.images && project.images.length > 0) {
        await this.deleteProjectImages(project.images);
      }
      
      const projectRef = doc(this.firestore, 'projects', id);
      await deleteDoc(projectRef);
      
      // Remove from local state
      this.projects.update(projects => 
        projects.filter(p => p.id !== id)
      );
    } catch (err) {
      this.error.set('Failed to delete project');
      console.error('Error deleting project:', err);
      throw err;
    } finally {
      this.loading.set(false);
    }
  }
  
  // Upload images to Firebase Storage
  async uploadImages(files: File[]): Promise<string[]> {
    console.log('Starting upload of', files.length, 'files');
    const uploadPromises = files.map(async (file, index) => {
      const timestamp = Date.now();
      const fileName = `${timestamp}_${file.name}`;
      const storageRef = ref(this.storage, `projects/${fileName}`);
      
      console.log(`Uploading file ${index + 1}:`, fileName);
      
      try {
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log(`Upload successful for ${fileName}:`, downloadURL);
        console.log(`URL starts with http:`, downloadURL.startsWith('http'));
        return downloadURL;
      } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
      }
    });
    
    const results = await Promise.all(uploadPromises);
    console.log('All uploads completed:', results);
    return results;
  }
  
  // Delete images from Firebase Storage
  async deleteProjectImages(imageUrls: string[]) {
    const deletePromises = imageUrls.map(async (url) => {
      try {
        const imageRef = ref(this.storage, url);
        await deleteObject(imageRef);
      } catch (error) {
        console.error('Error deleting image:', error);
        // Don't throw here, just log the error
      }
    });
    
    await Promise.all(deletePromises);
  }
}
