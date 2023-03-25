import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmaccComponent } from './confirmacc/confirmacc.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReloadComponent } from './dashboard/reload/reload.component';
import { SettingsComponent } from './dashboard/settings/settings.component';
import { HomeComponent } from './home/home.component';
import { LostPasswordComponent } from './lost-password/lost-password.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path:"portfolio/:id",component:PortfolioComponent},
  {path:"signup",component:SignupComponent},
  {path:"signin",component:SigninComponent},
  {path:"home",component:HomeComponent},
  {path:"confirm/account/:id",component:ConfirmaccComponent},
  {path:"dashboard",component:DashboardComponent},
  {path:"reload",component:ReloadComponent},
  {path:"dashboard/settings",component:SettingsComponent},
  {path:"lost/password",component:LostPasswordComponent},
  {path: '',   redirectTo: '/home', pathMatch: 'full' },
  {path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
