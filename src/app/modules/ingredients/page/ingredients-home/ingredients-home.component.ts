import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Subject, takeUntil } from 'rxjs';

import { IngredientsService } from '../../../../services/ingredients/ingredients.service';
import { IngredientsTinyResponse } from '../../../../models/interfaces/ingredients/ingredients-tiny-response';


@Component({
  selector: 'app-ingredients-home',
  templateUrl: './ingredients-home.component.html',
  styleUrl: './ingredients-home.component.scss'
})
export class IngredientsHomeComponent implements OnInit, OnDestroy {

  private readonly destroy$: Subject<void> = new Subject()

  private ingredientsService: IngredientsService = inject(IngredientsService)

  allIngredients: Array<IngredientsTinyResponse> = []

  ngOnInit(): void {
    this.getAllIngredients()
  }

  private getAllIngredients(): void {
    this.ingredientsService
      .getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe(this.getAllIngredientsObservableHandler)
  }

  private getAllIngredientsObservableHandler = {
    next: (resp: IngredientsTinyResponse[]) => this.handleSuccessGetAllIngredients(resp),
    error: (error: HttpErrorResponse) => this.handleErrorGetAllIngredients(error),
  }

  private handleSuccessGetAllIngredients(resp: IngredientsTinyResponse[]) {
    if(resp?.length) {
      this.allIngredients = resp
    }
  }

  private handleErrorGetAllIngredients(error: HttpErrorResponse) {
    console.log(error)
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete()
  }
}
