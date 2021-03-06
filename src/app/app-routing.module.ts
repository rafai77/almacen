import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LogGuard} from './security/log.guard'
import { AppComponent } from './app.component';
import { LogComponent } from './log/log.component';
import { HomeComponent } from './home/home.component';
import {HomeGuard} from './security/home.guard'
import { HomeadminComponent } from './homeadmin/homeadmin.component';
import { CommonModule } from '@angular/common';
import { AddpedidoComponent } from './addpedido/addpedido.component';
import { ViewPedidosComponent } from './view-pedidos/view-pedidos.component';
import { ViewPedidosAdminComponent } from './view-pedidos-admin/view-pedidos-admin.component';

import { TraspasosComponent } from './traspasos/traspasos.component';
import { ViewTraspasosComponent } from './view-traspasos/view-traspasos.component';
import { ViewTraspasosAdminComponent } from './view-traspasos-admin/view-traspasos-admin.component';


const routes: Routes = [
            //{path:'',component:HomeComponent ,canActivate:[HomeGuard]},
            { path: '',   redirectTo: 'Home/inventario', pathMatch: 'full' },
            {path:'Login',component:LogComponent,canActivate:[LogGuard]},
            {path:'Home/:cm',component:HomeComponent,canActivate:[HomeGuard]},//componente para el home normal
            {path:'pedido/:cm',component:AddpedidoComponent,canActivate:[HomeGuard]},
            {path:'pedidoview/:cm',component:ViewPedidosComponent,canActivate:[HomeGuard]},
            {path:'pedidoviewA/:cm',component:ViewPedidosAdminComponent,canActivate:[HomeGuard]},
            {path:'ventas',component:ViewPedidosAdminComponent,canActivate:[HomeGuard]},
            {path:'traspaso',component:TraspasosComponent,canActivate:[HomeGuard]},
            {path:'traspasoview/:cm',component:ViewTraspasosComponent,canActivate:[HomeGuard]},
            {path:'traspasoviewA/',component:ViewTraspasosAdminComponent,canActivate:[HomeGuard]},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [CommonModule,RouterModule]
})
export class AppRoutingModule { }
