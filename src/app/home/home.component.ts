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
  cms=[]
  Titulo=[]
  private tipo:string="ls"


  constructor(private datos:DatosService,private router:Router, private ar:ActivatedRoute)
  {
    this.dataSource = new MatTableDataSource()
  }

  tipos(x):void
  {
    this.tipo=x;
    console.log(x)
    this. datosinver();
    this.titulo()
    this.labels();
    this.obtener();
  }
  ngOnInit(): void
  {
    this.ar.paramMap.subscribe((params:ParamMap)=>
    {
      this.cm=params.get('cm');
      this. datosinver();
      this.titulo()
      this.labels();
      this.tipos("ls")
      this.obtener();
    });


  }

  datosinver()
  {
    this.datos.cms().subscribe((res:any)=>
    {
        let nombres
        let tablas
        nombres=res.map(item=> item.nombre)
        tablas=res.map(item=> item.nom2)
        let p=res.map(item=> item.planta)
        for (var i in nombres)
        {
          let c=""
          console.log();
          if(p[i]=='Pimiento')
          c="#0CAC1F"
          else
          c="#FF4933"
          this.cms.push({
            "nombre": nombres[i],
             "nom2": tablas[i],
             "color":c
          })
        }

         this.cms.push({
          "nombre": "Alamacen General",
          "nom2": "inventario",
          "color":"#000"
         })
         this.titulo()

    });
  }
  titulo()
  {
    console.log(this.cms)
    this.Titulo=[]
    for (var i in this.cms)
    {
      if(this.cms[i].nom2==this.cm)
            this.Titulo.push({
              "nombre":this.cms[i].nombre,
              "color":this.cms[i].color
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


  private labels()
  {

    var body={
      tabla:this.cm,
      tipo:this.tipo
    }
    this.datos.datos(body).subscribe( (res:any ) =>
    {
      this.productos=res.map(item=> item.producto)
      this.totales=res.map(item=> item.total)
    })


  }

  private grafica()
  {
    console.log(this.productos)
    var aux1=[]
    aux1=this.productos.map(function(item){
      return 0;
    })

    for (var i in this.productos)
    {
      this.getRandomColor()
      aux1[i]=this.color
    }
    Chart.helpers.each(Chart.instances, function (instance) {
      instance.destroy();
    });
      if (this.chart) this.chart.destroy();
    this.chart =new Chart('canvas',
      {
        type:'pie',
        data:{
          //datchart
          labels:this.productos,
          datasets:[
            {
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

      }).update();

  }

  obtener()
  {

    this.titulo()
    var body={
      tabla:this.cm,
      tipo:this.tipo
    }

    this.datos.datos(body).subscribe( (res:Datos [] ) =>
    {
      this.Data=res
      this.dataSource.data=res
      this.grafica();
    })

  }

}
