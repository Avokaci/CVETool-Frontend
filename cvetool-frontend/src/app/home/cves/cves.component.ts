import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CveService } from 'src/app/shared/services/cve.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Cve } from 'src/app/shared/DTOs/cve.model';
import { DataTableComponent } from 'src/app/data-table/data-table.component';

@Component({
  selector: 'app-cves',
  templateUrl: './cves.component.html',
  styleUrls: ['./cves.component.scss']
})
export class CVEsComponent implements OnInit {

  data: Cve[] =[];

  constructor(public service:CveService) { }
  ngOnInit() {
    
  }

 /* onSubmit(form:NgForm){
    this.service.getCVEs().subscribe(
       res =>{
          this.data = res;
          console.log(this.data);
       }
       ,
       err => {
         console.log(err);
       }
     );
  }
  */
}
