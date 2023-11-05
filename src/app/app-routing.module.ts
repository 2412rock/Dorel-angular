import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AcmeComponent } from './components/acme/acme.component';

const routes: Routes = [
  { path: 'login-page', component: LoginPageComponent},
  {path: 'home-page', component: HomePageComponent},
  {path: '.well-known/acme-challenge/7wqPKUvgxxkSW9RD7Y5cXtIkOwPI0MBni1oZScfL6sA', component: AcmeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
