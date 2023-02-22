import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import words from "./words.json";
import link from "../global.json"
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  words:any = words
  constructor(private authservice:AuthService) { }
  signinForm = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(8)])
  })
  li:any
  passerror:boolean = false
  link : any = link

  ngOnInit(): void {
  }
  login(){
    console.log(this.signinForm.value)
    this.authservice.login(this.signinForm.value).subscribe(resp=>{
      this.li = resp
      if (this.li.isLogged == false) {
        this.passerror = true
          Swal.fire({
            icon: 'info',
            title: 'Oops..!',
            html: 'Wrong authentification (<u>Password</u> or <u>Email</u>)! <br><b>Please try again!</b>',
            showConfirmButton:true
          }).then(result=>{
            this.signinForm.reset()
          })
      }
      else if (this.li.resp.confirm == "no"){
        Swal.fire({
          icon: 'info',
          title: 'Oops..!',
          html: 'You need to confirm your account first!<br> check your email..!',
          allowOutsideClick:false,
          showCloseButton:true
        }).then(result=>{
          this.signinForm.reset()
        })
      }
      else  {
        let str = this.signinForm.contains('name')
        Swal.fire({
          icon: 'success',
          title: 'Login successfully..!',
          html: 'We just keeping things ready to you  &#128515;!',
          didOpen: () => {
            Swal.showLoading(null)
          }
        })
      }
    })
  }

}
