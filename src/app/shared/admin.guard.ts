import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth';

// Add your allowed admin emails here
const ALLOWED_ADMIN_EMAILS = [
  'khaledalhoussein3@gmail.com', // Replace with your actual email
  // Add more emails if needed
];

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const user = auth.user();
  
  // Check if user is authenticated AND has allowed email
  if (user && ALLOWED_ADMIN_EMAILS.includes(user.email || '')) {
    return true;
  }
  
  // Redirect to home if not authorized
  router.navigateByUrl('/');
  return false;
};
