import { HttpErrorResponse } from '@angular/common/http';
import { Component, Injector, OnInit } from '@angular/core';
import { WarehouseBaseComponent } from 'src/app/base/warehouse-base/warehouse-base.component';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { LaneModel } from 'src/model/corsia/lane-model';
import { BreadcrumbItemsModel } from 'src/model/utils/breadcrumb-items-model';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss'],
})
export class DashboardHomeComponent
  extends WarehouseBaseComponent
  implements OnInit
{
  lanes: LaneModel[] = [];
  lastLane: any;
  name = '';
  language: string = 'en';
  breadcrumbItems!: BreadcrumbItemsModel;
  userLocalStorage: any;
  isEmailPec: boolean = false;

  constructor(injector: Injector) {
    super(injector);
  }

  override ngOnInit(): void {
    this.userLocalStorage =
      this.warehouseLocalStorage?.WarehouseGetTokenLocalStorage();
    this.isEmailPec =
      this.userLocalStorage?.emailPec === null ||
      this.userLocalStorage?.emailPec === ''
        ? true
        : false;
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
          this.expirationToken();
        } else {
          this.errorAlertType(error?.error.message);
        }
      }
    );
  }

  initComponent() {
    let currentLang = null;
    currentLang = this.translate.currentLang;
    if (currentLang === undefined) {
      currentLang =
        this.warehouseLocalStorage.WarehouseGetLanguageLocalStorage();
    }
    this.translate.use(currentLang as string);
    this.breadcrumbItems = {
      parent: {
        title: this.translate.instant('dashboard.home'),
      },
    };
  }

  handleOnOkModal(event: string) {
    this.warehouseLocalStorage.WarehouseRemoveTokenLocalStorage();
    window.location.reload();
    this.router.navigate([`${Pages.WAREHOUSE}/${Pages.LOGIN}`]);
  }

  handleOnRecoveryEmail() {
    this.router.navigate(
      [`${Pages.WAREHOUSE}/${Pages.DASHBOARD}/${Pages.MANAGE_ACCOUNT}`],
      { queryParams: { tabNumber: 1 } }
    );
  }
}
