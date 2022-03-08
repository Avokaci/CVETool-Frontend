import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Cve } from '../shared/DTOs/cve.model';



// TODO: replace this with real data from your application
const EXAMPLE_DATA: Cve[] = [
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

/**
 * Data source for the DataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableDataSource extends DataSource<Cve> {
  data: Cve[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor( paramData: Cve[]) {
    super();
    //debugger;
    this.data = paramData;
    console.log(this.data)
  }



  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Cve[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Cve[]): Cve[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Cve[]): Cve[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'cveId': return compare(a.cveId, b.cveId, isAsc);
        case 'cweId': return compare(a.cweId, b.cweId, isAsc);
        case 'vulnerabilityType': return compare(a.vulnerabilityType, b.vulnerabilityType, isAsc);
        case 'description': return compare(a.description, b.description, isAsc);
        case 'publishDate': return compare(a.publishDate, b.publishDate, isAsc);
        case 'updateDate': return compare(a.updateDate, b.updateDate, isAsc);
        case 'score': return compare(a.score, b.score, isAsc);
        case 'exploitExists': return compare(a.exploitExists, b.exploitExists, isAsc);
        case 'access': return compare(a.access, b.access, isAsc);
        case 'complexity': return compare(a.complexity, b.complexity, isAsc);
        case 'authentication': return compare(a.authentication, b.authentication, isAsc);
        case 'confidentiality': return compare(a.confidentiality, b.confidentiality, isAsc);
        case 'integrity': return compare(a.integrity, b.integrity, isAsc);
        case 'availability': return compare(a.availability, b.availability, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
