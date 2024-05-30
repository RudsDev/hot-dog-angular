import { Routes } from "@angular/router";
import { PromotionsHomeComponent } from "./page/promotions-home/promotions-home.component";
import { PromotionsRegisterComponent } from "./page/promotions-register/promotions-register.component";

export const PROMOTIONS_ROUTES: Routes = [
  {
    path: '',
    component: PromotionsHomeComponent,
  },
  {
    path: 'register',
    component: PromotionsRegisterComponent,
  },
  {
    path: 'register/:id',
    component: PromotionsRegisterComponent,
  },
]
