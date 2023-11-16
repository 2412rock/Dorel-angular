import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AcmeComponent } from './components/acme/acme.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { VerifyUserComponentComponent } from './components/verify-user-component/verify-user-component.component';
import { VerifySuccessComponentComponent } from './components/verify-success-component/verify-success-component.component';
import { BasicSearchPageComponent } from './components/basic-search-page/basic-search-page.component';

const routes: Routes = [
  { path: 'login-page', component: LoginPageComponent},
  {path: 'home-page', component: HomePageComponent},
  {path: 'register-page', component: RegisterPageComponent},
  {path: 'verify-page', component: VerifyUserComponentComponent},
  {path: 'verify-success', component: VerifySuccessComponentComponent},
  {path: 'basic-search-page', component: BasicSearchPageComponent},
  {path: '.well-known/acme-challenge/7wqPKUvgxxkSW9RD7Y5cXtIkOwPI0MBni1oZScfL6sA', component: AcmeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
