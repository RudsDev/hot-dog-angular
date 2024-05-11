import { Injectable } from '@angular/core';
import { GenericService } from '../generic.services';

import { Observable } from 'rxjs';
import { PromotionsTinyResponse } from '../../models/interfaces/promotions/promotions-tiny-response';
import { PromotionsResponse } from '../../models/interfaces/promotions/promotions-response';

@Injectable({
  providedIn: 'root'
})
export class PromotionsService extends GenericService {
  private readonly SUFIX = 'promocoes';

  constructor() {
    super();
  }

  remove(id: string): Observable<void> {
    throw new Error("Method not implemented.");
  }
  edit(promotion: PromotionsTinyResponse): Observable<PromotionsTinyResponse> {
    throw new Error("Method not implemented.");
  }
  create(promotion: PromotionsTinyResponse): Observable<PromotionsTinyResponse> {
    throw new Error("Method not implemented.");
  }

  public getById(id:string): Observable<PromotionsResponse> {
    return this.http.get<PromotionsResponse>(
      `${this.API_URL}/${this.VERSIONS.V1}/${this.SUFIX}/${id}`,
      this.httpOptions
    );
  }

  public getAll(): Observable<Array<PromotionsTinyResponse>> {
    return this.http.get<Array<PromotionsTinyResponse>>(
      `${this.API_URL}/${this.VERSIONS.V1}/${this.SUFIX}`,
      this.httpOptions
    );
  }
}
