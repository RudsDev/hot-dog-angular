import { TableCrudEvent } from '../../../models/interfaces/event/table-crud-event';
import { CrudOperations } from '../../../../core/CRUD_OPERATION';

export default abstract class CrudTableEventListener {

  public handleCrudTableEventListener(event: TableCrudEvent): void {
    switch (event.action) {
      case CrudOperations.CREATE:
        this.create()
      break;
      case CrudOperations.READ:
        this.read()
      break;
      case CrudOperations.UPDATE:
        this.update(event)
      break;
      case CrudOperations.DELETE:
        this.delete(event)
      break;

      default:
        break;
    }
  }

  abstract create(event?: TableCrudEvent): void

  abstract read(event?: TableCrudEvent): void

  abstract update(event: TableCrudEvent): void

  abstract delete(event: TableCrudEvent): void
}
