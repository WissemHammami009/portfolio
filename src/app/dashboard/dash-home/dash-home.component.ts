import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PortfolioService } from 'src/services/portfolio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dash-home',
  templateUrl: './dash-home.component.html',
  styleUrls: ['./dash-home.component.css']
})
export class DashHomeComponent implements OnInit {

  constructor(private portfolioserv:PortfolioService,private route:Router) { }
  //phone misssing !!!!!!!!!!!!!!
  headerupdateForm = new FormGroup({
    full_name : new FormControl(''),
    street : new FormControl(''),
    town : new FormControl(''),
    email : new FormControl(''),
    description: new FormControl(''),
    facebook: new FormControl(''),
    linkedin: new FormControl(''),
    github: new FormControl(''),
    phone: new FormControl(''),
    alias:new FormControl(''),
    image_url : new FormControl('')
  })
  li:any
  button : any  = "Update Header Information"
  ngOnInit(): void {
    Swal.fire({
      title: 'loading Data From DataBase...',
    });
    Swal.showLoading(null);
    this.getdata()
    Swal.close()
  }

  setForm(li:any){
    this.headerupdateForm.setValue({
      full_name:li.full_name,
      street:li.street,
      town:li.town,
      email:li.email,
      phone:li.phone,
      description:li.description,
      facebook:li.facebook,
      linkedin:li.linkedin,
      github:li.github,
      image_url:li.image_url,
      alias:localStorage.getItem('alias')
    })
  }

  getdata(){
    this.portfolioserv.getheader({alias:localStorage.getItem('alias')}).subscribe(resp=>{
      this.li = resp
      if (this.li.found == true) {
        this.setForm(this.li) 
      }
    })
  }
  updateheader(){
    
    Swal.fire({
      title: 'Running...',
    });
    Swal.showLoading(null);
    this.portfolioserv.updateheader(this.headerupdateForm.value).subscribe(resp=>{
      this.li = resp
      if (this.li.isModified == true) {
        Swal.fire({
          icon:"success",
          title:"Header Updated"
        }).then(result=>{
          this.ngOnInit()
        })
        
      }
      else {
        Swal.fire({
          icon:"error",
          title:"Header  not Updated",
          text:"Try again..!"
        })
      }
    })
  }




}
