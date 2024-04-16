import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalstorageService } from './localstorage.service';
import { SaveMessageReq } from '../model/Requests/save-message-req';
import { Maybe } from '../model/maybe';
import { Observable } from 'rxjs';
import { StartsWithRequest } from '../model/Requests/starts-with-model';
import { DBJudetModel } from '../model/DBModels/DBJudetModel';

@Injectable({
  providedIn: 'root'
})
export class ChatHttpService {

  private apiUrl = isDevMode() ? 'http://localhost:4500' : 'https://dorelapp.xyz:4200'; 

  constructor(private http: HttpClient, private localStorage: LocalstorageService) {   }

  saveMessage(request: SaveMessageReq): Observable<Maybe<string>>{
    return this.http.post<Maybe<string>>(`${this.apiUrl}/api/saveMessage`, request);
  }
  
}
