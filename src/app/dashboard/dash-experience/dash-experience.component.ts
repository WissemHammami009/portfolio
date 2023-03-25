import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs';
import { PortfolioService } from 'src/services/portfolio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dash-experience',
  templateUrl: './dash-experience.component.html',
  styleUrls: ['./dash-experience.component.css']
})
export class DashExperienceComponent implements OnInit {

  constructor(private serviceport:PortfolioService) { }
  li :any
  entreprise = new FormControl()
  description = new FormControl()
  time = new FormControl()
  pos :any
  expForm = new FormGroup({
    id:new FormControl(),
    entreprise: new FormControl(),
    description_post:new FormControl(),
    time:new FormControl(),
  })
  ngOnInit(): void {
    Swal.isLoading()
    this.getdata()
    Swal.close()
  }
  additem(){
    this.expForm.patchValue({id:this.li.length + 1})
    this.li.push(this.expForm.value)
    this.expForm.reset()
  }
  delete(item:any){
    let index = this.li.indexOf(item)
    this.li.splice(index,1)
  }

  getdata(){
    this.serviceport.getexperiencedata({alias:localStorage.getItem('alias')}).subscribe(resp=>{
      this.li = resp
    })
  }

  updateexp(){
    Swal.fire({
      title: 'Updating...',
    });
    Swal.showLoading(null);
    let json = {alias:localStorage.getItem('alias'),experience:this.li}
    this.serviceport.updateexpriencedata(json).subscribe(resp=>{
      this.li = resp
      if (this.li.isModified == true) {
        Swal.fire({
          icon:"success",
          title:"Experience Section Updated",
          allowOutsideClick:false
        }).then(result=>{
          this.ngOnInit()
        })
        
      }
      else {
        Swal.fire({
          icon:"error",
          title:"Experience Section not Updated",
          text:"Try again..!"
        })
      }
    })
    Swal.close()
  }

  modify_exp(entreprise:any,description:any,time:any,item:any){
    this.pos = this.li.indexOf(item);
    this.entreprise.setValue(entreprise)
    this.description.setValue(description)
    this.time.setValue(time)
  }
  update_exp(){
    this.li.splice(this.pos,1);
    let json = {entreprise:this.entreprise.value,description_post:this.description.value,time:this.time.value}
    this.li.push(json)
    Swal.fire({
      icon:"success",
      text:"Entry Updated"
    })
  }
}
