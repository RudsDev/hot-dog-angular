import { Component, inject } from '@angular/core';
import { PromotionsFacade } from '../../../../facades/promotions/promotions.facade';

@Component({
  selector: 'app-promotions-items',
  templateUrl: './promotions-items.component.html',
  styleUrl: './promotions-items.component.scss'
})
export class PromotionsItemsComponent {

  readonly facade: PromotionsFacade = inject(PromotionsFacade);

}
