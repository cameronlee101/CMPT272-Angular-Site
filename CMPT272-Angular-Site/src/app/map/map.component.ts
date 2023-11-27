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
  @Output() clickCoords = new EventEmitter()
  coords: {
    lat:number
    lon:number
  }

  constructor(private lds:LocationDataService) {
    this.coords = {lat: 49.210002318495455, lon: -122.90813212632467}
  }

  createMap():void {
    this.map = L.map('map', {
      center: [ this.coords.lat, this.coords.lon ],
      zoom: 10
    });
    
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    this.map.on('click', this.mapClick)
  }

  createNuisanceMarkers():void {
    for (let location of this.locationList) {
      let marker = L.marker([location.latitude, location.longitude]).addTo(this.map);
      marker.bindPopup(`<b>${location.name}</b><br>${location.reports} nuisance reports`)
    }
  }

  ngAfterViewInit():void {
    this.createMap()

    this.lds.getLocationList().subscribe((list:LocationData[]) => {
      this.locationList = list.filter((location) => { return location.reports > 0; })
      this.createNuisanceMarkers()
    })
  }

  mapClick(event: { latlng: { lat: number; lng: number; }; }) {
    alert("Lat, Lon: " + event.latlng.lat + ", " + event.latlng.lng)
    this.coords.lat = event.latlng.lat
    this.coords.lon = event.latlng.lng
    this.clickCoords.emit(this.coords)
  }
}