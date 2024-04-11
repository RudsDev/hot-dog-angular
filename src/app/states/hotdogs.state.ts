import { Injectable } from "@angular/core";

import { BehaviorSubject, Observable } from "rxjs";

import { IngredientQtds } from "../models/interfaces/hotdogs/hot-dogs-ingredients-qtd";
import { IngredientsTinyResponse } from "../models/interfaces/ingredients/ingredients-tiny-response";

@Injectable({providedIn: 'root'})
export class HotDogsState {

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
    console.log(this.ingredientsQtd)

    const value = this.ingredientsQtd.length
    ? this.getAllIngredientsWithQtds(allIngredients)
    : allIngredients

    this._allIngredients.next(value);
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

  private getAllIngredientsWithQtds(allIngredients:IngredientsTinyResponse[]) {
    this.ingredientsQtd.forEach(payload => {
      const { id, qtd } = payload
      const [...currents] = allIngredients
      const index = currents.findIndex(i => i.id === id)
      currents[index].qtd = qtd
      allIngredients = currents
    })
    return allIngredients
  }
}
