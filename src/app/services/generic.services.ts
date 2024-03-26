import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject } from "@angular/core";

import { environment } from "../../environments/environment";
import { ApiVersions } from "../../core/API_VERSIONS";

export abstract class GenericService {
  protected readonly API_URL = environment.API_URL;
  protected readonly VERSIONS = ApiVersions
  protected readonly http: HttpClient = inject(HttpClient);

  protected readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${this.JWT_TOKEN}`,
    }),
  };

  constructor() { }
}
