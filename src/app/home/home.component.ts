import { Component, OnInit, ViewChild, AfterViewInit, SimpleChanges, Input } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator';
import { DatosService } from '../services/datos.service';
import { Routes, RouterModule, Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Datos } from "../model/Datos";
import { Chart } from 'chart.js'
import { LogService } from '../services/log.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {NgbDate, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h1 class="modal-title">Formula del dia de hoy</h1>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <h1>Formula:</h1>
      <li>{{formula}}</li>
      <p></p>
      <a style="background-color: #B6D7DE;">Numero de aplicaciones que se pueden realizar: {{can}}</a>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class NgbdModalContent {

  @Input() formula: [];
  @Input() can;



  constructor(public activeModal: NgbActiveModal) { }
}






@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dropvalue: string//valor actual del drop del invernadero
  displayedColumns: string[] = ['id_producto', 'producto', 'total', 'unidad'];
  dataSource = new MatTableDataSource();
  public chart: Chart
  productos: string[] = []
  totales: number[]
  colores: string[]
  color = "";
  datachar = []
  Data: Datos[]
  cm: string = "inventario"
  cms = []
  Titulo = []
  productosf: any[];
  cantidadesf: any[];
  private tipo: string = "ls"

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;


  constructor(private calendar: NgbCalendar, public formatter: NgbDateParserFormatter,private logiS: LogService, private datos: DatosService, private router: Router, private ar: ActivatedRoute, private modalService: NgbModal) {
    this.dataSource = new MatTableDataSource()
    let x=new Date()
    this.fromDate = calendar.getPrev(calendar.getToday(), 'd',calendar.getToday().day-1  )
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 2);
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }


  tipos(x): void {
    this.tipo = x;
    this.datosinver();
    this.titulo()
    this.labels();
    this.obtener();
  }
  ngOnInit(): void {
    //this.formulaView();
    this.ar.paramMap.subscribe((params: ParamMap) => {

      this.logiS.cad()
      this.cm = params.get('cm');
      this.chartconsumo();
      this.formulaView();
      //this.formulaView();
      this.datosinver();
      this.titulo()
      this.labels();
      this.tipos("ls")
      this.obtener();

    });


  }
  calcularformula() {
    var canformula = []//cantidad de formula a apliacar
    //console.log(this.Data)
    for (var i in this.productosf) {
      for (var j in this.Data) {
        if (this.productosf[i] == this.Data[j].producto) {
          let x = this.Data[j].total
          canformula.push(Math.round(x / this.cantidadesf[i]));
        }

      }
    }
    //canformula=canformula.sort();
    canformula.sort((a, b) => a - b)
    return canformula[0];
  }


  Viewformula() {
    var formula: string = ""
    this.calcularformula()
    for (var i = 0; i < this.productosf.length; i++) {
      formula += "( " + this.productosf[i] + "=" + this.cantidadesf[i] + " )\n ";
    }
    //console.log(formula)
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.formula = formula
    modalRef.componentInstance.can = this.calcularformula()
  }
  formulaView() {
    if (this.cm != 'inventario')
      this.datos.formulaView(this.cm).subscribe((res: any) => {
        //console.log(res);
        this.productosf = res.map(i => i.producto)
        this.cantidadesf = res.map(i => i.cantidad)
      }
      );
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

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    this.color = "#";
    for (var i = 0; i < 6; i++) {

      this.color += letters[Math.floor(Math.random() * 16)];
    }

  }


  private labels() {

    var body = {
      tabla: this.cm,
      tipo: this.tipo
    }
    this.datos.datos(body).subscribe((res: any) => {
      this.productos = res.map(item => item.producto)
      this.totales = res.map(item => item.total)
    })


  }

  private grafica() {
    var aux1 = []
    aux1 = this.productos.map(function (item) {
      return 0;
    })

    for (var i in this.productos) {
      this.getRandomColor()
      aux1[i] = this.color
    }
    Chart.helpers.each(Chart.instances, function (instance) {
      instance.destroy();
    });
    if (this.chart) this.chart.destroy();
    this.chart = new Chart('canvas',
      {
        type: 'pie',
        data: {
          //datchart
          labels: this.productos,
          datasets: [
            {
              data: this.totales,
              borderColor: aux1,
              backgroundColor: aux1
            }
          ]

          //datasets:this.totales

        },
        options:
        {
          title: {
            display: true,
            text: "Almacen General",
            fontSize: 30,


          },
        }

      }).update();

  }
  aplicarformula() {

    console.log(this.cantidadesf, this.cantidadesf)
    this.datos.mandarformula(this.cantidadesf, this.productosf, this.cm).subscribe((res: any) => {

      console.log(res);
    });
  }

  obtener() {
    this.chartconsumo();
    this.titulo()
    var body = {
      tabla: this.cm,
      tipo: this.tipo
    }

    this.datos.datos(body).subscribe((res: Datos[]) => {
      this.Data = res
      this.dataSource.data = res
      this.grafica();
    })

  }


  //datos para la  grafica
  chartconsumo()
  {
    this.datos.chartconsumo(this.cm).subscribe((res:any)=>
    {
     console.log(res);
    // var dias =;

    });

  }
}
