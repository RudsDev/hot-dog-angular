import { Injectable } from "@angular/core";

import { BehaviorSubject, Observable } from "rxjs";

import { IngredientQtds } from "../models/interfaces/hotdogs/hot-dogs-ingredients-qtd";

@Injectable({providedIn: 'root'})
export class HotDogsState {

  private readonly _hotdogIngredients = new BehaviorSubject<Array<IngredientQtds>>([])

  public set hotdogIngredients(ingredients: Array<IngredientQtds>) {
    this._hotdogIngredients.next(ingredients);
  }

  public get hotdogIngredients$(): Observable<Array<IngredientQtds>> {
    return this._hotdogIngredients.asObservable();
  }

  public get hotdogIngredients(): Array<IngredientQtds> {
    return this._hotdogIngredients.getValue();
  }
}
