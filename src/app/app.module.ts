import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- Import FormsModule
import { HttpClientModule } from '@angular/common/http';
import { CookieModule } from 'ngx-cookie'; // install "npm install @nguniversal/express-engine --saveDev" as a co-dependency
import { FileSelectDirective } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegistrationComponent } from './authentication/registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BikeOfTheDayComponent } from './authentication/bike-of-the-day/bike-of-the-day.component';
import { BicyclesComponent } from './dashboard/bicycles/bicycles.component';
import { MyBicyclesComponent } from './dashboard/my-bicycles/my-bicycles.component';
import { MyBicyclesListComponent } from './dashboard/my-bicycles/my-bicycles-list/my-bicycles-list.component';
import { HomeComponent } from './dashboard/home/home.component';
import { NavigationComponent } from './navigation/navigation.component';

import { AuthenticationService } from './services/authentication.service';
import { BicycleService } from './services/bicycle.service';

import { AppRoutingModule } from './app-routing.module'; // <--- Routing rules imported

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
    HomeComponent,
    MyBicyclesListComponent
  ],
  imports: [
    BrowserModule,
	FormsModule,
	HttpClientModule,
	CookieModule.forRoot(),
	AppRoutingModule // <--- Our routing rules
  ],
  providers: [AuthenticationService, BicycleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
