import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalstorageService } from './localstorage.service';
import { Observable } from 'rxjs';
import { DBAccessLogModel } from '../model/DBModels/DbAccessLogModel';
import { Maybe } from '../model/maybe';

@Injectable({
  providedIn: 'root'
})
export class AccessLogsService {

  private apiUrl = isDevMode() ? 'http://localhost:4500' : 'https://dorelapp.xyz:4500'; 

  constructor(private http: HttpClient) {   }

  addLog(): Observable<string>{
    return this.http.post<string>(`${this.apiUrl}/api/addLog`, {});
  }

  getLogs(): Observable<Maybe<DBAccessLogModel[]>>{
    return this.http.get<Maybe<DBAccessLogModel[]>>(`${this.apiUrl}/api/getLogs`);
  }
}
