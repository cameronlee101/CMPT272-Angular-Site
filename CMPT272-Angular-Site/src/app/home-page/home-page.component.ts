import { Component } from '@angular/core';
import { NuisanceReport, Status } from 'app/classes/nuisance-report';

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
    console.log(report)
    this.moreInfoReport = report
    this.showingMoreInfo = true
  }

  closeMoreInfo() {
    this.showingMoreInfo = false
  }
}
