import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { EmailsServicesService } from 'src/services/emails-services.service';

@Component({
  selector: 'app-dash-nav',
  templateUrl: './dash-nav.component.html',
  styleUrls: ['./dash-nav.component.css']
})
export class DashNavComponent implements OnInit {
  @Input() active_sett: string = "nav-item";
  @Input() active_home: string = "nav-item";
  @Input() active_message:string = "nav-item"
  constructor(private auth:AuthService,private emailserv:EmailsServicesService) { }
  link:any
  li:any
  number:number=0
  ngOnInit(): void {
    this.link = "/portfolio/"+localStorage.getItem('alias')
    this.emailserv.countemails({hashuser:localStorage.getItem('hashuser')}).subscribe(resp=>{
      this.li = resp
      this.number = this.li.number
    })
  }

  logout(){
    this.auth.logout()
  }
}
