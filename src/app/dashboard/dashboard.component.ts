import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  li :any
  link : any
  here = "nav-item active"
  constructor(private title:Title,private portfolioserv:PortfolioService,private router:Router) { }

  ngOnInit(): void {
    this.title.setTitle("Portfolio - Dashboard")
    
    this.portfolioserv.checkprotfolioexist({alias:localStorage.getItem('alias')}).subscribe(resp=>{
      this.li = resp
      if (this.li.data == false) {
        Swal.fire({
          icon:"info",
          title:"Information",
          html:"You don't have a portfolio here ..!"
        }).then(res=>{
          Swal.fire({
            title: 'Do you want to create one ?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Yes',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swal.showLoading(null)
              this.portfolioserv.createportfolio({alias:localStorage.getItem('alias')}).subscribe(resp=>{
                let res : any  = resp 
                if (res.code == 11000) {
                  Swal.fire({
                    icon:"error",
                    title:"Contact The developer for this issues",
                    allowEnterKey:false,
                    allowEscapeKey:false,
                    allowOutsideClick:false
                  })
                }
                else {
                  Swal.fire({
                    icon:"success",
                    title:"Information",
                    text:"Portfolio added now you can move to add your data and click on update"
                  }).then(res=>{
                    this.router.navigate(['/reload'])
                  })
                  this.router.navigate(['/reload'])
                }
              })
            }
          })
        })
      }
      
    })
  }

}
