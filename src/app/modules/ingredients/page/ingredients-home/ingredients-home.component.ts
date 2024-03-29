import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { IngredientsTinyResponse } from '../../../../models/interfaces/ingredients/ingredients-tiny-response';
import { IngredientsFacade } from '../../../../facades/ingredients/ingredients.facade';
import { TableCrudEvent } from '../../../../models/interfaces/event/table-crud-event';
import { CrudOperations } from '../../../../../core/CRUD_OPERATION';


@Component({
  selector: 'app-ingredients-home',
  templateUrl: './ingredients-home.component.html',
  styleUrl: './ingredients-home.component.scss'
})
export class IngredientsHomeComponent implements OnInit {
  private router: Router = inject(Router)
  facade: IngredientsFacade = inject(IngredientsFacade)
  allIngredients: Array<IngredientsTinyResponse> = []

  ngOnInit(): void {
    this.facade.getAllIngredients()
  }

  handleIngredientEvent(event: TableCrudEvent): void {
    switch (event.action) {
      case CrudOperations.CREATE:
        this.create()
      break;
      case CrudOperations.READ:
        this.read()
      break;
      case CrudOperations.UPDATE:
        this.update()
      break;
      case CrudOperations.DELETE:
        this.delete(event.id!)
      break;

      default:
        break;
    }
  }

  private create(): void {
    this.router.navigate(['/ingredients/register'])
  }

  private read(): void {
    console.log('READ')
  }

  private update(): void {
    console.log('UPDATE')
  }

  private delete(id: string): void {
    this.facade.remove(id)
  }
}
