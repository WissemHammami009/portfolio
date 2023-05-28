import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import words from "./words.json";
import link from "../global.json"
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { Title } from '@angular/platform-browser';
import { UserServiceService } from 'src/services/user-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  words:any = words
  constructor(private authservice:AuthService,private userservice:UserServiceService,private router:Router) { }
  signupForm = new FormGroup({
    name : new FormControl('',Validators.required),
    surname : new FormControl('',Validators.required),
    password : new FormControl('',Validators.required),
    email : new FormControl('',[Validators.required,Validators.email]),
    phone:new FormControl('',[Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(8),Validators.maxLength(8)]),
    birthdate : new FormControl('',Validators.required)
  })
  li:any
  links : any = link
  ngOnInit(): void {
    this.userservice.checkbackend_isup().subscribe()
    this.userservice.changeTitle("Yo Yo welcome - Portfolio.")
  }

  signup(){
    console.log(this.signupForm.value)
    this.authservice.signup(this.signupForm.value).subscribe(resp=>{
      this.li = resp 
      this.signupForm.reset()
      if (this.li.signup.added == "no") {
        Swal.fire({
          icon: 'info',
          title: 'Oops..! ',
          html: '<b>Email<b> already in use!',
          allowEnterKey:false,
          allowEscapeKey:false,
          allowOutsideClick:false
        }).then(res=>{
          this.router.navigate(['/signin'])
        })
      }
      else {
        Swal.fire({
          icon: 'success',
          title: 'Everthing is fine..!',
          html: 'We just keeping things ready to you &#128515;!',
          footer:'A confirmation email has been sent to you. Check your email and spam folders to complete the verification process.',
          allowOutsideClick:false,
          didOpen: () => {
            Swal.showLoading()
          }
        })
      }
    })
    
  }

}