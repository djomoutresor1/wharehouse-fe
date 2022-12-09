import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HelpModel } from 'src/model/configuration/request/help-model';
import { Pages } from '../shared/enums/pages-enums';
import { ResponseHelpModel } from 'src/model/configuration/response/response-help-model';
import { ResponseModel } from 'src/model/auth/response/response-model';
import { ResponseGlossaryModel } from 'src/model/configuration/response/response-glossary-model';
import { GlossaryModel } from 'src/model/configuration/request/glossary-model';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  // START --> Help Service
  public getAllHelps(): Observable<ResponseHelpModel[]> {
    return this.http.get<ResponseHelpModel[]>(
      `${this.apiServerUrl}/${Pages.HELPS}`
    );
  }

  public onCreateHelp(request: HelpModel): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(
      `${this.apiServerUrl}/${Pages.CREATE}/${Pages.HELP}`,
      request
    );
  }

  public onUpdateHelp(request: HelpModel): Observable<ResponseModel> {
    return this.http.put<ResponseModel>(
      `${this.apiServerUrl}/${Pages.UPDATE}/${Pages.HELP}/${request.title}`,
      request
    );
  }

  public onChangeStatusHelp(
    userId: string,
    title: string,
    status: string
  ): Observable<ResponseModel> {
    return this.http.put<ResponseModel>(
      `${this.apiServerUrl}/${Pages.CHANGE_STATUS}/${Pages.HELP}/${userId}`,
      {},
      {
        params: {
          title,
          status,
        },
      }
    );
  }

  public onDeleteHelp(title: string): Observable<ResponseModel> {
    return this.http.delete<ResponseModel>(
      `${this.apiServerUrl}/${Pages.DELETE}/${Pages.HELP}/${title}`
    );
  }

  // START --> Glossary Service
  public getAllGlossaries(): Observable<ResponseGlossaryModel[]> {
    return this.http.get<ResponseGlossaryModel[]>(
      `${this.apiServerUrl}/${Pages.DASHBOARD}/${Pages.GLOSSARIES}`
    );
  }

  public getGlossariesByObjectAndLanguage(
    object: string,
    language: string
  ): Observable<ResponseGlossaryModel[]> {
    return this.http.get<ResponseGlossaryModel[]>(
      `${this.apiServerUrl}/${Pages.GLOSSARIES}`,
      {
        params: {
          object,
          language,
        },
      }
    );
  }

  public onCreateGlossary(
    glossary: GlossaryModel[]
  ): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(
      `${this.apiServerUrl}/${Pages.CREATE}/${Pages.GLOSSARY}`,
      glossary
    );
  }

  public onUpdateGlossary(
    glossary: GlossaryModel,
    code: string,
    language: string
  ): Observable<ResponseModel> {
    return this.http.put<ResponseModel>(
      `${this.apiServerUrl}/${Pages.UPDATE}/${Pages.GLOSSARY}`,
      glossary,
      {
        params: {
          code,
          language,
        },
      }
    );
  }

  public onDeleteGlossary(code: string): Observable<ResponseModel> {
    return this.http.delete<ResponseModel>(
      `${this.apiServerUrl}/${Pages.DELETE}/${Pages.GLOSSARY}`,
      {
        params: {
          code,
        },
      }
    );
  }
}
