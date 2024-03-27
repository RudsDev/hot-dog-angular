import { Component, Injectable, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { MessageService } from "primeng/api";

import { Notification } from '../notification';
import { environment } from '../../../../../environments/environment';

@Injectable({providedIn: 'root'})
@Component({
  selector: 'app-toast-notification',
  templateUrl: './toast-notification.component.html',
})
export class ToastNotificationComponent implements Notification {
  private messageService: MessageService = inject(MessageService)

  public success(message: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: message,
      life: environment.NOTIFICATION_TIME
    });
  }

  public error(message: string, error?: HttpErrorResponse): void {
    error && console.log(error.error)
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: message,
      life: environment.NOTIFICATION_TIME
    });
  }

}
