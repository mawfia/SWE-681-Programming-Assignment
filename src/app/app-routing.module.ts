import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationComponent } from './authentication/authentication.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegistrationComponent } from './authentication/registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BicyclesComponent } from './dashboard/bicycles/bicycles.component';
import { MyBicyclesComponent } from './dashboard/my-bicycles/my-bicycles.component';
import { BicycleComponent } from './dashboard/bicycle/bicycle.component';
import { BicycleDetailResolverService } from './services/bicycle-detail-resolver.service';

import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  { path: '', pathMatch: 'full', component: AuthenticationComponent, canActivate:[AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard] },
  { path: 'bicycles', component: BicyclesComponent, canActivate:[AuthGuard] },
  { path: 'my_bicycles', component: MyBicyclesComponent, canActivate:[AuthGuard] },
  { path: 'bicycle/:id', component: BicycleComponent, canActivate:[AuthGuard], resolve: { bicycle: BicycleDetailResolverService } },
  { path: '**', component: AuthenticationComponent, canActivate:[AuthGuard] }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
