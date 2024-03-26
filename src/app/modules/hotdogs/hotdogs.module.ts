import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HotDogsHomeComponent } from './page/hot-dogs-home/hot-dogs-home.component';

import { HOTDOGS_ROUTES } from './hotdogs.routing';

@NgModule({
  declarations: [
    HotDogsHomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(HOTDOGS_ROUTES),
  ]
})
export class HotdogsModule { }
