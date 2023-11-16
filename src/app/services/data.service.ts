import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../model/response';
import { SendVerificationCodeModel } from '../model/Requests/SendVerificationCodeModel';
import { VerifyUserModel } from '../model/Requests/verify-user-model';
import { LoginModel } from '../model/Requests/login-model';
import { LoginGoogleRequest } from '../model/Requests/login-google-model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = isDevMode() ? 'http://localhost:4500' : 'https://dorelapp.xyz:4200'; // Replace this with your API endpoint URL

  constructor(private http: HttpClient) {   }

  loginGoogle(loginModel: LoginGoogleRequest): Observable<ResponseModel>{
    return this.http.post<ResponseModel>(`${this.apiUrl}/api/loginGoogle`, loginModel);
  }

  login(loginModel: LoginModel): Observable<ResponseModel>{
    return this.http.post<ResponseModel>(`${this.apiUrl}/api/login`, loginModel);
  }

  sendVerificationCode(sendVerificationCodeModel: SendVerificationCodeModel): Observable<ResponseModel>{
    return this.http.post<ResponseModel>(`${this.apiUrl}/api/sendVerification`, sendVerificationCodeModel);
  }

  verifyUser(verifyUser: VerifyUserModel): Observable<ResponseModel>{
    return this.http.post<ResponseModel>(`${this.apiUrl}/api/verifyUser`, verifyUser);
  }
}
