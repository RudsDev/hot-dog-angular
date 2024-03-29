import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IngredientsFacade } from '../../../../facades/ingredients/ingredients.facade';

import { IngredientsTinyResponse } from '../../../../models/interfaces/ingredients/ingredients-tiny-response';
import { take } from 'rxjs';

@Component({
  selector: 'app-ingredients-form',
  templateUrl: './ingredients-form.component.html',
  styleUrl: './ingredients-form.component.scss',
})
export class IngredientsFormComponent implements OnInit {
  private router: Router = inject(Router)
  private facade: IngredientsFacade = inject(IngredientsFacade)
  private activatedRoute = inject(ActivatedRoute)

  public ingrerdientForm = new FormGroup({
    id: new FormControl(),
    nome: new FormControl('',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]
    ),
    preco: new FormControl('', [Validators.required, Validators.min(0.1)]),
  });

  ngOnInit(): void {
    this.activatedRoute
      .params
      .pipe(take(1))
      .subscribe(d => this.initForm(d['id']))
  }

  handleSubmitAddIngredient() {
    const success = () => this.router.navigate(['/ingredients'])
    const payload = this.createSubmitPayload()

    this.ingrerdientForm.value.id
      ? this.facade.edit(payload, {success})
      : this.facade.add(payload, {success})
  }

  private createSubmitPayload(): IngredientsTinyResponse {
    return {
      id: this.ingrerdientForm.value.id as string,
      nome: this.ingrerdientForm.value.nome as string,
      preco:  this.ingrerdientForm.value.preco as string,
    }
  }

  private initForm(id: number) {
    const found = this.facade.select(id?.toString());
    if (found) {
      this.ingrerdientForm.setValue({
        id: found.id,
        nome: found.nome,
        preco: found.preco,
      });
    }
    else {
      this.router.navigate(['/ingredients/register'])
    }
  }
}
