import { PromotionItemResponse } from "./promotion-items-response";

export interface PromotionsResponse {
  id:string,
  nome:string,
  baseCalculo:number,
  tipoCalculo:number,
  itens: PromotionItemResponse[]
}
