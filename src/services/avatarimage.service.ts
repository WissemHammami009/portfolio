import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AvatarimageService {

  constructor(private http:HttpClient) { }

  setavatar(data:FormData){
    return this.http.post('http://localhost:3000/api/image/upload', data) 
  }
  getavatar(json:any){
    return this.http.post('http://localhost:3000/api/image/getimage',json)
  }
}

