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

  public create(payload: IngredientsTinyResponse): Observable<IngredientsTinyResponse> {
    return this.http.post<IngredientsTinyResponse>(
      `${this.API_URL}/${ApiVersions.V1}/${this.SUFIX}`,
      payload,
      this.httpOptions
    );
  }

  public edit(payload: IngredientsTinyResponse): Observable<IngredientsTinyResponse> {
    return this.http.put<IngredientsTinyResponse>(
      `${this.API_URL}/${ApiVersions.V1}/${this.SUFIX}/${payload.id}`,
      payload,
      this.httpOptions
    );
  }

  public remove(id: string): Observable<void> {
    return this.http.delete<void>(
      `${this.API_URL}/${ApiVersions.V1}/${this.SUFIX}/${id}`,
      this.httpOptions
    );
  }

  constructor() {}
}
