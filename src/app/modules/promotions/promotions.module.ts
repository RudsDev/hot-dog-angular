import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CardModule } from "primeng/card";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";

import { PromotionsHomeComponent } from './page/promotions-home/promotions-home.component';

import { PROMOTIONS_ROUTES } from './promotions.routing';
import { PromotionsTableComponent } from './components/promotions-table/promotions-table.component';


@NgModule({
  declarations: [
    PromotionsHomeComponent,
    PromotionsTableComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PROMOTIONS_ROUTES),
    CardModule,
    TableModule,
    ButtonModule,
  ]
})
export class PromotionsModule { }
