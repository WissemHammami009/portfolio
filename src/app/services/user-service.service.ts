import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { catchError, map, switchMap, throwError, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  endpoint = environment.backend_links;
  token = localStorage.getItem("tokken") || "";
  headers = new HttpHeaders().set('x-access-token', this.token);

  constructor(private http: HttpClient, private title: Title,private authuser:AuthService) { }

  // Function to validate token before executing any API calls
  validateToken(): Observable<boolean> {
    return this.http.post<any>(this.endpoint + "api/user/validate-token", {}, { 'headers': this.headers })
      .pipe(
        map(response => {
          // If the response confirms a valid token, return true
          return response.isValid;
        }),
        catchError(error => {
          this.authuser.invalidtokenaccess()
          return throwError(error);
        })
      );
  }

  aboutuser(json: any): Observable<any> {
    return this.validateToken().pipe(
      switchMap(isValid => {
        if (isValid) {
          return this.http.post(this.endpoint + 'api/user/aboutuser', json, { 'headers': this.headers });
        } else {
          throw new Error('Invalid token, cannot fetch about user');
        }
      })
    );
  }

  updateuser(json: any): Observable<any> {
    return this.validateToken().pipe(
      switchMap(isValid => {
        if (isValid) {
          return this.http.patch(this.endpoint + "api/user/update/profile", json, { 'headers': this.headers });
        } else {
          throw new Error('Invalid token, cannot update user profile');
        }
      })
    );
  }

  checkbackend_isup(): Observable<any> {
    return this.http.get(this.endpoint + "testbackend").pipe(
      catchError((error: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          html: 'There is a problem with my backend server.<br> Can you please connect me with the developer ?!',
          allowEnterKey: false,
          allowEscapeKey: false,
          allowOutsideClick: false,
          showConfirmButton: false,
          showCancelButton: false,
        });
        return throwError(error);
      })
    );
  }

  changeTitle(newtitle: string): void {
    this.title.setTitle(newtitle);
  }

  updatealias(json: any): Observable<any> {
    return this.validateToken().pipe(
      switchMap(isValid => {
        if (isValid) {
          return this.http.patch(this.endpoint + "api/user/updatealias", json, { 'headers': this.headers });
        } else {
          throw new Error('Invalid token, cannot update alias');
        }
      })
    );
  }

  confirmaccount(id:any){
    return this.http.patch(this.endpoint+"api/user/confirm/"+id,{})
  }

  checktokkennewpass(json:any){
    return this.http.patch(this.endpoint+"api/user/get/setpassword",json)
  }

  //method to set a new pass
  setnewpass(json:any){
    return this.http.patch(this.endpoint+"api/user/set/password",json)
  }



  updateemail(json: any): Observable<any> {
    return this.validateToken().pipe(
      switchMap(isValid => {
        if (isValid) {
          return this.http.patch(this.endpoint + "api/user/updateemail", json, { 'headers': this.headers });
        } else {
          throw new Error('Invalid token, cannot update email');
        }
      })
    );
  }

  updatepassword(json: any): Observable<any> {
    return this.validateToken().pipe(
      switchMap(isValid => {
        if (isValid) {
          return this.http.patch(this.endpoint + "api/user/update/password", json, { 'headers': this.headers });
        } else {
          throw new Error('Invalid token, cannot update password');
        }
      })
    );
  }
}
