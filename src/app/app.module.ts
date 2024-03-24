import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleLoginProvider, SocialLoginModule } from '@abacritt/angularx-social-login';
import {  GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { VerifyUserComponentComponent } from './components/verify-user-component/verify-user-component.component';
import { VerifySuccessComponentComponent } from './components/verify-success-component/verify-success-component.component';
import { BasicSearchPageComponent } from './components/basic-search-page/basic-search-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BoldPipe } from './pipes/bold.pipe';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { GenericSearchBarComponent } from './components/generic-search-bar/generic-search-bar.component';
import { AssignServiciiComponent } from './components/assign-servicii/assign-servicii.component';
import { DorelHttpInterceptor } from './interceptors/http-interceptor';
import { SettingsSidebarComponent } from "./components/settings-sidebar/settings-sidebar.component";
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { EditServiciiComponent } from './components/edit-servicii/edit-servicii.component';
import { EditServiciuComponent } from './components/edit-serviciu/edit-serviciu.component';
import { EditServiciiSidebarComponent } from './components/edit-servicii-sidebar/edit-servicii-sidebar.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ImageSelectorComponent } from './components/image-selector/image-selector.component';
import { SearchResultCardComponent } from './components/search-result-card/search-result-card.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';


@NgModule({
    declarations: [
        AppComponent,
        LoginPageComponent,
        HomePageComponent,
        RegisterPageComponent,
        VerifyUserComponentComponent,
        VerifySuccessComponentComponent,
        BasicSearchPageComponent,
        SearchBarComponent,
        BoldPipe,
        SearchResultsComponent,
        AccountSettingsComponent,
        GenericSearchBarComponent,
        AssignServiciiComponent,
        EditServiciiComponent,
        EditServiciuComponent,
        EditServiciiSidebarComponent,
        ImageSelectorComponent,
        SearchResultCardComponent,
        StarRatingComponent
    ],
    providers: [
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
                autoLogin: true, //keeps the user signed in
                providers: [
                    {
                        id: GoogleLoginProvider.PROVIDER_ID,
                        provider: new GoogleLoginProvider('826065678951-r0fsp9t7nj7g5mshsmvrqtlp6bb2sbo7.apps.googleusercontent.com') // your client id
                    }
                ]
            }
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: DorelHttpInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        SocialLoginModule,
        GoogleSigninButtonModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatInputModule,
        SettingsSidebarComponent,
        MatButtonModule,
        MatDialogModule,
        DragDropModule
    ]
})
export class AppModule { }
