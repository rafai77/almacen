import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
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
  invernaderos;
  dropacutal;
  planta;
  isNavbarCollapsed=true;


  constructor( private ar: ActivatedRoute,private datos:DatosService,private servicelog:LogService,private rotuer:Router)
  {

  }
  pos()// posicion del drop para sacar lo invernaderos
  {
    for (var i in this.cms)
      if(this.cms[i].nombre==this.dropacutal)
        return i

    return -1
  }

  datosdrop()
  {
    this.datos.cms().subscribe((res:any)=>
      {
        let nombres
        let tablas
        //console.log(res)
        nombres=res.map(item=> item.nombre)
        tablas=res.map(item=> item.nom2)
        this.invernaderos=res.map(item=> item.invernaderos)
        this.planta=res.map(item=> item.planta)
        for (var i in nombres)
         this.cms.push({
           "nombre": nombres[i],
            "nom2": tablas[i]
         })
         this.pos()

        //console.log(this.invernaderos);
      })

  }
  ngOnChanges()
  {
    //this.changeAction();

  }

  changeAction(n1,n)
  {

   this.dropacutal=n1
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

  mandarPedidos()
  {
    this.ar.paramMap.subscribe((params: ParamMap) => {
      //console.log( params.get('cm'))
      let n = params.get('cm')
       this.rotuer.navigate(['/pedido/'+n]);
    })
  }

  viewPedidos()
  {
    this.ar.paramMap.subscribe((params: ParamMap) => {
      //console.log( params.get('cm'))
      let n = params.get('cm')
       this.rotuer.navigate(['/pedidoview/'+n]);
    })
  }

  traspasos()
  {
    this.rotuer.navigate(['traspaso']);
  }

}
