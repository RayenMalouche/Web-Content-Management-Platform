import { Routes } from '@angular/router';
import {WebsiteSetupComponentComponent} from './website-setup-component/website-setup-component.component';
import {HomeComponent} from './home/home.component';
import {MainComponent} from './main/main.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path:'website-setup', component: WebsiteSetupComponentComponent},
  {path:'home',component:HomeComponent},
  {path:'main',component:MainComponent},
  { path: 'main/:id', component: MainComponent }
];
