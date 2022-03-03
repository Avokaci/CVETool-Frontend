import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CveService {

  constructor(private http:HttpClient) { }
  readonly baseURL= 'https://localhost:44363/cves';
  

  getCVEs(){
    //console.log(this.http.get(this.baseURL))
    //const headers = new HttpHeaders();
    //headers.set('Content-Type', 'application/json;');
    //headers.set('Content-Length', '140317');

    return this.http.get(this.baseURL);
    
  }
}
