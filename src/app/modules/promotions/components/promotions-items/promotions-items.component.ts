import { Component, inject } from '@angular/core';
import { PromotionsFacade } from '../../../../facades/promotions/promotions.facade';
import { HotDogsFacade } from '../../../../facades/hotdogs/hotdogs.facade';

@Component({
  selector: 'app-promotions-items',
  templateUrl: './promotions-items.component.html',
  styleUrl: './promotions-items.component.scss'
})
export class PromotionsItemsComponent {

  readonly facade: PromotionsFacade = inject(PromotionsFacade);
  hotDogsFacade: HotDogsFacade = inject(HotDogsFacade)

  incrementItem(event:{ id:string, value: number }) {
    const { id, value:qtd } = event
    this.hotDogsFacade.hotDogsQtd({ id, qtd });
  }
}
