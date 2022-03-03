import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CveService {

  constructor(private http:HttpClient) { }
  readonly baseURL= 'http://localhost:50353/parcel/cves';
 
  getCVEs(){
  
    return this.http.get(this.baseURL);
  }
}
