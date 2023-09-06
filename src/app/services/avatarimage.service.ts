import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class AvatarimageService {

  constructor(private http:HttpClient) { }
  endpoint  = environment.backend_links
  setavatar(data:FormData){
    return this.http.post('http://localhost:3000/api/image/upload', data)
  }
  getavatar(json:any){
    return this.http.post('http://localhost:3000/api/image/getimage',json)
  }
}

