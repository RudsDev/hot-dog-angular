import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IngredientsTinyResponse } from '../../models/interfaces/ingredients/ingredients-tiny-response';
import { environment } from '../../../environments/environment';
import { ApiVersions } from '../../../core/API_VERSIONS';

@Injectable({
  providedIn: 'root',
})
export class IngredientsService {
  private readonly API_URL = environment.API_URL;
  private readonly SUFIX = 'ingredientes';

  private http: HttpClient = inject(HttpClient);

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${this.JWT_TOKEN}`,
    }),
  };

  public getAll(): Observable<Array<IngredientsTinyResponse>> {
    return this.http.get<Array<IngredientsTinyResponse>>(
      `${this.API_URL}/${ApiVersions.V1}/${this.SUFIX}`,
      this.httpOptions
    );
  }

  constructor() {}
}