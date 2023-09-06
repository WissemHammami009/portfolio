import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class EmailsServicesService {
  endpoint  = environment.backend_links
  constructor(private http:HttpClient) { }
  token = localStorage.getItem("tokken") || ""
  headers= new HttpHeaders().set('x-access-token',this.token)
  sendmail(json:any){
    return this.http.post(this.endpoint+"api/email/send",json)
  }

  getmail(json:any){
    return this.http.post(this.endpoint+"api/email/getemails",json,{'headers':this.headers})
  }
  countemails(json:any){
    return this.http.post(this.endpoint+"api/email/countemails",json,{'headers':this.headers})
  }
  deletemail(json:any){
    return this.http.delete(this.endpoint+"api/email/delete",json)
  }
}
