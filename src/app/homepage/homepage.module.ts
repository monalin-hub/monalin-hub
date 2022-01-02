import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { HeaderComponent } from './Component/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    NgbModal,
    HomepageRoutingModule,
    ReactiveFormsModule,    
    HttpClientModule,
    MatInputModule,
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    MatSortModule,
    NgxDatatableModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class HomepageModule { }
