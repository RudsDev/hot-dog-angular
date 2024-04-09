import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ToolbarModule } from 'primeng/toolbar'
import { SidebarModule } from 'primeng/sidebar'
import { ButtonModule } from 'primeng/button'

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { NotificationsModule } from './components/notifications/notifications.module';
import { PromptsModule } from './components/prompts/prompts.module';
import { InputNumberBtnComponent } from './components/input-number-btn/input-number-btn.component';

@NgModule({
  declarations: [
    ToolbarComponent,
    InputNumberBtnComponent,
  ],
  imports: [
    CommonModule,
    ToolbarModule,
    SidebarModule,
    ButtonModule,
    FontAwesomeModule,
    RouterModule,
    NotificationsModule,
    PromptsModule,
  ],
  exports:[
    ToolbarComponent,
    NotificationsModule,
    PromptsModule,
    InputNumberBtnComponent,
  ]
})
export class SharedModule { }
