import { Component, Input } from '@angular/core';
import { PromotionsTinyResponse } from '../../../../models/interfaces/promotions/promotions-tiny-response';
import { UtilsCrudTableEventEmiiter } from '../../../../shared/models/interfaces/CrudTableEventEmiiter';

@Component({
  selector: 'app-promotions-table',
  templateUrl: './promotions-table.component.html',
  styleUrl: './promotions-table.component.scss'
})
export class PromotionsTableComponent extends UtilsCrudTableEventEmiiter {
  @Input() allPromotions: Array<PromotionsTinyResponse> = []
}
