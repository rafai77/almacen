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

  log:boolean=false;

  constructor(private servicelog:LogService,private rotuer:Router)
  {

  }

  ngOnChanges()
  {
    //this.changeAction();

  }

  changeAction(n)
  {
   this.rotuer.navigate(['/Home/'+n]);
  }

  ngOnInit(): void {
    this.servicelog.checklog().subscribe( (res)=>
    {
      console.log(res,"fdsgasdfga");
      this.log=res;
    }
    );
    console.log(this.log,"el buneo")

  }

  Logout()
  {
    this.log=false;
    this.servicelog.logout();
    this.rotuer.navigateByUrl('/Login');
  }
  nombre()
  {
    return this.servicelog.getnombre()
  }
  isNavbarCollapsed=true;

}
