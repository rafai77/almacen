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

    var body = {
      tabla: this.cm,
      tipo: this.tipo
    }

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

    this.datos.datos(body).subscribe((res: Datos[]) => {

      //console.log(res);
      this.dataSource2.data = res

    })


  }
}
