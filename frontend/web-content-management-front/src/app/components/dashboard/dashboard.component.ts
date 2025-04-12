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
import { Database } from '../../models/database.interface';
import { CreateDatabaseModalComponent } from '../modals/create-database-modal/create-database-modal.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {DatabaseService} from '../../services/database-service.service';

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
    CreateDatabaseModalComponent,
    MatSnackBarModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {

  private readonly dashboardService = inject(DashboardService);
  private readonly websiteService = inject(WebsiteService);
  private readonly databaseService = inject(DatabaseService);
  private readonly snackBar = inject(MatSnackBar);

  faPlus = faPlus;

  @ViewChild('createWebsiteModal') createWebsiteModal!: CreateWebsiteModalComponent;
  @ViewChild('editProfileModal') editProfileModal!: EditProfileModalComponent;
  @ViewChild('createDatabaseModal') createDatabaseModal!: CreateDatabaseModalComponent;

  websites$: Observable<Website[]> = this.websiteService.getWebsites();
  databases$: Observable<Database[]> = this.databaseService.getAllDatabases();

  openCreateWebsiteModal() {
    this.createWebsiteModal.show();
  }

  onCreateWebsiteModalClose() {
    console.log('Create website modal closed');
  }

  onWebsiteCreate(websiteData: Website) {
    this.websiteService.createWebsite(websiteData).subscribe({
      next: () => {
        this.snackBar.open('Website créé avec succès !', 'Fermer', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.websites$ = this.websiteService.getWebsites(); // Rafraîchir la liste
      },
      error: (err) => {
        console.error('Erreur lors de la création du site web :', err);
        this.snackBar.open('Échec de la création du site web.', 'Fermer', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
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

  openCreateDatabaseModal() {
    console.log('Opening Create Database Modal');
    this.createDatabaseModal.show();
  }

  onCreateDatabaseModalClose() {
    console.log('Create database modal closed');
  }

  onDatabaseCreate() {
    alert('Database created successfully!');
  }
}
