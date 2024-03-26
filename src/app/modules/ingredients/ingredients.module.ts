import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { IngredientsHomeComponent } from './page/ingredients-home/ingredients-home.component';

import { INGREDIENTS_ROUTES } from './ingredients.routing';


@NgModule({
  declarations: [
    IngredientsHomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(INGREDIENTS_ROUTES),
  ]
})
export class IngredientsModule { }
