import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Cve } from '../shared/DTOs/cve.model';



// TODO: replace this with real data from your application
const EXAMPLE_DATA: Cve[] = [
  {CVEId:1, CWEId :5, VulnerabilityType : 'asd', Description :'asd', PublishDate : 'asd', UpdateDate :'asd', Score :5, ExploitExists :'asd', Access : 'asd', Complexity :'asd', Authentication :'asd', Confidentiality:'asd', Integrity:'asd', Availability:'asd'},
  {CVEId:2, CWEId :5, VulnerabilityType : 'asd', Description :'asd', PublishDate : 'asd', UpdateDate :'asd', Score :5, ExploitExists :'asd', Access : 'asd', Complexity :'asd', Authentication :'asd', Confidentiality:'asd', Integrity:'asd', Availability:'asd'},
  {CVEId:3, CWEId :5, VulnerabilityType : 'asd', Description :'asd', PublishDate : 'asd', UpdateDate :'asd', Score :5, ExploitExists :'asd', Access : 'asd', Complexity :'asd', Authentication :'asd', Confidentiality:'asd', Integrity:'asd', Availability:'asd'},
  {CVEId:4, CWEId :5, VulnerabilityType : 'asdasdd', Description :'asd', PublishDate : 'asd', UpdateDate :'asd', Score :5, ExploitExists :'asd', Access : 'asd', Complexity :'asd', Authentication :'asd', Confidentiality:'asd', Integrity:'asd', Availability:'asd'},
  {CVEId:5, CWEId :5, VulnerabilityType : 'asd', Description :'asd', PublishDate : 'asd', UpdateDate :'asd', Score :5, ExploitExists :'asd', Access : 'asd', Complexity :'asd', Authentication :'asd', Confidentiality:'asd', Integrity:'asd', Availability:'asd'},
  {CVEId:6, CWEId :5, VulnerabilityType : 'aasdassd', Description :'asd', PublishDate : 'asd', UpdateDate :'asd', Score :5, ExploitExists :'asd', Access : 'asd', Complexity :'asd', Authentication :'asd', Confidentiality:'asd', Integrity:'asd', Availability:'asd'},
  {CVEId:7, CWEId :5, VulnerabilityType : 'asd', Description :'asd', PublishDate : 'asd', UpdateDate :'asd', Score :5, ExploitExists :'asd', Access : 'asd', Complexity :'asd', Authentication :'asd', Confidentiality:'asd', Integrity:'asd', Availability:'asd'},
  {CVEId:8, CWEId :5, VulnerabilityType : 'asd', Description :'asd', PublishDate : 'asd', UpdateDate :'asd', Score :5, ExploitExists :'asd', Access : 'asd', Complexity :'asd', Authentication :'asd', Confidentiality:'asd', Integrity:'asd', Availability:'asd'},
  {CVEId:9, CWEId :5, VulnerabilityType : 'asd', Description :'asd', PublishDate : 'asd', UpdateDate :'asd', Score :5, ExploitExists :'asd', Access : 'asd', Complexity :'asd', Authentication :'asd', Confidentiality:'asd', Integrity:'asd', Availability:'asd'},
  {CVEId:10, CWEId :5, VulnerabilityType : 'asadsd', Description :'asd', PublishDate : 'asd', UpdateDate :'asd', Score :5, ExploitExists :'asd', Access : 'asd', Complexity :'asd', Authentication :'asd', Confidentiality:'asd', Integrity:'asd', Availability:'asd'},
  {CVEId:11, CWEId :5, VulnerabilityType : 'asd', Description :'asd', PublishDate : 'asd', UpdateDate :'asd', Score :5, ExploitExists :'asd', Access : 'asd', Complexity :'asd', Authentication :'asd', Confidentiality:'asd', Integrity:'asd', Availability:'asd'},
  {CVEId:12, CWEId :5, VulnerabilityType : 'asasdasd', Description :'asd', PublishDate : 'asd', UpdateDate :'asd', Score :5, ExploitExists :'asd', Access : 'asd', Complexity :'asd', Authentication :'asd', Confidentiality:'asd', Integrity:'asd', Availability:'asd'},
  {CVEId:13, CWEId :5, VulnerabilityType : 'asasdd', Description :'asd', PublishDate : 'asd', UpdateDate :'asd', Score :5, ExploitExists :'asd', Access : 'asd', Complexity :'asd', Authentication :'asd', Confidentiality:'asd', Integrity:'asd', Availability:'asd'},
  {CVEId:14, CWEId :5, VulnerabilityType : 'asd', Description :'asd', PublishDate : 'asd', UpdateDate :'asd', Score :5, ExploitExists :'asd', Access : 'asd', Complexity :'asd', Authentication :'asd', Confidentiality:'asd', Integrity:'asd', Availability:'asd'},
  {CVEId:15, CWEId :5, VulnerabilityType : 'asd', Description :'asd', PublishDate : 'asd', UpdateDate :'asd', Score :5, ExploitExists :'asd', Access : 'asd', Complexity :'asd', Authentication :'asd', Confidentiality:'asd', Integrity:'asd', Availability:'asd'},
  {CVEId:15, CWEId :5, VulnerabilityType : 'aasdsd', Description :'asd', PublishDate : 'asd', UpdateDate :'asd', Score :5, ExploitExists :'asd', Access : 'asd', Complexity :'asd', Authentication :'asd', Confidentiality:'asd', Integrity:'asd', Availability:'asd'},
  {CVEId:16, CWEId :5, VulnerabilityType : 'asd', Description :'asd', PublishDate : 'asd', UpdateDate :'asd', Score :5, ExploitExists :'asd', Access : 'asd', Complexity :'asd', Authentication :'asd', Confidentiality:'asd', Integrity:'asd', Availability:'asd'},
  {CVEId:17, CWEId :5, VulnerabilityType : 'asasdd', Description :'asd', PublishDate : 'asd', UpdateDate :'asd', Score :5, ExploitExists :'asd', Access : 'asd', Complexity :'asd', Authentication :'asd', Confidentiality:'asd', Integrity:'asd', Availability:'asd'},
  {CVEId:18, CWEId :5, VulnerabilityType : 'asd', Description :'asd', PublishDate : 'asd', UpdateDate :'asd', Score :5, ExploitExists :'asd', Access : 'asd', Complexity :'asd', Authentication :'asd', Confidentiality:'asd', Integrity:'asd', Availability:'asd'},
  {CVEId:19, CWEId :5, VulnerabilityType : 'asasdd', Description :'asd', PublishDate : 'asd', UpdateDate :'asd', Score :5, ExploitExists :'asd', Access : 'asd', Complexity :'asd', Authentication :'asd', Confidentiality:'asd', Integrity:'asd', Availability:'asd'},
  {CVEId:20, CWEId :5, VulnerabilityType : 'a', Description :'asd', PublishDate : 'asd', UpdateDate :'asd', Score :5, ExploitExists :'asd', Access : 'asd', Complexity :'asd', Authentication :'asd', Confidentiality:'asd', Integrity:'asd', Availability:'asd'}
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
    this.data = EXAMPLE_DATA;
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
        case 'CVEId': return compare(a.CVEId, b.CVEId, isAsc);
        case 'CWEId': return compare(a.CWEId, b.CWEId, isAsc);
        case 'VulnerabilityType': return compare(a.VulnerabilityType, b.VulnerabilityType, isAsc);
        case 'Description': return compare(a.Description, b.Description, isAsc);
        case 'PublishDate': return compare(a.PublishDate, b.PublishDate, isAsc);
        case 'UpdateDate': return compare(a.UpdateDate, b.UpdateDate, isAsc);
        case 'Score': return compare(a.Score, b.Score, isAsc);
        case 'ExploitExists': return compare(a.ExploitExists, b.ExploitExists, isAsc);
        case 'Access': return compare(a.Access, b.Access, isAsc);
        case 'Complexity': return compare(a.Complexity, b.Complexity, isAsc);
        case 'Authentication': return compare(a.Authentication, b.Authentication, isAsc);
        case 'Confidentiality': return compare(a.Confidentiality, b.Confidentiality, isAsc);
        case 'Integrity': return compare(a.Integrity, b.Integrity, isAsc);
        case 'Availability': return compare(a.Availability, b.Availability, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
