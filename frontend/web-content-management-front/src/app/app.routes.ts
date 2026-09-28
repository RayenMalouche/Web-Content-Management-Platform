import { Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {MainComponent} from './components/main/main.component';
import {WebsiteSetupComponent} from './components/website-setup/website-setup.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';

// The one route table. main.ts used to bootstrap with its own copy of the
// routes, which silently replaced this file; the two lists are merged here.
export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent) },
  { path: 'signup', redirectTo: 'register' },
  { path: 'website-setup', component: WebsiteSetupComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard/:id', component: DashboardComponent },
  { path: 'websites', loadComponent: () => import('./components/Views/website-view/website-view.component').then(m => m.WebsitesViewComponent) },
  { path: 'projects', loadComponent: () => import('./components/Views/project-view/project-view.component').then(m => m.ProjectsViewComponent) },
  { path: 'project/:id', loadComponent: () => import('./components/project-details/project-details.component').then(m => m.ProjectDetailsComponent) },
  { path: 'users', loadComponent: () => import('./components/Views/users-view/users-view.component').then(m => m.UsersViewComponent) },
  { path: 'databases', loadComponent: () => import('./components/database-editor/database-editor.component').then(m => m.DatabaseEditorComponent) },
  { path: 'database-editor/:id', loadComponent: () => import('./components/database-editor/database-editor.component').then(m => m.DatabaseEditorComponent) },
  { path: 'pages-list/:id', loadComponent: () => import('./components/page-list/page-list.component').then(m => m.PageListComponent) },
  { path: 'main', component: MainComponent },
  { path: 'main/:id', component: MainComponent },
  { path: '**', redirectTo: '/home' },
];
