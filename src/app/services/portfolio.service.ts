import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private http:HttpClient) { }


  getexperiencedata( alias:string){
    return this.http.post("http://localhost:3000/api/portfolio/getexperience",{alias:alias})
  }
  updateexpriencedata(json:any){
    return this.http.patch("http://localhost:3000/api/portfolio/updateexperience",json)
  }
}
