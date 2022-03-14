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
  filteredAttribute:string='';
  filteredValue:string='';
  startYear:number=0;
  endYear:number=0;
  startScore:string='';
  endScore:string='';

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
 

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  constructor(public service:CveService) {
    

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }



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
 
  onSubmitgetAllFilteredCVEs(form:NgForm){
    this.service.getAllFilteredCVEs(this.filteredAttribute,this.filteredValue ).subscribe(
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