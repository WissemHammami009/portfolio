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
  ngOnInit(): void {
    this.link = "/portfolio/"+localStorage.getItem('alias')
    this.emailserv.countemails({alias:localStorage.getItem('alias')}).subscribe(resp=>{
      this.li = resp
    })
  }

  logout(){
    this.auth.logout()
  }
}
