import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-modify-report-page',
  templateUrl: './modify-report-page.component.html',
  styleUrl: './modify-report-page.component.css'
})
export class ModifyReportPageComponent {

  constructor(private http:HttpClient) {
    
  } 

}
