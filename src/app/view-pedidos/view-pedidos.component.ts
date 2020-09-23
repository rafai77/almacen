import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DatosService } from '../services/datos.service';
import { LogService } from '../services/log.service';
import { NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-view-pedidos',
  templateUrl: './view-pedidos.component.html',
  styleUrls: ['./view-pedidos.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class ViewPedidosComponent implements OnInit {

  constructor( public formatter: NgbDateParserFormatter,
    private logiS: LogService, private datos: DatosService, private router: Router,
    private ar: ActivatedRoute, private modalService: NgbModal,
    config: NgbModalConfig,) {
      config.backdrop = 'static';
      config.keyboard = false;
    }

  cm="";
  pedidotem=[]
  alert= [{type: 'danger',
  message: 'This is a danger alert',}]
  staticAlertClosed = false;
  successMessage = '';
  private _success = new Subject<string>();
  ordenenproceso=[]
  ordenenaprob=[]

  ngOnInit(): void {

    this.ar.paramMap.subscribe((params: ParamMap) => {
    this.cm = params.get('cm');
    this.obtener();
    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = '');
    });
  }

  close(alertt) {
    this.alert.splice(this.alert.indexOf(alertt), 1);
  }

  public changeSuccessMessage() {
    this._success.next(` Datos incompeltos`);
  }

  obtener()
  {
    this.datos.getpedidos(this.cm).subscribe((res:any)=>
    {
      var preordenenproceso=[]
      var preordenenaprob=[]
      console.log(res);
      //preordenenproceso=res.filter( i =>(i.status=="Revision"))
      //preordenenaprob=res.filter( i =>(i.status=="Aprobado"))
      this.ordenenproceso=this.separar(res.filter( i =>(i.status=="Revision")));
      this.ordenenaprob=this.separar(res.filter( i =>(i.status=="Aprobado")));
    });
  }

  private separar(list)
  {
    let auxl=[]
    let tam=list.length/26

      for (let i=0;i<tam;i++)
      {

       let aux=(list.splice(0,26) )
       auxl.push(aux)
       aux=[]
      }
      return auxl;
  }

  validar(dat)
  {
    this.datos.change(dat,"Aprobado").subscribe((res:any)=>
    {
      console.log(res);

      this.obtener();
    }
    );
  }
  open(content,data) {
    this.pedidotem=data;
   // console.log(data);
    this.modalService.open(content);
  }

  productollego(form)
  {
    console.log(form)

  }



}
