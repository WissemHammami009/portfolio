import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lost-password',
  templateUrl: './lost-password.component.html',
  styleUrls: ['./lost-password.component.css']
})
export class LostPasswordComponent implements OnInit {

  constructor(private authservice:AuthService) { }
  showsent:boolean = false
  shownotsent:boolean = false
  ngOnInit(): void {
  }
  email = new FormControl('',[Validators.required,Validators.email])

  sendemail(){
    this.authservice.passwordlost({email:this.email.value}).subscribe(resp=>{
      let li:any = resp 
      if (li.password_reset.alias == "not sent") {
        Swal.fire({
          icon:"error",
          title:"Sorry..!",
          html:"Mail does not exist! verif it and try again."
        })
        this.shownotsent =true
      }
      else{
        Swal.fire({
          icon:"success",
          title:"Success..! ",
          html:"Mail sent!"
        })
        this.showsent =true
      }
    })
  }
}
