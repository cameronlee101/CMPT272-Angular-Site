import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map:any;

  constructor() { }

  ngAfterViewInit(): void {
    this.map = L.map('map', {
      center: [ 49.210002318495455, -122.90813212632467 ],
      zoom: 10
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    
    var marker = L.marker([49.210002318495455, -122.90813212632467]).addTo(this.map);
    marker.bindPopup("<b>New Westminster</b><br>10 nuisance reports")
  }
}