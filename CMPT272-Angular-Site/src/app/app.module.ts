import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { NuisanceTableComponent } from './nuisance-table/nuisance-table.component';
import { AppRoutingModule } from './app-routing.module';
import { CreateReportPageComponent } from './create-report-page/create-report-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MoreInfoBoxComponent } from './more-info-box/more-info-box.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './login-page/login-page.component';
import { ModifyReportPageComponent } from './modify-report-page/modify-report-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    NuisanceTableComponent,
    CreateReportPageComponent,
    HomePageComponent,
    MoreInfoBoxComponent,
    LoginPageComponent,
    ModifyReportPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
