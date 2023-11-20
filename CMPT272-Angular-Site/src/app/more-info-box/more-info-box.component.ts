import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NuisanceReport } from 'app/classes/nuisance-report';

@Component({
  selector: 'app-more-info-box',
  templateUrl: './more-info-box.component.html', 
  styleUrl: './more-info-box.component.css'
})
export class MoreInfoBoxComponent {
  @Input() report:NuisanceReport|null = null
  @Output() close = new EventEmitter()

  constructor() {}

  closeMoreInfo() { 
    this.close.emit()
  }
}
  