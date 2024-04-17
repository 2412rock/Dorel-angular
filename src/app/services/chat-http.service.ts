import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalstorageService } from './localstorage.service';
import { SaveMessageReq } from '../model/Requests/save-message-req';
import { Maybe } from '../model/maybe';
import { Observable } from 'rxjs';
import { Group } from '../model/group';
import { SeenReq } from '../model/Requests/seen-req';

@Injectable({
  providedIn: 'root'
})
export class ChatHttpService {

  private apiUrl = isDevMode() ? 'http://localhost:4500' : 'https://dorelapp.xyz:4200'; 

  constructor(private http: HttpClient, private localStorage: LocalstorageService) {   }

  saveMessage(request: SaveMessageReq): Observable<Maybe<string>>{
    return this.http.post<Maybe<string>>(`${this.apiUrl}/api/saveMessage`, request);
  }
  
  getMessages(): Observable<Maybe<Group[]>>{
    return this.http.get<Maybe<Group[]>>(`${this.apiUrl}/api/getMessages`);
  }

  hasSeenMessages(): Observable<Maybe<number[]>>{
    return this.http.get<Maybe<number[]>>(`${this.apiUrl}/api/hasUnseenMessages`);
  }

  seenMessage(senderId: number): Observable<Maybe<string>>{
    var req = new SeenReq();
    req.senderId = senderId;
    return this.http.post<Maybe<string>>(`${this.apiUrl}/api/seenMessage`, req);
  }
}
