import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cve } from '../DTOs/cve.model';

@Injectable({
  providedIn: 'root'
})
export class CveService {

  constructor(private http:HttpClient) { }

  // filterAttribute:string='';
  // filterValue:string='';
  // startYear:string='';
  // endYear:string='';
  // startScore:number=0;
  // endScore:number=0;

  getCVEs(): Observable<Cve[]>{
    var baseURL= 'https://localhost:44363/cves';
    return this.http.get<Cve[]>(baseURL);   
  }

  getAllFilteredCVEs(filterAttribute:string, filterValue:string): Observable<Cve[]>{
    // this.filterAttribute = 'Access';
    // this.filterValue = 'NETWORK'
    var baseURL= 'https://localhost:44363/cves/filtered/'+filterAttribute+'/'+filterValue;
    const params = new HttpParams()
    .append('attribute', filterAttribute)
    .append('value', filterValue);
    return this.http.get<Cve[]>(baseURL,{params});   
  }

  getAllYearRangeFilteredCVEs(startYear:string, endYear:string): Observable<Cve[]>{
    // this.startYear = '2014';
    // this.endYear = '2016';
    var baseURL= 'https://localhost:44363/cves/filtered/year/'+ startYear+'/range/'+endYear;
    const params = new HttpParams()
    .append('startYear', startYear)
    .append('endYear', endYear);
    return this.http.get<Cve[]>(baseURL,{params});   
  }

  getAllScoreRangeFilteredCVEs(startScore:string, endScore:string): Observable<Cve[]>{
    // this.startScore = 4;
    // this.endScore = 6;
    var baseURL= 'https://localhost:44363/cves/filtered/score/'+startScore+'/range/'+endScore;
    const params = new HttpParams()
    .append('startScore', startScore)
    .append('endScore', endScore);
    return this.http.get<Cve[]>(baseURL,{params});   
  }
}
