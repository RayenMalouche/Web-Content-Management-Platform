import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private readonly apiUrl = 'http://localhost:8080/api/databases'; // Remplacez par l'URL de votre API

  constructor(private readonly http: HttpClient) {}

  getAllDatabases(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getDatabaseById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createDatabase(database: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, database);
  }

  updateDatabase(id: string, database: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, database);
  }

  deleteDatabase(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
