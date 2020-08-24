import { Component, OnInit } from '@angular/core';
import { LogService} from '../services/log.service'
import { Routes, RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  constructor(private servicelog:LogService,private rotuer:Router) { }


  ngOnInit(): void {

  }

    login(form):void
    {
      this.servicelog.login(form.value).subscribe(res=>
        {
          (res.log==false)?console.log("nel"):this.rotuer.navigateByUrl('/Home/inventario');
        }
        );
    }
}
