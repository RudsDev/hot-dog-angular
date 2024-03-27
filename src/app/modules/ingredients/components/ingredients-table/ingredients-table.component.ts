import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { IngredientsTinyResponse } from '../../../../models/interfaces/ingredients/ingredients-tiny-response';
import { Observable } from 'rxjs';
import { TableCrudEvent } from '../../../../models/interfaces/event/table-crud-event';
import { CrudOperations } from '../../../../../core/CRUD_OPERATION';

@Component({
  selector: 'app-ingredients-table',
  templateUrl: './ingredients-table.component.html',
  styleUrl: './ingredients-table.component.scss'
})
export class IngredientsTableComponent implements OnInit {

  action = { ...CrudOperations }

  @Input() allIngredients$!: Observable<IngredientsTinyResponse[]>
  @Output() ingredientEvent = new EventEmitter<TableCrudEvent>()

  allIngredients: Array<IngredientsTinyResponse> = []

  ngOnInit(): void {
    this.allIngredients$.subscribe(d => this.allIngredients = d)
  }

  handleIngredientEvent(event: { action:CrudOperations, id?:string }) {
      this.ingredientEvent.emit(event);
  }
}
