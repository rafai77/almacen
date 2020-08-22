import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbNav } from '@ng-bootstrap/ng-bootstrap';
import { LogService } from '../services/log.service';



@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css',]
})
export class BarComponent implements OnInit {

  private log:boolean=false;
  constructor(private servicelog:LogService,private rotuer:Router)
  {
    this.log=this.servicelog.checklog()
  }
  ngOnChanges()
  {
    this.checklog();
  }
  changeAction(Nombre)
  {
   this.rotuer.navigateByUrl('/Home/'+Nombre);
  }

  ngOnInit(): void {
    this.checklog()
  }
  checklog()
  {
    return this.log;
  }
  Logout()
  {
    this.servicelog.logout();
    this.rotuer.navigateByUrl('/Login');
  }
  nombre()
  {
    return this.servicelog.getnombre()
  }
  isNavbarCollapsed=true;

}
