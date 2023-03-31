import { Component, OnInit } from '@angular/core';
import { EmailsServicesService } from 'src/services/emails-services.service';
import { UserServiceService } from 'src/services/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comp-messages',
  templateUrl: './comp-messages.component.html',
  styleUrls: ['./comp-messages.component.css']
})
export class CompMessagesComponent implements OnInit {

  constructor(private emailserv:EmailsServicesService,private userservice:UserServiceService) { }
  li:any
  len:number = 0
  here = "nav-item active"
  ngOnInit(): void {
    Swal.showLoading(null)
    this.userservice.checkbackend_isup().subscribe()
    this.emailserv.getmail({alias:localStorage.getItem('hashuser')}).subscribe(resp=>{
      this.li = resp
      this.len = this.li.length
    })
    Swal.close()
  }


  deleteemail(id:any){
    Swal.showLoading(null)
    let json = {id:id,hashuser:localStorage.getItem('hashuser')}
    console.log(json)
    this.emailserv.deletemail(json).subscribe(resp=>{
      let res  :any = resp 
      if (res.deleted == false) {
        Swal.fire({
          icon:"error",
          title:"Mail not deleted",
          text:"Try again..!"
        })
      }
      else {
        Swal.fire({
          icon:"success",
          text:"Email deleted!"
        }).then(res=>{
          this.ngOnInit()
        })
      }
    })
  }
}
