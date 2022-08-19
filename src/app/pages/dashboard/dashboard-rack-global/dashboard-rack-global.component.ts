import { Component, Injector, OnInit } from '@angular/core';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { PathParams } from 'src/app/shared/enums/path-params-enums';
import { CategorieModel } from 'src/model/categories/categorie-model';
import { RowCategoriesModel } from 'src/model/categories/rowCategories-model';
import { faAppleWhole, faBowlFood, faBroom, faCarBattery, faCat, faChildDress, faGamepad, faGift, faHouse, faPerson,faPlateWheat, faPumpSoap, faShirt, faShoePrints, faWineGlass } from '@fortawesome/free-solid-svg-icons';
import {faEnvira, faWindows } from '@fortawesome/free-brands-svg-icons';
import { WarehouseBaseComponent } from 'src/app/base/warehouse-base/warehouse-base.component';

@Component({
  selector: 'warehouse-dashboard-rack-global',
  templateUrl: './dashboard-rack-global.component.html',
  styleUrls: ['./dashboard-rack-global.component.scss']
})
export class DashboardRackGlobalComponent extends WarehouseBaseComponent implements OnInit {

  rackName: any;
  resultCategories: any;
  rackTable:any;
  categories: any;
  resultCategorie = ['1','2','3','4'];
  categorieFinale:any;
  faBroom:any;
  b:any;

  constructor(injector: Injector) {
    super(injector);
    this.rackName = this.route.snapshot.paramMap.get(PathParams.RACK_NAME);
  }

  override ngOnInit(): void {
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

iconValues (type: string) {
  return  {
    'FOOD': faBowlFood,
    'UTENSILERIA': faPlateWheat,
    'DETERGENTE': faPumpSoap,
    'FIORI': faEnvira,
    'SCARPE UOMO': faShoePrints,
    'TEXTILE': faShirt,
    'VESTITO': faShirt,
    'GIARDINAGGIO': faBroom,
    'BAZAR': faGift,
    'ANIMALERIA': faCat,
    'GIOCATOLI': faGamepad,
    'FERAMENTA': faWindows,
    'VINO': faWineGlass,
    'INTIMO UOMO': faPerson,
    'SUCCO DI FRUTTA': faAppleWhole,
    'ELETTRONICA': faCarBattery,
    'INTIMO DONNA': faChildDress,
    'CASA': faHouse,
  }[type];
}

}
