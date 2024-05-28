import { Injectable, inject } from "@angular/core";

import { take, map } from "rxjs";

import { HotdogsService } from "../../services/hotdogs/hotdogs.service";

import { IngredientsTinyResponse } from "../../models/interfaces/ingredients/ingredients-tiny-response";
import { ToastNotificationComponent } from "../../shared/components/notifications/toast-notification/toast-notification.component";
import { PromptComponent } from "../../shared/components/prompts/prompt/prompt.component";
import { HotDogsRequest } from "../../models/interfaces/hotdogs/hot-dogs-request";
import { HotDogsState } from "../../states/hotdogs.state";
import { IngredientQtds } from "../../models/interfaces/hotdogs/hot-dogs-ingredients-qtd";
import { IngredientsService } from "../../services/ingredients/ingredients.service";
import { HttpErrorResponse } from "@angular/common/http";
import { HotDogsTinyResponse } from "../../models/interfaces/hotdogs/hot-dogs-tiny-response";
import { PayloadQtds } from "../../models/interfaces/types";

@Injectable({providedIn: 'root'})
export class HotDogsFacade {
  private _ingredientsIds: string[] = []
  private hotdogsService: HotdogsService = inject(HotdogsService)
  private ingredientsService: IngredientsService = inject(IngredientsService)
  private hotdogsState: HotDogsState = inject(HotDogsState)
  private toast:ToastNotificationComponent = inject(ToastNotificationComponent)
  private prompt:PromptComponent = inject(PromptComponent)

  constructor(){
    this.hotdogsIngredients$()
  }

  public set allHotDogs(allHotDogs: Array<HotDogsTinyResponse>) {
    this.hotdogsState.allHotDogs = allHotDogs
  }

  public get allHotDogs$ () {
    return this.hotdogsState.allHotDogs$
  }

  public get allHotDogs () {
    return this.hotdogsState.allHotDogs
  }

  public set allHotDogsQtds(items: PayloadQtds[]) {
    const allHotDogsWithQtd =  this.allHotDogs.map(h => {
      const index = items.findIndex(i => i.id == h.id)
      return { ...h, quantidade: index < 0 ? 0 : (items[index]?.quantidade || 1) }
    })
    this.allHotDogs = allHotDogsWithQtd
  }

  public get allIngredients$ () {
    return this.hotdogsState.allIngredients$
  }

  public get ingredientsIds() {
    return this._ingredientsIds
  }

  public select$(id:string) {
    return this.hotdogsService.getById(id)
  }

  public add(
    payload: HotDogsRequest,
    callbacks?: {success?: Function, error?: Function}
  ):void {
    this.hotdogsService
      .create(payload)
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

  public edit(
    payload: HotDogsRequest,
    callbacks?: {success?: Function, error?: Function}
  ):void {
    this.hotdogsService
      .edit(payload)
      .pipe(take(1))
      .subscribe({
        next: (resp: IngredientsTinyResponse) => {
          this.toast.success(`${resp.nome} editado com sucesso.`)
          callbacks?.success && callbacks.success()
        },
        error: (e) => {
          this.toast.error(`Erro ao editar hot-dog.`, e)
          callbacks?.error && callbacks.error()
        }
      })
  }

  public remove(
    id: string,
    callbacks?: {success?: Function, error?: Function}
  ): void {
    this.prompt.showDialog({
      header: 'Remover Hot-Dog',
      message: 'Deseja remover o hot-dog?',
      accept: () => this.removeAccept(id, callbacks)
    })
  }

  private removeAccept(
    id: string,
    callbacks?: {success?: Function, error?: Function}
  ) {
    this.hotdogsService
      .remove(id)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.toast.success('Hot-dog removido com sucesso')
          callbacks?.success && callbacks.success()
        },
        error: (e: HttpErrorResponse) => {
          this.toast.error('Erro ao remover Hot-dog', e)
          callbacks?.error && callbacks.error()
        },
      })
  }

  public getAll(): void {}

  public getAllIngredients(): void {
    this.ingredientsService
      .getAll()
      .pipe(take(1))
      .subscribe({
        next: (d: IngredientsTinyResponse[]) => this.hotdogsState.allIngredientsWithQtds = d?.length ? d : [],
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

  public priceSelectedsHotDogs() {
    return this.allHotDogs
      .filter(p => !!p)
      .map(p => (Number(p.preco)) * Number(p.quantidade))
      .reduce((p, c) =>  p + c)
  }

  public priceSelectedsHotDogs$() {
    const filter = map((p:HotDogsTinyResponse[]) =>
      p.filter((d) => !!d.quantidade)
    );

    const mapper = map((v:HotDogsTinyResponse[],i) => {
      return v.length
        ? v.map(v => (Number(v.preco || 0) * Number(v.quantidade || 1))).reduce((p, c) =>  p + c)
        : 0
    })

    return this.allHotDogs$
      .pipe(filter)
      .pipe(mapper)
  }

  public loadHotDogsFromAPi() {
    this.hotdogsService
      .getAll()
      .subscribe(resp => {
        this.hotdogsState.allHotDogs = resp
      })
  }

  public hotDogsQtd(payload: IngredientQtds) {
    this.hotdogsState.allHotDogsQtd = payload
  }

  private hotdogsIngredients$() {
    this.allIngredients$
      .subscribe(i =>
        this._ingredientsIds = i
        .filter(i => i?.qtd)
        .map(i => i.id!)
      )
  }
}
