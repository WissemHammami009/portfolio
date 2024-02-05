/*
    Author: Wissem Hammami
    Github: wissemhammami009
    Website: https://wissem-hammami.web.app || www.wissem-hammami.info
    Email: hammamiwissem21@gmail.com
*/
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.css']
})
export class NewpasswordComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,private userServ:UserServiceService,private route:Router) { }
  textShow :Boolean =true
  token:String = ""
  ngOnInit(): void {
    Swal.showLoading()
    this.checktoken()
  }
  checktoken(){
    this.activatedRoute.params.subscribe(params => {
      if (typeof params['token'] !== 'undefined') {
          this.token = params['token'];
      }
      this.userServ.checktokkennewpass({token:this.token}).subscribe(resp=>{
        let res:any = resp
        if (res.verif.check == false) {
           this.textShow = false
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          html: 'Your provided token seems invalid or already used. Please review your email for the correct one.!',
          footer:"<a  href='/home'>Go back home</a>",
          allowEnterKey:true,
          allowEscapeKey:true,
          allowOutsideClick:true,
          showConfirmButton:false,
          showCancelButton:false,
        })
        }
        else {
          localStorage.setItem("id_pass",res.data.id_pass)
          Swal.close()

        }
      })

  })
  }

  newpasswordForm = new FormGroup({
    password: new FormControl('',[Validators.required,Validators.minLength(8)]),
    verifypassword: new FormControl('',[Validators.required,Validators.minLength(8)])
  })

  verifypassword(form:FormGroup){
    if (form.controls['password'].value != form.controls['verifypassword'].value) {
      return true
    }
    else {
      return false
    }
  }
  savenewpass(){
    Swal.showLoading()
    let json  ={
      pass: this.newpasswordForm.controls['password'].value ,
      id_pass : localStorage.getItem("id_pass")
    }
    this.userServ.setnewpass(json).subscribe(resp=>{
      let res:any = resp
      if (res.password_reset.reset == "Yes") {
        Swal.fire({
          icon: 'success',
          title: 'Password changed successfully',
          showConfirmButton: true,
          allowEscapeKey:false,
          allowEnterKey:false,
          allowOutsideClick:false,

      }).then((result)=>{
        localStorage.setItem('setpass',"true")
        this.route.navigate(['/signin'])
      })
      }
    })
  }

}
