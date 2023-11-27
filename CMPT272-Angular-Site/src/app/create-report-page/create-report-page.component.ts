import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocationDataService, LocationData } from 'app/services/location-data.service';
import { NuisanceReportService, NuisanceReport } from 'app/services/nuisance-report.service';

@Component({
  selector: 'app-create-report-page',
  templateUrl: './create-report-page.component.html',
  styleUrl: './create-report-page.component.css'
})
export class CreateReportPageComponent {
  witnessName:string = '';
  witnessPhoneNumber:string = '';
  baddieName:string = '';
  selectedLocation:string = 'None';
  locationName:string = '';
  latitude:string = '';
  longitude:string = '';
  pictureLink:string = '';
  extraInfo:string = '';

  errorLabelText:string = '';

  locationList:LocationData[] = []

  constructor(private router:Router, private lds:LocationDataService, private nrs:NuisanceReportService) {
    lds.getLocationList().subscribe((list:LocationData[]) => {
      this.locationList = list
    })
  }

  onLocationSelect():void {
    if (this.selectedLocation == 'New Location') {
      this.locationName = ''
      this.latitude = ''
      this.longitude = ''
    }
    else {
      this.locationName = this.selectedLocation
      this.latitude = this.locationList.find(curLocation => {return curLocation.name == this.selectedLocation})!.latitude.toString()
      this.longitude = this.locationList.find(curLocation => {return curLocation.name == this.selectedLocation})!.longitude.toString()
    }
    // TODO: move marker when location selected
  }

  onMapClick(coords:L.LatLng) {
    this.selectedLocation = 'New Location'
    this.locationName = '' 
    this.latitude = coords.lat.toString()
    this.longitude = coords.lng.toString()
  }

  // Checks that all inputs are valid 
  onSubmit():void { 
    // Checking fields in reverse order for usability
    this.errorLabelText = ''

    // checks longtiude
    let longitudeNum = Number(this.longitude) 
    if (this.longitude == '') {
      this.errorLabelText = 'Error: \'Longitude\' cannot be empty'
    }
    else if (isNaN(longitudeNum)) {
      this.errorLabelText = 'Error: Invalid value in \'Longitude\''
    }
    else if (longitudeNum > 180 || longitudeNum < -180) {
      this.errorLabelText = 'Error: \'Longitude\' outside of valid values (-180 to 180)'
    }

    // checks latitude
    let latitudeNum = Number(this.latitude)
    if (this.latitude == '') {
      this.errorLabelText = 'Error: \'Latitude\' cannot be empty'
    }
    else if (isNaN(latitudeNum)) {
      this.errorLabelText = 'Error: Invalid value in \'Latitude\''
    }
    else if (latitudeNum > 90 || latitudeNum < -90) {
      this.errorLabelText = 'Error: \'Latitude\' outside of valid values (-90 to 90)'
    }

    // checks location name
    if (this.locationName == '') {
      this.errorLabelText = 'Error: \'Location Name\' cannot be empty'
    }
    else if (this.locationName == 'None' || this.locationName == 'New') {
      this.errorLabelText = 'Error: \'Location Name\' cannot be \'None\'' 
    }
    else if (this.selectedLocation == 'New Location' && this.locationList.find(curLocation => {return curLocation.name == this.locationName}) != undefined) {
      this.errorLabelText = 'Error: Location with specified name already exists'
    }
    else if (!/^[a-zA-Z0-9_\-]+$/.test(this.locationName)) {
      this.errorLabelText = 'Error: \'Location Name\' can only contain letters, numbers, underscores, or hyphens';
    }

    // checks baddie's name
    if (this.baddieName == '') {
      this.errorLabelText = 'Error: \'Baddie\'s Name\' cannot be empty'
    }

    // checks phone number 
    let phoneNumRegex:RegExp = /^(\d{3})-(\d{3})-(\d{4})$/;
    if (this.witnessPhoneNumber == '') {
      this.errorLabelText = 'Error: \'Witness\'s Phone Number \' cannot be empty'
    }
    else if (!phoneNumRegex.test(this.witnessPhoneNumber)) {
      this.errorLabelText = 'Error: Invalid phone number, please follow provided format'
    }

    // checks witness name
    if (this.witnessName == '') {
      this.errorLabelText = 'Error: \'Witness\' Name\' cannot be empty'
    }

    // If no errors, stores the new nuisance report and returns to home page
    if (this.errorLabelText == '') {
      let newReport = new NuisanceReport(this.nrs, this.witnessName, this.witnessPhoneNumber, this.baddieName, this.locationName,
        latitudeNum, longitudeNum, this.pictureLink, this.extraInfo) 
      this.nrs.addReport(newReport).subscribe(() => {
        // Stores location data if new location, or increment reports count if reused location
        let matchingLocation = this.locationList.filter((item) => { return item.name == this.locationName; })
        if (matchingLocation.length == 0) {
          this.lds.addLocation(this.locationName, latitudeNum, longitudeNum).subscribe(() => {
            this.router.navigate(['/'])
          })
        }
        else {
          this.lds.incrementReportCount(matchingLocation[0]).subscribe(() => {
            this.router.navigate(['/'])
          })
        } 
      })
    }
  }
}