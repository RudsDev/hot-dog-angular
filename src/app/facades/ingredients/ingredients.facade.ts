import { Injectable, inject } from "@angular/core";

import { IngredientsService } from "../../services/ingredients/ingredients.service";
import { IngredientsState } from "../../states/ingredients.state";
import { HttpErrorResponse } from "@angular/common/http";
import { IngredientsTinyResponse } from "../../models/interfaces/ingredients/ingredients-tiny-response";
import { Observable } from "rxjs/internal/Observable";
import { ToastNotificationComponent } from "../../shared/components/notifications/toast-notification/toast-notification.component";
import { PromptComponent } from "../../shared/components/prompts/prompt/prompt.component";
import { take, map } from "rxjs";

@Injectable({providedIn: 'root'})
export class IngredientsFacade {

  private ingredientsService: IngredientsService = inject(IngredientsService)
  private state: IngredientsState = inject(IngredientsState)
  private toast:ToastNotificationComponent = inject(ToastNotificationComponent)
  private prompt:PromptComponent = inject(PromptComponent)

  ingredients$: Observable<IngredientsTinyResponse[]> = this.state.allIngredients$;

  constructor(){}

  public get ingredients() : IngredientsTinyResponse[]{
    return this.state.allIngredients
  }

  public select(id?: string) {
    return id
      ? this.state.allIngredients.find(i => i.id == id)
      : undefined
  }

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

  public edit(
    ingredient: IngredientsTinyResponse,
    callbacks?: {success?: Function, error?: Function}
  ):void {
    this.ingredientsService
      .edit(ingredient)
      .pipe(take(1))
      .subscribe({
        next: (resp: IngredientsTinyResponse) => {
          this.state.add(resp)
          this.toast.success(`${resp.nome} editado com sucesso.`)
          callbacks?.success && callbacks.success()
        },
        error: (e) => {
          this.toast.error(`Erro ao editar ingrediente.`, e)
          callbacks?.error && callbacks.error()
        }
      })
  }

  public remove(
    id: string,
    callbacks?: {success?: Function, error?: Function}
  ): void {
    this.prompt.showDialog({
      header: 'Remover ingrediente',
      message: 'Deseha remover o ingrediente?',
      accept: () => this.removeIngredienteAccept(id, callbacks)
    })
  }

  private removeIngredienteAccept(
    id: string,
    callbacks?: {success?: Function, error?: Function}
  ) {
    this.ingredientsService
      .remove(id)
      .pipe(take(1))
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
      .subscribe({
        next: (d: IngredientsTinyResponse[]) => this.state.allIngredients = d?.length ? d : [],
        error: (e: HttpErrorResponse) => this.toast.error('Erro ao listar ingredientes', e),
      }
    )
  }

  public changeQtd(payload:{id: string, qtd:number}) {
    this.state.qtd = payload
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

    return this.ingredients$
      .pipe(filter)
      .pipe(mapper)
  }
}
