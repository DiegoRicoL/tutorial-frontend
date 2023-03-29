import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Client } from './model/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  //Call the backend to get the list of clients
  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>('http://localhost:8080/client');
  }

  //Call the backend to save a client
  saveClient(client: Client): Observable<Client> {
      
      let url = 'http://localhost:8080/client';
      if (client.id != null) url += '/' + client.id;
  
      return this.http.put<Client>(url, client);
    }

  //Call the backend to delete a client
  deleteClient(idClient: number): Observable<any> {
    return this.http.delete('http://localhost:8080/client/' + idClient);
  }

  //Call the backend to check if a client exists
  existsClient(name: String): Observable<boolean> {
    return this.http.get<boolean>('http://localhost:8080/client/' + name);
  }
}
