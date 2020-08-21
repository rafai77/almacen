import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LogGuard} from './security/log.guard'
import { AppComponent } from './app.component';
import { LogComponent } from './log/log.component';
import { HomeComponent } from './home/home.component';
import { HomeadminComponent } from './homeadmin/homeadmin.component';


const routes: Routes = [
            {path:'',redirectTo:'Login',pathMatch:'full',},
            {path:'Login',component:LogComponent,canActivate:[LogGuard]},
            {path:'Home',component:HomeComponent,},//componente para el home normal
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
