import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- Import FormsModule
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieModule } from 'ngx-cookie'; // install "npm install @nguniversal/express-engine --saveDev" as a co-dependency
import { FileSelectDirective } from 'ng2-file-upload';
import { SpinnerModule } from 'spinner-angular';

import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegistrationComponent } from './authentication/registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BikeOfTheDayComponent } from './authentication/bike-of-the-day/bike-of-the-day.component';
import { BicyclesComponent } from './dashboard/bicycles/bicycles.component';
import { MyBicyclesComponent } from './dashboard/my-bicycles/my-bicycles.component';
import { MyInactiveBicyclesListComponent } from './dashboard/my-bicycles/my-inactive-bicycles-list/my-inactive-bicycles-list.component';
import { MyActiveBicyclesListComponent } from './dashboard/my-bicycles/my-active-bicycles-list/my-active-bicycles-list.component'; // <--- Routing rules imported
import { MyAcquisitionBicyclesListComponent } from './dashboard/my-bicycles/my-acquisition-bicycles-list/my-acquisition-bicycles-list.component';

import { BicycleComponent } from './dashboard/bicycle/bicycle.component';
import { NavigationComponent } from './navigation/navigation.component';

import { AuthenticationService } from './services/authentication.service';
import { BicycleService } from './services/bicycle.service';
import { SocketService } from './services/socket.service';

import { TokenInterceptor } from './services/token.interceptor';

import { Search } from './pipes/search.pipe';
import { Realtime } from './pipes/realtime.pipe';

import { AuthGuard } from './guards/auth.guard';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
	  FileSelectDirective,
    AuthenticationComponent,
    LoginComponent,
    RegistrationComponent,
    DashboardComponent,
    NavigationComponent,
    BikeOfTheDayComponent,
    BicyclesComponent,
    MyBicyclesComponent,
    BicycleComponent,
    MyInactiveBicyclesListComponent,
    MyActiveBicyclesListComponent,
    Search,
    Realtime,
    MyAcquisitionBicyclesListComponent
  ],
  imports: [
    BrowserModule,
    SpinnerModule.forRoot({
      primaryColor: '#FCBE41',
      secondaryColor: '#309488',
      animation: 'spin 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite'
    }),
    FormsModule,
    HttpClientModule,
    CookieModule.forRoot(),
    AppRoutingModule // <--- Our routing rules
  ],
  providers: [AuthenticationService, BicycleService, SocketService, AuthGuard, { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
