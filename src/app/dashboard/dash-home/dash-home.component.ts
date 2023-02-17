import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dash-home',
  templateUrl: './dash-home.component.html',
  styleUrls: ['./dash-home.component.css']
})
export class DashHomeComponent implements OnInit {

  constructor(private http:HttpClient) { }
  headerupdateForm = new FormGroup({
    full_name : new FormControl(''),
    street : new FormControl(''),
    town : new FormControl(''),
    email : new FormControl(''),
    description: new FormControl(''),
    facebook: new FormControl(''),
    linkedin: new FormControl(''),
    github: new FormControl(''),
    alias:new FormControl('') 
  })
  li:any
  button : any  = "Update Header Information"
  ngOnInit(): void {
    Swal.fire({
      title: 'loading Data From DataBase...',
    });
    Swal.showLoading(null);
    this.getdata()
    Swal.close()
  }

  setForm(li:any){
    this.headerupdateForm.setValue({
      full_name:li.full_name,
      street:li.street,
      town:li.town,
      email:li.email,
      description:li.description,
      facebook:li.facebook,
      linkedin:li.linkedin,
      github:li.github,
      alias:'wissemhammami'
    })
  }

  getdata(){
    this.http.post("http://localhost:3000/api/portfolio/getheader",{alias:"wissemhammami"}).subscribe(resp=>{
      this.li = resp
      if (this.li.found == true) {
        this.setForm(this.li) 
      }
    })
  }
  updateheader(){
    
    Swal.fire({
      title: 'Running...',
    });
    Swal.showLoading(null);
    this.http.patch("http://localhost:3000/api/portfolio/updateheader",this.headerupdateForm.value).subscribe(resp=>{
      this.li = resp
      if (this.li.isModified == true) {
        Swal.fire({
          icon:"success",
          title:"Header Updated"
        }).then(result=>{
          this.ngOnInit()
        })
        
      }
      else {
        Swal.fire({
          icon:"error",
          title:"Header  not Updated",
          text:"Try again..!"
        })
      }
    })
  }
}
