import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { SwPush } from '@angular/service-worker';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  cm2: string = "cm1"
  cms=[]
  Titulo=[]

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
    this.origen();
    this.destino();

  }

  origen()
  {
    this.datosinver()
    var body = {
      tabla: this.cm,
      tipo: this.tipo
    }
    this.titulo()

    this.datos.datos(body).subscribe((res: Datos[]) => {

      this.Data = res
      this.dataSource.data = res

    })

  }

  destino()
  {

    var body = {
      tabla: this.cm2,
      tipo: this.tipo
    }

    this.titulo2
    this.datos.datos(body).subscribe((res: Datos[]) => {

    this.datosinver()

      //console.log(res);
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

}
