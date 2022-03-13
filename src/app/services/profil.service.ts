import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {



  constructor() { }

   getDataProfil(){
    const person= (localStorage?.getItem('formData') || 'null');
    return JSON.parse(person);

   }

}
