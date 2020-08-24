import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbNav } from '@ng-bootstrap/ng-bootstrap';
import { DatosService } from '../services/datos.service';
import { LogService } from '../services/log.service';



@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css',]
})
export class BarComponent implements OnInit {

  log:boolean=false;
   cms=[]
  dropa

  constructor(private datos:DatosService,private servicelog:LogService,private rotuer:Router)
  {

  }

  datosdrop()
  {
    this.datos.cms().subscribe((res:any)=>
      {
        let nombres
        let tablas
        console.log(res)
        nombres=res.map(item=> item.nombre)
        tablas=res.map(item=> item.nom2)
        var j =0;
        for (var i in nombres)
         this.cms.push({
           "nombre": nombres[i],
            "nom2": tablas[i]
         })
        console.log(this.cms);
      })

  }
  ngOnChanges()
  {
    //this.changeAction();

  }

  changeAction(n)
  {
   this.rotuer.navigate(['/Home/'+n]);
  }

  ngOnInit(): void {
    this.servicelog.checklog().subscribe( (res)=>
    {
      this.datosdrop();
      this.log=res;
    }
    );


  }

  Logout()
  {
    this.log=false;
    this.servicelog.logout();
    this.rotuer.navigateByUrl('/Login');
  }
  nombre()
  {
    return this.servicelog.getnombre()
  }
  isNavbarCollapsed=true;

}
