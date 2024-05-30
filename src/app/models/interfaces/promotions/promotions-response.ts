import { PromotionItemResponse } from "./promotion-items-response";

export class PromotionsResponse {

  private _id = ''
  private _nome = ''
  private _baseCalculo =  1
  private _tipoCalculo =  1
  private _itens: PromotionItemResponse[] = []
  private _preco:string = '0'

  constructor(p: Partial<PromotionsResponse> | PromotionsResponse) {
    Object.assign(this, p);
  }

  public get id() {
    return this._id
  }

  public set id(id:string) {
    this._id = id
  }

  public get nome() {
    return this._nome
  }

  public set nome(nome:string) {
    this._nome = nome
  }

  public get baseCalculo() {
    return this._baseCalculo
  }

  public set baseCalculo(baseCalculo:number) {
    this._baseCalculo = baseCalculo
  }

  public get tipoCalculo() {
    return this._tipoCalculo
  }

  public set tipoCalculo(tipoCalculo:number) {
    this._tipoCalculo = tipoCalculo
  }

  public get itens() {
    return this._itens
  }

  public set itens(itens:PromotionItemResponse[]) {
    this._itens = itens
  }

  public get preco() {
    return this._preco
  }

  public set preco(preco:string) {
    this._preco = Number(preco).toString()
  }

  public get lanchesQtds() {
    return this._itens.map(i => this.mapLanchesQtdPayload(i))
  }

  private mapLanchesQtdPayload(i:PromotionItemResponse) {
    return { id: i.lanche.id.toString(), quantidade: i.quantidade }
  }

}
