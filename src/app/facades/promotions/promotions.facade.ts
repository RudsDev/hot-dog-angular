import { Injectable, inject } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";

import { Observable } from "rxjs/internal/Observable";

import { take } from "rxjs";

import { TipoCalculoType } from "../../models/enums/tipo-calculo";
import { PromotionsTinyResponse } from "../../models/interfaces/promotions/promotions-tiny-response";
import { PromotionsState } from "../../states/promotions.state";
import { PromotionsService } from "../../services/promotions/promotions.service";
import { ToastNotificationComponent } from "../../shared/components/notifications/toast-notification/toast-notification.component";
import { PromptComponent } from "../../shared/components/prompts/prompt/prompt.component";

@Injectable({providedIn: 'root'})
export class PromotionsFacade {

  private promotionsService: PromotionsService = inject(PromotionsService)
  private state: PromotionsState = inject(PromotionsState)
  private toast:ToastNotificationComponent = inject(ToastNotificationComponent)
  private prompt:PromptComponent = inject(PromptComponent)

  promotions$: Observable<PromotionsTinyResponse[]> = this.state.allPromotions$;

  constructor(){}

  public get promotions() : PromotionsTinyResponse[]{
    return this.state.allPromotions
  }

  public set promotion(promotion: TipoCalculoType) {
    this.state.selectedPromotion$ = promotion
  }

  public get promotion() {
    return this.state.selectedPromotion!
  }

  public get promotion$() {
    return this.state.selectedPromotion$
  }

  public select$(id:string) {
    return this.promotionsService.getById(id)
  }

  public select(id?: string) {
    return id
      ? this.state.allPromotions.find(i => i.id == id)
      : undefined
  }

  public add(
    promotion: PromotionsTinyResponse,
    callbacks?: {success?: Function, error?: Function}
  ):void {
    this.promotionsService
      .create(promotion)
      .pipe(take(1))
      .subscribe({
        next: (resp: PromotionsTinyResponse) => {
          this.state.add(resp)
          this.toast.success(`${resp.nome} criado com sucesso.`)
          callbacks?.success && callbacks.success()
        },
        error: (e) => {
          this.toast.error(`Erro ao criar promoção.`, e)
          callbacks?.error && callbacks.error()
        }
      })
  }

  public edit(
    promotion: PromotionsTinyResponse,
    callbacks?: {success?: Function, error?: Function}
  ):void {
    this.promotionsService
      .edit(promotion)
      .pipe(take(1))
      .subscribe({
        next: (resp: PromotionsTinyResponse) => {
          this.state.add(resp)
          this.toast.success(`${resp.nome} editado com sucesso.`)
          callbacks?.success && callbacks.success()
        },
        error: (e) => {
          this.toast.error(`Erro ao editar promoção.`, e)
          callbacks?.error && callbacks.error()
        }
      })
  }

  public remove(
    id: string,
    callbacks?: {success?: Function, error?: Function}
  ): void {
    this.prompt.showDialog({
      header: 'Remover promoção',
      message: 'Deseha remover o promoção?',
      accept: () => this.removePromotionAccept(id, callbacks)
    })
  }

  private removePromotionAccept(
    id: string,
    callbacks?: {success?: Function, error?: Function}
  ) {
    this.promotionsService
      .remove(id)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.state.remove(id)
          this.toast.success('Promoção removido com sucesso')
          callbacks?.success && callbacks.success()
        },
        error: (e: HttpErrorResponse) => {
          this.toast.error('Erro ao remover promoção', e)
          callbacks?.error && callbacks.error()
        },
      })
  }

  public getAllPromotions(): void {
    this.promotionsService
      .getAll()
      .pipe(take(1))
      .subscribe({
        next: (d: PromotionsTinyResponse[]) => this.state.allPromotions = d?.length ? d : [],
        error: (e: HttpErrorResponse) => this.toast.error('Erro ao listar promoções', e),
      }
    )
  }
}
