import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/';
import { User } from "../model/User";
import { Jwt } from "../model/jwt";
import { tap } from 'rxjs/operators';
import { Routes, RouterModule, Router } from '@angular/router';
import { of } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class LogService {
  private Dominio = 'http://localhost:3000';
  private token:string ;// tk
  private user:string;//
  private info:Jwt;//informacion de la resupesta
  private log:boolean=false;
  private iduser:string;


  constructor(private http: HttpClient,private router:Router)
  {
    //leer el token si es la primera vez que se entra y cambiar esta de log en caso de ser necesarios
    this.token=localStorage.getItem('tk');
    this.user=localStorage.getItem('nombre');
    this.iduser=localStorage.getItem('iduser');
    if(this.token)
    {
      this.log=true;
      this.cad()
    }

    else
    {
      this.log=false
      this.token="";
    }

  }
  cad()
  {
    var headers={
      'vefificador':this.tkget()
    }
  this.http.get(`${this.Dominio}/`,{headers:headers}).subscribe(res=>
    {
      console.log(res)
       if(res['vecido']==true)
   {
     console.log("sadasdasasdasdas",res);
     this.log=false;
     this.token= ' '
     this.log=false;
     localStorage.removeItem('tk');
     localStorage.removeItem('nombre');
     localStorage.removeItem('iduser');

   }
    }
  );



  }

  log2()
  {
    this.cad()
   return  this.log ;
  }
  checklog():Observable<boolean>
  {
    this.cad();
   // console.log(this.token);
    this.token=localStorage.getItem('tk');
    if(this.token)
    this.log=true;
    else
    {
      this.log=false
      this.token="";
    }
    console.log("loggggggg",this.log)
    return of(this.log);
  }


  logout()
  {
    this.token= ' '
    this.log=false;
    localStorage.removeItem('tk');
  }
  private guardariduser(n)
  {
    console.log(n)
    localStorage.setItem('iduser',n);
    this.iduser=n;
  }

  setid()
  {
    return this.iduser;
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
          console.log(res)
          //guardar el token
          this.tkset(res.token);
          this.guardarN(res.user.nombre);
          this.guardariduser(res.user.id_user);
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
