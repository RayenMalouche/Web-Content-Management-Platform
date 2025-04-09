import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Website} from '../models/Website.interface';


@Injectable({
  providedIn: 'root'
})
export class WebsiteService {
  private readonly apiUrl = 'http://localhost:8081/websites';

  constructor(private readonly http: HttpClient) {}

  getAllWebsites(): Observable<Website[]> {
    return this.http.get<Website[]>(this.apiUrl);
  }

  createWebsite(website: Website): Observable<Website> {
    return this.http.post<Website>(this.apiUrl, website);
  }

  getPagesByWebsiteId(websiteId: string) {
    return this.http.get<any[]>(`/api/websites/${websiteId}/pages`);
  }

  addPageToWebsite(websiteId: string, page: any) {
    return this.http.post<any>(`/api/websites/${websiteId}/pages`, page);
  }

  updatePageOrder(websiteId: string, pageOrder: { id: string; order: number }[]) {
    return this.http.put(`/api/websites/${websiteId}/pages/order`, pageOrder);
  }

  deletePageFromWebsite(websiteId: string, id: string) {
    return this.http.delete(`/api/websites/${websiteId}/pages/${id}`);
  }
}

export class WebsiteServiceService {
}
