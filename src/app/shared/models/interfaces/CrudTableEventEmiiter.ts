import { Output, EventEmitter, Component } from '@angular/core';
import { TableCrudEvent } from '../../../models/interfaces/event/table-crud-event';
import { CrudOperations } from '../../../../core/CRUD_OPERATION';

@Component({
  template: '',
})
export abstract class UtilsCrudTableEventEmiiter {
  action = { ...CrudOperations };

  @Output() tableCrudEvent = new EventEmitter<TableCrudEvent>();

  handleCrudTableEventEmit(event: { action: CrudOperations; id?: string }) {
    this.tableCrudEvent.emit(event);
  }
}
