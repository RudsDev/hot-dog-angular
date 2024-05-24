import { PromotionItemResponse } from "./promotion-items-response";

export class PromotionsResponse {

  private _id:string
  private _nome:string
  private _baseCalculo:number
  private _tipoCalculo:number
  private _itens: PromotionItemResponse[]

  constructor ( p:PromotionsResponse ) {
    this._id = p.id
    this._nome = p.nome
    this._baseCalculo = p.baseCalculo
    this._tipoCalculo = p.tipoCalculo
    this._itens = p.itens
  }

  public get id() {
    return this._id
  }

  public get nome() {
    return this._nome
  }

  public get baseCalculo() {
    return this._baseCalculo
  }

  public get tipoCalculo() {
    return this._tipoCalculo
  }

  public get itens() {
    return this._itens
  }

  public get lanchesQtds() {
    return this._itens.map(i => this.mapLanchesQtdPayload(i))
  }

  private mapLanchesQtdPayload(i:PromotionItemResponse) {
    return { id: i.lanche.id.toString(), quantidade: i.quantidade }
  }

}
