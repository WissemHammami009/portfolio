 import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {  Router } from '@angular/router';
import { AvatarimageService } from 'src/services/avatarimage.service';
import { PortfolioService } from 'src/services/portfolio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dash-home',
  templateUrl: './dash-home.component.html',
  styleUrls: ['./dash-home.component.css']
})
export class DashHomeComponent implements OnInit {

  constructor(private portfolioserv:PortfolioService,private route:Router,private avatarServ:AvatarimageService) { }
  //phone misssing !!!!!!!!!!!!!!
  headerupdateForm = new FormGroup({
    full_name : new FormControl(''),
    street : new FormControl(''),
    town : new FormControl(''),
    email : new FormControl(''),
    description: new FormControl(''),
    facebook: new FormControl(''),
    linkedin: new FormControl(''),
    github: new FormControl(''),
    phone: new FormControl(''),
    alias:new FormControl('')
  })

  showmsg : boolean = false
  file: File | undefined  
  li:any
  button : any  = "Update Header Information"
  formData: any = new FormData;
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
      phone:li.phone,
      description:li.description,
      facebook:li.facebook,
      linkedin:li.linkedin,
      github:li.github,
      alias:localStorage.getItem('alias')
    })
  }

  getdata(){
    this.portfolioserv.getheader({alias:localStorage.getItem('alias')}).subscribe(resp=>{
      this.li = resp
      console.log(this.li)
      if (this.li.found == true) {
        this.setForm(this.li) 
      }
    })
  }
  updateheader(){
    
    Swal.fire({
      title: 'Running...',
    });
    console.log(this.headerupdateForm.value)
    Swal.showLoading(null);
    this.portfolioserv.updateheader(this.headerupdateForm.value).subscribe(resp=>{
      this.li = resp
      if (this.li.isModified == true) {
        Swal.fire({
          icon:"success",
          title:"Header Section Updated"
        }).then(result=>{
          this.ngOnInit()
        })
        
      }
      else {
        Swal.fire({
          icon:"error",
          title:"Header Section not Updated",
          text:"Try again..!"
        })
      }
    })
  }

  handleFileInput(event: any): void {
    const files: FileList = event.target.files;
    console.log(files)
    if (files && files.length > 0) {
      const file: File | null = files.item(0);
      if (file) {
        this.uploadFile(file);
      } else {
        console.error('Invalid file');
      }
    } else {
      console.error('No file selected');
    }
  }
  

  uploadFile(event: any): void {
    const file: File = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('image', file);
    let alias = localStorage.getItem('alias') || ''
    formData.append('alias',alias)
    this.avatarServ.setavatar(formData)
      .subscribe(
        response => {
          this.showmsg = true
        },
        error => {
          console.error('File upload failed', error);
        }
      );
  }
}
