import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { CategoriesTypes } from 'src/app/shared/enums/categories-types-enums';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { PathParams } from 'src/app/shared/enums/path-params-enums';
import { CategorieModel } from 'src/model/categories/categorie-model';
import { RowCategoriesModel } from 'src/model/categories/rowCategories-model';

@Component({
  selector: 'app-dashboard-rack-global',
  templateUrl: './dashboard-rack-global.component.html',
  styleUrls: ['./dashboard-rack-global.component.scss']
})
export class DashboardRackGlobalComponent implements OnInit {

  rackName: any;
  resultCategories: any;
  rackTable:any;
  categories: any;
  resultCategorie = ['1','2','3','4'];
  categorieFinale:any;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoriesService:CategoriesService
  ) {
    this.rackName = this.route.snapshot.paramMap.get(PathParams.RACK_NAME);
  }

  ngOnInit(): void {
    this.categoriesService.getDataGlobalTable().subscribe((response) => {
      console.log('globalTableResponse: ', response.categories);
      response.categories.map((categories: CategorieModel) => {
        if (categories.name === this.rackName.toLocaleUpperCase()) {
          this.resultCategories = categories.rows.filter(
            (row) => row.shelf.toString());
          console.log('resultCategories: ', this.resultCategories);
          this.categories = this.resultCategories.map((element:RowCategoriesModel) => {
            console.log("element finale: ",element.shelf[0].tipologie)
            this.categorieFinale = element.shelf[0].tipologie
          });
        }

      })

  })}

  handleOnNavigate(url: String) {
   this.router.navigate([`${Pages.WAREHOUSE}/${url}`]);
  }



iconValues(type:any)  {
  debugger
  let enumKey = CategoriesTypes[type];
    return enumKey;
}

}
