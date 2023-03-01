import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  endpoint = "http://localhost:3000/"
  constructor(private http:HttpClient) { }


  aboutuser(json:any){
    return this.http.post(this.endpoint+'api/user/aboutuser',json)
  }
  updateuser(json:any){
    return this.http.patch(this.endpoint+"api/user/update/profile",json)
  }
}
