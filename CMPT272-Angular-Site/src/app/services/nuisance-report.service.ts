import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_COLLECTION_URL } from 'app/constants';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { LocationData, LocationDataService } from './location-data.service';

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

interface ReportResponse {
  key:string
  data: {
    ID:number
    nrs:NuisanceReportService, 
    witnessName:string, 
    witnessPhoneNumber:string, 
    baddieName:string,
    locationName:string, 
    latitude:number, 
    longitude:number,
    status:Status,
    timeReported:string,
    picLink?:string, 
    extraInfo?:string
  }
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

  // TODO: refactor?
  static ReportResponseToNuisanceReport(report:ReportResponse):NuisanceReport {
    let ret:any = report.data
    ret.timeReported = new Date(ret.timeReported)
    return ret as NuisanceReport
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

  constructor(private http:HttpClient, private lds:LocationDataService) { 
    // GET next ID from server and store it in this service
    this.http.get<IDTracker>(SERVER_COLLECTION_URL + '/IDTracker/documents/nextID')
      .pipe(catchError(this.handleError))
      .subscribe((response:IDTracker) => {
        this.IDTrackerUpdateBody = response
        this.nextID = response.data.ID
      })
  }

  // POST to server the new report
  addReport(report:NuisanceReport) {
    let postBody = {key: report.ID, data: report}
 
    this.http.post(SERVER_COLLECTION_URL + 'reports/documents/', postBody)
      .pipe(catchError(this.handleError))
      .subscribe()
  }
  
  // GET the next report ID to use from the server
  getNewID(): number {
    this.nextID += 1
    this.IDTrackerUpdateBody.data.ID = this.nextID

    this.http.put(SERVER_COLLECTION_URL + '/IDTracker/documents/nextID', this.IDTrackerUpdateBody)
      .pipe(catchError(this.handleError))
      .subscribe(() => {});

    return this.nextID - 1;
  }

  // GET list of nuisance reports from server
  // NOTE: calling function will need to .subscribe() to get value
  getReportList():Observable<NuisanceReport[]> {
    return this.http.get<ReportResponse[]>(SERVER_COLLECTION_URL + '/reports/documents')
      .pipe(catchError(this.handleError))
      .pipe(map((response:ReportResponse[]) => {
        let reportList:NuisanceReport[] = []
        for (let item of response) {
          reportList.push(NuisanceReport.ReportResponseToNuisanceReport(item))
        }
        return reportList
      }))
  }

  // GET a nuisance report from the server given a reportID
  getReport(reportID:number):Observable<NuisanceReport> {
    return this.http.get<ReportResponse>(SERVER_COLLECTION_URL + '/reports/documents/' + reportID)
      .pipe(catchError(this.handleError))
      .pipe(map((response:ReportResponse) => {
        return NuisanceReport.ReportResponseToNuisanceReport(response)
      }))
  }

  // PUTs to server the report given the reportID
  modifyReport(reportID:number, body:NuisanceReport) {
    let putBody = {key: reportID, data: body}
    this.http.put(SERVER_COLLECTION_URL + 'reports/documents/' + reportID + '/', putBody)
      .pipe(catchError(this.handleError))
      .subscribe()
  }

  // DELETE report from server given the reportID
  deleteReport(report:NuisanceReport) {
    // deletes the report from the server 
    this.http.delete(SERVER_COLLECTION_URL + 'reports/documents/' + report.ID + '/')
      .pipe(catchError(this.handleError))
      .subscribe()

    // decrements the report count for the location that the report was in
    this.lds.getLocationList().subscribe((locationList:LocationData[]) => {
      locationList = locationList.filter((location) => { return location.name == report.locationName; })
      if (locationList.length != 1) {
        console.error('Duplicate or no locations found in location list when filtering by a nuisance report\'s location, check NuisanceReportService.deleteReport()')
      }
      else {
        let decr_location = locationList.at(0)
        if (decr_location != undefined) {
          this.lds.decrementReportCount(decr_location)
        }
        else {
          console.error('Error getting location object to decrement report count for, check NuisanceReportService.deleteReport()')
        }
      }
    })
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
