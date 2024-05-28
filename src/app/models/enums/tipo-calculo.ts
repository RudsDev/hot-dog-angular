export type TipoCalculoType = {
  type: -1 | 1 | 2 | 3 | 4;
  label: string;
  color: string;
  icon: string;
  calc: Function;
};
export abstract class TipoCalculo {
  public static readonly UNKNOW: TipoCalculoType = {
    type: -1,
    label: 'UNKNOW',
    color: 'purple',
    icon: '???',
    calc: UNKNOW,
  };
  public static readonly ACRESCIMO_VALOR: TipoCalculoType = {
    type: 1,
    label: 'Acréscimo valor',
    color: 'green',
    icon: 'pi pi-dollar',
    calc: ACRESCIMO_VALOR,
  };
  public static readonly DESCONTO_VALOR: TipoCalculoType = {
    type: 2,
    label: 'Desconto valor',
    color: 'red',
    icon: 'pi pi-dollar',
    calc: DESCONTO_VALOR,
  };
  public static readonly ACRESCIMO_PORCENTAGEM: TipoCalculoType = {
    type: 3,
    label: 'Acréscimo porcentagem',
    color: 'green',
    icon: 'pi pi-percentage',
    calc: ACRESCIMO_PORCENTAGEM,
  };
  public static readonly DESCONTO_PORCENTAGEM: TipoCalculoType = {
    type: 4,
    label: 'Desconto porcentagem',
    color: 'red',
    icon: 'pi pi-percentage',
    calc: DESCONTO_PORCENTAGEM,
  };
  public static readonly ALL_TYPES: TipoCalculoType[] = [
    this.ACRESCIMO_VALOR,
    this.DESCONTO_VALOR,
    this.ACRESCIMO_PORCENTAGEM,
    this.DESCONTO_PORCENTAGEM,
  ];

  public static getByTypeId(id: number) {
    return this.ALL_TYPES.find((t) => t.type === id) || TipoCalculo.UNKNOW;
  }
}

function UNKNOW(value: number, base: number) {
  return -1;
}

function ACRESCIMO_VALOR(value: number, base: number) {
  return value + base;
}

function DESCONTO_VALOR(value: number, base: number) {
  return value - base;
}

function ACRESCIMO_PORCENTAGEM(value: number, base: number) {
  const porcent = base / 100;
  return value + (value * porcent);
}

function DESCONTO_PORCENTAGEM(value: number, base: number) {
  const porcent = base / 100;
  return value - (value * porcent);
}
