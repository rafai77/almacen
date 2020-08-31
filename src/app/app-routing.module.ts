import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LogGuard} from './security/log.guard'
import { AppComponent } from './app.component';
import { LogComponent } from './log/log.component';
import { HomeComponent } from './home/home.component';
import {HomeGuard} from './security/home.guard'
import { HomeadminComponent } from './homeadmin/homeadmin.component';


const routes: Routes = [
            {path:'',component:HomeComponent ,canActivate:[HomeGuard]},
            {path:'Login',component:LogComponent,canActivate:[LogGuard]},
            {path:'Home/inventario',component:HomeComponent,canActivate:[HomeGuard]},//componente para el home normal
            {path:'**',component:HomeComponent ,canActivate:[HomeGuard],},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
