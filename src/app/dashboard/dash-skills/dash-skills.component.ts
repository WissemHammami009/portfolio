import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PortfolioService } from 'src/app/services/portfolio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dash-skills',
  templateUrl: './dash-skills.component.html',
  styleUrls: ['./dash-skills.component.css']
})
export class DashSkillsComponent implements OnInit {

  constructor(private portfolioserv:PortfolioService) { }
  li:any
  languageForm = new FormGroup({
    id:new FormControl(''),
    skill:new FormControl('',[Validators.required]),
    percentage:new FormControl('',[Validators.maxLength(3),Validators.pattern('[0-9]{1,3}'),Validators.required])
  })

  skill_modal = new FormControl('')
  percentage_modal = new FormControl('')
  pos: number = 0

  additem_skills(){
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
    this.portfolioserv.getskills({alias:localStorage.getItem('alias')}).subscribe(resp=>{
      this.li = resp
    })
  }
  updateskills(){
    Swal.fire({
      title: 'Running...',
    });
    Swal.showLoading();
    let json  = {alias:localStorage.getItem('alias'),skills:this.li}
    console.log(json)
    this.portfolioserv.updateskills(json).subscribe(resp=>{
      this.li = resp
      if (this.li.isModified == true) {
        Swal.fire({
          icon:"success",
          title:"Skills Section Updated"
        })
        this.ngOnInit()
      }
      else {
        Swal.fire({
          icon:"error",
          title:"Skills Section not Updated",
          text:"Try again..!"
        })
      }
    })
  }

  modify_skills(skill:any,percentage:any,item:any){
      this.pos = this.li.indexOf(item);
      this.skill_modal.setValue(skill)
      this.percentage_modal.setValue(percentage)
    }

  update_skills(){
    this.li.splice(this.pos,1);
    let json = {skill:this.skill_modal.value,percentage:this.percentage_modal.value}
    this.li.push(json)
    Swal.fire({
      icon:"success",
      text:"Entry Updated"
    })
  }

}
