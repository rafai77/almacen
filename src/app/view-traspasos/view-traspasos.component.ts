import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  ngOnInit(): void {
    this.obtener()

  }
  obtener()
  {
    this.datos.gettraspaso('cm1').subscribe((res:any)=>
    {
      console.log(res)
    })
  }

}
