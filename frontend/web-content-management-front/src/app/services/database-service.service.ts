import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Database } from '../models/database.interface';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private readonly apiUrl = 'http://localhost:8081/databases';

  constructor(private readonly http: HttpClient) {}

  getAllDatabases(): Observable<Database[]> {
    return this.http.get<Database[]>(this.apiUrl);
  }

  getDatabaseById(id: string): Observable<Database> {
    return this.http.get<Database>(`${this.apiUrl}/${id}`);
  }

  createDatabase(database: Database): Observable<Database> {
    return this.http.post<Database>(this.apiUrl, database);
  }

  updateDatabase(id: string, database: Database): Observable<Database> {
    return this.http.put<Database>(`${this.apiUrl}/${id}`, database);
  }

  deleteDatabase(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
