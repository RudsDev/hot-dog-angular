import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { Subject, takeUntil } from 'rxjs';

import { HotDogsFacade } from '../../../../facades/hotdogs/hotdogs.facade';
import { PromotionsService } from '../../../../services/promotions/promotions.service';
import { PromotionsTinyResponse } from '../../../../models/interfaces/promotions/promotions-tiny-response';
import CrudTableEventListener from '../../../../shared/models/interfaces/CrudTableEventListener';
import { TableCrudEvent } from '../../../../models/interfaces/event/table-crud-event';

@Component({
  selector: 'app-promotions-home',
  templateUrl: './promotions-home.component.html',
  styleUrl: './promotions-home.component.scss'
})
export class PromotionsHomeComponent extends CrudTableEventListener implements OnInit, OnDestroy {
  private router: Router = inject(Router)
  private readonly destroy$: Subject<void> = new Subject()
  private promotionService: PromotionsService = inject(PromotionsService)
  private facade: HotDogsFacade = inject(HotDogsFacade)

  allPromotions: Array<PromotionsTinyResponse> = []

  ngOnInit(): void {
    this.getAllPromotions()
  }

  override create(event?: TableCrudEvent): void {
    this.router.navigate(['/promotions/register'])
    console.log(event)
  }
  override read(event?: TableCrudEvent): void {
    console.log(event)
  }
  override update(event: TableCrudEvent): void {
    this.router.navigate(['/promotions/register/', event.id])
    console.log(event)
  }
  override delete(event: TableCrudEvent): void {
    // const success = () => this.remove(event.id!)
    // this.facade.remove(event.id!, { success })
    console.log(event)
  }

  private getAllPromotions(): void {
    this.promotionService
      .getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe(this.getAllPromotionsObservableHandler)
  }

  private getAllPromotionsObservableHandler = {
    next: (resp: PromotionsTinyResponse[]) => this.handleSuccessGetAllPromotions(resp),
    error: (error: HttpErrorResponse) => this.handleErrorGetAllPromotions(error),
  }

  private handleSuccessGetAllPromotions(resp: PromotionsTinyResponse[]) {
    if(resp?.length) {
      this.allPromotions = resp
    }
  }

  private handleErrorGetAllPromotions(error: HttpErrorResponse) {
    console.log(error)
  }

  private remove(id: string): void {
    const [...current] = this.allPromotions
    const index = current.findIndex(i => i.id === id)
    current.splice(index, 1)
    this.allPromotions = current
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
