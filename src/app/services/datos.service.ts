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

  cms2():Observable<any>
  {
    var headers={
      'vefificador':this.servicelog.tkget()
    }
    var body={
      'id':1
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
  mandarformula(cantidad,productos,cm,datosA)
  {
    var headers={
      'vefificador':this.servicelog.tkget()
    }
    var body={
      "productos":productos,
      "cantidades":cantidad,
      "cm":cm,
      "datosA":datosA
    }

    return this.http.post(`${this.Dominio}/addconsumo/`,body,{headers:headers});

  }

  chartconsumo(cm,f1,f2): Observable<any>
  {
    if(cm=="cm1")
    cm="consumocm1"
    var headers={
      'vefificador':this.servicelog.tkget()
    }
    var body={
      "cm":cm,
      "f1":f1,
      "f2":f2,
    }
    return this.http.post(`${this.Dominio}/Consumo/`,body,{headers:headers});
  }


  notificacion(pol):Observable<any>
  {
    //console.log(pol);
    var body={
      d1:pol,
      d2:JSON.stringify(pol),
      d3:"hi"
    }
    return this.http.post(`${this.Dominio}/not`,body);
  }

  sendpedido(datos):Observable<any>
  {
    var headers={
      'vefificador':this.servicelog.tkget()
    }
    return this.http.post(`${this.Dominio}/addPedidos`,datos,{headers:headers});
  }

  getpedidos(datos):Observable<any>
  {
      var headers={
      'vefificador':this.servicelog.tkget()
    }
    var body={
      cm:datos
    }
    return this.http.post(`${this.Dominio}/viewPedidos`,body,{headers:headers});
  }

  change(datos,status):Observable<any>
  {
    var headers={
      'vefificador':this.servicelog.tkget()
    }
    var body={
      info:datos,
      status:status
    }
    return this.http.post(`${this.Dominio}/changestatus`,body,{headers:headers});

  }
  //actualizarPedidos

  actualizarP(datos,status):Observable<any>
  {
    var headers={
      'vefificador':this.servicelog.tkget()
    }
    var body={
      info:datos,
      status:status
    }
    return this.http.post(`${this.Dominio}/actualizarPedidos`,body,{headers:headers});

  }

  getpedidosAdmin(datos):Observable<any>
  {
      var headers={
      'vefificador':this.servicelog.tkget()
    }
    var body={
      cm:datos
    }
    return this.http.post(`${this.Dominio}/viewPedidosadmin`,body,{headers:headers});
  }

  settraspaso(origen,destino,datos2)
  {
    var headers={
      'vefificador':this.servicelog.tkget()
    }
    var body={
      origen:origen,
      destino:destino,
      prestamo:datos2
    }
    return this.http.post(`${this.Dominio}/traspasos`,body,{headers:headers});
  }

  gettraspaso(origen)
  {
    var headers={
      'vefificador':this.servicelog.tkget()
    }
    var body={
      origen:origen,
    }
    return this.http.post(`${this.Dominio}/traspasosview`,body,{headers:headers});
  }

  changetraspaso(id)
  { 
    var headers={
      'vefificador':this.servicelog.tkget()
    }
    var body={
      id:id,
    }
    return this.http.post(`${this.Dominio}/statustraspasos`,body,{headers:headers});
    
  }

  traspasosviewAdmin()
  {
    var headers={
      'vefificador':this.servicelog.tkget()
    }
    return this.http.post(`${this.Dominio}/traspasosviewAdmin`,{headers:headers});

  }
}
