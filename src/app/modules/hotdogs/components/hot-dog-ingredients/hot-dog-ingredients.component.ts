import { Component, OnInit, inject } from '@angular/core';
import { HotDogsFacade } from '../../../../facades/hotdogs/hotdogs.facade';

@Component({
  selector: 'app-hot-dog-ingredients',
  templateUrl: './hot-dog-ingredients.component.html',
  styleUrl: './hot-dog-ingredients.component.scss'
})
export class HotDogIngredientsComponent implements OnInit {
  hotdogsFacade: HotDogsFacade = inject(HotDogsFacade);

  ngOnInit(): void {
    this.hotdogsFacade.getAllIngredients();
  }

  incrementIngredient(event:{ id:string, value: number }) {
    const { id, value:qtd } = event
    this.hotdogsFacade.changeQtdIngredients({ id, qtd });
  }
}
