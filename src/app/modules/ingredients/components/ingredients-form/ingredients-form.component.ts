import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-ingredients-form',
  templateUrl: './ingredients-form.component.html',
  styleUrl: './ingredients-form.component.scss',
})
export class IngredientsFormComponent {
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
    throw new Error('Method not implemented.');
  }
}
