import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {environment} from '../../environments/environment'
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoint  = environment.backend_links
  constructor(private http:HttpClient,private route:Router,private cookie:CookieService) { }

  signup(json:any){
    return this.http.post(this.endpoint+"api/user/add/user",json)
  }
  login (json:any){
    return this.http.post(this.endpoint+"api/user/login",json)
  }
  logout(){
    localStorage.clear()
    sessionStorage.clear()
    this.cookie.deleteAll()
    this.route.navigate(['/home'])
  }
  clearApplication(){
    localStorage.clear()
    sessionStorage.clear()
    this.cookie.deleteAll()
  }
  settokken(tokken:string,username:string){
    localStorage.setItem("tokken",tokken)
    this.cookie.set('tokken', tokken, 7, '/');
    localStorage.setItem('name',username)
    this.cookie.set('username', username, 7, '/');
    sessionStorage.setItem('tokken',tokken)
  }
  checkalreadylogged(){
    return localStorage.getItem('alias') != null && localStorage.getItem('name') != null && localStorage.getItem('tokken') != null
  }
  passwordlost(json:any){
    return this.http.patch(this.endpoint+"api/user/reset/sent_password",json)
  }

}
