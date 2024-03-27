import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, toArray } from "rxjs";
import { IngredientsTinyResponse } from "../models/interfaces/ingredients/ingredients-tiny-response";

@Injectable({providedIn: 'root'})
export class IngredientsState {

  private readonly _allIngredients = new BehaviorSubject<Array<IngredientsTinyResponse>>([])

  public get allIngredients$(): Observable<IngredientsTinyResponse[]> {
    return this._allIngredients.asObservable();
  }

  public set allIngredients(allIngredients: IngredientsTinyResponse[]) {
    this._allIngredients.next(allIngredients);
  }

  public add(ingredient: IngredientsTinyResponse): IngredientsTinyResponse {
    const current = this._allIngredients.getValue()
    this.allIngredients = [...current, ingredient]
    return ingredient
  }
}
