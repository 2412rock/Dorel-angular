import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { StartsWithRequest } from '../model/Requests/starts-with-model';
import { Observable } from 'rxjs';
import { Maybe } from '../model/maybe';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = isDevMode() ? 'http://localhost:4500' : 'https://dorelapp.xyz:4200'; 

  constructor(private http: HttpClient) {   }
  
  getServicii(request: StartsWithRequest): Observable<Maybe>{
    return this.http.post<Maybe>(`${this.apiUrl}/api/getServicii`, request);
  }

  getJudete(request: StartsWithRequest): Observable<Maybe>{
    return this.http.post<Maybe>(`${this.apiUrl}/api/getJudete`, request);
  }
}
