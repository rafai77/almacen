import {Component, OnInit, ViewChild,AfterViewInit, SimpleChanges} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table'
import {MatPaginator} from '@angular/material/paginator';
import { DatosService } from '../services/datos.service';
import { Routes, RouterModule, Router, ActivatedRoute, ParamMap } from '@angular/router';
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
  datachar=[]
  Data:Datos[]
  cm:string



  constructor(private datos:DatosService,private router:Router, private ar:ActivatedRoute)
  {
    this.dataSource = new MatTableDataSource()
  }

  ngOnInit(): void
  {
    this.ar.paramMap.subscribe((params:ParamMap)=>
    {
      this.cm=params.get('cm');
      this.labels();
      this.obtener();
    });


  }


  getRandomColor() {
    var letters = '0123456789ABCDEF';
        this.color = "#";
        for (var i = 0; i < 6; i++) {

          this.color += letters[Math.floor(Math.random() * 16)];
        }

  }


  private labels()
  {

    var body={
      tabla:this.cm,
      tipo:'solido'
    }
    this.datos.datos(body).subscribe( (res:any ) =>
    {
      this.productos=res.map(item=> item.producto)
      this.totales=res.map(item=> item.total)
    })


  }

  private grafica()
  {

    var aux1=[]
    aux1=this.productos.map(function(item){
      return 0;
    })

    for (var i in this.productos)
    {
      this.getRandomColor()
      aux1[i]=this.color
    }

    this.chart =new Chart('canvas',
      {
        type:'pie',
        data:{
          //datchart
          labels:this.productos,
          datasets:[
            {label:"ds",
            data:this.totales,
            borderColor:aux1,
            backgroundColor:aux1
            }
          ]

          //datasets:this.totales

        },
        options:
        {
          title:{
            display:true,
            text:"Almacen General",
            fontSize:30,


          },
        }

      });

  }

  obtener()
  {

    var body={
      tabla:this.cm,
      tipo:'solido'
    }
    console.log(body)
    this.datos.datos(body).subscribe( (res:Datos [] ) =>
    {
      this.Data=res
      console.log(res)
      this.dataSource.data=res
      console.log(this.productos)
      console.log(this.totales)
      this.grafica();
    })

  }

}
