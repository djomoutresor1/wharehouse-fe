import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { AlertType } from 'src/app/shared/enums/alert-type-enums';
import { Pages } from 'src/app/shared/enums/pages-enums';
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
  isAuth: boolean = false;
  alertType: string = '';
  messageAlert: string = '';
  okText: string = '';
  descriptionAlert: string = '';
  isExpiredToken: boolean = false;

  constructor(
    private router: Router,
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
        if (error.status === 403) {
          // Expiration token
          this.alertType = AlertType.ALERT_WARNING;
          this.okText = this.translate.instant("message.timeout.cta");
          this.messageAlert = this.translate.instant("message.timeout.title");
          this.descriptionAlert = this.translate.instant("message.timeout.description");
          this.isExpiredToken = true;
        } else {
          this.errorAlertType(error?.error.message);
        }
      }
    );
  }

  errorAlertType(message: string): void {
    this.isAuth = true;
    this.alertType = AlertType.ALERT_ERROR;
    this.messageAlert = message;
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

  handleOnOkModal(event: string) {
    this.warehouseLocalStorage.WarehouseRemoveTokenLocalStorage();
    window.location.reload();
    this.router.navigate([`${Pages.WAREHOUSE}/${Pages.LOGIN}`]);
  }
}
