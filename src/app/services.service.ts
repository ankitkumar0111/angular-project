import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private apiUrl = 'http://localhost:3000'; 

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

  deleteReceiver(receiverId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/receivers/${receiverId}`);
  }

  getReceiver(receiverId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/receivers/${receiverId}`);
  }

  updateReceiver(receiverId: number, receiverData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/receivers/${receiverId}`, receiverData);
  }
}
