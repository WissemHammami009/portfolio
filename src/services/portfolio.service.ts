import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import links from './links.json'
@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  endpoint  = links.backend_links
  constructor(private http:HttpClient) { }
  token = localStorage.getItem("tokken") || ""
  headers= new HttpHeaders().set('x-access-token',this.token)
  createportfolio(json:any){
    return this.http.post(this.endpoint+"api/portfolio/create-portfolio",json,{'headers':this.headers})
  }
  checkprotfolioexist(json:any){
    return this.http.post(this.endpoint+'api/portfolio/check/portfolio',json,{'headers':this.headers})
  }

  getexperiencedata( json:any){
    return this.http.post(this.endpoint+"api/portfolio/getexperience",json,{'headers':this.headers})
  }
  updateexpriencedata(json:any){
    return this.http.patch(this.endpoint+"api/portfolio/updateexperience",json,{'headers':this.headers})
  }
  
  getskills(json:any){
    return this.http.post(this.endpoint+"api/portfolio/getskills",json,{'headers':this.headers})
  }
  updateskills(json:any){
    return this.http.patch(this.endpoint+'api/portfolio/updateskills',json,{'headers':this.headers})
  }
  
  getinterest(json:any){
    return this.http.post(this.endpoint+'api/portfolio/getinterest',json,{'headers':this.headers})
  }
  updateinterest(json:any){
    return this.http.patch(this.endpoint+'api/portfolio//updateinterest',json,{'headers':this.headers})
  }

  getheader(json:any){
    
    return this.http.post(this.endpoint+"api/portfolio/getheader",json,{'headers':this.headers})
  }
  updateheader(json:any){
    return this.http.patch(this.endpoint+"api/portfolio/updateheader",json,{'headers':this.headers})
  }
  getcertif(json:any){
    return this.http.post(this.endpoint+"api/portfolio/getcertif",json,{'headers':this.headers})
  }
  updatecertif(json:any){
    return this.http.patch(this.endpoint+"api/portfolio/updatecertif",json,{'headers':this.headers})
  }

  getlastestportfolio(){
    return this.http.get(this.endpoint+"api/portfolio/lastest")
  }
  getportfolio(json:any){
    return this.http.post(this.endpoint+"api/portfolio/profile",json,{'headers':this.headers})
  }
  geteducation( json:any){
    return this.http.post(this.endpoint+"api/portfolio/geteducation",json,{'headers':this.headers})
  }
  updateeducationdata(json:any){
    return this.http.patch(this.endpoint+"api/portfolio/updateeducation",json,{'headers':this.headers})
  }
  
}
