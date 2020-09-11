import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/';
import { User } from "../model/User";
import { Jwt } from "../model/jwt";
import { Datos } from "../model/Datos";
import { tap } from 'rxjs/operators';
import { Routes, RouterModule, Router } from '@angular/router';
import { LogService } from './log.service';



@Injectable({
  providedIn: 'root'
})
export class DatosService {
  private Dominio = 'http://localhost:3000';

  constructor(private http: HttpClient,private router:Router,private servicelog:LogService) { }

  datos(valores): Observable<any>
  {
    //console.log(this.servicelog.tkget())
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
  cms(): Observable<any>
  {
    var headers={
      'vefificador':this.servicelog.tkget()
    }
    var body={
      'id':this.servicelog.setid()
    }
    return this.http.post(`${this.Dominio}/cm-inver`,body,{headers:headers});
  }


  formulaView(cm)
  {
    var headers={
      'vefificador':this.servicelog.tkget()
    }
    return this.http.get(`${this.Dominio}/formulaView/${cm}`,{headers:headers});
  }
  mandarformula(cantidad,productos,cm)
  {
    var headers={
      'vefificador':this.servicelog.tkget()
    }
    var body={
      "productos":productos,
      "cantidades":cantidad,
      "cm":cm,
    }

    return this.http.post(`${this.Dominio}/addconsumo/`,body,{headers:headers});

  }

  chartconsumo(cm): Observable<any>
  {
    if(cm=="cm1")
    cm="consumocm1"
    var headers={
      'vefificador':this.servicelog.tkget()
    }
    var body={
      "cm":cm
    }
    return this.http.post(`${this.Dominio}/Consumo/`,body,{headers:headers});
  }


}
