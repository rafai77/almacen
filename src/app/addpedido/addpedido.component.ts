import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { DatosService } from '../services/datos.service';
import { LogService } from '../services/log.service';

@Component({
  selector: 'app-addpedido',
  templateUrl: './addpedido.component.html',
  styleUrls: ['./addpedido.component.css']
})
export class AddpedidoComponent implements OnInit {

  porductoS=[]
  r:boolean=true;
  alert= [{type: 'danger',
  message: 'This is a danger alert',}]
  productos:[]

  private _success = new Subject<string>();
  constructor( public formatter: NgbDateParserFormatter,
    private logiS: LogService, private datos: DatosService, private router: Router,
    private ar: ActivatedRoute, private modalService: NgbModal) { }


  ngOnInit(): void {

    this.obtener();
    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = '');
  }

  obtener()
  {
    var body = {
      tabla: 'inventario',
      tipo: "ls"
    }
    this.datos.datos(body).subscribe((res:any)=>
      {
        this.productos=res.map(item=> item.producto)
        console.log(res);
      }
    );
  }
  mandar(form)
  {
    this.porductoS=form._directives.map(item=> (
      {
      "nombre":item.name,
      "valor":item.value}
      ) )
    console.log(this.porductoS)
   /*for(let i in form._directives)
    if(form._directives[i].value)
      this.productos.push( {form._directives[i].name : form._directives[i].value});
*/
  }

  close(alertt) {
    this.alert.splice(this.alert.indexOf(alertt), 1);
  }


  staticAlertClosed = false;
  successMessage = '';


  public changeSuccessMessage() {
    this._success.next(` Datos incompeltos`);
  }

}
