import { Component, Input } from '@angular/core';
import { HotDogsTinyResponse } from '../../../../models/interfaces/hotdogs/hot-dogs-tiny-response';
import { UtilsCrudTableEventEmiiter } from '../../../../shared/models/interfaces/CrudTableEventEmiiter';

@Component({
  selector: 'app-hotdogs-table',
  templateUrl: './hotdogs-table.component.html',
  styleUrl: './hotdogs-table.component.scss'
})
export class HotdogsTableComponent extends UtilsCrudTableEventEmiiter {
  @Input() allHotDogs: Array<HotDogsTinyResponse> = []
}
