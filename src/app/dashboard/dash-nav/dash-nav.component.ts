import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-dash-nav',
  templateUrl: './dash-nav.component.html',
  styleUrls: ['./dash-nav.component.css']
})
export class DashNavComponent implements OnInit {
  @Input() active_sett: string = "nav-item";
  @Input() active_home: string = "nav-item";
  constructor(private auth:AuthService) { }
  link:any
  
  ngOnInit(): void {
    this.link = "/portfolio/"+localStorage.getItem('alias')
    
  }

  logout(){
    this.auth.logout()
  }
}
