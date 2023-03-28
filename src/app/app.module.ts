import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ConfirmaccComponent } from './confirmacc/confirmacc.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashNavComponent } from './dashboard/dash-nav/dash-nav.component';
import { DashHomeComponent } from './dashboard/dash-home/dash-home.component';
import { DashExperienceComponent } from './dashboard/dash-experience/dash-experience.component';
import { DashSkillsComponent } from './dashboard/dash-skills/dash-skills.component';
import { DashCertifComponent } from './dashboard/dash-certif/dash-certif.component';
import { DashInterestComponent } from './dashboard/dash-interest/dash-interest.component';
import { ReloadComponent } from './dashboard/reload/reload.component';
import { SettingsComponent } from './dashboard/settings/settings.component';
import { DashEducComponent } from './dashboard/dash-educ/dash-educ.component';
import { LostPasswordComponent } from './lost-password/lost-password.component';
import { CompMessagesComponent } from './dashboard/comp-messages/comp-messages.component';

@NgModule({
  declarations: [
    AppComponent,
    PortfolioComponent,
    SignupComponent,
    SigninComponent,
    HomeComponent,
    NotfoundComponent,
    ConfirmaccComponent,
    DashboardComponent,
    DashNavComponent,
    DashHomeComponent,
    DashExperienceComponent,
    DashSkillsComponent,
    DashCertifComponent,
    DashInterestComponent,
    ReloadComponent,
    SettingsComponent,
    DashEducComponent,
    LostPasswordComponent,
    CompMessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ], 
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
