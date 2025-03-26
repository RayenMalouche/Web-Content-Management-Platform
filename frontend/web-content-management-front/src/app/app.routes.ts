import { Routes } from '@angular/router';
import { PageManagementComponent } from './page-management/page-management.component';
import {WebsiteSetupComponentComponent} from './website-setup-component/website-setup-component.component';
import {HomeComponent} from './home/home.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {ElementSidebarComponent} from './element-sidebar/element-sidebar.component';
import {PropertiesSidebarComponent} from './properties-sidebar/properties-sidebar.component';
import {ContentAreaComponent} from './content-area/content-area.component';
import {MainComponent} from './main/main.component';

export const routes: Routes = [
  { path: 'page-management', component: PageManagementComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path:'website-setup', component: WebsiteSetupComponentComponent},
  {path:'home',component:HomeComponent},
  {path:'sidebar',component:SidebarComponent},
  {path:'sidebarelemnt',component:ElementSidebarComponent},
  {path:'sidebarprop',component:PropertiesSidebarComponent},
  {path:'main',component:MainComponent}
];
