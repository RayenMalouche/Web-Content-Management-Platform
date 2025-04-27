import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import { Table } from '../../../models/Table.interface';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faDatabase, faEdit, faEye, faSearch, faTrash} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FaIconComponent
  ],
  styleUrls: ['./table-list.component.scss']
})
export class TableListComponent implements OnChanges {
  @Input() tables: Table[] = [];
  @Output() onEdit = new EventEmitter<Table>();
  @Output() onDelete = new EventEmitter<string>();

  ngOnChanges(): void {
    if (this.tables && this.tables.length > 0) {
      this.tables.forEach(table => console.log("Nom de la table :", table.name));
    } else {
      console.log("Aucune table reçue ou données incomplètes.");
    }
  }

  editTable(table: Table): void {
    this.onEdit.emit(table);
  }

  deleteTable(tableName: string): void {
    this.onDelete.emit(tableName);
  }

  protected readonly faSearch = faSearch;
  protected readonly faEye = faEye;
  protected readonly faEdit = faEdit;
  protected readonly faTrash = faTrash;
  protected readonly faDatabase = faDatabase;
}
