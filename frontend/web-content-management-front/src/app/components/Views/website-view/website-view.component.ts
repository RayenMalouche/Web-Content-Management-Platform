import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { WebsiteService } from '../../../services/website-service.service';
import { GenericListComponent } from '../../generic-list/generic-list.component';
import { WebsiteCardComponent } from '../../cards/website-card/website-card.component';
import { CreateWebsiteModalComponent } from '../../modals/create-website-modal/create-website-modal.component';
import { CommonModule } from '@angular/common';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'; // Ajout de faSearch
import { AddNewCardComponent } from '../../cards/add-new-card/add-new-card.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { ProfileSectionComponent } from '../../profile-section/profile-section.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { UserCardComponent } from '../../cards/user-card/user-card.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-website-view',
  templateUrl: './website-view.component.html',
  styleUrls: ['./website-view.component.scss'],
  standalone: true,
  imports: [
    GenericListComponent,
    WebsiteCardComponent,
    CreateWebsiteModalComponent,
    CommonModule,
    AddNewCardComponent,
    FaIconComponent,
    ProfileSectionComponent,
    SidebarComponent,
    UserCardComponent,
    FormsModule
  ]
})
export class WebsitesViewComponent implements OnInit {
  websites$: Observable<any[]> = of([]);
  filteredWebsites: any[] = [];
  searchTerm: string = '';
  @ViewChild('createWebsiteModal') createWebsiteModal: any;

  private allWebsites: any[] = [];

  constructor(private websiteService: WebsiteService) {}

  ngOnInit() {
    this.websites$ = this.websiteService.getWebsites();
    this.websites$.subscribe(websites => {
      this.allWebsites = websites;
      this.filteredWebsites = websites;
    });
  }

  filterWebsites() {
    if (!this.searchTerm) {
      this.filteredWebsites = this.allWebsites;
    } else {
      this.filteredWebsites = this.allWebsites.filter(website =>
        website.name?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  openCreateWebsiteModal() {
    this.createWebsiteModal.open();
  }

  onCreateWebsiteModalClose() {
    this.createWebsiteModal.close();
  }

  onWebsiteCreate(website: any) {
    this.websiteService.createWebsite(website).subscribe(() => {
      this.websites$ = this.websiteService.getWebsites();
      this.websites$.subscribe(websites => {
        this.allWebsites = websites;
        this.filterWebsites();
      });
    });
    this.createWebsiteModal.close();
  }

  onWebsiteDelete(id: string) {
    this.websiteService.deleteWebsite(id).subscribe(() => {
      this.websites$ = this.websiteService.getWebsites();
      this.websites$.subscribe(websites => {
        this.allWebsites = websites;
        this.filterWebsites();
      });
    });
  }

  openEditWebsiteModal(website: any) {
    // À implémenter si nécessaire
  }

  protected readonly faPlus = faPlus;
  protected readonly faSearch = faSearch; // Ajout de l'icône de recherche
}
