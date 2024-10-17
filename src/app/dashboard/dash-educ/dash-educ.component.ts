/*
    Author: Wissem Hammami
    Github: wissemhammami009
    Website: https://wissem-hammami.web.app || www.wissem-hammami.info
    Email: hammamiwissem21@gmail.com
*/
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PortfolioService } from 'src/app/services/portfolio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dash-educ',
  templateUrl: './dash-educ.component.html',
  styleUrls: ['./dash-educ.component.css']
})
export class DashEducComponent implements OnInit {

  constructor(private serviceport:PortfolioService) { }
  li :any
  diploma = new FormControl()
  university = new FormControl()
  branch = new FormControl()
  time = new FormControl()
  pos :any
  educForm = new FormGroup({
    id:new FormControl(),
    diploma: new FormControl(),
    university:new FormControl(),
    branch:new FormControl(),
    time:new FormControl(),
  })
  ngOnInit(): void {
    Swal.showLoading()
    this.getdata()
    Swal.close()
  }
  additem(){
    this.educForm.patchValue({id:this.li.length + 1})
    this.li.push(this.educForm.value)
    this.educForm.reset()
  }
  delete(item:any){
    let index = this.li.indexOf(item)
    this.li.splice(index,1)
  }

  getdata(){
    this.serviceport.getEducation({alias:localStorage.getItem('alias')}).subscribe(resp=>{
      this.li = resp
    })
  }

  updateeduc(){
    Swal.fire({
      title: 'Updating...',
    });
    Swal.showLoading();
    let json = {alias:localStorage.getItem('alias'),education:this.li}
    this.serviceport.updateEducationData(json).subscribe(resp=>{
      this.li = resp
      if (this.li.isModified == true) {
        Swal.fire({
          icon:"success",
          title:"Education Section Updated",
          allowOutsideClick:false
        }).then(result=>{
          this.ngOnInit()
        })

      }
      else {
        Swal.fire({
          icon:"error",
          title:"Education Section not Updated",
          text:"Try again..!"
        })
      }
    })
    Swal.close()
  }

  modify_educ(diploma:any,university:any,branch:any,time:any,item:any){
    this.pos = this.li.indexOf(item);
    this.diploma.setValue(diploma)
    this.university.setValue(university)
    this.branch.setValue(branch)
    this.time.setValue(time)
  }
  update_educ(){
    this.li.splice(this.pos,1);
    let json = {diploma:this.diploma.value,university:this.university.value,branch:this.branch.value,time:this.time.value}
    this.li.push(json)
    console.table(this.li)
    Swal.fire({
      icon:"success",
      text:"Entry Updated"
    })
  }

}
