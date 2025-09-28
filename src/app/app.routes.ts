import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { DashboardComponent } from './admin/dashboard/dashboard';
import { AddProjectComponent } from './admin/add-project/add-project';
import { EditProjectComponent } from './admin/edit-project/edit-project';
import { adminGuard } from './shared/admin.guard';
import { SignInComponent } from './pages/signin/signin';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'admin', component: DashboardComponent, canActivate: [adminGuard] },
  { path: 'admin/add', component: AddProjectComponent, canActivate: [adminGuard] },
  { path: 'admin/edit/:id', component: EditProjectComponent, canActivate: [adminGuard] },
];
