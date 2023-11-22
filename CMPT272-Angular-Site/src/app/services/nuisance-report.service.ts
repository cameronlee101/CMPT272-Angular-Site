import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_COLLECTION_URL } from 'app/constants';
import { Observable, catchError, map, of, throwError } from 'rxjs';

export enum Status {
  Open = 'Open',
  Resolved = 'Resolved',
}

interface IDTracker {
  key:string
  data: {
    ID:number
  }
}

interface Reports {
  key:string
  data:NuisanceReport
  // data: {
  //   ID:number
  //   nrs:NuisanceReportService, 
  //   witnessName:string, 
  //   witnessPhoneNumber:string, 
  //   baddieName:string,
  //   locationName:string, 
  //   latitude:number, 
  //   longitude:number,
  //   status:Status,
  //   timeReported:string,
  //   picLink?:string, 
  //   extraInfo?:string
  // }
}

export class NuisanceReport {
  public ID:number
  public status:Status
  public timeReported:Date

  constructor(nrs:NuisanceReportService, public witnessName:string, public witnessPhoneNumber:string, public baddieName:string,
              public locationName:string, public latitude:number, public longitude:number,
              public picLink?:string, public extraInfo?:string) {
      this.timeReported = new Date()
      this.ID = nrs.getNewID()
      this.status = Status.Open
  }
}

@Injectable({
  providedIn: 'root'
})
export class NuisanceReportService {
  nextID:number = 0;
  IDTrackerUpdateBody:IDTracker = {
    key: '',
    data: {
      ID: 0
    }
  };

  constructor(private http:HttpClient) { 
    // GET next ID from server
    this.http.get<IDTracker>(SERVER_COLLECTION_URL + '/IDTracker/documents/nextID')
      .pipe(catchError(this.handleError))
      .subscribe((response:IDTracker) => {
        this.IDTrackerUpdateBody = response
        this.nextID = response.data.ID
      })
  }

  getReportList():Observable<NuisanceReport[]> {
    // GET list of nuisance reports from server
    // NOTE: calling function will need to .subscribe() to get value
    return this.http.get<Reports[]>(SERVER_COLLECTION_URL + '/reports/documents')
      .pipe(catchError(this.handleError))
      .pipe(map((response:Reports[]) => {
        let reportList:NuisanceReport[] = []
        for (let report of response) {
          reportList.push(report.data)
        }
        return reportList
      }))
  }

  addReport(report:NuisanceReport) {
    // POST to server the new report
    let postBody = {key: report.ID, data: report}
 
    this.http.post(SERVER_COLLECTION_URL + 'reports/documents/', postBody)
      .pipe(catchError(this.handleError))
      .subscribe()
  }
  
  getNewID(): number {
    this.nextID += 1
    this.IDTrackerUpdateBody.data.ID = this.nextID

    this.http.put(SERVER_COLLECTION_URL + '/IDTracker/documents/nextID', this.IDTrackerUpdateBody)
      .pipe(catchError(this.handleError))
      .subscribe(() => {});

    return this.nextID - 1;
  }
  
  // Adapted from https://angular.io/guide/http-handle-request-errors
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
