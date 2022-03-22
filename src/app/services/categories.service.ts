import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategorieModel } from 'src/model/categories/categorie-model';
import { CategoriesModel } from 'src/model/categories/categories-model';




@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  data: CategorieModel[] = [];

  constructor(private http: HttpClient) {}

  public getDataGlobalTable() {
    return this.http.get<CategoriesModel>('../assets/mocks/categoriesMock.json');
  }

  ngOnInit(): void {
  }
}
