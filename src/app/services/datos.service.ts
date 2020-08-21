import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/';
import { User } from "../model/User";
import { Jwt } from "../model/jwt";
import { Datos } from "../model/Datos";
import { tap } from 'rxjs/operators';
import { Routes, RouterModule, Router } from '@angular/router';
import { LogService } from './log.service';
;


@Injectable({
  providedIn: 'root'
})
export class DatosService {
  private Dominio = 'http://localhost:3000';

  constructor(private http: HttpClient,private router:Router,private servicelog:LogService) { }

  datos(valores): Observable<any>
  {
    var headers={
      'vefificador':this.servicelog.tkget()
    }
    return this.http.post<Datos>(`${this.Dominio}/datos`,valores,{headers:headers});
  }

  productos(valores): Observable<any>
  {
    var headers={
      'vefificador':this.servicelog.tkget()
    }
    return this.http.post(`${this.Dominio}/productos`,valores,{headers:headers});
  }
  totales(valores): Observable<any>
  {
    var headers={
      'vefificador':this.servicelog.tkget()
    }
    return this.http.post(`${this.Dominio}/valores`,valores,{headers:headers});
  }
}
