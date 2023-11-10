import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { NuisanceTableComponent } from './nuisance-table/nuisance-table.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    NuisanceTableComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
