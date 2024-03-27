import { Injectable, inject } from "@angular/core";

import { IngredientsService } from "../../services/ingredients/ingredients.service";
import { IngredientsState } from "../../states/ingredients.state";
import { HttpErrorResponse } from "@angular/common/http";
import { IngredientsTinyResponse } from "../../models/interfaces/ingredients/ingredients-tiny-response";
import { Observable } from "rxjs/internal/Observable";
import { ToastNotificationComponent } from "../../shared/components/notifications/toast-notification/toast-notification.component";

@Injectable({providedIn: 'root'})
export class IngredientsFacade {

  private ingredientsService: IngredientsService = inject(IngredientsService)
  private state: IngredientsState = inject(IngredientsState)
  private toast:ToastNotificationComponent = inject(ToastNotificationComponent)

  ingredients$: Observable<IngredientsTinyResponse[]> = this.state.allIngredients$;

  constructor(){}

  public getAllIngredients(): void {
    this.ingredientsService
      .getAll()
      .subscribe(this.getAllIngredientsObservableHandler)
  }

  private getAllIngredientsObservableHandler = {
    next: (d: IngredientsTinyResponse[]) => this.state.allIngredients = d?.length ? d : [],
    error: (error: HttpErrorResponse) => this.toast.error('Erro ao listar ingredientes'),
  }
}
