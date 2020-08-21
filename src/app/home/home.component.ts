import {Component, OnInit, ViewChild,AfterViewInit} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table'
import {MatPaginator} from '@angular/material/paginator';
import { DatosService } from '../services/datos.service';
import { Routes, RouterModule, Router } from '@angular/router';
import { Datos } from "../model/Datos";
import {Chart} from 'chart.js'




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dropvalue:string//valor actual del drop del invernadero
  displayedColumns: string[]=['id_producto','producto','total','unidad'];
  dataSource = new MatTableDataSource();
  public chart:Chart
  productos:string[]=[]
  totales:number[]
  colores:string[]
  color="";


  constructor(private datos:DatosService,private router:Router) { this.dataSource = new MatTableDataSource()  }

  ngOnInit(): void
  {
    this.obtener();
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
        this.color = "#";
        for (var i = 0; i < 6; i++) {

          this.color += letters[Math.floor(Math.random() * 16)];
        }

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
    this.datos.productos(body).subscribe((res:string[]) => {
      console.log(res)
      var aux1=[];
      var aux2=[];
      var aux3=[];
      for (var i in res)
      {
        this.getRandomColor()
        aux1.push(res[i]['producto'])
        aux2.push(res[i]['total'])
        aux3.push(this.color)
      }
      this.productos=aux1;
      this.totales=aux2;
      this.colores=aux3;
      console.log(this.productos)
      console.log(this.totales)
      console.log(this.colores)


      this.chart =new Chart('canvas',
      {
        type:'bar',
        data:{
          labels:this.productos,
          datasets:[{
            label:'Productos',
            data:this.totales,
            backgroundColor:this.colores
          }],
          options:
          {
            title:{
              display:true,
              text:"Productos del almacen",
              fontSize:30,


            },
            legend:{
              position:'bottom',
              labels:
              {
                padding:20,
                fontFamily:'system-ui',
                fontColor:'black'
              }

            },
            tooltips:
            {
              backgroundColor:'#05b4f6',
              mode:'x'
            },
            elements:
            {
              line:{
                borderWidth:4,
                fill:false
              },
              point:{
                radius:6,
                borderWidth:4,
                backgroundColor:'white',
                hoverRadius:8
              }
            }
          }
        },
      });
    })
  }

}
