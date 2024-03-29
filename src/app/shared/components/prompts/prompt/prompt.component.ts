import { Component, Injectable, inject } from '@angular/core';

import { ConfirmationService } from 'primeng/api';
import { Dialog } from '../dialog';

@Injectable({providedIn: 'root'})
@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
})
export class PromptComponent implements Dialog {
  private service: ConfirmationService = inject(ConfirmationService);
  private icon = 'pi pi-exclamation-triangle'

  public showDialog(config: {
    header: string;
    message: string;
    accept: Function;
    reject?: Function;
  }): void {
    if (!config) return;
    const { header, message, accept, reject } = config;
    this.service.confirm({
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      icon: this.icon,
      header,
      message,
      accept,
      reject,
    });
  }
}
