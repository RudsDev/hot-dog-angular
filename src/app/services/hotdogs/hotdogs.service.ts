import { Injectable } from '@angular/core';
import { GenericService } from '../generic.services';

import { Observable } from 'rxjs';
import { HotDogsTinyResponse } from '../../models/interfaces/hotdogs/hot-dogs-tiny-response';
import { HotDogsResponse } from '../../models/interfaces/hotdogs/hot-dogs-response';
import { HotDogsRequest } from '../../models/interfaces/hotdogs/hot-dogs-request';

@Injectable({
  providedIn: 'root'
})
export class HotdogsService extends GenericService {
  private readonly SUFIX = 'lanches';

  constructor() {
    super();
  }

  public getById(id:string): Observable<HotDogsResponse> {
    return this.http.get<HotDogsResponse>(
      `${this.API_URL}/${this.VERSIONS.V1}/${this.SUFIX}/${id}`,
      this.httpOptions
    );
  }

  public create(payload: HotDogsRequest): Observable<HotDogsTinyResponse> {
    return this.http.post<HotDogsTinyResponse>(
      `${this.API_URL}/${this.VERSIONS.V1}/${this.SUFIX}`,
      payload,
      this.httpOptions
    );
  }

  public edit(payload: HotDogsRequest): Observable<HotDogsTinyResponse> {
    return this.http.put<HotDogsTinyResponse>(
      `${this.API_URL}/${this.VERSIONS.V1}/${this.SUFIX}/${payload.id}`,
      payload,
      this.httpOptions
    );
  }

  public getAll(): Observable<Array<HotDogsTinyResponse>> {
    return this.http.get<Array<HotDogsTinyResponse>>(
      `${this.API_URL}/${this.VERSIONS.V1}/${this.SUFIX}`,
      this.httpOptions
    );
  }
}
