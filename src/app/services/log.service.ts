import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/';
import { User } from "../model/User";
import { Jwt } from "../model/jwt";
import { tap } from 'rxjs/operators';
import { Routes, RouterModule, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LogService {
  private Dominio = 'http://localhost:3000';
  private token:string ;// tk
  private user:string;//
  private info:Jwt;//informacion de la resupesta
  private log:boolean=false;


  constructor(private http: HttpClient,private router:Router)
  {
    //leer el token si es la primera vez que se entra y cambiar esta de log en caso de ser necesarios
    this.token=localStorage.getItem('tk');
    this.user=localStorage.getItem('nombre');
    if(this.token)
    this.log=true;
    else
    {
      this.log=false
      this.token="";
    }

  }


  checklog():boolean
  {
    console.log(this.log);
    return this.log;
  }


  logout()
  {
    this.token= ' '
    this.log=false;
    localStorage.removeItem('tk');
  }


  login(user): Observable<Jwt>
  {
    return this.http.post<Jwt>(`${this.Dominio}/log`,
    user).pipe(tap(
      (res:Jwt)=>
      {
        if(res)
        {
          this.log=true;
          //guardar el token
          this.tkset(res.token);
          this.guardarN(res.user.nombre)

        }
      }
    ))
  }
  getnombre()
  {
    return this.user;
  }
  private guardarN(nombre)
  {
    localStorage.setItem('nombre',nombre);
    this.user=nombre;

  }


  tkget()//regresa el token
  {
    return (!this.token)?this.token=localStorage.getItem('tk'):this.token;
  }


  private tkset(tk)
  {
    localStorage.setItem('tk',tk);
    this.token=tk;
  }
}
