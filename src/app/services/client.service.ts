import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private baseUrl = 'http://localhost:3000/clients'; // Cambia la URL según tu backend

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getClients(): Observable<any> {
    return this.http.get(this.baseUrl, { headers: this.getHeaders() });
  }

  getClient(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  createClient(client: any): Observable<any> {
    console.log(client);
    return this.http.post(
      this.baseUrl,
      { ...client, identification: client.identification.toString() },
      { headers: this.getHeaders() }
    );
  }

  updateClient(id: string, client: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, client, {
      headers: this.getHeaders(),
    });
  }

  deleteClient(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
