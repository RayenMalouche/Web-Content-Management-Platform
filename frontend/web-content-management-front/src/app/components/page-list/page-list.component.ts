import {Component, OnInit} from '@angular/core';
import { CdkDrag, CdkDropList, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { NgForOf } from '@angular/common';
import { WebsiteService } from '../../services/website-service.service';
import { ActivatedRoute } from '@angular/router';
import { Page } from '../../models/Page.interface';

@Component({
  selector: 'app-page-list',
  imports: [
    CdkDropList,
    NgForOf,
    CdkDrag
  ],
  templateUrl: './page-list.component.html',
  standalone: true,
  styleUrl: './page-list.component.scss'
})
export class PagesListComponent implements OnInit {
  pages: Page[] = [];
  constructor(
    private readonly route: ActivatedRoute,
    private readonly websiteService: WebsiteService
  ) {}

  ngOnInit() {
    const websiteId = this.route.snapshot.paramMap.get('id');
    if (websiteId) {
      this.websiteService.getPagesByWebsiteId(websiteId).subscribe((pages) => {
        this.pages = pages;
      });
    }
  }

  addPage() {
    const websiteId = this.route.snapshot.paramMap.get('id');
    if (websiteId) {
      const newPage = { name: `Page ${this.pages.length + 1}` };
      this.websiteService.addPageToWebsite(websiteId, newPage).subscribe((page) => {
        this.pages.push(page);
      });
    }

  }

  drop(event: CdkDragDrop<Page[]>) {
    moveItemInArray(this.pages, event.previousIndex, event.currentIndex);
    this.savePageOrder();
  }

  savePageOrder() {
    const websiteId = this.route.snapshot.paramMap.get('id');
    if (websiteId) {
      const updatedOrder = this.pages.map((page, index) => ({ id: page.id, order: index }));
      this.websiteService.updatePageOrder(websiteId, updatedOrder).subscribe(() => {
        console.log('Ordre des pages mis à jour');
      });
    }
  }
  editPage(page: Page) {
    console.log('Modifier la page :', page);
  }

  deletePage(page: Page) {
    const websiteId = this.route.snapshot.paramMap.get('id');
    if (websiteId) {
      this.websiteService.deletePageFromWebsite(websiteId, page.id).subscribe(() => {
        this.pages = this.pages.filter(p => p.id !== page.id);
        console.log('Page supprimée :', page);
      });
    }
  }

}

export class PageListComponent {
}
