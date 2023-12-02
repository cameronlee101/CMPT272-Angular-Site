import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NuisanceReport, NuisanceReportService, Status } from 'app/services/nuisance-report.service';

@Component({
  selector: 'app-modify-report-page',
  templateUrl: './modify-report-page.component.html',
  styleUrl: './modify-report-page.component.css'
})
export class ModifyReportPageComponent {
  showingMoreInfo:boolean = true

  StatusEnum = Status
  reportID:number
  report!:NuisanceReport
  form:FormGroup
  selectedStatus:string = Object.values(Status)[0]
  
  constructor(private activatedRoute: ActivatedRoute, private nrs:NuisanceReportService, private router:Router) {
    this.reportID = activatedRoute.snapshot.params['ID']
    nrs.getReport(this.reportID).subscribe((report:NuisanceReport) => { 
      this.report = report 
    })

    let formControls = {
      status: new FormControl([
        Validators.required,
        Validators.minLength(2),
      ]),
    }
    this.form = new FormGroup(formControls)
  } 
  
  showMoreInfo() {
    this.showingMoreInfo = true
  }
 
  closeMoreInfo() {
    this.showingMoreInfo = false
  }
 
  onSubmit(values:{status: Status}) {
    this.report!.status = values.status
    this.nrs.modifyReport(this.reportID, this.report!).subscribe(() => {
      this.router.navigate(['/'])
    })
  }

  onDelete() {
    if (confirm('Are you sure you want to delete the report for ' + this.report!.baddieName + '?')) {
      this.nrs.deleteReport(this.report!).subscribe(() => {
        this.router.navigate(['/'])
      })
    }
  }
}
