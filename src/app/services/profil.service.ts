import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Person, Persons } from 'src/interfaces/profils';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

   getDataProfil(){
    const person= (localStorage?.getItem('formData') || 'null');
    return JSON.parse(person);

   }

 /*   public register(person:Persons):Observable<Persons>{
      return this.http.post<Persons>(`${this.apiServerUrl}/v1/warehouse/register`, person)
    }*/

   getAuthToken():string {
    return localStorage.getItem('token') || 'null'
    }

}
