import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Cve } from '../shared/DTOs/cve.model';
import { CveService } from '../shared/services/cve.service';
import { DataTableDataSource } from './data-table-datasource';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Cve>;
  dataSource: DataTableDataSource;
  data: Cve[] =[];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['CVEId', 'CWEId', 'VulnerabilityType', 'Description', 'PublishDate', 'UpdateDate', 'Score', 'ExploitExists', 'Access', 'Complexity', 'Authentication', 'Confidentiality', 'Integrity', 'Availability' ];

  constructor(public service:CveService) {
    
   this.service.getCVEs().subscribe(res=>{ this.data = res;
      this.dataSource = new DataTableDataSource(this.data);}) 
    this.dataSource = new DataTableDataSource(this.data);
  }

  onSubmit(form:NgForm){
    this.service.getCVEs().subscribe(
       res =>{
        this.data = res;
        this.dataSource = new DataTableDataSource(this.data);
       }
       ,
       err => {
         console.log(err);
       }
     );
  }
 
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
