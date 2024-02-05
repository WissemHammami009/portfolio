import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AvatarimageService } from 'src/app/services/avatarimage.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private avatarser:AvatarimageService,private userinfo:UserServiceService, private userservice:UserServiceService,private authservice:AuthService,private router:Router) { }
  li:any
  show_already :boolean = false
  show_nochanges : boolean =false

  show_already_email :boolean = false
  show_nochanges_email : boolean =false
  show_success_email :boolean = false

  imagedata:any
  updateForm = new FormGroup({
    fullname : new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z ]+$")]),
    email : new FormControl('',[Validators.required,Validators.email]),
    phone:new FormControl('',[Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(8),Validators.maxLength(8)]),
    birthdate : new FormControl('',Validators.required)
  })
  passwordForm = new FormGroup({
    userhash: new FormControl(localStorage.getItem('hashuser')),
    old_pass: new FormControl(''),
    new_pass: new FormControl(''),
    confirm_pass: new FormControl(''),
  })
  alias = new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z0-9-]+$")])
  email = new FormControl('',[Validators.required,Validators.email])
  here = "nav-item active"
  ngOnInit(): void {
    Swal.showLoading()
    this.userservice.checkbackend_isup().subscribe()
    if (this.authservice.checkalreadylogged() == false){
      localStorage.setItem('notlogged',"yes")
      this.router.navigate(['/signin'])

    }
    this.getdata()
    Swal.close()
  }


  getdata(){
    Swal.showLoading()
    let json = {alias:localStorage.getItem('alias')}
    this.avatarser.getavatar(json).subscribe(resp=>{
      this.imagedata = resp
    })
    this.userinfo.aboutuser({alias:localStorage.getItem('alias')}).subscribe(resp=>{
      this.li = resp
      this.updateForm.patchValue({
        fullname:this.li.fullname,
        phone:this.li.phone,
        email:this.li.email.oldEmail,
        birthdate:this.li.birthdate
      })
      this.alias.patchValue(this.li.alias)
      this.email.patchValue(this.li.email.oldEmail)
    })
    Swal.close()
  }

  update(){
    Swal.fire({
      title: 'Running!',
    })
    Swal.showLoading()
    if (this.test_datachanges() == true) {
      Swal.fire({
        icon:"info",
        title:"Information",
        text:"You need to change something to make an update!"
      })
      return
    }
    else {
      this.userservice.updateuser(this.updateForm.value).subscribe(resp=>{
        let li_temp : any  = resp
        if (li_temp.isModified == true) {
          Swal.fire({
            icon:"success",
            title:"Profile updated"
          })
          this.ngOnInit()
        }
        else {
          Swal.fire({
            icon:"error",
            title:"Profile not Updated",
            text:"Try again..!"
          })
        }
      })
    }
  }

  test_datachanges(){
    let test_fullname = this.li.fullname == this.updateForm.controls['fullname'].value
    let test_phone = this.li.phone == this.updateForm.controls['phone'].value
    let test_birthdate = this.li.birthdate == this.updateForm.controls['birthdate'].value
    let test_email = this.li.email == this.updateForm.controls['email'].value
    if (test_birthdate && test_fullname && test_phone && test_email)
      return true
    else
    return false
  }

  updatealias(){
    let json = {alias_old:this.li.alias,alias_new:this.alias.value}
    if (this.li.alias == this.alias.value) {
      this.show_nochanges = true
    }
    else {
      Swal.fire({
        title: 'Do you want to save the changes?',
        html:"<div class='alert alert-warning'>Changes are going to make a new link to your portfolio.</div>",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire({
            title:"Updating.."
          })
          Swal.showLoading()
          this.userservice.updatealias(json).subscribe(resp=>{
            let li_temp : any = resp
            if (li_temp.code == 200) {
              if (li_temp.modified == 1) {
                Swal.fire({
                  icon:"success",
                  title:"Username updated",
                  text:"You need to re-signin to make changes",
                  allowEnterKey:false,
                  allowEscapeKey:false,
                  allowOutsideClick:false,
                  confirmButtonText:"Logout"
                }).then(res=>{

                  this.authservice.logout()
                })

              }
              else {
                Swal.fire({
                  icon:"error",
                  title:"username not Updated",
                  text:"Try again..!"
                })
              }
            }
            else {
              Swal.fire({
                icon:"warning",
                title:"Information",
                text:"Username already taken."
              })
              this.show_already = true
            }
          })
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info').then(
            result=>{
              this.ngOnInit()
            }
          )
        }
      })
    }
  }
  reset(){
    this.show_already = false
    this.show_nochanges = false
  }
  updateemail(){
    let json = {oldemail:this.li.email.oldEmail,newemail:this.email.value,name:localStorage.getItem('name')}
    if (this.li.email.oldEmail == this.email.value) {
      this.show_nochanges_email = true
    }
    else {
      Swal.fire({
        title: 'Do you want to save the changes?',
        html:"<div class='alert alert-danger'>Changes are going to add new email to your account.</div>",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'Continue',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire({
            title:"Updating.."
          })
          Swal.showLoading()
          this.userservice.updateemail(json).subscribe(resp=>{
            let li_temp : any = resp
            if (li_temp.code == 200) {
              if (li_temp.modified == 1) {
                Swal.fire({
                  icon:"success",
                  title:"Email Confirmation sent!",
                  text:"you need to confirm your new email to set it as your primary email.",
                  allowEnterKey:false,
                  allowEscapeKey:false,
                  allowOutsideClick:false,
                }).then(res=>{
                  this.show_success_email = true
                })
              }
              else {
                Swal.fire({
                  icon:"error",
                  title:"Email not Updated",
                  text:"Try again..!"
                })
              }
            }
            else {
              Swal.fire({
                icon:"warning",
                title:"Information",
                text:"Email already taken."
              })
              this.show_already_email = true
            }
          })
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info').then(
            result=>{
              this.ngOnInit()
            }
          )
        }
      })
    }
  }

  verif_pass_retype(){
    if (this.passwordForm.value.new_pass != this.passwordForm.value.confirm_pass) {
      return true
    }
    else {
      return false
    }
  }
  update_pass(){
    console.log()
    console.log(this.passwordForm.value)
    this.userservice.updatepassword(this.passwordForm.value).subscribe(resp=>{
      let li:any = resp
      console.log(resp)
      if (li.changed == false) {
        console.log(li.message)
      }else{
        console.log(li.message)
      }
    })
  }
}
