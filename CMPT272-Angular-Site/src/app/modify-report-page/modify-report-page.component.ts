import { Component } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NuisanceReport, NuisanceReportService, Status } from 'app/services/nuisance-report.service';

@Component({
  selector: 'app-modify-report-page',
  templateUrl: './modify-report-page.component.html',
  styleUrl: './modify-report-page.component.css'
})
export class ModifyReportPageComponent {
  StatusEnum = Status
  reportID:number
  report:NuisanceReport|undefined
  form:FormGroup
  selectedStatus: string = Object.values(Status)[0]; // Assuming Status is an enum
  
  constructor(private activatedRoute: ActivatedRoute, private nrs:NuisanceReportService, private router:Router) {
    this.reportID = activatedRoute.snapshot.params['ID']
    nrs.getReport(this.reportID).subscribe((report:NuisanceReport) => { this.report = report })

    let formControls = {
      status: new FormControl([
        Validators.required,
        Validators.minLength(2),
      ]),
    }
    this.form = new FormGroup(formControls)
  } 
 
  onSubmit(values:{status: Status}) {
    console.log(values) 
    // TODO: modify report
  }

  onDelete() {
    if (confirm('Are you sure you want to delete the report for ' + this.report!.baddieName + '?')) {
      this.nrs.deleteReport(this.report!)
      this.router.navigate(['/']) // TODO: make sure location report count is decremented before switching back
    }
  }
}
