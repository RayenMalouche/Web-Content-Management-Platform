// src/app/dashboard/dashboard.component.ts
import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { ProfileSectionComponent } from '../profile-section/profile-section.component';
import { WebsiteCardComponent } from '../cards/website-card/website-card.component';
import { DatabaseCardComponent } from '../cards/database-card/database-card.component';
import { AddNewCardComponent } from '../cards/add-new-card/add-new-card.component';
import { CreateWebsiteModalComponent } from '../modals/create-website-modal/create-website-modal.component';
import { EditProfileModalComponent } from '../modals/edit-profile-modal/edit-profile-modal.component';

import { Observable } from 'rxjs';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { DashboardService } from '../../services/dashboard-service.service';
import { WebsiteService } from '../../services/website-service.service';
import { Website } from '../../models/Website.interface';
import {CreateDatabaseModalComponent} from '../modals/create-database-modal/create-database-modal.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    SidebarComponent,
    ProfileSectionComponent,
    WebsiteCardComponent,
    DatabaseCardComponent,
    AddNewCardComponent,
    CreateWebsiteModalComponent,
    EditProfileModalComponent,
    CreateDatabaseModalComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {

  private readonly dashboardService = inject(DashboardService);
  private readonly websiteService = inject(WebsiteService);


  faPlus = faPlus;


  @ViewChild('createWebsiteModal') createWebsiteModal!: CreateWebsiteModalComponent;
  @ViewChild('editProfileModal') editProfileModal!: EditProfileModalComponent;
  @ViewChild('createDatabaseModal') createDatabaseModal!: CreateWebsiteModalComponent;


  websites$: Observable<Website[]> = this.websiteService.getWebsites();
  databases$: Observable<any[]> = this.dashboardService.databases$;


  openCreateWebsiteModal() {
    this.createWebsiteModal.show();
  }

  onCreateWebsiteModalClose() {
    console.log('Create website modal closed');
  }

  onWebsiteCreate(websiteData: Website) {
    this.websiteService.createWebsite(websiteData).subscribe({
      next: () => {
        alert('Website created successfully!');
        this.websites$ = this.websiteService.getWebsites(); // Refresh the list
      },
      error: (err) => {
        console.error('Error creating website:', err);
        alert('Failed to create website.');
      }
    });
  }


  openEditProfileModal() {
    this.editProfileModal.show();
  }

  onEditProfileModalClose() {
    console.log('Edit profile modal closed');
  }

  onProfileSave(profileData: any) {
    const success = this.dashboardService.updateProfile(profileData);
    if (success) {
      alert('Profile updated successfully!');
    }
  }


  addNewDatabase() {
    alert('Database creation form will open here');
  }

  openCreateDatabaseModal() {
    console.log('Opening Create Database Modal');
    this.createDatabaseModal.show();
  }

  onCreateDatabaseModalClose() {
    console.log('Create database modal closed');
  }

  onDatabaseCreate(databaseData: any) {
    alert('Database created successfully!');
  }
}
