import { Component } from '@angular/core';
import { ElementSidebarComponent } from '../element-sidebar/element-sidebar.component';
import { ContentAreaComponent } from '../content-area/content-area.component';
import { PropertiesSidebarComponent } from '../properties-sidebar/properties-sidebar.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  standalone: true,
  imports: [ElementSidebarComponent, ContentAreaComponent, PropertiesSidebarComponent],
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  droppedElements: any[] = [];
  selectedElement: any;

  addElement(element: any) {
    this.droppedElements = [...this.droppedElements, element]; // Mise à jour immuable
  }

  selectElement(element: any) {
    this.selectedElement = element;
  }

  onPropertyChanged(event: any) {
    if (this.selectedElement) {
      this.selectedElement[event.property] = event.value;
    }
  }
}
