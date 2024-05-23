import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { DropdownChangeEvent } from 'primeng/dropdown';

import { take } from 'rxjs';

import { PromotionsFacade } from '../../../../facades/promotions/promotions.facade';
import { TipoCalculo, TipoCalculoType } from '../../../../models/enums/tipo-calculo';
import { PromotionsResponse } from '../../../../models/interfaces/promotions/promotions-response';

@Component({
  selector: 'app-promotions-form',
  templateUrl: './promotions-form.component.html',
  styleUrl: './promotions-form.component.scss'
})
export class PromotionsFormComponent implements OnInit {

  private router: Router = inject(Router)
  private activatedRoute = inject(ActivatedRoute)
  private readonly PROMOTIONS_URL = ['/promotions'];

  readonly facade: PromotionsFacade = inject(PromotionsFacade);
  readonly ALL_TYPES:TipoCalculoType[] = TipoCalculo.ALL_TYPES;

  public form = new FormGroup({
    id: new FormControl(),
    nome: new FormControl('',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]
    ),
    tipo: new FormControl(0, [Validators.required]),
    baseCalculo: new FormControl(0, [Validators.required, Validators.min(0.1)]),
  });

  ngOnInit(): void {
    this.loadPromotion()
    this.loadForm()
  }

  handleSubmit() {
    const success = () => this.router.navigate(this.PROMOTIONS_URL)
    const payload = this.createSubmitPayload()
    this.form.value.id
      ? this.facade.edit(payload, { success })
      : this.facade.add(payload, { success })
  }

  selectPromotion(e:DropdownChangeEvent) {
    this.setPromotionType(e.value)
  }

  private createSubmitPayload(): any {
    return {
      id: this.form.value.id as string,
      nome: this.form.value.nome as string,
      ingredientes: this.facade.hotDogs
    }
  }

  private loadPromotion() {
    const error = () => this.router.navigate(this.PROMOTIONS_URL)
    const next = (d:Params) => this.facade.loadPromotion(d['id']?.toString())
    this.activatedRoute
      .params
      .pipe(take(1))
      .subscribe({ next, error })
  }

  private loadForm() {
    const error = () => this.router.navigate(this.PROMOTIONS_URL)
    const next = (resp: PromotionsResponse|undefined) => {
      if(resp) {
        this.form
        .setValue({
          id: resp.id,
          nome: resp.nome,
          tipo: resp.tipoCalculo,
          baseCalculo: resp.baseCalculo,
        });
        this.setPromotionType(resp.tipoCalculo);
      }
    }
    this.facade.promotion$.subscribe({next, error})
  }

  private setPromotionType(tipoCalculo: number) {
    const findType = (type: number) => this.ALL_TYPES.find(i => i.type === type)!
    this.facade.promotionType = findType(tipoCalculo);
  }

}
