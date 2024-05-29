export interface PromotionsTinyResponse {
  id:string,
  nome:string,
  baseCalculo:number,
  tipoCalculo:number,
  itens?: Array<{qtd: number, lanche: number}>
}
