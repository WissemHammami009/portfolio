import { Component, OnInit } from '@angular/core';
import { EmailsServicesService } from 'src/services/emails-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comp-messages',
  templateUrl: './comp-messages.component.html',
  styleUrls: ['./comp-messages.component.css']
})
export class CompMessagesComponent implements OnInit {

  constructor(private emailserv:EmailsServicesService) { }
  li:any
  here = "nav-item active"
  ngOnInit(): void {
    Swal.showLoading(null)
    this.emailserv.getmail({alias:localStorage.getItem('alias')}).subscribe(resp=>{
      this.li = resp
    })
    Swal.close()
  }

}
