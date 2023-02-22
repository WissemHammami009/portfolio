import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { PortfolioService } from '../services/portfolio.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  li :any
  constructor(private title:Title,private portfolioserv:PortfolioService) { }

  ngOnInit(): void {
    this.title.setTitle("Portfolio - Dashboard")
    localStorage.setItem("alias","wissemhammami");
    this.portfolioserv.checkprotfolioexist({alias:localStorage.getItem('alias')}).subscribe(resp=>{
      this.li = resp
      if (this.li.data == false) {
        Swal.fire({
          icon:"info",
          title:"Information",
          html:"You need to create a new portfolio by add all information and add data..!"
        })
      }
    })
  }

}
