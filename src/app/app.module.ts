import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { NgChartsModule } from 'ng2-charts';
import { HomepageModule } from './homepage/homepage.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,NgChartsModule,

    FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule,
    MatTableModule, MatFormFieldModule, MatInputModule, MatIconModule, MatSortModule,
    NgxDatatableModule,
    HomepageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

