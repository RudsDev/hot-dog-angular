import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';

import { ConfirmationService } from 'primeng/api';

import { PromptComponent } from './prompt/prompt.component';



@NgModule({
  declarations: [
    PromptComponent
  ],
  imports: [
    CommonModule,
    ConfirmDialogModule,
    DynamicDialogModule
  ],
  exports:[
    PromptComponent,
  ],
  providers:[
    DialogService,
    ConfirmationService
  ]
})
export class PromptsModule { }
