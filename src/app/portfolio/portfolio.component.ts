import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  li:any
  link:String = "http://localhost:4200/portfolio/"
  constructor(private http:HttpClient,private route: ActivatedRoute,private title:Title) { }
  json:any
  ngOnInit(): void {
    Swal.fire({
      title: 'loading Data From DataBase...',
    });
    Swal.showLoading(null);
    this.route.paramMap.subscribe(params => {
      this.json = {alias:params.get('id')}
  })
  console.log(this.json)
   this.http.post("http://localhost:3000/api/portfolio/profile",this.json).subscribe(resp=>{
    
   this.li = resp
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
      console.log(this.link)
      if (resp) {
        
      }
    })
  Swal.close()
   
  }

}
