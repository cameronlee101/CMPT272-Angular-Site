import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  form: FormGroup
  reportID:number

  constructor(private activatedRoute: ActivatedRoute, private router:Router) {
    let formControls = {
      password: new FormControl('', [
        Validators.required,
        this.validPasswordValidator as ValidatorFn,
      ])
    }
    this.form = new FormGroup(formControls)

    this.reportID = activatedRoute.snapshot.params['ID']
    console.log(this.reportID)
  }

  validPasswordValidator(control:FormControl) {
    // TODO: validate password using hash?
    return null
  }

  onSubmit(values:{password:string}) {
    this.router.navigate(['/modifyReportPage', this.reportID])
  }
}
