import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { Subject, takeUntil } from 'rxjs';

import { HotdogsService } from '../../../../services/hotdogs/hotdogs.service';
import { HotDogsTinyResponse } from '../../../../models/interfaces/hotdogs/hot-dogs-tiny-response';
import CrudTableEventListener from '../../../../shared/models/interfaces/CrudTableEventListener';
import { TableCrudEvent } from '../../../../models/interfaces/event/table-crud-event';
import { HotDogsFacade } from '../../../../facades/hotdogs/hotdogs.facade';

@Component({
  selector: 'app-hot-dogs-home',
  templateUrl: './hot-dogs-home.component.html',
  styleUrl: './hot-dogs-home.component.scss',
})
export class HotDogsHomeComponent extends CrudTableEventListener implements OnInit, OnDestroy {
  private router: Router = inject(Router)
  private readonly destroy$: Subject<void> = new Subject()

  private hotdogsService: HotdogsService = inject(HotdogsService)
  private facade: HotDogsFacade = inject(HotDogsFacade)

  allHotDogs: Array<HotDogsTinyResponse> = []

  ngOnInit(): void {
    this.getAllHotDogs()
  }

  override create(event?: TableCrudEvent): void {
    this.router.navigate(['/hotdogs/register'])
  }
  override read(event?: TableCrudEvent): void {
    console.log('READ')
  }
  override update(event: TableCrudEvent): void {
    this.router.navigate(['/hotdogs/register/', event.id])
  }
  override delete(event: TableCrudEvent): void {
    const success = () => this.remove(event.id!)
    this.facade.remove(event.id!, { success })
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
  }

  private handleErrorGetAllHotDogs(error: HttpErrorResponse) {
    console.log(error)
  }

  private remove(id: string): void {
    const [...current] = this.allHotDogs
    const index = current.findIndex(i => i.id === id)
    current.splice(index, 1)
    this.allHotDogs = current
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
