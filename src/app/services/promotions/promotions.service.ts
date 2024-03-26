import { Injectable } from '@angular/core';
import { GenericService } from '../generic.services';

import { Observable } from 'rxjs';
import { PromotionsTinyResponse } from '../../models/interfaces/promotions/promotions-tiny-response';

@Injectable({
  providedIn: 'root'
})
export class PromotionsService extends GenericService {
  private readonly SUFIX = 'promocoes';

  constructor() {
    super();
  }

  public getAll(): Observable<Array<PromotionsTinyResponse>> {
    return this.http.get<Array<PromotionsTinyResponse>>(
      `${this.API_URL}/${this.VERSIONS.V1}/${this.SUFIX}`,
      this.httpOptions
    );
  }
}
