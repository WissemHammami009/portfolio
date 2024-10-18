/*
    Author: Wissem Hammami
    Github: wissemhammami009
    Website: https://wissem-hammami.web.app || www.wissem-hammami.info
    Email: hammamiwissem21@gmail.com
*/
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import words from "./words.json";
import link from "../global.json"
import { AuthService } from '../services/auth.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
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
  remember = new FormControl(false)
  li:any
  dashaccess:boolean = false
  passerror:boolean = false
  setpass:boolean = false
  invalidtoken:boolean = false
  link : any = link
  check_remember(){
    if (this.remember.value == true ) {
      this.signinForm.controls['password'].reset();
    }
    else {
      this.signinForm.reset()
    }
  }
  ngOnInit(): void {
    this.userservice.changeTitle("Welcome back - Portfolio. ")
    this.userservice.checkbackend_isup().subscribe()

    if ("setpass" in localStorage) {
      this.setpass = true
      localStorage.removeItem("setpass")
    }
    if("invalidtoken" in localStorage){
      this.invalidtoken = true
      localStorage.removeItem("invalidtoken")
    }
    if ( "notlogged" in localStorage) {
      localStorage.clear()
      this.dashaccess = true
      this.authservice.clearApplication()
    }
    else if(this.authservice.checkalreadylogged()){
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
    else {
      this.authservice.clearApplication()
    }
  }

  login(){
    Swal.showLoading()
    this.authservice.login(this.signinForm.value).subscribe( async resp=>{
      this.li = resp
      console.log(resp)
      if (this.li.isLogged == false) {
        this.passerror = true
          Swal.fire({
            icon: 'info',
            title: 'Oops..!',
            html: 'Wrong authentification (<u>Password</u> or <u>Email</u>)! <br><b>Please try again!</b>',
            showConfirmButton:true
          }).then(result=>{
            this.check_remember()
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
            Swal.showLoading()
          }
        })
        await setTimeout(() => {
          this.router.navigate(["dashboard"])
        }, 3000);

        this.authservice.settokken(this.li.token,this.li.resp.fullname)
        localStorage.setItem('alias',this.li.resp.alias)
        localStorage.setItem('hashuser',this.li.resp.userhash)


        
      }
    })
  }

}
