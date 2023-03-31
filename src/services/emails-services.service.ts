import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import links from './links.json'
@Injectable({
  providedIn: 'root'
})
export class EmailsServicesService {
  endpoint  = links.backend_links
  constructor(private http:HttpClient) { }

  sendmail(json:any){
    return this.http.post(this.endpoint+"api/email/send",json)
  }

  getmail(json:any){
    return this.http.post(this.endpoint+"api/email/getemails",json)
  }
  countemails(json:any){
    return this.http.post(this.endpoint+"api/email/countemails",json)
  }
  deletemail(json:any){
    return this.http.delete(this.endpoint+"api/email/delete",json)
  }
}
