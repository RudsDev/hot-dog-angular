import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CardModule } from "primeng/card";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { ScrollerModule } from 'primeng/scroller';

import { HOTDOGS_ROUTES } from './hotdogs.routing';
import { HotdogsTableComponent } from './components/hotdogs-table/hotdogs-table.component';
import { HotDogsRegisterComponent } from './page/hot-dogs-register/hot-dogs-register.component';
import { HotDogsHomeComponent } from './page/hot-dogs-home/hot-dogs-home.component';
import { HotDogsFormComponent } from './components/hot-dogs-form/hot-dogs-form.component';
import { SharedModule } from '../../shared/shared.module';
import { HotDogIngredientsComponent } from './components/hot-dog-ingredients/hot-dog-ingredients.component';

@NgModule({
  declarations: [
    HotDogsHomeComponent,
    HotdogsTableComponent,
    HotDogsRegisterComponent,
    HotDogsFormComponent,
    HotDogIngredientsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(HOTDOGS_ROUTES),
    CardModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    ScrollerModule,
    SharedModule,
  ]
})
export class HotdogsModule { }
