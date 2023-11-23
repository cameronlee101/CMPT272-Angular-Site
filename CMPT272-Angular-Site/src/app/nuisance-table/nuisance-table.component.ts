import { ChangeDetectorRef, Component, EventEmitter, Output, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { NuisanceReportService, NuisanceReport } from 'app/services/nuisance-report.service';

export enum SortOrder {
  locationDesc = 'locationDesc',
  locationAsc = 'locationAsc',
  baddieNameDesc = 'baddieNameDesc',
  baddieNameAsc = 'baddieNameAsc',
  dateDesc = 'dateDesc',
  dateAsc = 'dateAsc',
  statusDesc = 'statusDesc',
  statusAsc = 'statusAsc',
  none = 'none',
}

@Component({
  selector: 'app-nuisance-table',
  templateUrl: './nuisance-table.component.html',
  styleUrl: './nuisance-table.component.css',
})
export class NuisanceTableComponent {
  reports:NuisanceReport[] = []
  @Output() moreInfo = new EventEmitter()
  currentSortColumn:SortOrder = SortOrder.none;

  constructor(private cdr: ChangeDetectorRef, private nrs:NuisanceReportService, private router:Router) {
    nrs.getReportList().subscribe((list:NuisanceReport[]) => {
      this.reports = list
      this.sortByLocation()
      this.cdr.detectChanges()
    })
  }

  sortByLocation() {
    if (this.currentSortColumn == SortOrder.locationDesc) {
      this.reports = this.reports.sort((a, b) => b.locationName.localeCompare(a.locationName))
      this.currentSortColumn = SortOrder.locationAsc
    }
    else {
      this.reports = this.reports.sort((a, b) => a.locationName.localeCompare(b.locationName))
      this.currentSortColumn = SortOrder.locationDesc
    }
    this.cdr.detectChanges()
  }
  sortByBaddieName() {
    if (this.currentSortColumn == SortOrder.baddieNameDesc) {
      this.reports = this.reports.sort((a, b) => b.baddieName.localeCompare(a.baddieName))
      this.currentSortColumn = SortOrder.baddieNameAsc
    }
    else {
      this.reports = this.reports.sort((a, b) => a.baddieName.localeCompare(b.baddieName))
      this.currentSortColumn = SortOrder.baddieNameDesc
    }
    this.cdr.detectChanges()
  }
  sortByDate() {
    if (this.currentSortColumn == SortOrder.dateDesc) {
      this.reports = this.reports.sort((a, b) => b.timeReported.getTime() - a.timeReported.getTime())
      this.currentSortColumn = SortOrder.dateAsc
    }
    else {
      this.reports = this.reports.sort((a, b) => a.timeReported.getTime() - b.timeReported.getTime())
      this.currentSortColumn = SortOrder.dateDesc
    }
    this.cdr.detectChanges()
  }
  sortByStatus() {
    if (this.currentSortColumn == SortOrder.statusDesc) {
      this.reports = this.reports.sort((a, b) => b.status.localeCompare(a.status))
      this.currentSortColumn = SortOrder.statusAsc
    }
    else {
      this.reports = this.reports.sort((a, b) => a.status.localeCompare(b.status))
      this.currentSortColumn = SortOrder.statusDesc   
    }
    this.cdr.detectChanges()
  }

  showMoreInfo(report:NuisanceReport) {
    this.moreInfo.emit(report)
  }

  modifyReport(report:NuisanceReport) {
    this.router.navigate(['/login', report.ID]) 
  }
}