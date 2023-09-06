import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import links from "../services/links.json"
import { UserServiceService } from 'src/app/services/user-service.service';
@Component({
  selector: 'app-confirmacc',
  templateUrl: './confirmacc.component.html',
  styleUrls: ['./confirmacc.component.css']
})
export class ConfirmaccComponent implements OnInit {

  constructor(private UserServ:UserServiceService,private route:ActivatedRoute,private router: Router) { }
  id:any
  links:any = links
  li:any
  ngOnInit(): void {
    Swal.fire({
      title: 'loading Data From DataBase...',
    });
    Swal.showLoading();
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')
  })
    this.UserServ.confirmaccount(this.id).subscribe(resp=>{
      this.li = resp
      if (this.li.confirm.confirm == "yes") {
        Swal.fire({
          icon:"success",
          title: 'Done..!',
          text:"Account confirmed..!",
          showConfirmButton:true,
          allowOutsideClick:false
        }).then(resul=>{
          this.router.navigate(["/signin"])
        });;
      }
      else {
        Swal.fire({
          icon:"error",
          title: 'Oops..!',
          text:"Account not confirmed..!",
          html:"Check your email or contact the developer..!",
          showConfirmButton:true,
          allowOutsideClick:false
        }).then(resul=>{
          this.router.navigate(["/signin"])
        });

      }
    })
  }

}
