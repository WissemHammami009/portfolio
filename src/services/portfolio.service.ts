import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import links from './links.json'
@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  endpoint  = links.backend_links
  constructor(private http:HttpClient) { }

  createportfolio(json:any){
    return this.http.post(this.endpoint+"api/portfolio/create-portfolio",json)
  }
  checkprotfolioexist(json:any){
    return this.http.post(this.endpoint+'api/portfolio/check/portfolio',json)
  }

  getexperiencedata( json:any){
    return this.http.post(this.endpoint+"api/portfolio/getexperience",json)
  }
  updateexpriencedata(json:any){
    return this.http.patch(this.endpoint+"api/portfolio/updateexperience",json)
  }
  
  getskills(json:any){
    return this.http.post(this.endpoint+"api/portfolio/getskills",json)
  }
  updateskills(json:any){
    return this.http.patch(this.endpoint+'api/portfolio/updateskills',json)
  }
  
  getinterest(json:any){
    return this.http.post(this.endpoint+'api/portfolio/getinterest',json)
  }
  updateinterest(json:any){
    return this.http.patch(this.endpoint+'api/portfolio//updateinterest',json)
  }

  getheader(json:any){
    return this.http.post(this.endpoint+"api/portfolio/getheader",json)
  }
  updateheader(json:any){
    return this.http.patch(this.endpoint+"api/portfolio/updateheader",json)
  }
  getcertif(json:any){
    return this.http.post(this.endpoint+"api/portfolio/getcertif",json)
  }
  updatecertif(json:any){
    return this.http.patch(this.endpoint+"api/portfolio/updatecertif",json)
  }

  getlastestportfolio(){
    return this.http.get(this.endpoint+"api/portfolio/lastest")
  }
  getportfolio(json:any){
    return this.http.post(this.endpoint+"api/portfolio/profile",json)
  }
  geteducation( json:any){
    return this.http.post(this.endpoint+"api/portfolio/geteducation",json)
  }
  updateeducationdata(json:any){
    return this.http.patch(this.endpoint+"api/portfolio/updateeducation",json)
  }
  
}