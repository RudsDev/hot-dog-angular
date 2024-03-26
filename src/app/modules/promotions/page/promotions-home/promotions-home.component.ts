import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Subject, takeUntil } from 'rxjs';

import { PromotionsService } from '../../../../services/promotions/promotions.service';
import { PromotionsTinyResponse } from '../../../../models/interfaces/promotions/promotions-tiny-response';

@Component({
  selector: 'app-promotions-home',
  templateUrl: './promotions-home.component.html',
  styleUrl: './promotions-home.component.scss'
})
export class PromotionsHomeComponent implements OnInit, OnDestroy {

  private readonly destroy$: Subject<void> = new Subject()
  private promotionService: PromotionsService = inject(PromotionsService)

  allPromotions: Array<PromotionsTinyResponse> = []

  ngOnInit(): void {
    this.getAllPromotions()
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
    console.log(this.allPromotions)
  }

  private handleErrorGetAllPromotions(error: HttpErrorResponse) {
    console.log(error)
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
