import { Injectable } from '@angular/core';
import { GenericService } from '../generic.services';

import { Observable } from 'rxjs';
import { HotDogsTinyResponse } from '../../models/interfaces/hotdogs/hot-dogs-tiny-response';

@Injectable({
  providedIn: 'root'
})
export class HotdogsService extends GenericService {
  private readonly SUFIX = 'lanches';

  constructor() {
    super();
  }

  public getAll(): Observable<Array<HotDogsTinyResponse>> {
    return this.http.get<Array<HotDogsTinyResponse>>(
      `${this.API_URL}/${this.VERSIONS.V1}/${this.SUFIX}`,
      this.httpOptions
    );
  }
}
