import { Component } from '@angular/core';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  standalone: true,
  imports: [
    CdkDropList,
    CdkDrag,
    NgIf,
    NgForOf,
    FormsModule
  ],
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  sidenav: boolean = true;
  isPagesOpen: boolean = false;
  pages = [
    { name: 'Home', isEditing: false },
    { name: 'About', isEditing: false },
    { name: 'Contact', isEditing: false }
  ];

  togglePages() {
    this.isPagesOpen = !this.isPagesOpen;
  }

  dropPage(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.pages, event.previousIndex, event.currentIndex);
  }

  editPage(index: number) {
    this.pages[index].isEditing = true;
  }

  savePage(index: number) {
    this.pages[index].isEditing = false;
  }

  removePage(index: number) {
    this.pages.splice(index, 1);
  }
}
