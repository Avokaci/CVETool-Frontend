import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Cve } from '../shared/DTOs/cve.model';
import { CveService } from '../shared/services/cve.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Options } from '@angular-slider/ngx-slider';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class DataTableComponent implements AfterViewInit {
  columnsToDisplay = ['cveId', 'cweId', 'vulnerabilityType', 'publishDate', 'updateDate', 'score', 'searchExploit', 'access', 'complexity', 'authentication', 'confidentiality', 'integrity', 'availability'];


  dataSource = new MatTableDataSource<Cve>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  myForm!: FormGroup;
  myFormCIA!: FormGroup;

  expandedElement: Cve | null = null;
  data: Cve[] = [];


  //vulnerability Filter
  vulnerabilities: FilterView[] = [
    { value: 'dos', viewValue: 'DoS' },
    { value: 'code execution', viewValue: 'Code Execution' },
    { value: 'overflow', viewValue: 'Overflow' },
    { value: 'memory corruption', viewValue: 'Memory Corruption' },
    { value: 'sql injection', viewValue: 'SQL Injection' },
    { value: 'xss', viewValue: 'XSS' },
    { value: 'directory traversal', viewValue: 'Directory Traversal' },
    { value: 'http Response Splitting', viewValue: 'HTTP Response Splitting' },
    { value: 'bypass Something', viewValue: 'Bypass Something' },
    { value: 'gain Information', viewValue: 'Gain Information' },
    { value: 'gain Privileges', viewValue: 'Gain Privileges' },
    { value: 'csrf', viewValue: 'CSRF' },
    { value: 'file Inclusion', viewValue: 'File Inclusion' },
  ];
  selectedVuln = '';

  //access Filter
  accesses: FilterView[] = [
    { value: 'ADJACENT_NETWORK', viewValue: 'Adjacent Network' },
    { value: 'LOCAL', viewValue: 'Local' },
    { value: 'NETWORK', viewValue: 'Network' }
  ];
  selectedAccess = '';

  //complexity Filter
  complexities: FilterView[] = [
    { value: 'HIGH', viewValue: 'High' },
    { value: 'LOW', viewValue: 'Low' },
    { value: 'MEDIUM', viewValue: 'Medium' }
  ];
  selectedComplexity = '';

  //authentication Filter
  authentications: FilterView[] = [
    { value: 'MULTIPLE', viewValue: 'Multiple' },
    { value: 'NONE', viewValue: 'None' },
    { value: 'SINGLE', viewValue: 'Single' }
  ];
  selectedAuth = '';

  //cia Filter
  cia: FilterView[] = [
    { value: 'COMPLETE', viewValue: 'Complete' },
    { value: 'NONE', viewValue: 'None' },
    { value: 'PARTIAL', viewValue: 'Partial' }
  ];
  selectedConf = '';
  selectedInteg = '';
  selectedAvail = '';

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




  constructor(public service: CveService, private fb: FormBuilder) {
    this.onSubmitclearFilters();
    this.ngAfterViewInit();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  ngOnInit() {
    this.myForm = this.fb.group({
      vulnerability: '',
      access: '',
      complexity: '',
      authentication: '',
    })

    this.myFormCIA = this.fb.group({
    
      confidentiality: '',
      intergrity: '',
      availability: ''
    })

    this.myForm.valueChanges.subscribe(console.log)
    this.myForm.controls['vulnerability'].valueChanges.subscribe(res => { this.onSubmitgetVulnFilteredCVEs();  this.selectedAccess = ''; this.selectedAuth = ''; this.selectedAvail = ''; this.selectedComplexity = ''; this.selectedConf = ''; this.selectedInteg = ''; })
    this.myForm.controls['access'].valueChanges.subscribe(res => { this.onSubmitgetAccessFilteredCVEs(); this.selectedVuln = ''; this.selectedAuth = ''; this.selectedAvail = ''; this.selectedComplexity = ''; this.selectedConf = ''; this.selectedInteg = '';  })
    this.myForm.controls['complexity'].valueChanges.subscribe(res => { this.onSubmitgetComplexityFilteredCVEs(); this.selectedVuln = ''; this.selectedAccess = ''; this.selectedAuth = ''; this.selectedAvail = '';  this.selectedConf = ''; this.selectedInteg = '';  })
    this.myForm.controls['authentication'].valueChanges.subscribe(res => { this.onSubmitgetAuthFilteredCVEs(); this.selectedVuln = ''; this.selectedAccess = ''; this.selectedComplexity = ''; this.selectedAvail = '';  this.selectedConf = ''; this.selectedInteg = '';})
    this.myFormCIA.controls['confidentiality'].valueChanges.subscribe(res => { this.onSubmitgetConfidentialityFilteredCVEs(); this.selectedVuln = ''; this.selectedAccess = ''; this.selectedAuth = '';  this.selectedComplexity = ''; this.selectedAvail = '';  this.selectedInteg = '';})
    this.myFormCIA.controls['intergrity'].valueChanges.subscribe(res => { this.onSubmitgetIntegrityFilteredCVEs(); this.selectedVuln = ''; this.selectedAccess = ''; this.selectedAuth = '';  this.selectedComplexity = ''; this.selectedAvail = '';  this.selectedConf = ''; })
    this.myFormCIA.controls['availability'].valueChanges.subscribe(res => { this.onSubmitgetAvailabilityFilteredCVEs(); this.selectedVuln = ''; this.selectedAccess = ''; this.selectedAuth = '';  this.selectedComplexity = '';  this.selectedConf = ''; this.selectedInteg = '';})

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }




  //submit button get all cves
  onSubmitclearFilters() {
    this.service.getCVEs().subscribe(
      res => {
        this.data = res;
        this.dataSource = new MatTableDataSource<Cve>(this.data);
        this.selectedAccess = '';
        this.selectedAuth = '';
        this.selectedAvail = '';
        this.selectedComplexity = '';
        this.selectedConf = '';
        this.selectedInteg = '';
        this.selectedVuln = '';
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
  onSubmitgetAllYearRangeFilteredCVEs(form: NgForm) {
    this.service.getAllYearRangeFilteredCVEs(this.yearValue.toString(), this.yearHighValue.toString()).subscribe(
      res => {
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
  onSubmitgetAllScoreRangeFilteredCVEs(form: NgForm) {
    this.service.getAllScoreRangeFilteredCVEs(this.scoreValue.toString(), this.scoreHighValue.toString()).subscribe(
      res => {
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
  onSubmitgetVulnFilteredCVEs() {
    this.service.getAllFilteredCVEs("VulnerabilityType", this.selectedVuln).subscribe(
      res => {
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
  onSubmitgetAccessFilteredCVEs() {
    this.service.getAllFilteredCVEs("Access", this.selectedAccess).subscribe(
      res => {
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
  onSubmitgetComplexityFilteredCVEs() {
    this.service.getAllFilteredCVEs("Complexity", this.selectedComplexity).subscribe(
      res => {
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
  onSubmitgetAuthFilteredCVEs() {
    this.service.getAllFilteredCVEs("Authentication", this.selectedAuth).subscribe(
      res => {
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
  onSubmitgetConfidentialityFilteredCVEs() {
    this.service.getAllFilteredCVEs("Confidentiality", this.selectedConf).subscribe(
      res => {
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
  onSubmitgetIntegrityFilteredCVEs() {
    this.service.getAllFilteredCVEs("Integrity", this.selectedInteg).subscribe(
      res => {
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
  onSubmitgetAvailabilityFilteredCVEs() {
    this.service.getAllFilteredCVEs("Avaialability", this.selectedAvail).subscribe(
      res => {
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
  { cveId: 'CVE-1999-0001', cweId: 'CWE-20', vulnerabilityType: 'asd', description: 'asd', publishDate: 'asd', updateDate: 'asd', score: 5, searchExploit: 'asd', access: 'asd', complexity: 'asd', authentication: 'asd', confidentiality: 'asd', integrity: 'asd', availability: 'asd' },
  { cveId: 'CVE-1999-0001', cweId: 'CWE-20', vulnerabilityType: 'asd', description: 'asd', publishDate: 'asd', updateDate: 'asd', score: 5, searchExploit: 'asd', access: 'asd', complexity: 'asd', authentication: 'asd', confidentiality: 'asd', integrity: 'asd', availability: 'asd' },
  { cveId: 'CVE-1999-0001', cweId: 'CWE-20', vulnerabilityType: 'asd', description: 'asd', publishDate: 'asd', updateDate: 'asd', score: 5, searchExploit: 'asd', access: 'asd', complexity: 'asd', authentication: 'asd', confidentiality: 'asd', integrity: 'asd', availability: 'asd' },
  { cveId: 'CVE-1999-0001', cweId: 'CWE-20', vulnerabilityType: 'asd', description: 'asd', publishDate: 'asd', updateDate: 'asd', score: 5, searchExploit: 'asd', access: 'asd', complexity: 'asd', authentication: 'asd', confidentiality: 'asd', integrity: 'asd', availability: 'asd' },
  { cveId: 'CVE-1999-0001', cweId: 'CWE-20', vulnerabilityType: 'asd', description: 'asd', publishDate: 'asd', updateDate: 'asd', score: 5, searchExploit: 'asd', access: 'asd', complexity: 'asd', authentication: 'asd', confidentiality: 'asd', integrity: 'asd', availability: 'asd' },
  { cveId: 'CVE-1999-0001', cweId: 'CWE-20', vulnerabilityType: 'asd', description: 'asd', publishDate: 'asd', updateDate: 'asd', score: 5, searchExploit: 'asd', access: 'asd', complexity: 'asd', authentication: 'asd', confidentiality: 'asd', integrity: 'asd', availability: 'asd' },
  { cveId: 'CVE-1999-0001', cweId: 'CWE-20', vulnerabilityType: 'asd', description: 'asd', publishDate: 'asd', updateDate: 'asd', score: 5, searchExploit: 'asd', access: 'asd', complexity: 'asd', authentication: 'asd', confidentiality: 'asd', integrity: 'asd', availability: 'asd' },
  { cveId: 'CVE-1999-0001', cweId: 'CWE-20', vulnerabilityType: 'asd', description: 'asd', publishDate: 'asd', updateDate: 'asd', score: 5, searchExploit: 'asd', access: 'asd', complexity: 'asd', authentication: 'asd', confidentiality: 'asd', integrity: 'asd', availability: 'asd' },
  { cveId: 'CVE-1999-0001', cweId: 'CWE-20', vulnerabilityType: 'asd', description: 'asd', publishDate: 'asd', updateDate: 'asd', score: 5, searchExploit: 'asd', access: 'asd', complexity: 'asd', authentication: 'asd', confidentiality: 'asd', integrity: 'asd', availability: 'asd' },
  { cveId: 'CVE-1999-0001', cweId: 'CWE-20', vulnerabilityType: 'asd', description: 'asd', publishDate: 'asd', updateDate: 'asd', score: 5, searchExploit: 'asd', access: 'asd', complexity: 'asd', authentication: 'asd', confidentiality: 'asd', integrity: 'asd', availability: 'asd' },
  { cveId: 'CVE-1999-0001', cweId: 'CWE-20', vulnerabilityType: 'asd', description: 'asd', publishDate: 'asd', updateDate: 'asd', score: 5, searchExploit: 'asd', access: 'asd', complexity: 'asd', authentication: 'asd', confidentiality: 'asd', integrity: 'asd', availability: 'asd' },
  { cveId: 'CVE-1999-0001', cweId: 'CWE-20', vulnerabilityType: 'asd', description: 'asd', publishDate: 'asd', updateDate: 'asd', score: 5, searchExploit: 'asd', access: 'asd', complexity: 'asd', authentication: 'asd', confidentiality: 'asd', integrity: 'asd', availability: 'asd' },
  { cveId: 'CVE-1999-0001', cweId: 'CWE-20', vulnerabilityType: 'asd', description: 'asd', publishDate: 'asd', updateDate: 'asd', score: 5, searchExploit: 'asd', access: 'asd', complexity: 'asd', authentication: 'asd', confidentiality: 'asd', integrity: 'asd', availability: 'asd' },
  { cveId: 'CVE-1999-0001', cweId: 'CWE-20', vulnerabilityType: 'asd', description: 'asd', publishDate: 'asd', updateDate: 'asd', score: 5, searchExploit: 'asd', access: 'asd', complexity: 'asd', authentication: 'asd', confidentiality: 'asd', integrity: 'asd', availability: 'asd' },
  { cveId: 'CVE-1999-0001', cweId: 'CWE-20', vulnerabilityType: 'asd', description: 'asd', publishDate: 'asd', updateDate: 'asd', score: 5, searchExploit: 'asd', access: 'asd', complexity: 'asd', authentication: 'asd', confidentiality: 'asd', integrity: 'asd', availability: 'asd' },
  { cveId: 'CVE-1999-0001', cweId: 'CWE-20', vulnerabilityType: 'asd', description: 'asd', publishDate: 'asd', updateDate: 'asd', score: 5, searchExploit: 'asd', access: 'asd', complexity: 'asd', authentication: 'asd', confidentiality: 'asd', integrity: 'asd', availability: 'asd' },
  { cveId: 'CVE-1999-0001', cweId: 'CWE-20', vulnerabilityType: 'asd', description: 'asd', publishDate: 'asd', updateDate: 'asd', score: 5, searchExploit: 'asd', access: 'asd', complexity: 'asd', authentication: 'asd', confidentiality: 'asd', integrity: 'asd', availability: 'asd' },
  { cveId: 'CVE-1999-0001', cweId: 'CWE-20', vulnerabilityType: 'asd', description: 'asd', publishDate: 'asd', updateDate: 'asd', score: 5, searchExploit: 'asd', access: 'asd', complexity: 'asd', authentication: 'asd', confidentiality: 'asd', integrity: 'asd', availability: 'asd' },
  { cveId: 'CVE-1999-0001', cweId: 'CWE-20', vulnerabilityType: 'asd', description: 'asd', publishDate: 'asd', updateDate: 'asd', score: 5, searchExploit: 'asd', access: 'asd', complexity: 'asd', authentication: 'asd', confidentiality: 'asd', integrity: 'asd', availability: 'asd' },
  { cveId: 'CVE-1999-0001', cweId: 'CWE-20', vulnerabilityType: 'asd', description: 'asd', publishDate: 'asd', updateDate: 'asd', score: 5, searchExploit: 'asd', access: 'asd', complexity: 'asd', authentication: 'asd', confidentiality: 'asd', integrity: 'asd', availability: 'asd' },
  { cveId: 'CVE-1999-0001', cweId: 'CWE-20', vulnerabilityType: 'asd', description: 'asd', publishDate: 'asd', updateDate: 'asd', score: 5, searchExploit: 'asd', access: 'asd', complexity: 'asd', authentication: 'asd', confidentiality: 'asd', integrity: 'asd', availability: 'asd' },
  { cveId: 'CVE-1999-0001', cweId: 'CWE-20', vulnerabilityType: 'asd', description: 'asd', publishDate: 'asd', updateDate: 'asd', score: 5, searchExploit: 'asd', access: 'asd', complexity: 'asd', authentication: 'asd', confidentiality: 'asd', integrity: 'asd', availability: 'asd' },
  { cveId: 'CVE-1999-0001', cweId: 'CWE-20', vulnerabilityType: 'asd', description: 'asd', publishDate: 'asd', updateDate: 'asd', score: 5, searchExploit: 'asd', access: 'asd', complexity: 'asd', authentication: 'asd', confidentiality: 'asd', integrity: 'asd', availability: 'asd' }


];