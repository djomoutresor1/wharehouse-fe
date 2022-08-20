import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../shared/enums/auth-enums';


@Injectable({
  providedIn: 'root'
})
export class ViewService {
  private apiServerUrl = environment.apiBaseUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/octet-stream',
      "Access-Control-Allow-Origin": "*",
      
    } )
  };

  constructor(private http: HttpClient) {}

  public getPdfViewer(): Observable<any> {
    return this.http.get<any[]>(
      `${this.apiServerUrl}/${Auth.WAREHOUSE_VIEW_PDF}`
    );
  }

  public getExportUsers(): Observable<any> {
    return this.http.get<any[]>(
      `${this.apiServerUrl}/${Auth.WAREHOUSE_VIEW_EXPORT_FILE}`,this.httpOptions
    );
  }
}

