import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CardModule } from "primeng/card";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

import { PromotionsHomeComponent } from './page/promotions-home/promotions-home.component';
import { PromotionsFormComponent } from './components/promotions-form/promotions-form.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PROMOTIONS_ROUTES } from './promotions.routing';
import { PromotionsTableComponent } from './components/promotions-table/promotions-table.component';
import { PromotionsRegisterComponent } from './page/promotions-register/promotions-register.component';
import { PromotionsItemsComponent } from './components/promotions-items/promotions-items.component';
import { SharedModule } from "../../shared/shared.module";


@NgModule({
  declarations: [
    PromotionsHomeComponent,
    PromotionsTableComponent,
    PromotionsRegisterComponent,
    PromotionsFormComponent,
    PromotionsItemsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PROMOTIONS_ROUTES),
    ReactiveFormsModule,
    FormsModule,
    CardModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    FontAwesomeModule,
    SharedModule
  ]
})
export class PromotionsModule { }
