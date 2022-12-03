import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseOrganizationModel } from 'src/model/organization/response/response-organization-model';
import { Pages } from '../shared/enums/pages-enums';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getAllOrganizations(): Observable<ResponseOrganizationModel[]> {
    return this.http.get<ResponseOrganizationModel[]>(
      `${this.apiServerUrl}/${Pages.ORGANIZATIONS}`
    );
  }
}
