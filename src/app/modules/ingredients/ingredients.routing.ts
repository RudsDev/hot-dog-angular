import { Routes } from "@angular/router";
import { IngredientsHomeComponent } from "./page/ingredients-home/ingredients-home.component";
import { IngredientsRegisterComponent } from "./page/ingredients-register/ingredients-register.component";

export const INGREDIENTS_ROUTES: Routes = [
  {
    path: '',
    component: IngredientsHomeComponent,
  },
  {
    path: 'register',
    component: IngredientsRegisterComponent,
  },
  {
    path: 'register/:id',
    component: IngredientsRegisterComponent,
  },
]
