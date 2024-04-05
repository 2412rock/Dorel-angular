import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { StartsWithRequest } from '../model/Requests/starts-with-model';
import { Observable } from 'rxjs';
import { Maybe } from '../model/maybe';
import { LocalstorageService } from './localstorage.service';
import { AssignServiciuRequest } from '../model/Requests/assign-serviciu-mode';
import { DBServiciuModel } from '../model/DBModels/DBServiciuModel';
import { DBJudetModel } from '../model/DBModels/DBJudetModel';
import { Imagine } from '../model/Imagine';
import { SearchResult } from '../model/search-result';
import { DBReviewModel } from '../model/DBReviewModel';
import { PostReviewModel } from '../model/Requests/post-review-model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = isDevMode() ? 'http://localhost:4500' : 'https://dorelapp.xyz:4200'; 

  constructor(private http: HttpClient, private localStorage: LocalstorageService) {   }
  
  getServicii(request: StartsWithRequest): Observable<Maybe<DBServiciuModel[]>>{
    return this.http.post<Maybe<DBServiciuModel[]>>(`${this.apiUrl}/api/getServicii`, request);
  }

  getJudete(request: StartsWithRequest): Observable<Maybe<DBJudetModel[]>>{
    return this.http.post<Maybe<DBJudetModel[]>>(`${this.apiUrl}/api/getJudete`, request);
  }
  
  getServiciiForUser(){
    return this.http.get<Maybe<DBServiciuModel[]>>(`${this.apiUrl}/api/getServiciiUser`)
  }

  getJudeteForServiciu(serviciuId: number){
    return this.http.get<Maybe<DBJudetModel[]>>(`${this.apiUrl}/api/getJudeteForServiciu?serviciuId=${serviciuId}`)
  }

  getDescriereForServiciu(serviciuId: number){
    return this.http.get<Maybe<string>>(`${this.apiUrl}/api/getDescriereForServiciu?serviciuId=${serviciuId}`)
  }

  getImaginiForServiciu(serviciuId: number){
    return this.http.get<Maybe<Imagine[]>>(`${this.apiUrl}/api/getImaginiForServiciu?serviciuId=${serviciuId}`)
  }
  assignUserServicii(request: AssignServiciuRequest): Observable<Maybe<string>>{
    return this.http.post<Maybe<string>>(`${this.apiUrl}/api/assignUserServiciiAndJudet`, request,) //requestOptions);
  }

  editUserServicii(request: AssignServiciuRequest): Observable<Maybe<string>>{
    return this.http.post<Maybe<string>>(`${this.apiUrl}/api/editUserServiciu`, request,) //requestOptions);
  }

  deleteUserServicii(serviciuId: number): Observable<Maybe<string>>{
    return this.http.delete<Maybe<string>>(`${this.apiUrl}/api/deleteUserServiciu?serviciuId=${serviciuId}`,) //requestOptions);
  }

  getSearchResult(serviciuId: number | undefined, judetId: number | undefined, pageNumber: number){
    serviciuId = serviciuId === undefined ? -1 : serviciuId;
    judetId = judetId === undefined ? -1 : judetId;
    return this.http.get<Maybe<SearchResult[]>>(`${this.apiUrl}/api/getSearchResult?serviciuId=${serviciuId}&judetId=${judetId}&pageNumber=${pageNumber}`)
  }
  
  getImaginiForServiciuUser(serviciuId: number, judetId: number, userId: number){
    return this.http.get<Maybe<Imagine[]>>(`${this.apiUrl}/api/getImaginiServiciuUser?serviciuId=${serviciuId}&judetId=${judetId}&userId=${userId}`)
  }

  getReviews(reviewedUserId:number, serviciuId: number, pageNumber: number){
    return this.http.get<Maybe<DBReviewModel[]>>(`${this.apiUrl}/api/getReviews?reviewedUserId=${reviewedUserId}&serviciuId=${serviciuId}&pageNumber=${pageNumber}`)
  }

  postReview(request: PostReviewModel){
    return this.http.post<Maybe<string>>(`${this.apiUrl}/api/postReview`, request)
  }
}
