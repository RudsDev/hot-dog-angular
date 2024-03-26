import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CardModule } from "primeng/card";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";


import { IngredientsHomeComponent } from './page/ingredients-home/ingredients-home.component';

import { INGREDIENTS_ROUTES } from './ingredients.routing';
import { IngredientsTableComponent } from './components/ingredients-table/ingredients-table.component';


@NgModule({
  declarations: [
    IngredientsHomeComponent,
    IngredientsTableComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(INGREDIENTS_ROUTES),
    CardModule,
    TableModule,
    ButtonModule,
  ]
})
export class IngredientsModule { }
