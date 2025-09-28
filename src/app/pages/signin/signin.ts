import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth';

@Component({
  selector: 'app-signin',
  standalone: true,
  template: `
    <div class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <p class="text-lg text-gray-600">Signing you in...</p>
      </div>
    </div>
  `,
  styles: ``
})
export class SignInComponent implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  async ngOnInit(): Promise<void> {
    try {
      if (this.auth.isAuthed()) {
        await this.router.navigateByUrl('/');
        return;
      }
      await this.auth.signInWithGoogle();
    } catch (e) {
      console.error('Sign-in failed:', e);
    } finally {
      await this.router.navigateByUrl('/');
    }
  }
}


