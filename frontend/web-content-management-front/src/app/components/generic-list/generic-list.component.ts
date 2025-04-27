import { Component } from '@angular/core';
import { EventEmitter, Input, Output } from '@angular/core';
import {AddNewCardComponent} from '../cards/add-new-card/add-new-card.component';
import {NgForOf, NgTemplateOutlet} from '@angular/common';

@Component({
  selector: 'app-generic-list',
  imports: [
    AddNewCardComponent,
    NgForOf,
    NgTemplateOutlet
  ],
  templateUrl: './generic-list.component.html',
  styleUrl: './generic-list.component.scss',
  standalone: true,
})
export class GenericListComponent {
  @Input() title: string = '';
  @Input() items: any[] = [];
  @Input() cardTemplate: any;
  @Input() addNewText: string = 'Add New';
  @Output() add = new EventEmitter<void>();

  onAdd() {
    this.add.emit();
  }

}
