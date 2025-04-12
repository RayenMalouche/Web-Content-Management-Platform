import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faCircle, faTable, faEdit, faDatabase} from '@fortawesome/free-solid-svg-icons';
import {Database} from '../../../models/database.interface';



@Component({
  selector: 'app-database-card',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './database-card.component.html',
  styleUrls: ['./database-card.component.scss'],
})
export class DatabaseCardComponent {
  @Input() database!: Database;

  faCircle = faCircle;
  faTable = faTable;
  faEdit = faEdit;
  protected readonly faDatabase = faDatabase;
}
