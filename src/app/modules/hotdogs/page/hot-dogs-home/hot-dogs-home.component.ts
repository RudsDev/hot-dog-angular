import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Subject, takeUntil } from 'rxjs';

import { HotdogsService } from '../../../../services/hotdogs/hotdogs.service';
import { HotDogsTinyResponse } from '../../../../models/interfaces/hotdogs/hot-dogs-tiny-response';

@Component({
  selector: 'app-hot-dogs-home',
  templateUrl: './hot-dogs-home.component.html',
  styleUrl: './hot-dogs-home.component.scss',
})
export class HotDogsHomeComponent implements OnInit, OnDestroy {

  private readonly destroy$: Subject<void> = new Subject()

  private hotdogsService: HotdogsService = inject(HotdogsService)

  allHotDogs: Array<HotDogsTinyResponse> = []

  ngOnInit(): void {
    this.getAllHotDogs()
  }

  private getAllHotDogs(): void {
    this.hotdogsService
      .getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe(this.getAllHotDogsObservableHandler)
  }

  private getAllHotDogsObservableHandler = {
    next: (resp: HotDogsTinyResponse[]) => this.handleSuccessGetAllHotDogs(resp),
    error: (error: HttpErrorResponse) => this.handleErrorGetAllHotDogs(error),
  }

  private handleSuccessGetAllHotDogs(resp: HotDogsTinyResponse[]) {
    if(resp?.length) {
      this.allHotDogs = resp
    }
    console.log(this.allHotDogs)
  }

  private handleErrorGetAllHotDogs(error: HttpErrorResponse) {
    console.log(error)
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
