import { Component, AfterViewInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
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
  selector: 'app-map-clickable',
  templateUrl: './map-clickable.component.html',
  styleUrls: ['./map-clickable.component.css']
})
export class MapClickableComponent implements AfterViewInit {
  private map:any
  locationList: LocationData[] = []
  initial_coords = {
    lat: 49.210002318495455,
    lon: -122.90813212632467,
  }
  @Output() clickCoords = new EventEmitter()
  marker: Marker;

  constructor(private lds: LocationDataService, private cdr: ChangeDetectorRef) {
    this.marker = L.marker([this.initial_coords.lat, this.initial_coords.lon]);
  }

  createMap(): void {
    this.map = L.map('map', {
      center: [this.initial_coords.lat, this.initial_coords.lon],
      zoom: 10
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  ngAfterViewInit(): void {
    this.createMap()
    this.map.on("click", (e: { latlng: { lat: number; lng: number; }; }) => {
      this.marker.setLatLng(L.latLng(e.latlng.lat, e.latlng.lng));

      if (!this.map.hasLayer(this.marker)) {
        this.marker.addTo(this.map);
      }

      this.clickCoords.emit(this.marker.getLatLng())
    });
  }
}
