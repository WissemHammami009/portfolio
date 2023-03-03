import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  endpoint = "http://localhost:3000/"
  constructor(private http:HttpClient,private title:Title) { }


  aboutuser(json:any){
    return this.http.post(this.endpoint+'api/user/aboutuser',json)
  }
  updateuser(json:any){
    return this.http.patch(this.endpoint+"api/user/update/profile",json)
  }

  checkbackend_isup(){
    return this.http.get(this.endpoint+"testbackend").pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle the error here
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: 'Contact the developer I think my backend server is down!!',
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
}
