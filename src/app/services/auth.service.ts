import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoint = "http://localhost:3000/"
  constructor(private http:HttpClient,private route:Router) { }
  
  signup(json:any){
    return this.http.post(this.endpoint+"api/user/add/user",json)
  }
  login (json:any){
    return this.http.post(this.endpoint+"api/user/login",json)
  }
  logout(){
    localStorage.clear()
    this.route.navigate(['/home'])
  }
  settokken(tokken:string,username:string){
    localStorage.setItem("tokken",tokken)
    localStorage.setItem('name',username)
    sessionStorage.setItem('tokken',tokken)
  }
  
}
