import { Injectable, inject } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";

import { BehaviorSubject, filter, map, take } from "rxjs";

import { TipoCalculo, TipoCalculoType } from "../../models/enums/tipo-calculo";
import { PromotionsTinyResponse } from "../../models/interfaces/promotions/promotions-tiny-response";
import { PromotionsState } from "../../states/promotions.state";
import { PromotionsService } from "../../services/promotions/promotions.service";
import { ToastNotificationComponent } from "../../shared/components/notifications/toast-notification/toast-notification.component";
import { PromptComponent } from "../../shared/components/prompts/prompt/prompt.component";
import { PromotionsResponse } from "../../models/interfaces/promotions/promotions-response";
import { HotDogsFacade } from "../hotdogs/hotdogs.facade";

@Injectable({providedIn: 'root'})
export class PromotionsFacade {

  private promotionsService: PromotionsService = inject(PromotionsService)
  private hotDogsFacade: HotDogsFacade = inject(HotDogsFacade)
  private state: PromotionsState = inject(PromotionsState)
  private toast:ToastNotificationComponent = inject(ToastNotificationComponent)
  private prompt:PromptComponent = inject(PromptComponent)
  private _price:BehaviorSubject<number> = new BehaviorSubject(0)

  constructor(){}

  public get price():BehaviorSubject<number> {
    return this._price
  }

  public set price(value: number) {
    this._price.next(value)
  }

  public get promotion$() {
    return this.state.promotion$
  }

  public get promotion() : PromotionsResponse | undefined{
    return this.state.promotion$.value
  }

  public get promotions() : PromotionsTinyResponse[]{
    return this.state.allPromotions
  }

  public set promotionType(promotion: TipoCalculoType) {
    this.state.promotionType = promotion
  }

  public get promotionType() {
    return this.state.promotionType!
  }

  public set promotionBase(value: number) {
    this.state.promotionBase = value
  }

  public get promotionBase() {
    return this.state.promotionBase
  }

  public get promotionBase$() {
    return this.state.promotionBase$
  }

  public get hotDogs() {
    return this.hotDogsFacade.allHotDogs
  }

  public loadPromotionData(id: string) {
    this.setHotDogQtds()
    this.promotionPrice()
    this.hotDogsFacade.loadHotDogsFromAPi()
    this.loadPromotion(id)
  }

  private loadPromotion(id: string) {
    id
      ? this.getPromotionByIdFromApi(id)
      : this.state.promotion$ = new PromotionsResponse({})
  }

  private getPromotionByIdFromApi(id:string) {
    return this.promotionsService
      .getById(id)
      .subscribe(resp => this.state.promotion$ = resp)
  }

  public add(
    promotion: PromotionsTinyResponse,
    callbacks?: {success?: Function, error?: Function}
  ) {
    return this.promotionsService
      .create(promotion)
      .pipe(take(1))
      .subscribe({
        next: (resp: PromotionsTinyResponse) => {
          this.state.add(resp)
          this.toast.success(`${resp.nome} criado com sucesso.`)
          callbacks?.success && callbacks.success()
        },
        error: (e) => {
          this.toast.error(`Erro ao criar promoção.`, e)
          callbacks?.error && callbacks.error()
        }
      })
  }

  public edit(
    promotion: PromotionsTinyResponse,
    callbacks?: {success?: Function, error?: Function}
  ) {
    return this.promotionsService
      .edit(promotion)
      .pipe(take(1))
      .subscribe({
        next: (resp: PromotionsTinyResponse) => {
          this.state.add(resp)
          this.toast.success(`${resp.nome} editado com sucesso.`)
          callbacks?.success && callbacks.success()
        },
        error: (e) => {
          this.toast.error(`Erro ao editar promoção.`, e)
          callbacks?.error && callbacks.error()
        }
      })
  }

  public remove(
    id: string,
    callbacks?: {success?: Function, error?: Function}
  ) {
    return this.prompt.showDialog({
      header: 'Remover promoção',
      message: 'Deseha remover o promoção?',
      accept: () => this.removePromotionAccept(id, callbacks)
    })
  }

  public getAllPromotions() {
    return this.promotionsService
      .getAll()
      .pipe(take(1))
      .subscribe({
        next: (d: PromotionsTinyResponse[]) => this.state.allPromotions = d?.length ? d : [],
        error: (e: HttpErrorResponse) => this.toast.error('Erro ao listar promoções', e),
      }
    )
  }

  public setCalcParams(type: number, base:number) {
    this.state.promotionType = TipoCalculo.getByTypeId(type)
    this.state.promotionBase = base
  }

  private promotionPrice() {
    const priceFromHotDogSubscription = this.hotDogsFacade.priceSelectedsHotDogs$()
      .pipe(map(v => this.calPrice()))
      .subscribe(v => this.price = v)

    const priceFromBaseSubscription = this.state.promotionBase$
      .pipe(map(b => this.calPrice()))
      .subscribe(v => this.price = v)

    const priceFromTypeSubscription = this.state.promotionType$
      .pipe(map(t => this.calPrice()))
      .subscribe(v => this.price = v)

      priceFromHotDogSubscription.add(priceFromBaseSubscription)
      priceFromHotDogSubscription.add(priceFromTypeSubscription)

      return priceFromHotDogSubscription
  }

  private calPrice(): number {
    if(!this.promotion || !this.state.promotionType) return TipoCalculo.UNKNOW.type
    const calcType = TipoCalculo.getByTypeId(this.state.promotionType.type)
    const price = this.hotDogsFacade.priceSelectedsHotDogs()
    const value = calcType.calc(price, this.state.promotionBase)
    return value;
  }

  private removePromotionAccept(
    id: string,
    callbacks?: {success?: Function, error?: Function}
  ) {
    return this.promotionsService
      .remove(id)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.state.remove(id)
          this.toast.success('Promoção removido com sucesso')
          callbacks?.success && callbacks.success()
        },
        error: (e: HttpErrorResponse) => {
          this.toast.error('Erro ao remover promoção', e)
          callbacks?.error && callbacks.error()
        },
      })
  }

  private setHotDogQtds() {
    return this.promotion$
      .pipe(filter(p => !!p))
      .pipe(map(p => new PromotionsResponse(p!)))
      .subscribe(res => this.hotDogsFacade.allHotDogsQtds = res.lanchesQtds)
  }
}
