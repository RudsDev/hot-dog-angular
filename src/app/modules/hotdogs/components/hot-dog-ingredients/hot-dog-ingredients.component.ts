import { Component, OnInit, inject } from '@angular/core';
import { IngredientsFacade } from '../../../../facades/ingredients/ingredients.facade';

@Component({
  selector: 'app-hot-dog-ingredients',
  templateUrl: './hot-dog-ingredients.component.html',
  styleUrl: './hot-dog-ingredients.component.scss'
})
export class HotDogIngredientsComponent implements OnInit {
  ingredientFacade: IngredientsFacade = inject(IngredientsFacade);

  ngOnInit(): void {
    this.ingredientFacade.getAllIngredients();
  }

  incrementIngredient(event:{ id:string, value: number }) {
    const { id, value:qtd } = event
    this.ingredientFacade.changeQtd({ id, qtd });
  }
}
