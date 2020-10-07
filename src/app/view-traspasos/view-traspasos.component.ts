import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgbDateParserFormatter, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { DatosService } from '../services/datos.service';
import { LogService } from '../services/log.service';

@Component({
  selector: 'app-view-traspasos',
  templateUrl: './view-traspasos.component.html',
  styleUrls: ['./view-traspasos.component.css']
})
export class ViewTraspasosComponent implements OnInit {

  constructor(public formatter: NgbDateParserFormatter,
    private logiS: LogService, private datos: DatosService, private router: Router,
    private ar: ActivatedRoute, private modalService: NgbModal,
    config: NgbModalConfig,) { }
    cm=""
    trapasoP=[]
    trapasoE=[]//procesos para entregar 
    traspasoinfo=[]
    public myAngularxQrCode: string = null;
    rol=""

  ngOnInit(): void {
    this.ar.paramMap.subscribe((params: ParamMap) => {
      this.cm = params.get('cm');
      this.obtener();
      this.rol=this.logiS.setrol()
      // setTimeout(() => this.staticAlertClosed = true, 20000);
  
      // this._success.subscribe(message => this.successMessage = message);
      // this._success.pipe(
      //   debounceTime(5000)
      // ).subscribe(() => this.successMessage = '');
      });
    }
  

  separar(res)
  {
    let data_temporal=[]
    let aux=[]
    data_temporal=res;
    var hash = {};
    let x=data_temporal.filter( o => hash[o.id_traspasos] ? false : hash[o.id_traspasos] = true);
   
    for (let j in x)
      aux.push(data_temporal.filter(i=> (i.id_traspasos==x[j].id_traspasos)));
    return aux;
  }
  
  obtener()
  {
    this.datos.gettraspaso(this.cm).subscribe((res:any)=>
    {
      console.log(res)
      this.trapasoP=this.separar(res["datos"].filter( i =>(i.status=="proceso")))
      this.trapasoE=this.separar(res["datos"].filter( i =>(i.status=="Entregando")))
    })
  }

  entregado(id)
  {
    let aux=JSON.stringify(id[0])
   
    this.myAngularxQrCode = aux;
  }
  cambiarStatus(id)
  {
    this.obtener()
    console.error(id)
    this.datos.changetraspaso(id).subscribe((res:any)=>
    {
      console.log(res)
      this.obtener()
    })
    
  }
  close()
  {
    console.log("kjkdfhjk")
    this.obtener()
    this.modalService.dismissAll()
    this.obtener()
  }

  open(content,data)
  {
    this.traspasoinfo=data
    let aux=JSON.stringify(data[0])
    
    this.myAngularxQrCode = aux;
    this.modalService.open(content);
    this.obtener()
  }

}
    