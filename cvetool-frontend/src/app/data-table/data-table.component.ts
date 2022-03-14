import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Cve } from '../shared/DTOs/cve.model';
import { CveService } from '../shared/services/cve.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class DataTableComponent implements AfterViewInit {
  columnsToDisplay  = ['cveId', 'cweId', 'vulnerabilityType', 'publishDate', 'updateDate', 'score', 'exploitExists', 'access', 'complexity', 'authentication', 'confidentiality', 'integrity', 'availability' ];
  dataSource = new MatTableDataSource<Cve>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  expandedElement: Cve | null = null;
  data: Cve[] =[];
 

  //vulnerability Filter
  vulnerabilities: FilterView[] = [
    {value: 'dos', viewValue: 'DoS'},
    {value: 'code execution', viewValue: 'Code Execution'},
    {value: 'overflow', viewValue: 'Overflow'},
    {value: 'memory corruption', viewValue: 'Memory Corruption'},
    {value: 'sql injection', viewValue: 'SQL Injection'},
    {value: 'xss', viewValue: 'XSS'},
    {value: 'directory traversal', viewValue: 'Directory Traversal'},
    {value: 'http Response Splitting', viewValue: 'HTTP Response Splitting'},
    {value: 'bypass Something', viewValue: 'Bypass Something'},
    {value: 'gain Information', viewValue: 'Gain Information'},
    {value: 'gain Privileges', viewValue: 'Gain Privileges'},
    {value: 'csrf', viewValue: 'CSRF'},
    {value: 'file Inclusion', viewValue: 'File Inclusion'},
  ];
  selectedVuln = 'None';

  accesses: FilterView[] = [
    {value: 'ADJACENT_NETWORK', viewValue: 'Adjacent Network'},
    {value: 'LOCAL', viewValue: 'Local'},
    {value: 'NETWORK', viewValue: 'Network'}
  ];
  selectedAccess = 'None';
 
  complexities: FilterView[] = [
    {value: 'HIGH', viewValue: 'High'},
    {value: 'LOW', viewValue: 'Low'},
    {value: 'MEDIUM', viewValue: 'Medium'}
  ];
  selectedComplexity = 'None';

  authentications: FilterView[] = [
    {value: 'MULTIPLE', viewValue: 'Multiple'},
    {value: 'NONE', viewValue: 'None'},
    {value: 'SINGLE', viewValue: 'Single'}
  ];
  selectedAuth= 'None';

  cia: FilterView[] = [
    {value: 'COMPLETE', viewValue: 'Complete'},
    {value: 'NONE', viewValue: 'None'},
    {value: 'PARTIAL', viewValue: 'Partial'}
  ];
  selectedConf= 'None';
  selectedInteg= 'None';
  selectedAvail= 'None';
  
  //Year range slider
  yearValue: number = 1988;
  yearHighValue: number = new Date().getFullYear();
  yearOptions: Options = {
    floor: this.yearValue,
    ceil: this.yearHighValue
  };

   //Score range slider
   scoreValue: number = 0;
  scoreHighValue: number = 10;
  scoreOptions: Options = {
    floor: this.scoreValue,
    ceil: this.scoreHighValue
  };
 

  

  constructor(public service:CveService) {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }

 


  //submit button get all cves
  onSubmitgetAllCVEs(form:NgForm){
    this.service.getCVEs().subscribe(
       res =>{
        this.data = res;
        this.dataSource = new MatTableDataSource<Cve>(this.data);
        this.ngAfterViewInit();
       }
       ,
       err => {
         console.log(err);
       }
     );
  }
 
  //submit button get all filtered cves
  // filteredAttribute:string='';
  // filteredValue:string='';
  // onSubmitgetAllFilteredCVEs(form:NgForm){
  //   this.service.getAllFilteredCVEs(this.filteredAttribute,this.filteredValue ).subscribe(
  //      res =>{
  //       this.data = res;
  //       this.dataSource = new MatTableDataSource<Cve>(this.data);
  //       this.ngAfterViewInit();
  //      }
  //      ,
  //      err => {
  //        console.log(err);
  //      }
  //    );
  // }

  //submit button get all year range filtered cves
  onSubmitgetAllYearRangeFilteredCVEs(form:NgForm){
    this.service.getAllYearRangeFilteredCVEs(this.yearValue.toString(), this.yearHighValue.toString()).subscribe(
       res =>{
        this.data = res;
        this.dataSource = new MatTableDataSource<Cve>(this.data);
        this.ngAfterViewInit();
       }
       ,
       err => {
         console.log(err);
       }
     );
  }

  //submit button get all score range filtered cves
  onSubmitgetAllScoreRangeFilteredCVEs(form:NgForm){
    this.service.getAllScoreRangeFilteredCVEs(this.scoreValue.toString(), this.scoreHighValue.toString()).subscribe(
       res =>{
        this.data = res;
        this.dataSource = new MatTableDataSource<Cve>(this.data);
        this.ngAfterViewInit();
       }
       ,
       err => {
         console.log(err);
       }
     );
  }

  //submit button get all vuln Type filtered cves
  onSubmitgetVulnFilteredCVEs(form:NgForm){
    this.service.getAllFilteredCVEs("VulnerabilityType",this.selectedVuln ).subscribe(
       res =>{
        this.data = res;
        this.dataSource = new MatTableDataSource<Cve>(this.data);
        this.ngAfterViewInit();
       }
       ,
       err => {
         console.log(err);
       }
     );
  }
 //submit button get all Access filtered cves
 onSubmitgetAccessFilteredCVEs(form:NgForm){
  this.service.getAllFilteredCVEs("Access",this.selectedAccess ).subscribe(
     res =>{
      this.data = res;
      this.dataSource = new MatTableDataSource<Cve>(this.data);
      this.ngAfterViewInit();
     }
     ,
     err => {
       console.log(err);
     }
   );
}
   //submit button get all Complexity filtered cves
 onSubmitgetComplexityFilteredCVEs(form:NgForm){
  this.service.getAllFilteredCVEs("Complexity",this.selectedComplexity ).subscribe(
     res =>{
      this.data = res;
      this.dataSource = new MatTableDataSource<Cve>(this.data);
      this.ngAfterViewInit();
     }
     ,
     err => {
       console.log(err);
     }
   );
}

   //submit button get all Authentication filtered cves
   onSubmitgetAuthFilteredCVEs(form:NgForm){
  this.service.getAllFilteredCVEs("Authentication",this.selectedAuth ).subscribe(
     res =>{
      this.data = res;
      this.dataSource = new MatTableDataSource<Cve>(this.data);
      this.ngAfterViewInit();
     }
     ,
     err => {
       console.log(err);
     }
   );
}
  
 //submit button get all Confidentialities filtered cves
 onSubmitgetConfidentialityFilteredCVEs(form:NgForm){
  this.service.getAllFilteredCVEs("Confidentiality",this.selectedConf ).subscribe(
     res =>{
      this.data = res;
      this.dataSource = new MatTableDataSource<Cve>(this.data);
      this.ngAfterViewInit();
     }
     ,
     err => {
       console.log(err);
     }
   );
}

//submit button get all Confidentialities filtered cves
onSubmitgetIntegrityFilteredCVEs(form:NgForm){
  this.service.getAllFilteredCVEs("Integrity",this.selectedInteg ).subscribe(
     res =>{
      this.data = res;
      this.dataSource = new MatTableDataSource<Cve>(this.data);
      this.ngAfterViewInit();
     }
     ,
     err => {
       console.log(err);
     }
   );
}

//submit button get all Confidentialities filtered cves
onSubmitgetAvailabilityFilteredCVEs(form:NgForm){
  this.service.getAllFilteredCVEs("Avaialability",this.selectedAvail ).subscribe(
     res =>{
      this.data = res;
      this.dataSource = new MatTableDataSource<Cve>(this.data);
      this.ngAfterViewInit();
     }
     ,
     err => {
       console.log(err);
     }
   );
}
 
 
}


interface FilterView {
  value: string;
  viewValue: string;
}

const ELEMENT_DATA: Cve[] = [
  {cveId:'CVE-1999-0001', cweId :'CWE-20', vulnerabilityType : 'asd', description :'asd', publishDate : 'asd', updateDate :'asd', score :5, exploitExists :'asd', access : 'asd', complexity :'asd', authentication :'asd', confidentiality:'asd', integrity:'asd', availability:'asd'},
  {cveId:'CVE-1999-0001', cweId :'CWE-20', vulnerabilityType : 'asd', description :'asd', publishDate : 'asd', updateDate :'asd', score :5, exploitExists :'asd', access : 'asd', complexity :'asd', authentication :'asd', confidentiality:'asd', integrity:'asd', availability:'asd'},
  {cveId:'CVE-1999-0001', cweId :'CWE-20', vulnerabilityType : 'asd', description :'asd', publishDate : 'asd', updateDate :'asd', score :5, exploitExists :'asd', access : 'asd', complexity :'asd', authentication :'asd', confidentiality:'asd', integrity:'asd', availability:'asd'},
  {cveId:'CVE-1999-0001', cweId :'CWE-20', vulnerabilityType : 'asd', description :'asd', publishDate : 'asd', updateDate :'asd', score :5, exploitExists :'asd', access : 'asd', complexity :'asd', authentication :'asd', confidentiality:'asd', integrity:'asd', availability:'asd'},
  {cveId:'CVE-1999-0001', cweId :'CWE-20', vulnerabilityType : 'asd', description :'asd', publishDate : 'asd', updateDate :'asd', score :5, exploitExists :'asd', access : 'asd', complexity :'asd', authentication :'asd', confidentiality:'asd', integrity:'asd', availability:'asd'},
  {cveId:'CVE-1999-0001', cweId :'CWE-20', vulnerabilityType : 'asd', description :'asd', publishDate : 'asd', updateDate :'asd', score :5, exploitExists :'asd', access : 'asd', complexity :'asd', authentication :'asd', confidentiality:'asd', integrity:'asd', availability:'asd'},
  {cveId:'CVE-1999-0001', cweId :'CWE-20', vulnerabilityType : 'asd', description :'asd', publishDate : 'asd', updateDate :'asd', score :5, exploitExists :'asd', access : 'asd', complexity :'asd', authentication :'asd', confidentiality:'asd', integrity:'asd', availability:'asd'},
  {cveId:'CVE-1999-0001', cweId :'CWE-20', vulnerabilityType : 'asd', description :'asd', publishDate : 'asd', updateDate :'asd', score :5, exploitExists :'asd', access : 'asd', complexity :'asd', authentication :'asd', confidentiality:'asd', integrity:'asd', availability:'asd'},
  {cveId:'CVE-1999-0001', cweId :'CWE-20', vulnerabilityType : 'asd', description :'asd', publishDate : 'asd', updateDate :'asd', score :5, exploitExists :'asd', access : 'asd', complexity :'asd', authentication :'asd', confidentiality:'asd', integrity:'asd', availability:'asd'},
  {cveId:'CVE-1999-0001', cweId :'CWE-20', vulnerabilityType : 'asd', description :'asd', publishDate : 'asd', updateDate :'asd', score :5, exploitExists :'asd', access : 'asd', complexity :'asd', authentication :'asd', confidentiality:'asd', integrity:'asd', availability:'asd'},
  {cveId:'CVE-1999-0001', cweId :'CWE-20', vulnerabilityType : 'asd', description :'asd', publishDate : 'asd', updateDate :'asd', score :5, exploitExists :'asd', access : 'asd', complexity :'asd', authentication :'asd', confidentiality:'asd', integrity:'asd', availability:'asd'},
  {cveId:'CVE-1999-0001', cweId :'CWE-20', vulnerabilityType : 'asd', description :'asd', publishDate : 'asd', updateDate :'asd', score :5, exploitExists :'asd', access : 'asd', complexity :'asd', authentication :'asd', confidentiality:'asd', integrity:'asd', availability:'asd'},
  {cveId:'CVE-1999-0001', cweId :'CWE-20', vulnerabilityType : 'asd', description :'asd', publishDate : 'asd', updateDate :'asd', score :5, exploitExists :'asd', access : 'asd', complexity :'asd', authentication :'asd', confidentiality:'asd', integrity:'asd', availability:'asd'},
  {cveId:'CVE-1999-0001', cweId :'CWE-20', vulnerabilityType : 'asd', description :'asd', publishDate : 'asd', updateDate :'asd', score :5, exploitExists :'asd', access : 'asd', complexity :'asd', authentication :'asd', confidentiality:'asd', integrity:'asd', availability:'asd'},
  {cveId:'CVE-1999-0001', cweId :'CWE-20', vulnerabilityType : 'asd', description :'asd', publishDate : 'asd', updateDate :'asd', score :5, exploitExists :'asd', access : 'asd', complexity :'asd', authentication :'asd', confidentiality:'asd', integrity:'asd', availability:'asd'},
  {cveId:'CVE-1999-0001', cweId :'CWE-20', vulnerabilityType : 'asd', description :'asd', publishDate : 'asd', updateDate :'asd', score :5, exploitExists :'asd', access : 'asd', complexity :'asd', authentication :'asd', confidentiality:'asd', integrity:'asd', availability:'asd'},
  {cveId:'CVE-1999-0001', cweId :'CWE-20', vulnerabilityType : 'asd', description :'asd', publishDate : 'asd', updateDate :'asd', score :5, exploitExists :'asd', access : 'asd', complexity :'asd', authentication :'asd', confidentiality:'asd', integrity:'asd', availability:'asd'},
  {cveId:'CVE-1999-0001', cweId :'CWE-20', vulnerabilityType : 'asd', description :'asd', publishDate : 'asd', updateDate :'asd', score :5, exploitExists :'asd', access : 'asd', complexity :'asd', authentication :'asd', confidentiality:'asd', integrity:'asd', availability:'asd'},
  {cveId:'CVE-1999-0001', cweId :'CWE-20', vulnerabilityType : 'asd', description :'asd', publishDate : 'asd', updateDate :'asd', score :5, exploitExists :'asd', access : 'asd', complexity :'asd', authentication :'asd', confidentiality:'asd', integrity:'asd', availability:'asd'},
  {cveId:'CVE-1999-0001', cweId :'CWE-20', vulnerabilityType : 'asd', description :'asd', publishDate : 'asd', updateDate :'asd', score :5, exploitExists :'asd', access : 'asd', complexity :'asd', authentication :'asd', confidentiality:'asd', integrity:'asd', availability:'asd'},
  {cveId:'CVE-1999-0001', cweId :'CWE-20', vulnerabilityType : 'asd', description :'asd', publishDate : 'asd', updateDate :'asd', score :5, exploitExists :'asd', access : 'asd', complexity :'asd', authentication :'asd', confidentiality:'asd', integrity:'asd', availability:'asd'},
  {cveId:'CVE-1999-0001', cweId :'CWE-20', vulnerabilityType : 'asd', description :'asd', publishDate : 'asd', updateDate :'asd', score :5, exploitExists :'asd', access : 'asd', complexity :'asd', authentication :'asd', confidentiality:'asd', integrity:'asd', availability:'asd'},
  {cveId:'CVE-1999-0001', cweId :'CWE-20', vulnerabilityType : 'asd', description :'asd', publishDate : 'asd', updateDate :'asd', score :5, exploitExists :'asd', access : 'asd', complexity :'asd', authentication :'asd', confidentiality:'asd', integrity:'asd', availability:'asd'}

 
];