import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  public setUserData(accessToken: string, refreshToken:string, name:string, profilePic: string,
     isEmailLogin: string, profilePicContent: string){
    localStorage.setItem('accessToken', accessToken );
    localStorage.setItem('refreshToken', refreshToken );
    localStorage.setItem('name', name );
    localStorage.setItem('isEmailLogin', isEmailLogin);
    localStorage.setItem('profilePicContent', profilePicContent);
  }

  public getAccessToken(): string{
    return localStorage.getItem("accessToken") as string;
  }

  public setAccessToken(val: string){
     localStorage.setItem("accessToken", val);
  }

  public getRefreshToken(): string{
    return localStorage.getItem("refreshToken") as string;
  }

  public deleteUserData(){
   localStorage.removeItem('accessToken' );
   localStorage.removeItem('refreshToken');
   localStorage.removeItem('name');
   localStorage.removeItem('isEmailLogin');
   localStorage.removeItem('profilePicContent');
 }
}
