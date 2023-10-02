import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmaccComponent } from './confirmacc/confirmacc.component';
import { CompMessagesComponent } from './dashboard/comp-messages/comp-messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReloadComponent } from './dashboard/reload/reload.component';
import { SettingsComponent } from './dashboard/settings/settings.component';
import { HomeComponent } from './home/home.component';
import { LostPasswordComponent } from './lost-password/lost-password.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { NewpasswordComponent } from './lost-password/newpassword/newpassword.component';

const routes: Routes = [
  {path:"portfolio/:id",component:PortfolioComponent},
  {path:"signup",component:SignupComponent},
  {path:"signin",component:SigninComponent},
  {path:"home",component:HomeComponent},
  {path:"confirm/account/:id",component:ConfirmaccComponent},
  {path:"dashboard",component:DashboardComponent},
  {path:"reload",component:ReloadComponent},
  {path:"dashboard/settings",component:SettingsComponent},
  {path:"dashboard/messages",component:CompMessagesComponent},
  {path:"lost/password",component:LostPasswordComponent},
  {path:"lost/newpassword/:token",component:NewpasswordComponent},

  {path: '',   redirectTo: '/home', pathMatch: 'full' },
  {path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
