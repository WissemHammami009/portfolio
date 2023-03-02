import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PortfolioService } from 'src/services/portfolio.service';
import { UserServiceService } from 'src/services/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http:HttpClient,private userservice:UserServiceService,private portfolio:PortfolioService) { }
  li:any
  ngOnInit(): void {
    this.userservice.changeTitle("Welcome - Portfolio")
    Swal.fire({
      title: 'loading Data From DataBase...',
    });
    Swal.showLoading(null);
      this.portfolio.getlastestportfolio().subscribe(resp=>{
        this.li = resp
      })
      Swal.close()
    
    }


}
