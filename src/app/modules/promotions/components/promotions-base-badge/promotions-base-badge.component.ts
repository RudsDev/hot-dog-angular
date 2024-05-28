import { Component, Input, OnInit } from '@angular/core';
import { PromotionsTinyResponse } from '../../../../models/interfaces/promotions/promotions-tiny-response';
import { TipoCalculo } from '../../../../models/enums/tipo-calculo';

@Component({
  selector: 'app-promotions-base-badge',
  templateUrl: './promotions-base-badge.component.html',
  styleUrl: './promotions-base-badge.component.scss'
})
export class PromotionsBaseBadgeComponent {
  @Input() promotion:PromotionsTinyResponse | undefined
}
