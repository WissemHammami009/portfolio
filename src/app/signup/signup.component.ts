import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import words from "./words.json";
import link from "../global.json"
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { Title } from '@angular/platform-browser';
import { UserServiceService } from 'src/services/user-service.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  words:any = words
  constructor(private authservice:AuthService,private userservice:UserServiceService) { }
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
          html: '<b>Email<b> already in use!'
        })
      }
      else {
        Swal.fire({
          icon: 'success',
          title: 'Everthing is fine..!',
          html: 'We just keeping things ready to you &#128515;!',
          allowOutsideClick:false,
          didOpen: () => {
            Swal.showLoading(null)
          }
        })
      }
    })
    
  }

}
