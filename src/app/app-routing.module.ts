import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { VerifyUserComponentComponent } from './components/verify-user-component/verify-user-component.component';
import { VerifySuccessComponentComponent } from './components/verify-success-component/verify-success-component.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { AssignServiciiComponent } from './components/assign-servicii/assign-servicii.component';
import { ServiciuDetailComponent } from './components/serviciu-detail/serviciu-detail.component';
import { EditServiciiComponent } from './components/edit-servicii/edit-servicii.component';
import { EditServiciuComponent } from './components/edit-serviciu/edit-serviciu.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChatListMobileComponent } from './components/chat-list-mobile/chat-list-mobile.component';
import { ChatWithUserMobileComponent } from './components/chat-with-user-mobile/chat-with-user-mobile.component';
import { DetailMobileComponent } from './components/detail-mobile/detail-mobile.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ForgotPasswordResetComponent } from './components/forgot-password-reset/forgot-password-reset.component';
import { AccountInfoComponent } from './components/account-info/account-info.component';
import { OverviewAdminComponent } from './components/overview-admin/overview-admin.component';


const routes: Routes = [
  { path: 'login-page', component: LoginPageComponent},
  {path: 'home-page', component: HomePageComponent},
  {path: 'register-page', component: RegisterPageComponent},
  {path: 'verify-page', component: VerifyUserComponentComponent},
  {path: 'verify-success', component: VerifySuccessComponentComponent},
  {path: 'search-results-page', component: SearchResultsComponent},
  {path: 'serviciu-detail-page', component: ServiciuDetailComponent},
  {path: 'assign-page', component: AssignServiciiComponent},
  {path: 'edit-servicii-page', component: EditServiciiComponent},
  {path: 'edit-serviciu-page', component: EditServiciuComponent},
  {path: 'chat', component: ChatComponent},
  {path: 'chat-list-mobile', component: ChatListMobileComponent},
  {path: 'chat-with-mobile', component: ChatWithUserMobileComponent},
  {path: 'detail-mobile', component: DetailMobileComponent},
  {path: 'forgot-password-reset', component: ForgotPasswordResetComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'account-info', component: AccountInfoComponent},
  {path: 'overview-admin', component: OverviewAdminComponent},
  {path: 'account-settings', component: AccountSettingsComponent, children: [
    {path: 'assign-servicii', component: AssignServiciiComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }


