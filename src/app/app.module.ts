import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { LogService } from './services/log.service';
import { AppComponent } from './app.component';
import { LogComponent } from './log/log.component';
import { HomeComponent } from './home/home.component';
import { HomeadminComponent } from './homeadmin/homeadmin.component';
import {HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import{FormsModule} from '@angular/forms'
import { CookieService } from 'ngx-cookie-service';
import { BarComponent } from './bar/bar.component';
import { CommonModule } from "@angular/common";


@NgModule({
  declarations: [
    AppComponent,
    BarComponent,
    HomeComponent,
    HomeadminComponent,
    LogComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule
  ],
  providers: [LogService,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
