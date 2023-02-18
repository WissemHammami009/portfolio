import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs';
import { PortfolioService } from 'src/app/services/portfolio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dash-experience',
  templateUrl: './dash-experience.component.html',
  styleUrls: ['./dash-experience.component.css']
})
export class DashExperienceComponent implements OnInit {

  constructor(private serviceport:PortfolioService) { }
  li :any
  expForm = new FormGroup({
    id:new FormControl(),
    postion: new FormControl(),
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
    let alias = localStorage.getItem('alias') || ""
    this.serviceport.getexperiencedata(alias).subscribe(resp=>{
      this.li = resp
      console.log(this.li)
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
          title:"Experience Updated",
          allowOutsideClick:false
        }).then(result=>{
          this.ngOnInit()
        })
        
      }
      else {
        Swal.fire({
          icon:"error",
          title:"Skills  not Updated",
          text:"Try again..!"
        })
      }
    })
    Swal.close()
  }
}