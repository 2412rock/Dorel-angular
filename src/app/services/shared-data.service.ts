import { Injectable } from '@angular/core';
import { ImaginiServiciiDescriere } from '../model/imagine-servicii-descriere';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private subject = new BehaviorSubject<any>(null);
  subjectData$ = this.subject.asObservable();

  private serviciiSelectate: string[] = [];
  private serviciiLeftToSelect: string[] = [];
  private judeteSelectate: string[] = [];
  private imagesAndServicii: ImaginiServiciiDescriere[] = [];

  setData(data: any) {
    this.subject.next(data);
  }

  clearData() {
    this.subject.next(null);
  }

  public addServiciiSelectate(servicii: string[]){
    for(let item of servicii){
      this.serviciiSelectate.push(item);
    }
  }

  public getServiciiSelectate(): string[]{
    return this.serviciiSelectate;
  }

  public addServiciiLeftToSelect(servicii: string[]){
    console.log("SETTING SERVICII LEFT")
    console.log(servicii)
    this.serviciiLeftToSelect = [];
    for(let item of servicii){
      this.serviciiLeftToSelect.push(item);
    }
  }

  public getServiciiLeftToSelect(): string[]{
    return this.serviciiLeftToSelect;
  }

  public addJudeteSelectate(servicii: string[]){
    for(let item of servicii){
      this.judeteSelectate.push(item);
    }
  }

  public getJudeteSelectate(): string[]{
    return this.judeteSelectate;
  }

  public addImaginiServiciiDescriere(imagesAndServicii: ImaginiServiciiDescriere){
    this.imagesAndServicii.push(imagesAndServicii);
  }

  public getImaginiServiciiDescriere(){
    return this.imagesAndServicii;
  }

  public resetAll(){
    this. serviciiSelectate = [];
    this.serviciiLeftToSelect = [];
    this.judeteSelectate = [];
    this.imagesAndServicii = [];
    this.clearData();
  }
}
