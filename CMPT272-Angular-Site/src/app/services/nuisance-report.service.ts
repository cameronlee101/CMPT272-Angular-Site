import { Injectable } from '@angular/core';
import { NuisanceReport } from 'app/classes/nuisance-report';

@Injectable({
  providedIn: 'root'
})
export class NuisanceReportService {

  constructor() { }

  getReportList():NuisanceReport[] {
    // TODO: GET from server 
    return [
      new NuisanceReport(this, 'witnessA', '123-456-7890', 'Bob the Builder', 'Burnaby', 1.1, 2.2),
      new NuisanceReport(this, 'witnessB', '778-423-1534', 'Elmo', 'Vancouver', 3.3, 4.4),
      new NuisanceReport(this, 'witnessC', '604-645-1275', 'Dora the Explorer', 'Surrey', 5.5, 6.6),
      new NuisanceReport(this, 'witnessD', '800-512-7453', 'Winnie the Pooh', 'Richmond', 7.7, 8.8),
    ]
  }

  addReport(report:NuisanceReport) {
    // TODO: PUT to server

  }

  getNewID():number {
    // TODO: GET next ID from server then PUT to update next ID
    return 0
  }
}
