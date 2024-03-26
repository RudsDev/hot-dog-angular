import { Component, Input } from '@angular/core';
import { PromotionsTinyResponse } from '../../../../models/interfaces/promotions/promotions-tiny-response';

@Component({
  selector: 'app-promotions-table',
  templateUrl: './promotions-table.component.html',
  styleUrl: './promotions-table.component.scss'
})
export class PromotionsTableComponent {
  @Input() allPromotions: Array<PromotionsTinyResponse> = []

  handlePromotionsEvent():void {

  }
}
