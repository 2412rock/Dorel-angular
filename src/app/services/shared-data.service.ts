import { Injectable } from '@angular/core';
import { ImaginiServiciiDescriere } from '../model/imagine-servicii-descriere';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private subject = new BehaviorSubject<any>(null);
  subjectData$ = this.subject.asObservable();

  private serviciuSelectat: number | null;
  private judeteSelectate: number[] = [];
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

  public addServiciuSelectat(serviciuId: number){
    this.serviciuSelectat = serviciuId;
  }

  public getServiciuSelectat(): number | null{
    return this.serviciuSelectat;
  }

  public addJudeteSelectate(judete: number[]){
    this.judeteSelectate = judete;
  }

  public getJudeteSelectate(): number[]{
    return this.judeteSelectate;
  }

  public resetAll(){
    this.serviciuSelectat = null;
    this.judeteSelectate = [];
    this.clearData();
  }
}
