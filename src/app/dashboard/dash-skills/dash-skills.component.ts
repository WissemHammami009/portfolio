import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dash-skills',
  templateUrl: './dash-skills.component.html',
  styleUrls: ['./dash-skills.component.css']
})
export class DashSkillsComponent implements OnInit {

  constructor(private http:HttpClient) { }
  li:any
  languageForm = new FormGroup({
    id:new FormControl(''),
    skill:new FormControl('',[Validators.required]),
    percentage:new FormControl('',[Validators.maxLength(3),Validators.pattern('[0-9]{1,3}'),Validators.required])
  })

  skill_modal = new FormControl('')
  percentage_modal = new FormControl('')
  pos: number = 0
 
  additem(){
    this.languageForm.patchValue({id:this.li.length + 1})
    this.li.push(this.languageForm.value)
    this.languageForm.reset()
  }
  delete(item:any){
    let index = this.li.indexOf(item)
    this.li.splice(index,1)
  }
  ngOnInit(): void {
   this.getdata()
  }
  getdata(){
    this.http.post("http://localhost:3000/api/portfolio/getskills",{alias:"wissemhammami"}).subscribe(resp=>{
      this.li = resp
    })
  }
  updateskills(){
    Swal.fire({
      title: 'Running...',
    });
    Swal.showLoading(null);
    let json  = {alias:"wissemhammami",skills:this.li}
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

  modify(skill:any,percentage:any,item:any){
      this.pos = this.li.indexOf(item);
      this.skill_modal.setValue(skill)
      this.percentage_modal.setValue(percentage)
    }

  update(){
    this.li.splice(this.pos,1);
    let json = {skill:this.skill_modal.value,percentage:this.percentage_modal.value}
    this.li.push(json)
    Swal.fire({
      icon:"success",
      text:"Entry Updated"
    })
  }

}
