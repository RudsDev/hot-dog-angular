import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { HotDogsResponse } from '../../../../models/interfaces/hotdogs/hot-dogs-response';
import { HotDogsRequest } from '../../../../models/interfaces/hotdogs/hot-dogs-request';

import { HotDogsFacade } from '../../../../facades/hotdogs/hotdogs.facade';

import { take } from 'rxjs';

@Component({
  selector: 'app-hot-dogs-form',
  templateUrl: './hot-dogs-form.component.html',
  styleUrl: './hot-dogs-form.component.scss',
})
export class HotDogsFormComponent implements OnInit {
  private router: Router = inject(Router)
  private hotDogFacade: HotDogsFacade = inject(HotDogsFacade);
  private activatedRoute = inject(ActivatedRoute)

  ngOnInit(): void {
    this.priceSelectedIngredients$()
    this.activatedRoute
      .params
      .pipe(take(1))
      .subscribe(d => this.initForm(d['id']))
  }

  public form = new FormGroup({
    id: new FormControl(),
    nome: new FormControl('',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]
    ),
    preco: new FormControl(0, [Validators.required, Validators.min(0.1)]),
  });

  handleSubmitHotdog() {
    const success = () => this.router.navigate(['/hotdogs'])
    const payload = this.createSubmitPayload()
    this.form.value.id
      ? this.hotDogFacade.edit(payload, { success })
      : this.hotDogFacade.add(payload, { success })
  }

  private priceSelectedIngredients$() {
    return this.hotDogFacade
      .priceSelectedIngredients$()
      .subscribe(v => this.form.patchValue({ preco: v }))
  }

  private createSubmitPayload(): HotDogsRequest {
    return {
      id: this.form.value.id as string,
      nome: this.form.value.nome as string,
      ingredientes: this.hotDogFacade.ingredientsIds
    }
  }

  private initForm(id: number) {
    const error = () => this.router.navigate(['/hotdogs'])
    const next = (resp: HotDogsResponse) => {
      this.form
      .setValue({
        id: resp.id,
        nome: resp.nome,
        preco: 0,
      });
      this.hotDogFacade.setIngredientsQtd(resp.ingredientes.map(i => ({ id: i.id!, qtd: 1 })))
    }
    id && this.hotDogFacade
      .select$(id?.toString())
      .subscribe({ next, error })
  }

}
