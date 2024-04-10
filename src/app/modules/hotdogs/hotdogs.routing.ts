import { Routes } from "@angular/router";
import { HotDogsHomeComponent } from "./page/hot-dogs-home/hot-dogs-home.component";
import { HotDogsRegisterComponent } from "./page/hot-dogs-register/hot-dogs-register.component";

export const HOTDOGS_ROUTES: Routes = [
  {
    path: '',
    component: HotDogsHomeComponent,

  },
  {
    path: 'register',
    component: HotDogsRegisterComponent,
  },
  {
    path: 'register/:id',
    component: HotDogsRegisterComponent,
  },
]
