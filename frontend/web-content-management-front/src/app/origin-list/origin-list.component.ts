import { Component, EventEmitter, Output } from '@angular/core';
import { INode } from '../models/INode';
import { DndDraggableDirective, DropEffect } from 'ngx-drag-drop';
import {NgClass, NgForOf} from '@angular/common';


@Component({
  selector: 'app-origin-list',
  imports: [
    DndDraggableDirective,
    NgForOf,
    NgClass
  ],
  templateUrl: './origin-list.component.html',
  standalone: true,
  styleUrls: ['./origin-list.component.scss']
})
export class OriginListComponent {
  @Output() dragStart = new EventEmitter<DragEvent>();
  @Output() dragMove = new EventEmitter<{ event: DragEvent, effect: DropEffect, node: INode, list?: INode[] }>();
  @Output() dragEnd = new EventEmitter<DragEvent>();

  readonly originList: INode[] = [
    { name: "Row", type: "row", selected: false, children: [] },
    { name: "Column", type: "column", selected: false, children: [] },
    { name: "Widget", type: "widget", selected: false, children: [] },
    { name: "Button", type: "button", selected: false, children: [] },
    { name: "Text", type: "text", selected: false, children: [] },
    { name: "Image", type: "image", selected: false, children: [] }
  ];

  onDragStart(event: DragEvent) { this.dragStart.emit(event); }

  onDragged(event: DragEvent, node: INode, effect: DropEffect) {
    this.dragMove.emit({ event, effect, node });
  }

  onDragEnd(event: DragEvent) { this.dragEnd.emit(event); }

  getIconClass(type: string): string {
    switch (type) {
      case 'row': return 'fas fa-bars';
      case 'column': return 'fas fa-columns';
      case 'widget': return 'fas fa-cube';
      case 'button': return 'fas fa-hand-pointer';
      case 'text': return 'fas fa-font';
      case 'image': return 'fas fa-image';
      default: return 'fas fa-question';
    }
  }
}
