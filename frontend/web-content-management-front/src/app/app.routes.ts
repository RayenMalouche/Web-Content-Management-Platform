import { Routes } from '@angular/router';
import {WebsiteSetupComponentComponent} from './components/website-setup-component/website-setup-component.component';
import {HomeComponent} from './components/home/home.component';
import {MainComponent} from './components/main/main.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path:'website-setup', component: WebsiteSetupComponentComponent},
  {path:'home',component:HomeComponent},
  {path:'main',component:MainComponent},
  { path: 'main/:id', component: MainComponent }
];
