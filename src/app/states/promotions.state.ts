import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { PromotionsTinyResponse } from "../models/interfaces/promotions/promotions-tiny-response";
import { TipoCalculoType } from "../models/enums/tipo-calculo";
import { PromotionsResponse } from "../models/interfaces/promotions/promotions-response";

@Injectable({providedIn: 'root'})
export class PromotionsState {

  private readonly _promotion$ = new BehaviorSubject<PromotionsResponse | undefined>(undefined)

  public set promotion$(promotion: PromotionsResponse) {
    this._promotion$.next(promotion);
  }

  public get promotion$(): BehaviorSubject<PromotionsResponse | undefined> {
    return this._promotion$;
  }

  private readonly _promotionType$ = new BehaviorSubject<TipoCalculoType | undefined>(undefined)

  public get promotionType(): TipoCalculoType | undefined {
    return this._promotionType$.getValue();
  }

  public get promotionType$(): BehaviorSubject<TipoCalculoType | undefined> {
    return this._promotionType$;
  }

  public set promotionType(selectedPromotion: TipoCalculoType) {
    this._promotionType$.next(selectedPromotion);
  }

  private readonly _promotionBase$ = new BehaviorSubject<number>(-1)

  public get promotionBase(): number {
    return this._promotionBase$.getValue();
  }

  public get promotionBase$(): BehaviorSubject<number> {
    return this._promotionBase$;
  }

  public set promotionBase(value: number) {
    this._promotionBase$.next(value);
  }

  private readonly _allPromotions$ = new BehaviorSubject<Array<PromotionsTinyResponse>>([])

  public get allPromotions(): PromotionsTinyResponse[] {
    return this._allPromotions$.getValue();
  }

  public set allPromotions(allPromotions: PromotionsTinyResponse[]) {
    this._allPromotions$.next(allPromotions);
  }

  public add(promotion: PromotionsTinyResponse): PromotionsTinyResponse {
    const current = this._allPromotions$.getValue()
    this.allPromotions = [...current, promotion]
    return promotion
  }

  public remove(id: string): void {
    const [...current] = this._allPromotions$.getValue()
    const index = current.findIndex(i => i.id === id)
    current.splice(index, 1)
    this.allPromotions = current
  }
}
