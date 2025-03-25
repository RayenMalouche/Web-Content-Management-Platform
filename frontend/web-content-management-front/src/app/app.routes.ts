import { Routes } from '@angular/router';
import { PageManagementComponent } from './page-management/page-management.component';
import {WebsiteSetupComponentComponent} from './website-setup-component/website-setup-component.component';
import {HomeComponent} from './home/home.component';

export const routes: Routes = [
  { path: 'page-management', component: PageManagementComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path:'website-setup', component: WebsiteSetupComponentComponent},
  {path:'home',component:HomeComponent}
];
