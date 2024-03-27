import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CardModule } from "primeng/card";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from 'primeng/inputtext'
import { InputNumberModule } from 'primeng/inputnumber'

import { INGREDIENTS_ROUTES } from './ingredients.routing';

import { IngredientsHomeComponent } from './page/ingredients-home/ingredients-home.component';
import { IngredientsTableComponent } from './components/ingredients-table/ingredients-table.component';
import { IngredientsRegisterComponent } from './page/ingredients-register/ingredients-register.component';
import { IngredientsFormComponent } from './components/ingredients-form/ingredients-form.component';


@NgModule({
  declarations: [
    IngredientsHomeComponent,
    IngredientsTableComponent,
    IngredientsRegisterComponent,
    IngredientsFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(INGREDIENTS_ROUTES),
    CardModule,
    TableModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
  ]
})
export class IngredientsModule { }
