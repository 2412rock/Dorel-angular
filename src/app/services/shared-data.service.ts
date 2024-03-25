import { Injectable } from '@angular/core';
import { ImaginiServiciiDescriere } from '../model/imagine-servicii-descriere';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private subject = new BehaviorSubject<any>(null);
  subjectData$ = this.subject.asObservable();

  private serviciuSelectatId: number | null;
  private judetSelectatId: number | null;
  private userEmail: string;

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

  public setServiciuSelectat(serviciuId: number){
    this.serviciuSelectatId = serviciuId;
  }

  public getServiciuSelectat(): number | null{
    return this.serviciuSelectatId;
  }

  public setJudetselectat(judetId: number){
    this.judetSelectatId = judetId;
  }

  public getJudetSelectat(): number | null{
    return this.judetSelectatId;
  }

  public resetAll(){
    this.serviciuSelectatId = null;
    this.judetSelectatId = null;
    this.clearData();
  }
}
