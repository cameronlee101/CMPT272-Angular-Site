import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

interface HashResponse {
  Digest:string
  DigestEnc:string
  Key:string
  Type:string
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  form: FormGroup
  reportID:number
  validPasswordHashes:string[] = ['fcab0453879a2b2281bc5073e3f5fe54']

  constructor(private activatedRoute: ActivatedRoute, private router:Router, private http:HttpClient) {
    this.reportID = activatedRoute.snapshot.params['ID']

    let formControls = {
      password: new FormControl('', [
        Validators.required,
      ])
    }
    this.form = new FormGroup(formControls)
  }

  onSubmit(values:{password:string}) {
    this.http.get<HashResponse>('http://api.hashify.net/hash/md5/hex?value=' + values.password)
      .pipe(catchError(this.handleError))
      .subscribe((response:HashResponse) => {
        if (this.validPasswordHashes.includes(response.Digest)) {
          this.router.navigate(['/modifyReportPage', this.reportID])
        }
        else {
          alert('Invalid password, please try again')
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
