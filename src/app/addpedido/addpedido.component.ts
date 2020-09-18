import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { DatosService } from '../services/datos.service';
import { LogService } from '../services/log.service';





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
      <h1>Pedidos:</h1>
      <ul class="list-group">
        <li *ngFor="let i of producto">{{i}}</li>
      </ul>


    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class NgbdModalContent implements OnInit {

  @Input() producto=[];
  @Input() valor=[];





  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal) { }
  ngOnInit(): void {
   // throw new Error('Method not implemented.');
  }
}


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
  staticAlertClosed = false;
  successMessage = '';


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
    this.porductoS=form._directives.map(item=> item.name)
    //console.log(this.porductoS)
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.producto = this.porductoS;

  }

  close(alertt) {
    this.alert.splice(this.alert.indexOf(alertt), 1);
  }

  public changeSuccessMessage() {
    this._success.next(` Datos incompeltos`);
  }

}
