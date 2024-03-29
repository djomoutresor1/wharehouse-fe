import { Component, Injector, OnInit } from '@angular/core';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { PathParams } from 'src/app/shared/enums/path-params-enums';
import { LaneModel } from 'src/model/corsia/lane-model';
import { RowModel } from 'src/model/corsia/row-model';
import { PositionModel } from 'src/model/corsia/position-model';
import { RackModel } from 'src/model/rack/rack-model';
import { CategorieModel } from 'src/model/categories/categorie-model';
import { RowCategoriesModel } from 'src/model/categories/rowCategories-model';
import { WarehouseBaseComponent } from 'src/app/base/warehouse-base/warehouse-base.component';

@Component({
  selector: 'warehouse-dashboard-rack-detail',
  templateUrl: './dashboard-rack-detail.component.html',
  styleUrls: ['./dashboard-rack-detail.component.scss'],
})
export class DashboardRackDetailComponent extends WarehouseBaseComponent implements OnInit {
  rackName: any;
  rackNumber: any;
  racks: RackModel[] = [];
  typeProduct:String=" ";
  rackDetailOne: RackModel = {};
  rackDetailTwo: RackModel = {};
  rackDetailThree: RackModel = {};
  resultRackName: RowModel[] = [];
  shelves: any;
  categories: any;
  resultCategorie = ['1','2','3','4'];
  resultCategories: any;
  categorieFinale:any;
  message:string ='by clicking wou will go to Lane(corsia)  ';
  info: String='info';
  messageType: any;
  description:any;

  constructor(injector: Injector) {
    super(injector);
    this.rackName = this.route.snapshot.paramMap.get(PathParams.RACK_NAME);
    this.rackNumber = this.route.snapshot.paramMap.get(PathParams.RACK_NUMBER);
  }

  override ngOnInit(): void {
    this.categoriesService.getDataGlobalTable().subscribe((response) => {
      console.log('categoriesclothers: ', response.categories);
      response.categories.map((categories: CategorieModel) => {
        if (categories.name === this.rackName.toLocaleUpperCase()) {
          this.resultCategories = categories.rows.filter(
            (row) => row.shelf.toString());
          console.log('resultCategoriesclothers: ', this.resultCategories);
          this.categories = this.resultCategories.map((element:RowCategoriesModel) => {
            console.log("element finale clothers: ",element.shelf[0].tipologie)
            if(this.rackNumber=== this.categories.row){
              this.categorieFinale = element.shelf[0].tipologie
            }
          });
        }

      })

    })

    this.tableService.getDataTable().subscribe((response) => {
      console.log('response2: ', response.lanes);
      response.lanes.map((lane: LaneModel) => {
        if (lane.name === this.rackName.toLocaleUpperCase()) {
          this.resultRackName = lane.rows.filter(
            (shelf) => shelf.row.toString() === this.rackNumber
          );
        }
      });
      console.log("resultRackName: ",this.resultRackName);

      this.shelves = this.resultRackName[0]?.shelves;
      let position0 = this.shelves[0]?.positions;
      let position1 = this.shelves[1]?.positions;
      let position2 = this.shelves[2]?.positions;
      let position3 = this.shelves[3]?.positions;

      console.log('position0: ', position0);
      console.log('position1: ', position1);
      console.log('position2: ', position2);
      console.log('position3: ', position3);

      position0.map((position: PositionModel, index: any) => {
        this.rackSegmentation(position, index);
      });

      position1.map((position: PositionModel, index: any) => {
        this.rackSegmentation(position, index);
      });

      position2.map((position: PositionModel, index: any) => {
        this.rackSegmentation(position, index);
      });

      position3.map((position: PositionModel, index: any) => {
        this.rackSegmentation(position, index);
      });
    });
    
  }

  rackSegmentation(position: PositionModel, index: any) {
    this.rackDetailOne, this.rackDetailTwo, (this.rackDetailThree = {});
    if (index + 1 == 1) {
      this.rackDetailOne = {
        rackOne: position.dimensions.length,
        rackTwo: position.dimensions.width,
        rackThree: position.dimensions.depth,
      };
    }
    if (index + 1 == 2) {
      this.rackDetailTwo = {
        rackFour: position.dimensions.length,
        rackFive: position.dimensions.width,
        rackSix: position.dimensions.depth,
      };
    }
    if (index + 1 == 3) {
      this.rackDetailThree = {
        rackSeven: position.dimensions.length,
        rackEight: position.dimensions.width,
        rackNine: position.dimensions.depth,
      };
    }
    if (
      !!Object.values(this.rackDetailOne).length &&
      !!Object.values(this.rackDetailTwo).length &&
      !!Object.values(this.rackDetailThree).length
    ) {
      this.racks.push(
        Object.assign(
          this.rackDetailOne,
          this.rackDetailTwo,
          this.rackDetailThree
        )
      );
    }
  }

  handleOnNavigate(url: String) {
    this.router.navigate([`${Pages.WAREHOUSE}/${url}`]);
  }


  handleOnRack(url: String) {
    this.router.navigate([`${Pages.WAREHOUSE}/${Pages.DASHBOARD}/${Pages.GLOBAL_RACK}/${url.toLocaleUpperCase()}`]);
  }

}
