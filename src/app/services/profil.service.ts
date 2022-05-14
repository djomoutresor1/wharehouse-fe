import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Persons } from 'src/interfaces/profils';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }


    public retrieveUser():Observable<Persons>{
      return this.http.get<Persons>(`${this.apiServerUrl}/users`)
    }


}
