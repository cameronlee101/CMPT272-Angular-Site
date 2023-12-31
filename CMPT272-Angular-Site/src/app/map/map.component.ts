import { Component, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { LocationDataService, LocationData } from 'app/services/location-data.service';
import * as L from 'leaflet';

// Need this stuff to make markers work
import { icon, Marker } from 'leaflet'
const iconRetinaUrl = 'assets/marker-icon-2x.png'
const iconUrl = 'assets/marker-icon.png'
const shadowUrl = 'assets/marker-shadow.png'
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
})
Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map:any;
  locationList:LocationData[] = []
  initial_coords = {
    lat: 49.210002318495455,
    lon: -122.90813212632467,
  }

  constructor(private lds:LocationDataService) {}

  createMap():void {
    this.map = L.map('map', {
      center: [ this.initial_coords.lat, this.initial_coords.lon ],
      zoom: 10
    });
    
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  createNuisanceMarkers():void {
    for (let location of this.locationList) {
      let marker = L.marker([location.latitude, location.longitude]).addTo(this.map);
      if (location.reports == 1) {
        marker.bindPopup(`<b>${location.name}</b><br>${location.reports} nuisance report`)
      }
      else {
        marker.bindPopup(`<b>${location.name}</b><br>${location.reports} nuisance reports`)
      }
    }
  }

  ngAfterViewInit():void {
    this.createMap()

    this.lds.getLocationList().subscribe((list:LocationData[]) => {
      this.locationList = list.filter((location) => { return location.reports > 0; })
      this.createNuisanceMarkers()
    })
  }
}