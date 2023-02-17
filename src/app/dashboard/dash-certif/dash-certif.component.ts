import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dash-certif',
  templateUrl: './dash-certif.component.html',
  styleUrls: ['./dash-certif.component.css']
})
export class DashCertifComponent implements OnInit {


  constructor(private http:HttpClient) { }
  li:any
  username:any 
  awardsForm = new FormGroup({
    id:new FormControl(''),
    name:new FormControl('',[Validators.required])
  })

  name_modal = new FormControl('')
  pos: number = 0
  additem(){
    this.awardsForm.patchValue({id:this.li.length + 1})
    this.li.push(this.awardsForm.value)
    this.awardsForm.reset()
  }
  delete(item:any){
    let index = this.li.indexOf(item)
    this.li.splice(index,1)
  }
  ngOnInit(): void {
    this.username = localStorage.getItem("alias")
   this.getdata()
  }
  getdata(){
    this.http.post("http://localhost:3000/api/portfolio/getawards",{alias:this.username}).subscribe(resp=>{
      this.li = resp
      console.log(this.li)
    })
  }
  updateskills(){
    Swal.fire({
      title: 'Running...',
    });

    Swal.showLoading(null);

    let json  = {alias:this.username,certif:this.li}
    
    console.log(json)

    this.http.patch("http://localhost:3000/api/portfolio/updateskills",json).subscribe(resp=>{
      this.li = resp
      if (this.li.isModified == true) {
        Swal.fire({
          icon:"success",
          title:"Skills Updated"
        })
        this.ngOnInit()
      }
      else {
        Swal.fire({
          icon:"error",
          title:"Skills  not Updated",
          text:"Try again..!"
        })
      }
    })
  }

  modify(name:any,item:any){
      this.pos = this.li.indexOf(item);
      this.name_modal.setValue(name)
    }

  update(){
    this.li.splice(this.pos,1);
    let json = {name:this.name_modal.value}
    this.li.push(json)
    Swal.fire({
      icon:"success",
      text:"Entry Updated"
    })
  }

}
