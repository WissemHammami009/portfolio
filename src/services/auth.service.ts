import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import links from './links.json'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoint  = links.backend_links
  constructor(private http:HttpClient,private route:Router) { }
  
  signup(json:any){
    return this.http.post(this.endpoint+"api/user/add/user",json)
  }
  login (json:any){
    return this.http.post(this.endpoint+"api/user/login",json)
  }
  logout(){
    localStorage.clear()
    sessionStorage.clear()
    this.route.navigate(['/home'])
  }
  settokken(tokken:string,username:string){
    localStorage.setItem("tokken",tokken)
    localStorage.setItem('name',username)
    sessionStorage.setItem('tokken',tokken)
  }
  checkalreadylogged(){
    return localStorage.getItem('alias') != null && localStorage.getItem('name') != null && localStorage.getItem('tokken') != null
  }
  
}
