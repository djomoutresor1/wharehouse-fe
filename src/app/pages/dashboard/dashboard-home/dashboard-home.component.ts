import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { WarehouseLocalStorage } from 'src/app/utils/warehouse-local-storage';
import { LaneModel } from 'src/model/corsia/lane-model';
import { BreadcrumbItemsModel } from 'src/model/utils/breadcrumb-items-model';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss'],
})
export class DashboardHomeComponent implements OnInit {
  lanes: LaneModel[] = [];
  lastLane: any;
  name = '';
  language: string = 'en';
  breadcrumbItems!: BreadcrumbItemsModel;

  constructor(
    private translate: TranslateService,
    private dashboardService: DashboardService,
    private warehouseLocalStorage: WarehouseLocalStorage
  ) {
  }

  ngOnInit(): void {
    this.initComponent();
    this.dashboardService.getDashboard().subscribe(
      (response) => {
        this.lanes = response.lanes.slice(0, 14);
        this.lastLane = response.lanes.slice(-1)[0];
      },
      (error: HttpErrorResponse) => {
        console.log('error: ', error);
      }
    );
  }

  initComponent() {
    let currentLang = null;
    currentLang = this.translate.currentLang;
    if(currentLang === undefined) {
      currentLang = this.warehouseLocalStorage.WarehouseGetLanguageLocalStorage()
    }
    this.translate.use(currentLang as string);
    this.breadcrumbItems = {
      parent: {
        title: this.translate.instant("dashboard.home")
      }
    }
  }
}
