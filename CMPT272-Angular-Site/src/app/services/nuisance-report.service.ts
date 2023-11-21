import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NuisanceReport } from 'app/classes/nuisance-report';
import { SERVER_COLLECTION_URL } from 'app/constants';
import { Observable, catchError, map, throwError } from 'rxjs';

interface IDTracker {
  key:string
  data: {
    ID: number
  }
}

@Injectable({
  providedIn: 'root'
})
export class NuisanceReportService {

  constructor(private http:HttpClient) { }

  getReportList():NuisanceReport[] {
    // TODO: GET from server 
    return [
      new NuisanceReport(this, 'witnessA', '123-456-7890', 'Bob the Builder', 'Burnaby', 1.1, 2.2),
      new NuisanceReport(this, 'witnessB', '778-423-1534', 'Elmo', 'Vancouver', 3.3, 4.4),
      new NuisanceReport(this, 'witnessC', '604-645-1275', 'Dora the Explorer', 'Surrey', 5.5, 6.6),
      new NuisanceReport(this, 'witnessD', '800-512-7453', 'Winnie the Pooh', 'Richmond', 7.7, 8.8),
    ]
  }

  addReport(report:NuisanceReport) {
    // POST to server the new report
    let postBody = {key: report.ID, data: report}
 
    this.http.post(SERVER_COLLECTION_URL + 'reports/documents/', postBody)
      .pipe(catchError(this.handleError))
      .subscribe(() => {console.log('test')})
  }
  
  getNewID(): Observable<number> {
    // GET next ID from server
    return this.http.get<IDTracker>(SERVER_COLLECTION_URL + '/IDTracker/documents/nextID')
      .pipe(
        catchError(this.handleError),
        map((response: IDTracker) => {
          const newID = Number(response.data.ID);
          let putBody = response
          putBody.data.ID = newID + 1

          // PUT to update next ID
          this.http.put(SERVER_COLLECTION_URL + '/IDTracker/documents/nextID', putBody)
            .pipe(catchError(this.handleError))
            .subscribe(() => {});
  
          return newID;
        })
      );
  }
  
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
