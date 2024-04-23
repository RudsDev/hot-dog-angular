import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { PromotionsTinyResponse } from "../models/interfaces/promotions/promotions-tiny-response";
import { TipoCalculoType } from "../models/enums/tipo-calculo";

@Injectable({providedIn: 'root'})
export class PromotionsState {

  private readonly _selectedPromotion$ = new BehaviorSubject<TipoCalculoType | undefined>(undefined)

  public get selectedPromotion(): TipoCalculoType | undefined {
    return this._selectedPromotion$.getValue();
  }

  public get selectedPromotion$(): BehaviorSubject<TipoCalculoType | undefined> {
    return this._selectedPromotion$;
  }

  public set selectedPromotion$(selectedPromotion: TipoCalculoType) {
    this._selectedPromotion$.next(selectedPromotion);
  }

  private readonly _allPromotions = new BehaviorSubject<Array<PromotionsTinyResponse>>([])

  public get allPromotions$(): Observable<PromotionsTinyResponse[]> {
    return this._allPromotions.asObservable();
  }

  public get allPromotions(): PromotionsTinyResponse[] {
    return this._allPromotions.getValue();
  }

  public set allPromotions(allPromotions: PromotionsTinyResponse[]) {
    this._allPromotions.next(allPromotions);
  }

  public add(promotion: PromotionsTinyResponse): PromotionsTinyResponse {
    const current = this._allPromotions.getValue()
    this.allPromotions = [...current, promotion]
    return promotion
  }

  public remove(id: string): void {
    const [...current] = this._allPromotions.getValue()
    const index = current.findIndex(i => i.id === id)
    current.splice(index, 1)
    this.allPromotions = current
  }
}
