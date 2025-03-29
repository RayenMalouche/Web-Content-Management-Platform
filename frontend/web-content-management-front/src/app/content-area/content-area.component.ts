import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CdkDropList, CdkDragDrop, CdkDrag } from '@angular/cdk/drag-drop';
import { NgComponentOutlet, NgForOf, NgStyle } from '@angular/common';

@Component({
  selector: 'app-content-area',
  templateUrl: './content-area.component.html',
  standalone: true,
  imports: [CdkDropList, NgForOf, NgComponentOutlet, CdkDrag, NgStyle],
  styleUrls: ['./content-area.component.scss']
})
export class ContentAreaComponent {
  @Input() droppedElements: any[] = [];
  @Output() elementSelected = new EventEmitter<any>();

  selectElement(element: any) {
    this.elementSelected.emit(element);
  }

  onDrop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer !== event.container) {
      const dropPoint = event.dropPoint || { x: 0, y: 0 };
      const element = {
        ...event.item.data,
        position: { x: dropPoint.x, y: dropPoint.y }
      };
      this.droppedElements.push(element);
    }
  }
}
