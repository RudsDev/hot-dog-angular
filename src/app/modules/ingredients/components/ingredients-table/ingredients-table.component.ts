import { Component, Input, OnInit } from '@angular/core';

import { IngredientsTinyResponse } from '../../../../models/interfaces/ingredients/ingredients-tiny-response';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ingredients-table',
  templateUrl: './ingredients-table.component.html',
  styleUrl: './ingredients-table.component.scss'
})
export class IngredientsTableComponent implements OnInit {

  @Input() allIngredients$!: Observable<IngredientsTinyResponse[]>
  allIngredients: Array<IngredientsTinyResponse> = []

  ngOnInit(): void {
    this.allIngredients$.subscribe(d => this.allIngredients = d)
  }

  handleIngredientEvent() {
    alert('Ingredient event')
  }
}
