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

@NgModule({
  declarations: [
    ToolbarComponent,
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
  ]
})
export class SharedModule { }
