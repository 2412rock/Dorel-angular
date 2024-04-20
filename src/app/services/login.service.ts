import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Maybe} from '../model/maybe';
import { SendVerificationCodeModel } from '../model/Requests/SendVerificationCodeModel';
import { VerifyUserModel } from '../model/Requests/verify-user-model';
import { LoginModel } from '../model/Requests/login-model';
import { LoginGoogleRequest } from '../model/Requests/login-google-model';
import { SendCodePasswordResetReq } from '../model/Requests/send-code-password-reset-req';
import { ResetPasswordReq } from '../model/Requests/reset-password-req';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = isDevMode() ? 'http://localhost:4500' : 'https://dorelapp.xyz:4200'; 

  constructor(private http: HttpClient) {   }

  loginGoogle(loginModel: LoginGoogleRequest): Observable<Maybe<string>>{
    return this.http.post<Maybe<string>>(`${this.apiUrl}/api/loginGoogle`, loginModel);
  }

  login(loginModel: LoginModel): Observable<Maybe<string>>{
    return this.http.post<Maybe<string>>(`${this.apiUrl}/api/login`, loginModel);
  }

  sendVerificationCode(sendVerificationCodeModel: SendVerificationCodeModel): Observable<Maybe<string>>{
    return this.http.post<Maybe<string>>(`${this.apiUrl}/api/sendVerification`, sendVerificationCodeModel);
  }

  sendVerificationCodeResetPassword(req: SendCodePasswordResetReq): Observable<Maybe<string>>{
    return this.http.post<Maybe<string>>(`${this.apiUrl}/api/setResetPasswordCode`, req);
  }

  resetPassword(req: ResetPasswordReq): Observable<Maybe<string>>{
    return this.http.post<Maybe<string>>(`${this.apiUrl}/api/resetPassword`, req);
  }

  verifyUser(verifyUser: VerifyUserModel): Observable<Maybe<string>>{
    return this.http.post<Maybe<string>>(`${this.apiUrl}/api/verifyUser`, verifyUser);
  }

  refreshToken(token: string): Observable<Maybe<string>>{
    return this.http.post<Maybe<string>>(`${this.apiUrl}/api/refreshToken`, {refreshToken: token});
  }
}
