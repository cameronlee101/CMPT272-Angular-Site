import { Component } from '@angular/core';
import { NuisanceReport } from 'app/services/nuisance-report.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  moreInfoReport:NuisanceReport|null = null
  showingMoreInfo:boolean = false

  constructor() {}

  showMoreInfo(report:NuisanceReport) {
    this.moreInfoReport = report
    this.showingMoreInfo = true
  }

  closeMoreInfo() {
    this.showingMoreInfo = false
  }
}
