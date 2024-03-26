import { Component, Input } from '@angular/core';

import { IngredientsTinyResponse } from '../../../../models/interfaces/ingredients/ingredients-tiny-response';

@Component({
  selector: 'app-ingredients-table',
  templateUrl: './ingredients-table.component.html',
  styleUrl: './ingredients-table.component.scss'
})
export class IngredientsTableComponent {

  @Input() allIngredients: Array<IngredientsTinyResponse> = []

  handleIngredientEvent() {
    alert('Ingredient event')
  }
}
