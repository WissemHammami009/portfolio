import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserServiceService } from 'src/services/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private userinfo:UserServiceService) { }
  li:any
  updateForm = new FormGroup({
    fullname : new FormControl(),
    phone : new FormControl(),
    email : new FormControl(),
    birthdate : new FormControl()
  })
  here = "nav-item active"
  ngOnInit(): void {
    Swal.showLoading(null)
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
    })
  }
  update(){
    console.log(this.updateForm.value)
  }
}
