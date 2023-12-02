import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { StartsWithRequest } from '../model/Requests/starts-with-model';
import { Observable } from 'rxjs';
import { Maybe } from '../model/maybe';
import { LocalstorageService } from './localstorage.service';
import { AssignServiciuRequest } from '../model/Requests/assign-serviciu-mode';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = isDevMode() ? 'http://localhost:4500' : 'https://dorelapp.xyz:4200'; 

  constructor(private http: HttpClient, private localStorage: LocalstorageService) {   }
  
  getServicii(request: StartsWithRequest): Observable<Maybe>{
    return this.http.post<Maybe>(`${this.apiUrl}/api/getServicii`, request);
  }

  getJudete(request: StartsWithRequest): Observable<Maybe>{
    return this.http.post<Maybe>(`${this.apiUrl}/api/getJudete`, request);
  }

  assignUserServicii(request: AssignServiciuRequest): Observable<Maybe>{
    const requestHeaders = new HttpHeaders()
      .set('Authorization', `Bearer ${this.localStorage.getAccessToken()}`);

    const requestOptions = {
      headers: requestHeaders
    };
    return this.http.post<Maybe>(`${this.apiUrl}/api/assignUserServiciiAndJudet`, request, requestOptions);
  }
}
