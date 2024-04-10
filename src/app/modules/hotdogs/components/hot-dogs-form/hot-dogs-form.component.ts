import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { HotDogsTinyResponse } from '../../../../models/interfaces/hotdogs/hot-dogs-tiny-response';

import { IngredientsFacade } from '../../../../facades/ingredients/ingredients.facade';
import { HotDogsFacade } from '../../../../facades/hotdogs/hotdogs.facade';

@Component({
  selector: 'app-hot-dogs-form',
  templateUrl: './hot-dogs-form.component.html',
  styleUrl: './hot-dogs-form.component.scss',
})
export class HotDogsFormComponent implements OnInit {
  private router: Router = inject(Router)
  private ingredientFacade: IngredientsFacade = inject(IngredientsFacade);
  private hotDogFacade: HotDogsFacade = inject(HotDogsFacade);

  ngOnInit(): void {
    this.priceSelectedIngredients$()
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
      ? this.hotDogFacade.edit()
      : this.hotDogFacade.add(payload, { success })
  }

  private priceSelectedIngredients$() {
    return this.ingredientFacade
      .priceSelectedIngredients$()
      .subscribe(v => this.form.patchValue({ preco: v }))
  }

  private createSubmitPayload(): HotDogsTinyResponse {
    return {
      id: this.form.value.id as string,
      nome: this.form.value.nome as string,
      preco:  Number(this.form.value.preco).toString(),
    }
  }
}
