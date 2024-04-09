import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { IngredientsTinyResponse } from "../models/interfaces/ingredients/ingredients-tiny-response";

@Injectable({providedIn: 'root'})
export class IngredientsState {

  private readonly _allIngredients = new BehaviorSubject<Array<IngredientsTinyResponse>>([])

  public get allIngredients$(): Observable<IngredientsTinyResponse[]> {
    return this._allIngredients.asObservable();
  }

  public get allIngredients(): IngredientsTinyResponse[] {
    return this._allIngredients.getValue();
  }

  public set allIngredients(allIngredients: IngredientsTinyResponse[]) {
    this._allIngredients.next(allIngredients);
  }

  public add(ingredient: IngredientsTinyResponse): IngredientsTinyResponse {
    const current = this._allIngredients.getValue()
    this.allIngredients = [...current, ingredient]
    return ingredient
  }

  public remove(id: string): void {
    const [...current] = this._allIngredients.getValue()
    const index = current.findIndex(i => i.id === id)
    current.splice(index, 1)
    this.allIngredients = current
  }

  public set qtd(payload: {id: string, qtd:number}) {
    const { id, qtd } = payload
    const [...current] = this._allIngredients.getValue()
    const index = current.findIndex(i => i.id === id)
    current[index].qtd = qtd
    this.allIngredients = current
  }
}
