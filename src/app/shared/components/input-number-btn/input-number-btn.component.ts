import { Component, EventEmitter, Input, Output } from '@angular/core';

import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-input-number-btn',
  templateUrl: './input-number-btn.component.html',
  styleUrl: './input-number-btn.component.scss',
})
export class InputNumberBtnComponent {
  public readonly plusIcon = faPlus;
  public readonly minusIcon = faMinus;

  @Input() id!: string;
  @Input() min: number = 0;
  @Input() max: number = 1;

  protected value = 0;

  @Output() valueChangeEvent = new EventEmitter<{
    id: string;
    value: number;
  }>();

  public decrement() {
    if (this.value > this.min)
      this.valueChangeEvent.emit({ id: this.id, value: --this.value });
  }

  public increment() {
    if (this.value < this.max)
    this.valueChangeEvent.emit({ id: this.id, value: ++this.value });
  }
}
