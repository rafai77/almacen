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

  ngOnInit(): void {
    this.ar.paramMap.subscribe((params: ParamMap) => {
      this.cm = params.get('cm');
      this.obtener();
      // setTimeout(() => this.staticAlertClosed = true, 20000);
  
      // this._success.subscribe(message => this.successMessage = message);
      // this._success.pipe(
      //   debounceTime(5000)
      // ).subscribe(() => this.successMessage = '');
      });
    }
  

  
  obtener()
  {
    this.datos.gettraspaso(this.cm).subscribe((res:any)=>
    {
      
      let data_temporal=[]
      data_temporal=res["datos"].filter( i =>(i.status=="proceso"));
      var hash = {};
      
      let x=data_temporal.filter( o => hash[o.id_traspasos] ? false : hash[o.id_traspasos] = true);
      console.log(x);
      for (let j in x)
       this.trapasoP.push(data_temporal.filter(i=> (i.id_traspasos==x[j].id_traspasos)));
      console.log(this.trapasoP)
    })
  }

}
    