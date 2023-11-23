import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { VerifyUserModel } from 'src/app/model/Requests/verify-user-model';
import {LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-verify-user-component',
  templateUrl: './verify-user-component.component.html',
  styleUrls: ['./verify-user-component.component.css']
})
export class VerifyUserComponentComponent {
  public verificationCode:string;
  public email: string;
  public loadingSpinner: boolean = false;

  constructor(private route: ActivatedRoute, private loginService: LoginService, private router: Router){}

  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
    });
  }

  onClickVerify(){
    if(this.verificationCode.length == 4){
      this.loadingSpinner = true;
      var model = new VerifyUserModel();
      model.email = this.email;
      model.verificationCode = this.verificationCode;

      firstValueFrom(this.loginService.verifyUser(model)).then(res => {
        if(res.isSuccess){
          this.router.navigate(['./verify-success'])
        }
      }).catch(err => {

      });
    }
  }
}
