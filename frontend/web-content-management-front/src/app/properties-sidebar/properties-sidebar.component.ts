import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-properties-sidebar',
  templateUrl: './properties-sidebar.component.html',
  standalone: true,
  styleUrls: ['./properties-sidebar.component.scss']
})
export class PropertiesSidebarComponent {
  @Input() selectedElement: any;
  @Output() propertyChanged = new EventEmitter<any>();

  onPropertyChange(property: string, value: any) {
    this.propertyChanged.emit({ property, value });
  }

  protected readonly HTMLInputElement = HTMLInputElement;
}
