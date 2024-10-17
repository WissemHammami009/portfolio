/*
    Author: Wissem Hammami
    Github: wissemhammami009
    Website: https://wissem-hammami.web.app || www.wissem-hammami.info
    Email: hammamiwissem21@gmail.com
*/
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {environment} from '../../environments/environment'
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
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
    this.route.navigate(['/signin'])
  }
  invalidtokenaccess(){
    localStorage.clear()
    sessionStorage.clear()
    this.cookie.deleteAll()
    localStorage.setItem('invalidtoken',"1")
    this.route.navigate(['/signin'])
  }

  clearApplication(){
    localStorage.clear()
    sessionStorage.clear()
    this.cookie.deleteAll()
  }

  async settokken(tokken:string,username:string){
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


  // Centralized error handler
handleError(error: any) {
  if (error.status === 400) {
      Swal.fire('Invalid Token', 'Your session has expired, please relogin.', 'error');
  } else if (error.status === 403) {
      Swal.fire('Token Required', 'Please login to continue.', 'error');
  } else {
      // You can customize other error handling here
      Swal.fire('Error', 'Something went wrong. Please try again.', 'error');
      console.error('An error occurred:', error);
  }
}
}
