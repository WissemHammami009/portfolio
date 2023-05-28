import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AvatarimageService } from 'src/services/avatarimage.service';
import { PortfolioService } from 'src/services/portfolio.service';
import { UserServiceService } from 'src/services/user-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  li:any
  link:String = "https://free-portfolio.web.app/portfolio/"
  constructor(private avatarser:AvatarimageService,private http:HttpClient,private route: ActivatedRoute,private portfolioservice:PortfolioService, private title:Title,private userservice:UserServiceService) { }
  json:any
  imagedata:any
  ngOnInit(): void {
    
    this.userservice.checkbackend_isup().subscribe()
    Swal.fire({
      title: 'loading Data From DataBase...',
    });
    Swal.showLoading();
    this.route.paramMap.subscribe(params => {
      this.json = {alias:params.get('id')}
  })
    this.avatarser.getavatar(this.json).subscribe(resp=>{
      this.imagedata = resp
    })
    this.portfolioservice.getportfolio(this.json).subscribe(resp=>{
    this.li = resp
    console.log(this.li)
    this.title.setTitle(this.li.full_name)
    if (this.li.data == false) {
      Swal.close()
      Swal.fire({
        icon:"error",
        title: 'Oops..!',
        text:"No data found!",
        html:"<b>Try a valid link please!</b>",
        allowEnterKey:false,
        allowOutsideClick:false,
        showCancelButton:false,
        showConfirmButton:false
      });
      return
    }
    this.link = this.link+this.li.alias
      }) 
    Swal.close()
   
  }

}
