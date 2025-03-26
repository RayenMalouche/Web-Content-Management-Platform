import { Component, EventEmitter, Output } from '@angular/core';
import { NgComponentOutlet, NgForOf } from '@angular/common';
import { elementComponentMap, ElementType } from '../shared/element-types';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-element-sidebar',
  templateUrl: './element-sidebar.component.html',
  standalone: true,
  imports: [
    NgForOf,
    NgComponentOutlet,
    DragDropModule
  ],
  styleUrls: ['./element-sidebar.component.scss']
})
export class ElementSidebarComponent {
  @Output() elementSelected = new EventEmitter<any>();

  elements = Object.keys(ElementType).map(key => ({
    name: ElementType[key as keyof typeof ElementType],
    component: elementComponentMap[ElementType[key as keyof typeof ElementType]]
  }));

  selectElement(element: any) {
    this.elementSelected.emit(element);
  }

  onDrop(event: any) {
    const element = { ...event.item.data }; // Cloner l'élément pour éviter les références directes
    this.elementSelected.emit(element);
  }

}
