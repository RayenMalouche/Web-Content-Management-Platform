import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {CommonModule, NgForOf, NgIf} from '@angular/common';
import { WebsiteService } from '../../services/website-service.service';
import { ActivatedRoute } from '@angular/router';
import { Page } from '../../models/Page.interface';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { PageCardComponent } from '../cards/page-card/page-card.component';
import { CreatePageModalComponent } from '../modals/create-page-modal/create-page-modal.component';
import {PageService} from '../../services/page-service.service';

@Component({
  selector: 'app-page-list',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FaIconComponent,
    SidebarComponent,
    PageCardComponent,
    CreatePageModalComponent,
    CommonModule,
  ],
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss']
})
export class PageListComponent implements OnInit {
  @ViewChild('createPageModal') createPageModal!: CreatePageModalComponent;
  pages: Page[] = [];
  protected readonly faPlus = faPlus;


  constructor(
    private readonly route: ActivatedRoute,
    private readonly websiteService: WebsiteService,
    private readonly pageService: PageService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  // Dans page-list.component.ts, modifiez la méthode ngOnInit:
  ngOnInit() {
    const websiteId = this.route.snapshot.paramMap.get('id');
    if (websiteId) {
      this.websiteService.getPagesByWebsiteId(websiteId).subscribe({
        next: (pages) => {
          this.pages = pages;
          console.log('Pages loaded in parent:', this.pages);
          this.cdr.detectChanges(); // Forcer la détection des changements
        },
        error: (err) => console.error('Error fetching pages:', err)
      });
    }
  }



  openAddPageModal() {
    this.createPageModal.show();
  }

  onCreatePageModalClose() {
    this.createPageModal.hide();
  }

  onPageCreate(page: Page) {
    const websiteId = this.route.snapshot.paramMap.get('id');
    if (websiteId) {
      this.pageService.createPage(page).subscribe({
        next: (createdPage) => {
          this.websiteService.addPageToWebsite(websiteId, createdPage).subscribe({
            next: (page) => {
              this.pages.push(page);
              localStorage.setItem(`pages_${websiteId}`, JSON.stringify(this.pages));
            },
            error: (err) => console.error('Error adding page to website:', err)
          });
        },
        error: (err) => console.error('Error creating page:', err)
      });
    }
  }

  deletePage(page: Page) { const websiteId = this.route.snapshot.paramMap.get('id');
    if (websiteId) {
      this.websiteService.deletePageFromWebsite(websiteId, page.id).subscribe(() => {
        this.pages = this.pages.filter(p => p.id !== page.id);
        localStorage.setItem(`pages_${websiteId}`, JSON.stringify(this.pages));
      });
    }

  }
  editPage(page: Page) {
    console.log('Editing page:', page);

  }
}
