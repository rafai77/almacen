import {Component, OnInit, ViewChild,AfterViewInit} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table'
import {MatPaginator} from '@angular/material/paginator';
import { DatosService } from '../services/datos.service';
import { Routes, RouterModule, Router } from '@angular/router';
import { Datos } from "../model/Datos";



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dropvalue:string//valor actual del drop del invernadero
  displayedColumns: string[]=['id_producto','producto','total','unidad'];
  dataSource = new MatTableDataSource();
  constructor(private datos:DatosService,private router:Router) { this.dataSource = new MatTableDataSource()  }

  ngOnInit(): void
  {
    this.obtener();
  }

  obtener()
  {
    var body={
      tabla:'inventario',
      tipo:null
    }
    this.datos.datos(body).subscribe( (res:Datos [] ) =>
    {
      console.log(res)
      this.dataSource.data=res
    });
  }

}
