import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CreateReportPageComponent } from './create-report-page/create-report-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ModifyReportPageComponent } from './modify-report-page/modify-report-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'createReportPage', component: CreateReportPageComponent },
  { path: 'login/:ID', component: LoginPageComponent },
  { path: 'modifyReportPage/:ID', component: ModifyReportPageComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
