import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalstorageService } from './localstorage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccessLogsService {

  private apiUrl = isDevMode() ? 'http://localhost:4500' : 'https://dorelapp.xyz:4200'; 

  constructor(private http: HttpClient) {   }

  addLog(): Observable<string>{
    return this.http.post<string>(`${this.apiUrl}/api/addLog`, {});
  }
}
