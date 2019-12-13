import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationComponent } from './authentication/authentication.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegistrationComponent } from './authentication/registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BicyclesComponent } from './dashboard/bicycles/bicycles.component';
import { MyBicyclesComponent } from './dashboard/my-bicycles/my-bicycles.component';
import { HomeComponent } from './dashboard/home/home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: AuthenticationComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'bicycles', component: BicyclesComponent },
  { path: 'my_bicycles', component: MyBicyclesComponent }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
