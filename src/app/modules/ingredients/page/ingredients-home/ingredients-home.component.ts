import { Component, OnInit, inject } from '@angular/core';

import { IngredientsTinyResponse } from '../../../../models/interfaces/ingredients/ingredients-tiny-response';
import { IngredientsFacade } from '../../../../facades/ingredients/ingredients.facade';


@Component({
  selector: 'app-ingredients-home',
  templateUrl: './ingredients-home.component.html',
  styleUrl: './ingredients-home.component.scss'
})
export class IngredientsHomeComponent implements OnInit {
  facade: IngredientsFacade = inject(IngredientsFacade)
  allIngredients: Array<IngredientsTinyResponse> = []

  ngOnInit(): void {
    this.facade.getAllIngredients()
  }
}
