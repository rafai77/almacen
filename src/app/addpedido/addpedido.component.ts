import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatosService } from '../services/datos.service';
import { LogService } from '../services/log.service';

@Component({
  selector: 'app-addpedido',
  templateUrl: './addpedido.component.html',
  styleUrls: ['./addpedido.component.css']
})
export class AddpedidoComponent implements OnInit {


  productos:[]

  constructor( public formatter: NgbDateParserFormatter,
    private logiS: LogService, private datos: DatosService, private router: Router,
    private ar: ActivatedRoute, private modalService: NgbModal) { }


  ngOnInit(): void {
    this.obtener();
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
    console.log(form.value,"d")

  }

}
