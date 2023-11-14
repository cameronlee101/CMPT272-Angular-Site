import { Component } from '@angular/core';
import { NuisanceReport, Status } from 'app/classes/nuisance-report';

@Component({
  selector: 'app-nuisance-table',
  templateUrl: './nuisance-table.component.html',
  styleUrl: './nuisance-table.component.css'
})
export class NuisanceTableComponent {
  reports:NuisanceReport[] = NuisanceReport.getReportList()

  constructor() {
  }
}