import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CveService } from 'src/app/shared/services/cve.service';

@Component({
  selector: 'app-cves',
  templateUrl: './cves.component.html',
  styleUrls: ['./cves.component.scss']
})
export class CVEsComponent implements OnInit {

  constructor(public service:CveService) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    this.service.getCVEs().subscribe(
       res =>{
 
       }
       ,
       err => {
         console.log(err);
       }
     );
  }
}
