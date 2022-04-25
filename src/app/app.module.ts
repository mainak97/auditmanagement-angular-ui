import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './main/navbar/navbar.component';
import { AuditFormComponent } from './main/audit-form/audit-form.component';
import { AuditQuestionComponent } from './main/audit-form/audit-question/audit-question.component';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { AuditFormApi } from './main/audit-form/audit-form-api.service';
import { LoginApi } from './login/login-api.service';
import { LoaderComponent } from './loader/loader.component';
import { AuthInterceptorService } from './auth-interceptor.service';
import { AuditDetailsComponent } from './main/audit-details/audit-details.component';
import { AlertComponent } from './alert/alert.component';
import { MainErrorService } from './main/main-error.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    NavbarComponent,
    AuditFormComponent,
    AuditQuestionComponent,
    LoaderComponent,
    AuditDetailsComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,AuthService,AuditFormApi,LoginApi,MainErrorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
