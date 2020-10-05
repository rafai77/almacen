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
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AddpedidoComponent } from './addpedido/addpedido.component';
import { ViewPedidosComponent } from './view-pedidos/view-pedidos.component';
import { ViewPedidosAdminComponent } from './view-pedidos-admin/view-pedidos-admin.component';
import { TraspasosComponent } from './traspasos/traspasos.component';
import { ViewTraspasosComponent } from './view-traspasos/view-traspasos.component';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [
    AppComponent,
    BarComponent,
    HomeComponent,
    HomeadminComponent,
    LogComponent,
    AddpedidoComponent,
    ViewPedidosComponent,
    ViewPedidosAdminComponent,
    TraspasosComponent,
    ViewTraspasosComponent,
   
  ],
  imports: [

    BrowserModule,
    CommonModule,
    QRCodeModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    //ServiceWorkerModule.register('ngsw-worker.js', { enabled: true}),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
     /* or CommonModule */
  ],
  providers: [LogService,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
