import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { PortfolioService } from 'src/app/services/portfolio.service';
import Swal from 'sweetalert2';
import link from '../../global.json'
@Component({
  selector: 'app-dash-interest',
  templateUrl: './dash-interest.component.html',
  styleUrls: ['./dash-interest.component.css']
})
export class DashInterestComponent implements OnInit {

  constructor(private portfolioserv:PortfolioService  ,private title:Title) { }
  link : any = link
  li:any
  interest = new FormControl('')
  ngOnInit(): void {
    Swal.fire({
      title: 'loading Data From DataBase...',
    });
    Swal.showLoading();
    this.getdata()
    Swal.close()

  }

  getdata(){
    this.portfolioserv.getinterest({alias:localStorage.getItem('alias')}).subscribe(resp=>{
      this.li = resp
      this.interest.setValue(this.li.interest);
    })
  }

  updateinterest(){
    Swal.fire({
      title: 'Running...',
    });
    Swal.showLoading();
    let json = {alias:localStorage.getItem('alias'),interest:this.interest.value}
    this.portfolioserv.updateinterest(json).subscribe(resp=>{
      this.li = resp
      if (this.li.isModified == true) {
        Swal.fire({
          icon:"success",
          title:"Interest Section Updated"
        }).then(result=>{
          this.ngOnInit()
        })

      }
      else {
        Swal.fire({
          icon:"error",
          title:"Interest Section not Updated",
          text:"Try again..!"
        })
      }
    })
  }
}
