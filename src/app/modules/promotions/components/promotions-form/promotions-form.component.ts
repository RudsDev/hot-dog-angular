import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { DropdownChangeEvent } from 'primeng/dropdown';

import { take } from 'rxjs';

import { PromotionsFacade } from '../../../../facades/promotions/promotions.facade';
import { TipoCalculo, TipoCalculoType } from '../../../../models/enums/tipo-calculo';
import { PromotionsTinyResponse } from '../../../../models/interfaces/promotions/promotions-tiny-response';

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
    this.promotionSubscriber()
    this.activatedRoute
      .params
      .pipe(take(1))
      .subscribe(d => this.initForm(d['id']))
  }

  handleSubmit() {
    const success = () => this.router.navigate(this.PROMOTIONS_URL)
    const payload = this.createSubmitPayload()
    this.form.value.id
      ? this.facade.edit(payload, { success })
      : this.facade.add(payload, { success })
  }

  selectPromotion(e:DropdownChangeEvent) {
    this.facade.promotion = this.findType(e.value)
  }

  private createSubmitPayload(): any {
    return {
      id: this.form.value.id as string,
      nome: this.form.value.nome as string,
      ingredientes: this.facade.promotions
    }
  }

  private promotionSubscriber(){
    this.facade.promotion$
      .subscribe(v => {
        if(v) this.form.value.tipo = v.type
      })
  }

  private initForm(id: number) {
    const error = () => this.router.navigate(this.PROMOTIONS_URL)
    const next = (resp: PromotionsTinyResponse) => {
      this.form
      .setValue({
        id: resp.id,
        nome: resp.nome,
        tipo: resp.tipoCalculo,
        baseCalculo: resp.baseCalculo,
      });
      this.facade.promotion = this.findType(resp.tipoCalculo)
    }
    id && this.facade
      .select$(id?.toString())
      .subscribe({ next, error })
  }

  private findType(type: number): TipoCalculoType {
    return this.ALL_TYPES.find(i => i.type === type)!;
  }

}
