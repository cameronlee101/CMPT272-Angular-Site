import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

interface locationData {
  name:string,
  latitude:number,
  longitude:number,
  reports:number,
}

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

  locationList:string[] = ['Vancouver', 'Burnaby', 'New Westminster', 'Richmond', 'Port Moody', 'North Vancouver', 'Location', 'Location', 'Location', 'Location', 'Location', 'Location', 'Location', 'Location', 'Location', 'Location', 'Location', 'Location'].sort();

  constructor(private router:Router) {}

  onLocationSelect(event:any) {
    if (this.selectedLocation == 'None' || this.selectedLocation == 'New Location') {
      this.locationName = ''
      this.latitude = ''
      this.longitude = ''
    }
    else {
      this.locationName = this.selectedLocation
      this.latitude = '1'
      this.longitude = '1'
    }
  }

  // Checks that all inputs are valid
  onSubmit() {
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
      this.errorLabelText = 'Error: \'Location Name\' cannot be \'New\' or \'None\''
    }

    // checks location choice
    if (this.selectedLocation == 'None') {
      this.errorLabelText = 'Error: Must choose option in \'Select Location\''
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
      this.router.navigate(['/'])
    }
  }
}