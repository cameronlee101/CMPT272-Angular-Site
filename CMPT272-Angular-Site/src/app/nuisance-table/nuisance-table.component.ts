import { Component } from '@angular/core';

enum Status {
  Open = 'Open',
  Resolved = 'Resolved',
}
interface NuisanceReport {
  baddie_name: string
  location: string
  time_reported: Date
  status: Status
  pic_link?: string
  extra_info?: string
}

@Component({
  selector: 'app-nuisance-table',
  templateUrl: './nuisance-table.component.html',
  styleUrl: './nuisance-table.component.css'
})
export class NuisanceTableComponent {
  reports:NuisanceReport[] = []

  constructor() {
    this.reports = [
      {
        baddie_name: 'Bob the Builder',
        location: 'Burnaby',
        time_reported: new Date(),
        status: Status.Open,
      },
      {
        baddie_name: 'Elmo',
        location: 'Vancouver',
        time_reported: new Date(),
        status: Status.Open,
      },
      {
        baddie_name: 'Dora the Explorer',
        location: 'Surrey',
        time_reported: new Date(),
        status: Status.Resolved,
      },
      {
        baddie_name: 'Winnie the Pooh',
        location: 'Richmond',
        time_reported: new Date(),
        status: Status.Open,
      },
    ]
  }
}