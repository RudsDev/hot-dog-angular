import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastModule } from 'primeng/toast'

import { MessageService } from 'primeng/api';

import { ToastNotificationComponent } from './toast-notification/toast-notification.component';



@NgModule({
  declarations: [
    ToastNotificationComponent,
  ],
  imports: [
    CommonModule,
    ToastModule,
  ],
  exports: [
    ToastNotificationComponent,
  ],
  providers: [
    MessageService,
  ]
})
export class NotificationsModule { }
