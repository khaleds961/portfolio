import { Injectable, computed, signal, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, User } from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);

  // Reactive user state
  user = signal<User | null>(null);
  isAuthed = computed(() => !!this.user());

  constructor() {
    onAuthStateChanged(this.auth, (u) => this.user.set(u));
  }

  async signInWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(this.auth, provider);
  }

  async signOut(): Promise<void> {
    await signOut(this.auth);
  }
}
