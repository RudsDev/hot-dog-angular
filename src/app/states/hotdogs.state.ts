import { Injectable } from "@angular/core";

import { BehaviorSubject, Observable } from "rxjs";

import { IngredientQtds } from "../models/interfaces/hotdogs/hot-dogs-ingredients-qtd";
import { IngredientsTinyResponse } from "../models/interfaces/ingredients/ingredients-tiny-response";
import { HotDogsTinyResponse } from "../models/interfaces/hotdogs/hot-dogs-tiny-response";

@Injectable({providedIn: 'root'})
export class HotDogsState {

  private readonly _allHotDogs$ = new BehaviorSubject<Array<HotDogsTinyResponse>>([])

  private readonly _ingredientsQtd = new BehaviorSubject<Array<IngredientQtds>>([])

  private readonly _allIngredients = new BehaviorSubject<Array<IngredientsTinyResponse>>([])

  public set ingredientsQtd(ingredients: Array<IngredientQtds>) {
    this._ingredientsQtd.next(ingredients);
  }

  public get ingredientsQtd$(): Observable<Array<IngredientQtds>> {
    return this._ingredientsQtd.asObservable();
  }

  public get ingredientsQtd(): Array<IngredientQtds> {
    return this._ingredientsQtd.getValue();
  }

  public set allIngredients(allIngredients: IngredientsTinyResponse[]) {
    this._allIngredients.next(allIngredients);
  }

  public set allIngredientsWithQtds(allIngredients: IngredientsTinyResponse[]) {
    this._allIngredients.next(this.getAllIngredientsWithQtds(allIngredients));
  }

  public get allIngredients$() {
    return this._allIngredients.asObservable()
  }

  public set qtd(payload: IngredientQtds) {
    const { id, qtd } = payload
    const [...current] = this._allIngredients.getValue()
    const index = current.findIndex(i => i.id === id)
    current[index].qtd = qtd
    this.allIngredients = current
  }

  public set allHotDogs(hotDogs: Array<HotDogsTinyResponse>) {
    this._allHotDogs$.next(hotDogs);
  }

  public get allHotDogs$(): Observable<Array<HotDogsTinyResponse>> {
    return this._allHotDogs$.asObservable();
  }

  public get allHotDogs(): Array<HotDogsTinyResponse> {
    return this._allHotDogs$.getValue();
  }

  public set allHotDogsQtd(payload: IngredientQtds) {
    const { id, qtd } = payload
    const [...current] = this._allHotDogs$.getValue()
    const index = current.findIndex(i => i.id.toString() == id)
    current[index].quantidade = qtd
    this.allHotDogs = current
  }

  private getAllIngredientsWithQtds(allIngredients:IngredientsTinyResponse[]) {
    return allIngredients.map(i => {
      const index = this.ingredientsQtd.findIndex(q => q.id === i.id)
      return { ...i, qtd: index < 0 ? 0 : (i.qtd || 1) }
    })
  }
}
