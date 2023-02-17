import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  li :any
  constructor(private title:Title,private http:HttpClient) { }

  ngOnInit(): void {
    this.title.setTitle("Portfolio - Dashboard")
    localStorage.setItem("alias","wissemhammami");
    this.http.post("http://localhost:3000/api/portfolio/check/portfolio",{alias:localStorage.getItem('alias')}).subscribe(resp=>{
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
