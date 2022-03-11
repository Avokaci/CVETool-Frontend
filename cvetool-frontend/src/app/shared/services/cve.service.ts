import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cve } from '../DTOs/cve.model';

@Injectable({
  providedIn: 'root'
})
export class CveService {

  constructor(private http:HttpClient) { }

  filterAttribute:string='';
  filterValue:string='';

  getCVEs(): Observable<Cve[]>{
    var baseURL= 'https://localhost:44363/cves';
    return this.http.get<Cve[]>(baseURL);   
  }


}
