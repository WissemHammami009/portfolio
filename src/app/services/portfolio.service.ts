import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  endpoint = environment.backend_links;
  token = ""
  headers = new HttpHeaders()

  constructor(private http: HttpClient,private authser:AuthService) { }

  // Function to validate token before executing any API calls
  validateToken(): Observable<boolean> {
    this.token = localStorage.getItem("tokken") || "";
    // Set the 'x-access-token' header and reassign it to this.headers (since HttpHeaders is immutable)
  this.headers = this.headers.set('x-access-token', this.token);
    return this.http.post<any>(this.endpoint + "api/user/validate-token", {}, { 'headers': this.headers })
      .pipe(
        map(response => {
          // If the response confirms a valid token, return true
          return response.isValid;
        }),
        catchError(error => {
          // If the token is invalid, handle the error here
        this.authser.invalidtokenaccess()
          return throwError(error);
        })
      );
  }

  // Example of how to call validateToken before another API call
  createPortfolio(json: any): Observable<any> {
    return this.validateToken().pipe(
      switchMap(isValid => {
        if (isValid) {
          return this.http.post(this.endpoint + "api/portfolio/create-portfolio", json, { 'headers': this.headers });
        } else {
          throw new Error('Invalid token, cannot create portfolio');
        }
      })
    );
  }

  // Other API methods
  checkPortfolioExist(json: any): Observable<any> {
    return this.validateToken().pipe(
      switchMap(isValid => {
        if (isValid) {
          return this.http.post(this.endpoint + 'api/portfolio/check/portfolio', json, { 'headers': this.headers });
        } else {
          throw new Error('Invalid token, cannot check portfolio');
        }
      })
    );
  }

  getExperienceData(json: any): Observable<any> {
    return this.validateToken().pipe(
      switchMap(isValid => {
        if (isValid) {
          return this.http.post(this.endpoint + "api/portfolio/getexperience", json, { 'headers': this.headers });
        } else {
          throw new Error('Invalid token, cannot get experience data');
        }
      })
    );
  }

  updateExperienceData(json: any): Observable<any> {
    return this.validateToken().pipe(
      switchMap(isValid => {
        if (isValid) {
          return this.http.patch(this.endpoint + "api/portfolio/updateexperience", json, { 'headers': this.headers });
        } else {
          throw new Error('Invalid token, cannot update experience data');
        }
      })
    );
  }

  getSkills(json: any): Observable<any> {
    return this.validateToken().pipe(
      switchMap(isValid => {
        if (isValid) {
          return this.http.post(this.endpoint + "api/portfolio/getskills", json, { 'headers': this.headers });
        } else {
          throw new Error('Invalid token, cannot get skills');
        }
      })
    );
  }

  updateSkills(json: any): Observable<any> {
    return this.validateToken().pipe(
      switchMap(isValid => {
        if (isValid) {
          return this.http.patch(this.endpoint + "api/portfolio/updateskills", json, { 'headers': this.headers });
        } else {
          throw new Error('Invalid token, cannot update skills');
        }
      })
    );
  }

  getInterest(json: any): Observable<any> {
    return this.validateToken().pipe(
      switchMap(isValid => {
        if (isValid) {
          return this.http.post(this.endpoint + "api/portfolio/getinterest", json, { 'headers': this.headers });
        } else {
          throw new Error('Invalid token, cannot get interest');
        }
      })
    );
  }

  updateInterest(json: any): Observable<any> {
    return this.validateToken().pipe(
      switchMap(isValid => {
        if (isValid) {
          return this.http.patch(this.endpoint + "api/portfolio/updateinterest", json, { 'headers': this.headers });
        } else {
          throw new Error('Invalid token, cannot update interest');
        }
      })
    );
  }

  getHeader(json: any): Observable<any> {
    return this.validateToken().pipe(
      switchMap(isValid => {
        if (isValid) {
          return this.http.post(this.endpoint + "api/portfolio/getheader", json, { 'headers': this.headers });
        } else {
          throw new Error('Invalid token, cannot get header');
        }
      })
    );
  }

  updateHeader(json: any): Observable<any> {
    return this.validateToken().pipe(
      switchMap(isValid => {
        if (isValid) {
          return this.http.patch(this.endpoint + "api/portfolio/updateheader", json, { 'headers': this.headers });
        } else {
          throw new Error('Invalid token, cannot update header');
        }
      })
    );
  }

  getCertif(json: any): Observable<any> {
    return this.validateToken().pipe(
      switchMap(isValid => {
        if (isValid) {
          return this.http.post(this.endpoint + "api/portfolio/getcertif", json, { 'headers': this.headers });
        } else {
          throw new Error('Invalid token, cannot get certifications');
        }
      })
    );
  }

  updateCertif(json: any): Observable<any> {
    return this.validateToken().pipe(
      switchMap(isValid => {
        if (isValid) {
          return this.http.patch(this.endpoint + "api/portfolio/updatecertif", json, { 'headers': this.headers });
        } else {
          throw new Error('Invalid token, cannot update certifications');
        }
      })
    );
  }

  getLatestPortfolio() {
          return this.http.get(this.endpoint + "api/portfolio/lastest");
  }

  getPortfolio(json: any): Observable<any> {
    return this.validateToken().pipe(
      switchMap(isValid => {
        if (isValid) {
          return this.http.post(this.endpoint + "api/portfolio/profile", json, { 'headers': this.headers });
        } else {
          throw new Error('Invalid token, cannot get portfolio');
        }
      })
    );
  }

  getEducation(json: any): Observable<any> {
    return this.validateToken().pipe(
      switchMap(isValid => {
        if (isValid) {
          return this.http.post(this.endpoint + "api/portfolio/geteducation", json, { 'headers': this.headers });
        } else {
          throw new Error('Invalid token, cannot get education data');
        }
      })
    );
  }

  updateEducationData(json: any): Observable<any> {
    return this.validateToken().pipe(
      switchMap(isValid => {
        if (isValid) {
          return this.http.patch(this.endpoint + "api/portfolio/updateeducation", json, { 'headers': this.headers });
        } else {
          throw new Error('Invalid token, cannot update education data');
        }
      })
    );
  }
}
