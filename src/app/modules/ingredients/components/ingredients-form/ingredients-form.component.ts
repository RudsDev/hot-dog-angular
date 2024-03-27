import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IngredientsFacade } from '../../../../facades/ingredients/ingredients.facade';

import { IngredientsTinyResponse } from '../../../../models/interfaces/ingredients/ingredients-tiny-response';

@Component({
  selector: 'app-ingredients-form',
  templateUrl: './ingredients-form.component.html',
  styleUrl: './ingredients-form.component.scss',
})
export class IngredientsFormComponent {
  private router: Router = inject(Router)
  private facade: IngredientsFacade = inject(IngredientsFacade)

  public ingrerdientForm = new FormGroup({
    nome: new FormControl('',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]
    ),
    preco: new FormControl('', [Validators.required, Validators.min(0.1)]),
  });

  handleSubmitAddIngredient() {
    this.facade.add(this.createSubmitPayload(), {
      success: () => this.router.navigate(['/ingredients'])
    })
  }

  private createSubmitPayload(): IngredientsTinyResponse {
    return {
      nome: this.ingrerdientForm.value.nome as string,
      preco:  this.ingrerdientForm.value.preco as string,
    }
  }
}
