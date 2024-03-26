import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardHomeComponent } from './page/dashboard-home/dashboard-home.component';

import { DASHBOARD_ROUTES } from './dashoboard.routing';
// import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    DashboardHomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(DASHBOARD_ROUTES),
    // SharedModule,
  ]
})
export class DashboardModule { }
