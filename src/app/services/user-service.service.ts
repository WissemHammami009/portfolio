import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import {environment} from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  endpoint  = environment.backend_links
  constructor(private http:HttpClient,private title:Title) { }

  token = localStorage.getItem("tokken") || ""
  headers= new HttpHeaders().set('x-access-token',this.token)
  aboutuser(json:any){
    return this.http.post(this.endpoint+'api/user/aboutuser',json,{'headers':this.headers})
  }
  updateuser(json:any){
    return this.http.patch(this.endpoint+"api/user/update/profile",json,{'headers':this.headers})
  }

  checkbackend_isup(){
    return this.http.get(this.endpoint+"testbackend").pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle the error here
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          html: 'There is a problem with my backend server.<br> Can you please connect me with the developer ?!',
          allowEnterKey:false,
          allowEscapeKey:false,
          allowOutsideClick:false,
          showConfirmButton:false,
          showCancelButton:false,
        })
        return throwError(error);
      })
    );
  }
  changeTitle(newtitle:string){
    this.title.setTitle(newtitle)
  }

  updatealias(json:any){
    return this.http.patch(this.endpoint+"api/user/updatealias",json,{'headers':this.headers})
  }
  confirmaccount(id:any){
    return this.http.patch(this.endpoint+"api/user/confirm/"+id,{})
  }
  checktokkennewpass(json:any){
    return this.http.patch(this.endpoint+"api/user/get/setpassword",json)
  }
  setnewpass(json:any){
    return this.http.patch(this.endpoint+"api/user/set/password",json)
  }
  updateemail(json:any){
    return this.http.patch(this.endpoint+"api/user/updateemail",json,{'headers':this.headers})
  }
}
