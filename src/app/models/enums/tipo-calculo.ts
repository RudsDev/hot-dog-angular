export type TipoCalculoType = { type: 1 | 2 | 3 | 4, label: string, color: string, icon:string  }
export abstract class TipoCalculo {
  public static readonly ACRESCIMO_VALOR:TipoCalculoType = { type: 1, label: 'Acréscimo valor', color: 'green', icon: 'pi pi-dollar' }
  public static readonly DESCONTO_VALOR:TipoCalculoType = { type: 2, label: 'Desconto valor', color: 'red', icon: 'pi pi-dollar' }
  public static readonly ACRESCIMO_PORCENTAGEM:TipoCalculoType = { type: 3, label: 'Acréscimo porcentagem', color: 'green', icon: 'pi pi-percentage' }
  public static readonly DESCONTO_PORCENTAGEM:TipoCalculoType = { type: 4, label: 'Desconto porcentagem', color: 'red', icon: 'pi pi-percentage' }
  public static readonly ALL_TYPES:TipoCalculoType[] = [
    this.ACRESCIMO_VALOR,
    this.DESCONTO_VALOR,
    this.ACRESCIMO_PORCENTAGEM,
    this.DESCONTO_PORCENTAGEM,
  ]
}
