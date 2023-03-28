import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import words from "./words.json";
import link from "../global.json"
import { AuthService } from '../../services/auth.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/services/user-service.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  words:any = words
  constructor(private authservice:AuthService,private router:Router,private userservice:UserServiceService) { }
  signinForm = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(8)])
  })
  li:any
  dashaccess:boolean = false
  passerror:boolean = false
  link : any = link

  ngOnInit(): void {
    this.userservice.changeTitle("Welcome back - Portfolio. ")
    this.userservice.checkbackend_isup().subscribe()
    if ( "notlogged" in localStorage) {
      localStorage.clear()
      this.dashaccess = true
    }
    if(this.authservice.checkalreadylogged()){
      Swal.fire({
        icon:"info",
        title:"Already logged!",
        text:"We will go to dashboard then..",
        allowEnterKey:false,
        allowEscapeKey:false,
        allowOutsideClick:false
      }).then(res=>{
        this.router.navigate(['dashboard'])
      })
    }
  }
  login(){
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
        
        Swal.fire({
          icon: 'success',
          title: 'Login successfully..!',
          html: 'We just keeping things ready to you  &#128515;!',
          didOpen: () => {
            Swal.showLoading(null)
          }
        })
        this.authservice.settokken(this.li.tokken,this.li.resp.fullname)
        localStorage.setItem('alias',this.li.resp.alias)
        localStorage.setItem('hashuser',this.li.resp.userhash)
        this.router.navigate(["dashboard"])
      }
    })
  }

}