import { CrudOperations } from "../../../../core/CRUD_OPERATION";

export interface TableCrudEvent {
  action: CrudOperations
  id?: string
}
