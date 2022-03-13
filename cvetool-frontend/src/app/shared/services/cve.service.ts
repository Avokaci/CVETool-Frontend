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
  startYear:string='';
  endYear:string='';
  startScore:number=0;
  endScore:number=0;

  getCVEs(): Observable<Cve[]>{
    var baseURL= 'https://localhost:44363/cves';
    return this.http.get<Cve[]>(baseURL);   
  }

  getAllFilteredCVEs(): Observable<Cve[]>{
    this.filterAttribute = 'Access';
    this.filterValue = 'NETWORK'
    var baseURL= 'https://localhost:44363/cves/filtered/'+this.filterAttribute+'/'+this.filterValue;
    const params = new HttpParams()
    .append('attribute', this.filterAttribute)
    .append('value', this.filterValue);
    return this.http.get<Cve[]>(baseURL,{params});   
  }

  getAllYearRangeFilteredCVEs(): Observable<Cve[]>{
    this.startYear = '2014';
    this.endYear = '2016';
    var baseURL= 'https://localhost:44363/cves/filtered/year/'+ this.startYear+'/range/'+this.endYear;
    const params = new HttpParams()
    .append('startYear', this.startYear)
    .append('endYear', this.endYear);
    return this.http.get<Cve[]>(baseURL,{params});   
  }

  getAllScoreRangeFilteredCVEs(): Observable<Cve[]>{
    this.startScore = 4;
    this.endScore = 6;
    var baseURL= 'https://localhost:44363/cves/filtered/score/'+this.startScore+'/range/'+this.endScore;
    const params = new HttpParams()
    .append('startScore', this.startScore)
    .append('endScore', this.endScore);
    return this.http.get<Cve[]>(baseURL,{params});   
  }
}
