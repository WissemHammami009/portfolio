import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { UserServiceService } from 'src/services/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private userinfo:UserServiceService, private userservice:UserServiceService,private authservice:AuthService,private router:Router) { }
  li:any
  show_already :boolean = false
  show_nochanges : boolean =false
  updateForm = new FormGroup({
    fullname : new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z ]+$")]),
    email : new FormControl('',[Validators.required,Validators.email]),
    phone:new FormControl('',[Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(8),Validators.maxLength(8)]),
    birthdate : new FormControl('',Validators.required)
  })
  alias = new FormControl('',Validators.required)
  here = "nav-item active"
  ngOnInit(): void {
    Swal.showLoading(null)
    this.userservice.checkbackend_isup().subscribe()
    if (this.authservice.checkalreadylogged() == false){
      localStorage.setItem('notlogged',"yes")
      this.router.navigate(['/signin'])
      
    }
    this.getdata()
    Swal.close()
  }


  getdata(){
    this.userinfo.aboutuser({alias:localStorage.getItem('alias')}).subscribe(resp=>{
      this.li = resp
      this.updateForm.patchValue({
        fullname:this.li.fullname,
        phone:this.li.phone,
        email:this.li.email,
        birthdate:this.li.birthdate
      })
      this.alias.patchValue(this.li.alias)
    })
  }

  update(){
    Swal.fire({
      title: 'Running!',
    })
    Swal.showLoading(null)
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
    console.log(json)
    if (this.li.alias == this.alias.value) {
      this.show_nochanges = true
    }
    else {
      Swal.fire({
        title:"Updating.."
      })
      Swal.showLoading(null)
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
    }
  }
  reset(){
    this.show_already = false
    this.show_nochanges = false
  }
}
