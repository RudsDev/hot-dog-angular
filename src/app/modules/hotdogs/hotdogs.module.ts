import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CardModule } from "primeng/card";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";

import { HotDogsHomeComponent } from './page/hot-dogs-home/hot-dogs-home.component';

import { HOTDOGS_ROUTES } from './hotdogs.routing';
import { HotdogsTableComponent } from './components/hotdogs-table/hotdogs-table.component';
import { HotDogsRegisterComponent } from './page/hot-dogs-register/hot-dogs-register.component';

@NgModule({
  declarations: [
    HotDogsHomeComponent,
    HotdogsTableComponent,
    HotDogsRegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(HOTDOGS_ROUTES),
    CardModule,
    TableModule,
    ButtonModule,
  ]
})
export class HotdogsModule { }
