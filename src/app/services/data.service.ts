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
import { DescriereAndContact } from '../model/descriere-and-contact';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = isDevMode() ? 'http://localhost:4500' : 'https://dorelapp.xyz:4500'; 

  constructor(private http: HttpClient, private localStorage: LocalstorageService) {   }
  
  getServicii(request: StartsWithRequest): Observable<Maybe<DBServiciuModel[]>>{
    return this.http.post<Maybe<DBServiciuModel[]>>(`${this.apiUrl}/api/getServicii`, request);
  }

  getJudete(request: StartsWithRequest): Observable<Maybe<DBJudetModel[]>>{
    return this.http.post<Maybe<DBJudetModel[]>>(`${this.apiUrl}/api/getJudete`, request);
  }
  
  getServiciiForUser(ofer: boolean){
    return this.http.get<Maybe<DBServiciuModel[]>>(`${this.apiUrl}/api/getServiciiUser?ofer=${ofer}`)
  }

  getServiciiForUserAsSearchResults(ofer: boolean){
    return this.http.get<Maybe<SearchResult[]>>(`${this.apiUrl}/api/getServiciiUserAsSearchResults?ofer=${ofer}`)
  }


  getJudeteForServiciu(serviciuId: number){
    return this.http.get<Maybe<DBJudetModel[]>>(`${this.apiUrl}/api/getJudeteForServiciu?serviciuId=${serviciuId}`)
  }

  getDescriereAndContactForServiciu(serviciuId: number){
    return this.http.get<Maybe<DescriereAndContact>>(`${this.apiUrl}/api/getDescriereAndContactForServiciu?serviciuId=${serviciuId}`)
  }

  getImaginiForServiciu(serviciuId: number, ofer: boolean){
    return this.http.get<Maybe<Imagine[]>>(`${this.apiUrl}/api/getImaginiForServiciu?serviciuId=${serviciuId}&ofer=${ofer}`)
  }

  getImaginiForServiciuUser(serviciuId: number, userId: number, ofer: boolean){
    return this.http.get<Maybe<Imagine[]>>(`${this.apiUrl}/api/getImaginiServiciuUser?serviciuId=${serviciuId}&userId=${userId}&ofer=${ofer}`)
  }

  assignUserServicii(request: AssignServiciuRequest): Observable<Maybe<string>>{
    return this.http.post<Maybe<string>>(`${this.apiUrl}/api/assignUserServiciiAndJudet`, request,) //requestOptions);
  }

  editUserServicii(request: AssignServiciuRequest): Observable<Maybe<string>>{
    return this.http.post<Maybe<string>>(`${this.apiUrl}/api/editUserServiciu`, request,) //requestOptions);
  }

  deleteUserServicii(serviciuId: number, ofer: boolean): Observable<Maybe<string>>{
    return this.http.delete<Maybe<string>>(`${this.apiUrl}/api/deleteUserServiciu?serviciuId=${serviciuId}&ofer=${ofer}`,) //requestOptions);
  }

  getSearchResult(serviciuId: number | undefined, judetId: number | undefined, pageNumber: number, ofer: boolean){
    serviciuId = serviciuId === undefined ? -1 : serviciuId;
    judetId = judetId === undefined ? -1 : judetId;
    return this.http.get<Maybe<SearchResult[]>>(`${this.apiUrl}/api/getSearchResult?serviciuId=${serviciuId}&judetId=${judetId}&pageNumber=${pageNumber}&ofer=${ofer}`)
  }
  
  getReviews(reviewedUserId:number, serviciuId: number, pageNumber: number){
    return this.http.get<Maybe<DBReviewModel[]>>(`${this.apiUrl}/api/getReviews?reviewedUserId=${reviewedUserId}&serviciuId=${serviciuId}&pageNumber=${pageNumber}`)
  }

  postReview(request: PostReviewModel){
    return this.http.post<Maybe<string>>(`${this.apiUrl}/api/postReview`, request)
  }

  editReview(request: PostReviewModel){
    return this.http.post<Maybe<string>>(`${this.apiUrl}/api/editReview`, request)
  }

  getReviewOfUser(reviewedUserId:number, serviciuId: number, reviewerId: number){
    return this.http.get<Maybe<DBReviewModel>>(`${this.apiUrl}/api/getReviewOfUser?reviewedUserId=${reviewedUserId}&serviciuId=${serviciuId}&reviewerId=${reviewerId}`)
  }

  deleteReview(reviewedUserId:number, serviciuId: number){
    return this.http.delete<Maybe<string>>(`${this.apiUrl}/api/deleteReview?reviewedUserId=${reviewedUserId}&serviciuId=${serviciuId}`)
  }

  getAllUsers(): Observable<Maybe<string[]>>{
    return this.http.get<Maybe<string[]>>(`${this.apiUrl}/api/getAllUsers`)
  }
}
