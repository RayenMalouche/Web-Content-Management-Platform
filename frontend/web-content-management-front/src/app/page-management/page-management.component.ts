import { Component } from '@angular/core';
import {CdkDragDrop, DragDropModule, moveItemInArray} from '@angular/cdk/drag-drop';
import {NgForOf, NgIf} from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Page {
  id: number;
  title: string;
  content: string;
}

@Component({
  selector: 'app-page-management',
  templateUrl: './page-management.component.html',
  styleUrls: ['./page-management.component.scss'],
  standalone: true,
  imports: [DragDropModule, NgForOf, FormsModule, NgIf]
})
export class PageManagementComponent {
  pages: Page[] = [
    { id: 1, title: 'Page 1', content: 'Content 1' },
    { id: 2, title: 'Page 2', content: 'Content 2' },
    { id: 3, title: 'Page 3', content: 'Content 3' }
  ];

  newPage: Page = { id: 0, title: '', content: '' };
  selectedPage: Page | null = null;

  drop(event: CdkDragDrop<Page[]>) {
    moveItemInArray(this.pages, event.previousIndex, event.currentIndex);
  }

  addPage() {
    if (this.newPage.title && this.newPage.content) {
      this.newPage.id = this.pages.length + 1;
      this.pages.push({ ...this.newPage });
      this.newPage = { id: 0, title: '', content: '' };
    }
  }

  editPage(page: Page) {
    this.selectedPage = { ...page };
  }

  updatePage() {
    if (this.selectedPage) {
      const index = this.pages.findIndex(p => p.id === this.selectedPage!.id);
      if (index !== -1) {
        this.pages[index] = this.selectedPage;
        this.selectedPage = null;
      }
    }
  }

  deletePage(page: Page) {
    this.pages = this.pages.filter(p => p.id !== page.id);
  }
}
