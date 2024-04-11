import { Injectable, inject } from "@angular/core";

import { take, map } from "rxjs";

import { IngredientsState } from "../../states/ingredients.state";

import { HotdogsService } from "../../services/hotdogs/hotdogs.service";

import { IngredientsTinyResponse } from "../../models/interfaces/ingredients/ingredients-tiny-response";
import { HotDogsTinyResponse } from "../../models/interfaces/hotdogs/hot-dogs-tiny-response";

import { ToastNotificationComponent } from "../../shared/components/notifications/toast-notification/toast-notification.component";
import { PromptComponent } from "../../shared/components/prompts/prompt/prompt.component";
import { HotDogsRequest } from "../../models/interfaces/hotdogs/hot-dogs-request";
import { HotDogsState } from "../../states/hotdogs.state";
import { IngredientQtds } from "../../models/interfaces/hotdogs/hot-dogs-ingredients-qtd";
import { IngredientsService } from "../../services/ingredients/ingredients.service";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class HotDogsFacade {
  private hotdogsService: HotdogsService = inject(HotdogsService)
  private ingredientsService: IngredientsService = inject(IngredientsService)
  private hotdogsState: HotDogsState = inject(HotDogsState)
  private ingredientState: IngredientsState = inject(IngredientsState)
  private toast:ToastNotificationComponent = inject(ToastNotificationComponent)
  private prompt:PromptComponent = inject(PromptComponent)

  constructor(){}

  private get ingredients() : IngredientsTinyResponse[] {
    return this.ingredientState.allIngredients.filter(i => i.qtd)
  }

  public get allIngredients$ () {
    return this.hotdogsState.allIngredients$
  }

  public select$(id:string) {
    return this.hotdogsService.getById(id)
  }

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

  public getAllIngredients(): void {
    this.ingredientsService
      .getAll()
      .pipe(take(1))
      .subscribe({
        next: (d: IngredientsTinyResponse[]) => this.hotdogsState.allIngredients = d?.length ? d : [],
        error: (e: HttpErrorResponse) => this.toast.error('Erro ao listar ingredientes do hot-dog', e),
      }
    )
  }

  public changeQtdIngredients(payload:{id: string, qtd:number}) {
    this.hotdogsState.qtd = payload
  }

  public setIngredientsQtd(ingredientsQtd: Array<IngredientQtds>) {
    this.hotdogsState.ingredientsQtd = ingredientsQtd
  }

  private createRequestPayload(payload: HotDogsTinyResponse): HotDogsRequest {
    return {
      id: payload.id,
      nome: payload.nome,
      ingredientes: this.ingredients.filter(i => i.id && i.qtd).map(i => i.id!)
    }
  }

  public priceSelectedIngredients$() {
    const filter = map((p: IngredientsTinyResponse[]) =>
      p.filter((d) => !!d.qtd)
    );

    const mapper = map((v:IngredientsTinyResponse[],i) => {
      return v.length
        ? v.map(v => (Number(v.preco || 0) * Number(v.qtd || 1))).reduce((p, c) =>  p + c)
        : 0
    })

    return this.allIngredients$
      .pipe(filter)
      .pipe(mapper)
  }
}
