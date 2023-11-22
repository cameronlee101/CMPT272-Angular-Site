import { ChangeDetectorRef, Component, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { NuisanceReportService, NuisanceReport } from 'app/services/nuisance-report.service';

@Component({
  selector: 'app-nuisance-table',
  templateUrl: './nuisance-table.component.html',
  styleUrl: './nuisance-table.component.css'
})
export class NuisanceTableComponent implements AfterViewInit{
  reports:NuisanceReport[] = []
  @Output() moreInfo = new EventEmitter()

  currentSortColumn:string = ''

  constructor(private cdr: ChangeDetectorRef, private nrs:NuisanceReportService) {
    nrs.getReportList().subscribe((list:NuisanceReport[]) => {
      this.reports = list
    })
  }

  ngAfterViewInit():void {
    this.sortByLocation()
  }

  sortByLocation() {
    this.reports = this.reports.sort((a, b) => a.locationName.localeCompare(b.locationName))
    this.currentSortColumn = 'location'
    this.cdr.detectChanges();
  }
  sortByBaddieName() {
    this.reports = this.reports.sort((a, b) => a.baddieName.localeCompare(b.baddieName))
    this.currentSortColumn = 'baddieName'
    this.cdr.detectChanges();
  }
  sortByDate() {
    this.reports = this.reports.sort((a, b) => a.timeReported.getTime() - b.timeReported.getTime())
    this.currentSortColumn = 'date'
    this.cdr.detectChanges();
  }
  sortByStatus() {
    this.reports = this.reports.sort((a, b) => a.status.localeCompare(b.status))
    this.currentSortColumn = 'status'
    this.cdr.detectChanges();
  }

  showMoreInfo(report:NuisanceReport) {
    this.moreInfo.emit(report)
  }

  deleteReport(report:NuisanceReport) {
    console.log(report)
  }
}