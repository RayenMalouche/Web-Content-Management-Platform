import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Table } from '../models/Table.interface';
import { Column } from '../models/Column.interface';
import {Database} from '../models/database.interface';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private readonly apiUrl = 'http://localhost:8081/databases';

  constructor(private readonly http: HttpClient) {}



  getDatabaseById(id: string): Observable<Database> {
    return this.http.get<Database>(`${this.apiUrl}/${id}`);
  }

  getTables(databaseId: string): Observable<Table[]> {
    return this.http.get<Table[]>(`${this.apiUrl}/${databaseId}/tables`);
  }

  createDatabase(database: any): Observable<any> {
    return this.http.post(this.apiUrl, database);
  }

  addTable(databaseId: string, table: Partial<Table>): Observable<void> {
    return this.http.post<void>(`http://localhost:8081/databases/${databaseId}/tables`, { tableName: table.name });
  }

  deleteTable(databaseId: string, tableName: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${databaseId}/tables/${tableName}`);
  }
  testConnection(databaseId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${databaseId}/test-connection`);
  }
}

export class DatabaseServiceService {
}
