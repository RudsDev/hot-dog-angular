import { Component, Input } from '@angular/core';
import { HotDogsTinyResponse } from '../../../../models/interfaces/hotdogs/hot-dogs-tiny-response';

@Component({
  selector: 'app-hotdogs-table',
  templateUrl: './hotdogs-table.component.html',
  styleUrl: './hotdogs-table.component.scss'
})
export class HotdogsTableComponent {
  @Input() allHotDogs: Array<HotDogsTinyResponse> = []

  handleHotDogEvent() {
    alert('HotDog event')
  }
}
