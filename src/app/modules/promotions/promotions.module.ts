import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PromotionsHomeComponent } from './page/promotions-home/promotions-home.component';

import { PROMOTIONS_ROUTES } from './promotions.routing';


@NgModule({
  declarations: [
    PromotionsHomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PROMOTIONS_ROUTES),
  ]
})
export class PromotionsModule { }
