import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { SwPush } from '@angular/service-worker';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbTypeaheadWindow } from '@ng-bootstrap/ng-bootstrap/typeahead/typeahead-window';
import { Subject } from 'rxjs';
import { Datos } from '../model/Datos';
import { DatosService } from '../services/datos.service';
import { LogService } from '../services/log.service';

@Component({
  selector: 'app-traspasos',
  templateUrl: './traspasos.component.html',
  styleUrls: ['./traspasos.component.css']
})
export class TraspasosComponent implements OnInit {

  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  mensajeError=""
  private _success = new Subject<string>();
  alert= [{type: 'danger',
  message: 'This is a danger alert',}]
  staticAlertClosed: boolean;
  displayedColumns: string[] = ['id_producto', 'producto', 'total', 'unidad'];
  dataSource = new MatTableDataSource();
  dataSource2 = new MatTableDataSource();
  hoveredDate: NgbDate | null = null;
  Data: Datos[]
  private tipo: string = "ls"
  cm: string = "inventario"
  cm2:string="cm1"
  cms2=[]
  cms3=[]
  cms=[]
  Titulo=[]
  dropacutal;
  dropacutal2;

  Titulo2=[]

  constructor( private swpush:SwPush,private calendar: NgbCalendar, public formatter: NgbDateParserFormatter,
    private logiS: LogService, private datos: DatosService, private router: Router,
    private ar: ActivatedRoute, private modalService: NgbModal,)
    {
      this.dataSource = new MatTableDataSource()
      this.dataSource2 = new MatTableDataSource()
      let x = new Date()
      //this.fromDate = calendar.getPrev(calendar.getToday(), 'd', calendar.getToday().day - 1)
      //this.toDate = calendar.getNext(calendar.getToday(), 'd', 2);
    }

  ngOnInit(): void {
    this.datosdrop();
    this.datosdrop2();
    this.origen();
    this.destino();

  }

  origen()
  {

    var body = {
      tabla: this.cm,
      tipo: this.tipo
    }


    this.datos.datos(body).subscribe((res: Datos[]) => {
      this.titulo()
      this.datosinver()

      this.dataSource.data = res

    })

  }

  destino()
  {

    var body = {
      tabla: this.cm2,
      tipo: this.tipo
    }

    this.datos.datos(body).subscribe((res: Datos[]) => {
    this.titulo2

    this.datosinver2()

      //console.log(res);
      this.Data = res
      this.dataSource2.data = res

    })
  }

  datosinver() {
    this.datos.cms().subscribe((res: any) => {
      let nombres
      let tablas
      nombres = res.map(item => item.nombre)
      tablas = res.map(item => item.nom2)
      let p = res.map(item => item.planta)
      for (var i in nombres) {
        let c = ""
        if (p[i] == 'Pimiento')
          c = "#0CAC1F"
        else
          c = "#FF4933"
        this.cms.push({
          "nombre": nombres[i],
          "nom2": tablas[i],
          "color": c
        })
      }

      this.cms.push({
        "nombre": "Alamacen General",
        "nom2": "inventario",
        "color": "#000"
      })
      this.titulo()
      this.titulo2()


    });
  }


  datosinver2() {
    this.datos.cms2().subscribe((res: any) => {
      let nombres
      let tablas
      nombres = res.map(item => item.nombre)
      tablas = res.map(item => item.nom2)
      let p = res.map(item => item.planta)
      for (var i in nombres) {
        let c = ""
        if (p[i] == 'Pimiento')
          c = "#0CAC1F"
        else
          c = "#FF4933"
        this.cms.push({
          "nombre": nombres[i],
          "nom2": tablas[i],
          "color": c
        })
      }

      this.cms.push({
        "nombre": "Alamacen General",
        "nom2": "inventario",
        "color": "#000"
      })
      this.titulo()
      this.titulo2()


    });
  }

  titulo() {

    this.Titulo = []
    for (var i in this.cms) {
      if (this.cms[i].nom2 == this.cm)
        this.Titulo.push({
          "nombre": this.cms[i].nombre,
          "color": this.cms[i].color
        });

    }

  }
  titulo2() {

    this.Titulo2 = []
    for (var i in this.cms) {
      if (this.cms[i].nom2 == this.cm2)
        this.Titulo2.push({
          "nombre": this.cms[i].nombre,
          "color": this.cms[i].color
        });

    }

  }

  mandar(form)
  {
    let c=[]
    let newv=[] //nuevos valores
    for (let i in form._directives)
    {

      newv.push({nombre:this.Data[i].producto,valor:form._directives[i].value})
    }
     console.log(c)

    this.datos.settraspaso(this.Titulo2[0].nombre,this.Titulo[0].nombre,newv).subscribe((res:any)=>
    {
      console.log(res)
      this.router.navigate(['/traspasoview/']);
    });
  }

  pos()// posicion del drop para sacar lo invernaderos
  {
    for (var i in this.cms2)
      if(this.cms2[i].nombre==this.dropacutal)
        return i

    return -1
  }
  datosdrop()
  {
    this.datos.cms2().subscribe((res:any)=>
      {
        let nombres
        let tablas
        //console.log(res)
        nombres=res.map(item=> item.nombre)
        tablas=res.map(item=> item.nom2)
        for (var i in nombres)
         this.cms2.push({
           "nombre": nombres[i],
            "nom2": tablas[i]
         })
         this.pos()

        //console.log(this.invernaderos);
      })

  }

  pos2()// posicion del drop para sacar lo invernaderos
  {
    for (var i in this.cms3)
      if(this.cms3[i].nombre==this.dropacutal2)
        return i

    return -1
  }
  datosdrop2()
  {
    this.datos.cms().subscribe((res:any)=>
      {
        console.log(res)
        let nombres
        let tablas
        //console.log(res)
        nombres=res.map(item=> item.nombre)
        tablas=res.map(item=> item.nom2)
        for (var i in nombres)
         this.cms3.push({
           "nombre": nombres[i],
            "nom2": tablas[i]
         })
         this.pos2()

        //console.log(this.invernaderos);
      })

  }

  changeAction(n1,n)
  {

    console.log(n1,n)
    this.cm=n;
    this.origen()
   //this.dropacutal=n1


  }

  changeAction2(n1,n)
  {
    this.cm2=n;
    this.destino();
   //this.dropacutal=n1


  }


}
