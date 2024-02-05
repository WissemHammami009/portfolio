/*
    Author: Wissem Hammami
    Github: wissemhammami009
    Website: https://wissem-hammami.web.app || www.wissem-hammami.info
    Email: hammamiwissem21@gmail.com
*/
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
  //this method  test the backend if up when user access the app
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

  //update the alias of user which like http://portfolio/{alias}
  updatealias(json:any){
    return this.http.patch(this.endpoint+"api/user/updatealias",json,{'headers':this.headers})
  }

  //
  confirmaccount(id:any){
    return this.http.patch(this.endpoint+"api/user/confirm/"+id,{})
  }
  //when u access the link of reset from the email this method test if the key valid to set a new pass
  checktokkennewpass(json:any){
    return this.http.patch(this.endpoint+"api/user/get/setpassword",json)
  }

  //method to set a new pass
  setnewpass(json:any){
    return this.http.patch(this.endpoint+"api/user/set/password",json)
  }

  //method to update a new email from settings
  updateemail(json:any){
    return this.http.patch(this.endpoint+"api/user/updateemail",json,{'headers':this.headers})
  }

  //Set w new password from settings
  updatepassword(json:any){
    return this.http.patch(this.endpoint+"api/user//update/password",json,{'headers':this.headers})
  }
}


