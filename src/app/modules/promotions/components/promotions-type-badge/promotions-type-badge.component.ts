import { Component, Input, OnInit } from '@angular/core';
import { TipoCalculo, TipoCalculoType } from '../../../../models/enums/tipo-calculo';
import { PromotionsTinyResponse } from '../../../../models/interfaces/promotions/promotions-tiny-response';

@Component({
  selector: 'app-promotions-type-badge',
  templateUrl: './promotions-type-badge.component.html',
  styleUrl: './promotions-type-badge.component.scss'
})
export class PromotionsTypeBadgeComponent implements OnInit {
  @Input() promotion:PromotionsTinyResponse | undefined

  type:TipoCalculoType = TipoCalculo.UNKNOW
  severity: "success" | "info" | "warning" | "danger" | null | undefined

  ngOnInit(): void {
    this.type = this.promotion?.tipoCalculo
      ? TipoCalculo.getByTypeId(this.promotion.tipoCalculo)
      : TipoCalculo.UNKNOW
      this.severity = this.colorToSeverity(this.type.color)
  }

  private colorToSeverity(color:string) {
    if(color === 'green') return 'success'
    if(color === 'red') return 'danger'
    return 'info'
  }
}
