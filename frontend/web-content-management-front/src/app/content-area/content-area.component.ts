import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CdkDropList, CdkDragDrop, CdkDrag } from '@angular/cdk/drag-drop';
import { NgComponentOutlet, NgForOf } from '@angular/common';

@Component({
  selector: 'app-content-area',
  templateUrl: './content-area.component.html',
  standalone: true,
  imports: [CdkDropList, NgForOf, NgComponentOutlet, CdkDrag],
  styleUrls: ['./content-area.component.scss']
})
export class ContentAreaComponent {
  @Input() droppedElements: any[] = [];
  @Output() elementSelected = new EventEmitter<any>();

  selectElement(element: any) {
    this.elementSelected.emit(element);
  }

  onDrop(event: CdkDragDrop<any[]>) {
    const { x, y } = event.dropPoint;
    const element = {
      ...event.item.data,
      position: { x, y }
    };
    this.droppedElements.push(element);
  }
}
