/*
    Author: Wissem Hammami
    Github: wissemhammami009
    Website: https://wissem-hammami.web.app || www.wissem-hammami.info
    Email: hammamiwissem21@gmail.com
*/
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit ,OnDestroy, OnChanges, SimpleChanges,} from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(private userservice:UserServiceService,private portfolio:PortfolioService) { }

  li:any
   ngOnInit():void {
      this.userservice.changeTitle("Welcome - Portfolio")
      Swal.fire({
        title: 'loading Data From DataBase...',
      });
      Swal.showLoading();
      this.userservice.checkbackend_isup().subscribe()
      this.get_data()
      Swal.close()

    }


    get_data(){
      this.portfolio.getlastestportfolio().subscribe(resp=>{
          this.li = resp
        })
    }


}
