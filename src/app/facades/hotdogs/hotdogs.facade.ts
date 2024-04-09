import { Injectable, inject } from "@angular/core";

import { Observable } from "rxjs/internal/Observable";

import { take } from "rxjs";

import { IngredientsState } from "../../states/ingredients.state";

import { HotdogsService } from "../../services/hotdogs/hotdogs.service";

import { IngredientsTinyResponse } from "../../models/interfaces/ingredients/ingredients-tiny-response";
import { HotDogsTinyResponse } from "../../models/interfaces/hotdogs/hot-dogs-tiny-response";

import { ToastNotificationComponent } from "../../shared/components/notifications/toast-notification/toast-notification.component";
import { PromptComponent } from "../../shared/components/prompts/prompt/prompt.component";
import { HotDogsRequest } from "../../models/interfaces/hotdogs/hot-dogs-request";

@Injectable({providedIn: 'root'})
export class HotDogsFacade {
  private hotdogsService: HotdogsService = inject(HotdogsService)
  private hotdogsState: IngredientsState = inject(IngredientsState)
  private ingredientState: IngredientsState = inject(IngredientsState)
  private toast:ToastNotificationComponent = inject(ToastNotificationComponent)
  private prompt:PromptComponent = inject(PromptComponent)

  ingredients$: Observable<IngredientsTinyResponse[]> = this.ingredientState.allIngredients$;

  constructor(){}

  private get ingredients() : IngredientsTinyResponse[] {
    return this.ingredientState.allIngredients.filter(i => i.qtd)
  }

  public select() {}

  public add(
    payload: HotDogsTinyResponse,
    callbacks?: {success?: Function, error?: Function}
  ):void {
    const _payload = this.createRequestPayload(payload)
    this.hotdogsService
      .create(_payload)
      .pipe(take(1))
      .subscribe({
        next: (resp: IngredientsTinyResponse) => {
          this.toast.success(`${resp.nome} criado com sucesso.`)
          callbacks?.success && callbacks.success()
        },
        error: (e) => {
          this.toast.error(`Erro ao criar lanche.`, e)
          callbacks?.error && callbacks.error()
        }
      })
  }

  public edit():void {}

  public remove(): void {}

  private removeAccept() {}

  public getAll(): void {}

  public changeQtd() {}

  private createRequestPayload(payload: HotDogsTinyResponse): HotDogsRequest {
    return {
      id: payload.id,
      nome: payload.nome,
      ingredientes: this.ingredients.filter(i => i.id && i.qtd).map(i => i.id!)
    }
  }
}
