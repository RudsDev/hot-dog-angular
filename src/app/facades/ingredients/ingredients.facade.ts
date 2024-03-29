import { Injectable, inject } from "@angular/core";

import { IngredientsService } from "../../services/ingredients/ingredients.service";
import { IngredientsState } from "../../states/ingredients.state";
import { HttpErrorResponse } from "@angular/common/http";
import { IngredientsTinyResponse } from "../../models/interfaces/ingredients/ingredients-tiny-response";
import { Observable } from "rxjs/internal/Observable";
import { ToastNotificationComponent } from "../../shared/components/notifications/toast-notification/toast-notification.component";
import { take } from "rxjs";

@Injectable({providedIn: 'root'})
export class IngredientsFacade {

  private ingredientsService: IngredientsService = inject(IngredientsService)
  private state: IngredientsState = inject(IngredientsState)
  private toast:ToastNotificationComponent = inject(ToastNotificationComponent)

  ingredients$: Observable<IngredientsTinyResponse[]> = this.state.allIngredients$;

  constructor(){}

  public add(
    ingredient: IngredientsTinyResponse,
    callbacks?: {success?: Function, error?: Function}
  ):void {
    this.ingredientsService
      .create(ingredient)
      .pipe(take(1))
      .subscribe({
        next: (resp: IngredientsTinyResponse) => {
          this.state.add(resp)
          this.toast.success(`${resp.nome} criado com sucesso.`)
          callbacks?.success && callbacks.success()
        },
        error: (e) => {
          this.toast.error(`Erro ao criar ingrediente.`, e)
          callbacks?.error && callbacks.error()
        }
      })
  }

  public remove(
    id: string,
    callbacks?: {success?: Function, error?: Function}
  ): void {
    this.ingredientsService
      .remove(id)
      .subscribe({
        next: () => {
          this.state.remove(id)
          this.toast.success('Ingrediente removido com sucesso')
          callbacks?.success && callbacks.success()
        },
        error: (e: HttpErrorResponse) => {
          this.toast.error('Erro ao remover ingrediente', e)
          callbacks?.error && callbacks.error()
        },
      })
  }

  public getAllIngredients(): void {
    this.ingredientsService
      .getAll()
      .pipe(take(1))
      .subscribe(this.getAllIngredientsObservableHandler)
  }

  private getAllIngredientsObservableHandler = {
    next: (d: IngredientsTinyResponse[]) => this.state.allIngredients = d?.length ? d : [],
    error: (error: HttpErrorResponse) => this.toast.error('Erro ao listar ingredientes'),
  }
}
