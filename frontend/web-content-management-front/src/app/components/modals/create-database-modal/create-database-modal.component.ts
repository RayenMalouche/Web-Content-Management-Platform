import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { DatabaseService } from '../../../services/database-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-database-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './create-database-modal.component.html',
  styleUrls: ['./create-database-modal.component.scss']
})
export class CreateDatabaseModalComponent {

  @Output() close = new EventEmitter<void>();
  @Output() create = new EventEmitter<any>();

  isVisible = false;
  faTimes = faTimes;

  database = {
    name: '',
    type: 'mysql',
    connectionString: 'jdbc:mysql://localhost',
    description: '',
    username: '',
    password: '',
    port: 3306,
    host: 'localhost'
  };

  constructor(private readonly databaseService: DatabaseService,private readonly snackBar: MatSnackBar) {}

  show() {
    this.isVisible = true;
  }

  hide() {
    this.isVisible = false;
  }

  onClose() {
    this.hide();
    this.close.emit();
  }

  onCreate() {
    this.database.connectionString = this.generateConnectionString();

    console.log('Données envoyées au backend :', this.database);

    this.databaseService.createDatabase(this.database).subscribe({
      next: (response) => {
        console.log('Database created successfully:', response);
        this.snackBar.open('Base de données créée avec succès !', 'Fermer', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.create.emit(this.database);
        this.hide();
        this.resetForm();
        this.create.emit(response);
      },
      error: (error) => {
        console.error('Error creating database:', error);
        this.snackBar.open('Échec de la création de la base de données.', 'Fermer', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  private generateConnectionString(): string {
    const { type, name, port } = this.database;
    let connectionString = '';
    switch (type.toLowerCase()) {
      case 'mysql':
      case 'sql': // Ajout du cas pour SQL
        connectionString = `jdbc:mysql://localhost:${port}/${name}`;
        break;
      case 'postgresql':
        connectionString = `jdbc:postgresql://localhost:${port}/${name}`;
        break;
      case 'h2':
        connectionString = `jdbc:h2:./data/${name}`;
        break;
      default:
        console.error('Type de base de données non supporté :', type);
    }
    console.log('ConnectionString généré :', connectionString);
    return connectionString;
  }

  private resetForm() {
    this.database = {
      name: '',
      type: 'mysql',
      connectionString: '',
      description: '',
      username: '',
      password: '',
      port: 3306,
      host: 'localhost'
    };
  }
  testConnection() {
    console.log('Testing connection with database:', this.database);
  }
}
