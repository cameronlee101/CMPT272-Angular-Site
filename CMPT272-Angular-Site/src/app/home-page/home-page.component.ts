import { Component } from '@angular/core';
import { NuisanceReport } from 'app/classes/nuisance-report';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  constructor() {}

  showMoreInfo(report:NuisanceReport) {
    console.log(report)
  }
}
