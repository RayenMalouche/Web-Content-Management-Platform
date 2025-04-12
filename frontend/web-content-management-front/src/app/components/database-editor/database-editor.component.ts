import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../../services/database-service.service';
import { Table } from '../../models/Table.interface';
import { Column } from '../../models/Column.interface';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-database-editor',
  templateUrl: './database-editor.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  styleUrls: ['./database-editor.component.scss']
})
export class DatabaseEditorComponent implements OnInit {
  databaseId!: string;
  tables: Table[] = [];
  newTable: Partial<Table> = { name: '' };
  newColumn: Partial<Column> = { name: '', type: 'string' };

  constructor(
    private readonly route: ActivatedRoute,
    private readonly databaseService: DatabaseService
  ) {}

  ngOnInit(): void {
    this.databaseId = this.route.snapshot.paramMap.get('id')!;
    this.loadTables();
  }

  loadTables(): void {
    this.databaseService.getTables(this.databaseId).subscribe((tables) => {
      this.tables = tables;
    });
  }

  addTable(): void {
    this.databaseService.addTable(this.databaseId, this.newTable).subscribe(() => {
      this.loadTables();
      this.newTable.name = '';
    });
  }

  addColumn(tableId: string): void {
    this.databaseService.addColumn(this.databaseId, tableId, this.newColumn).subscribe(() => {
      this.loadTables();
      this.newColumn = { name: '', type: 'string' };
    });
  }
}
