import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { INode } from '../models/INode';

@Injectable({
  providedIn: 'root'
})
export class NodeService {

  private baseUrl = 'http://localhost:8080/nodes';

  constructor(private http: HttpClient) { }

  getAllNodes(): Observable<INode[]> {
    return this.http.get<INode[]>(this.baseUrl);
  }

  createNode(node: Node): Observable<INode> {
    return this.http.post<INode>(this.baseUrl, node);
  }

  getNodeById(id: string): Observable<INode> {
    return this.http.get<INode>(`${this.baseUrl}/${id}`);
  }

  updateNode(id: string, node: INode): Observable<INode> {
    return this.http.put<INode>(`${this.baseUrl}/${id}`, node);
  }

  deleteNode(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
