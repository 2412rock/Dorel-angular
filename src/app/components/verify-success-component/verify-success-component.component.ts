import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-success-component',
  templateUrl: './verify-success-component.component.html',
  styleUrls: ['./verify-success-component.component.css']
})
export class VerifySuccessComponentComponent {
  
  constructor(private router: Router){}

  onClickGoBackToLogin(){
    this.router.navigate(['./login-page'])
  }

}
