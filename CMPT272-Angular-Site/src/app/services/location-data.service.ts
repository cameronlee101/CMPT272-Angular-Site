import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SERVER_COLLECTION_URL } from 'app/constants';
import { EMPTY, Observable, catchError, map, throwError } from 'rxjs';

interface LocationResponse {
  key:string,
  data:LocationData
}

export class LocationData {
  public reports:number = 1
  constructor(public name:string, public latitude:number, public longitude:number) {}
}

@Injectable({
  providedIn: 'root'
})
export class LocationDataService {

  constructor(private http:HttpClient) { }

   // POST to server the new location
   addLocation(name:string, latitude:number, longitude:number):Observable<any> {
    let postBody:LocationResponse = {
      key: name,
      data: new LocationData(name, latitude, longitude)
    }

    return this.http.post(SERVER_COLLECTION_URL + 'locations/documents/', postBody)
      .pipe(catchError(this.handleError))
  }

  // GET list of known locations from server
  getLocationList():Observable<LocationData[]> {
    return this.http.get<LocationResponse[]>(SERVER_COLLECTION_URL + '/locations/documents')
      .pipe(catchError(this.handleError))
      .pipe(map((response:LocationResponse[]) => {
        let locationList:LocationData[] = []
        for (let item of response) {
          locationList.push(item.data)
        }
        return locationList.sort((a, b) => (a.name.localeCompare(b.name)))
      }))

    // return [
    //   new LocationData('Vancouver', 49.28356307995918, -123.12286044240237),
    //   new LocationData('Burnaby', 49.2494648613246, -122.9813979941102),
    //   new LocationData('New Westminster', 49.210002318495455, -122.90813212632467),
    //   new LocationData('Richmond', 49.16624261865594,   0172567643),
    //   new LocationData('Surrey', 49.1931754676304, -122.85413964053254),
    //   new LocationData('North Vancouver', 49.320804303364575, -123.07323427822436),
    //   new LocationData('Coquitlam', 49.2837408538731, -122.79339969365776)
    // ].sort((a, b) => (a.name.localeCompare(b.name)))
  }

  // PUT to server the location with updated report count
  incrementReportCount(location:LocationData):Observable<any> {
    location.reports += 1
    let putBody:LocationResponse = {
      key: location.name,
      data: location
    }

    return this.http.put(SERVER_COLLECTION_URL + 'locations/documents/' + location.name + '/', putBody)
      .pipe(catchError(this.handleError))
  }

  // PUT to server the location with updated report count
  decrementReportCount(location:LocationData):Observable<any> {
    if (location.reports > 0) {
      location.reports -= 1
      let putBody:LocationResponse = {
        key: location.name,
        data: location
      }

      return this.http.put(SERVER_COLLECTION_URL + 'locations/documents/' + location.name + '/', putBody)
        .pipe(catchError(this.handleError))
    }
    else {
      console.error('Attempted to decrement report count of location that is already at 0 reports')
      return EMPTY;
    }
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
