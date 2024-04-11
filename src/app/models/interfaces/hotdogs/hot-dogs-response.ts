import { IngredientsTinyResponse } from "../ingredients/ingredients-tiny-response";

export interface HotDogsResponse {
  id:string,
  nome:string,
  ingredientes: Array<IngredientsTinyResponse>,
}
