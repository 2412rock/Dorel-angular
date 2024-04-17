import { EventEmitter, Injectable } from '@angular/core';
import { ImaginiServiciiDescriere } from '../model/imagine-servicii-descriere';
import { BehaviorSubject } from 'rxjs';
import { SearchResult } from '../model/search-result';
import { DBServiciuModel } from '../model/DBModels/DBServiciuModel';
import { FilteredSearchResult } from '../model/filtered-search-result';
import { SaveMessageReq } from '../model/Requests/save-message-req';
import { SearchModel } from '../model/search-model';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private subject = new BehaviorSubject<any>(null);
  subjectData$ = this.subject.asObservable();

  private serviciuSelectatId: number | undefined;
  private judetSelectatId: number | undefined;
  private userEmail: string;
  private searchResult: FilteredSearchResult;
  private serviciuName: string | undefined;
  private judetName: string | undefined;
  private serviciuToEdit: DBServiciuModel;
  private messageToUserId: number;
  private toName: string;
  public eventEmitter = new EventEmitter<SearchModel>();
  public loginEventEmitter = new EventEmitter<void>();
  public newMessagsFrom: number[] = [];

  getUserEmail(){
    return this.userEmail;
  }

  setUserEmail(email: string){
    this.userEmail = email;
  }

  setData(data: any) {
    this.subject.next(data);
  }

  clearData() {
    this.subject.next(null);
  }

  public setServiciuSelectat(serviciuId: number | undefined, serviciuName: string | undefined){
    this.serviciuSelectatId = serviciuId;
    this.serviciuName = serviciuName;
    
  }

  public getServiciuSelectat(): number | undefined{
    return this.serviciuSelectatId;
  }

  public getServiciuName(): string | undefined{
    return this.serviciuName;
  }

  public getJudetName(): string | undefined{
    return this.judetName;
  }

  public setJudetselectat(judetId: number | undefined, judetName: string | undefined){
    this.judetSelectatId = judetId;
    this.judetName = judetName;
  }

  public getJudetSelectat(): number | undefined{
    return this.judetSelectatId;
  }

  public resetAll(){
    this.serviciuSelectatId = undefined;
    this.judetSelectatId = undefined;
    this.clearData();
  }

  public setSearchResult(searchResult: FilteredSearchResult){
    this.searchResult = searchResult;
  }

  public getSearchResult():FilteredSearchResult{
    return this.searchResult;
  }

  public setServiciuToEdit(serviciu: DBServiciuModel){
    this.serviciuToEdit = serviciu;
  }

  public getServiciuToEdit(){
    return this.serviciuToEdit;
  }

  public setNewChatData(toId: number, toName: string){
    this.messageToUserId = toId;
    this.toName = toName;
  }

  public getMessageUserId(): number{
    return this.messageToUserId
  }

  public getMessageUserName(): string{
    return this.toName
  }


}
