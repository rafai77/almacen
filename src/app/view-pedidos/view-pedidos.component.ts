import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DatosService } from '../services/datos.service';
import { LogService } from '../services/log.service';

@Component({
  selector: 'app-view-pedidos',
  templateUrl: './view-pedidos.component.html',
  styleUrls: ['./view-pedidos.component.css']
})
export class ViewPedidosComponent implements OnInit {

  constructor( public formatter: NgbDateParserFormatter,
    private logiS: LogService, private datos: DatosService, private router: Router,
    private ar: ActivatedRoute, private modalService: NgbModal) {
    }

  cm="";
  alert= [{type: 'danger',
  message: 'This is a danger alert',}]
  staticAlertClosed = false;
  successMessage = '';
  private _success = new Subject<string>();
  ordenenproceso=[]

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
      console.log(res);
      preordenenproceso=res.map((i)=>{
        if(i.status=='Revision')
        return i
      })
      let tam=preordenenproceso.length/26
      for (let i=0;i<tam;i++)
      {
       console.log((26*i),(i*26)+26)
       let aux=(preordenenproceso.splice(0,(i*26)+26))
        this.ordenenproceso.push(aux)
      }
      console.log(this.ordenenproceso)



    });
  }





}
