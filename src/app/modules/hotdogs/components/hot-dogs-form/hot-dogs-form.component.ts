import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { map } from 'rxjs';

import { IngredientsTinyResponse } from '../../../../models/interfaces/ingredients/ingredients-tiny-response';
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
  ingredientFacade: IngredientsFacade = inject(IngredientsFacade);
  hotDogFacade: HotDogsFacade = inject(HotDogsFacade);

  ngOnInit(): void {
    this.ingredientFacade.getAllIngredients();
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

  incrementIngredient(event:{ id:string, value: number }) {
    const { id, value:qtd } = event
    this.ingredientFacade.changeQtd({ id, qtd });
  }

  handleSubmitHotdog() {
    const success = () => this.router.navigate(['/hotdogs'])
    const payload = this.createSubmitPayload()
    this.form.value.id
      ? this.hotDogFacade.edit()
      : this.hotDogFacade.add(payload, { success })
  }

  public get selectedIngredients$() {
    const filter = map((p: IngredientsTinyResponse[]) =>
      p.filter((d) => !!d.qtd)
    );
    return this.ingredientFacade.ingredients$.pipe(filter);
  }

  private priceSelectedIngredients$() {

    const mapper = map((v:IngredientsTinyResponse[],i) => {
      return v.length
        ? v.map(v => (Number(v.preco || 0) * Number(v.qtd || 1))).reduce((p, c) =>  p + c)
        : 0
    })

    const setFormPrice = (value:number) => {
      this.form.patchValue({ preco: value })
    }

    return this.selectedIngredients$
    .pipe(mapper)
    .subscribe(setFormPrice)
  }

  private createSubmitPayload(): HotDogsTinyResponse {
    return {
      id: this.form.value.id as string,
      nome: this.form.value.nome as string,
      preco:  Number(this.form.value.preco).toString(),
    }
  }
}
