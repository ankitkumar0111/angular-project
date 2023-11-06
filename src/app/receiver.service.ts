import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReceiverService {
  private apiUrl = 'http://localhost:3000'; // Replace with your JSON server URL

  constructor(private http: HttpClient) {}

  getCountries(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/countries`);
  }

  postReceiver(receiverData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/receivers`, receiverData);
  }

  getReceivers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/receivers`);
  }
}