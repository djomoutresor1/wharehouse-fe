import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Injector } from '@angular/core';
import { WarehouseBaseComponent } from 'src/app/base/warehouse-base/warehouse-base.component';
import { ResponseOrganizationDataModel } from 'src/model/organization/response/response-organization-data-model';
import { ResponseOrganizationModel } from 'src/model/organization/response/response-organization-model';
import { BreadcrumbItemsModel } from 'src/model/utils/breadcrumb-items-model';
import { HeaderTableModel } from 'src/model/utils/header-table-model';

@Component({
  selector: 'warehouse-dashboard-organization',
  templateUrl: './dashboard-organization.component.html',
  styleUrls: ['./dashboard-organization.component.scss'],
})
export class DashboardOrganizationComponent
  extends WarehouseBaseComponent
  implements OnInit
{
  warehouseOrganizations: ResponseOrganizationModel[] = [];
  breadcrumbItems!: BreadcrumbItemsModel;

  organizationsHeaderTable: HeaderTableModel[] = [];
  organizationDatatable!: ResponseOrganizationModel;

  titleDrawer: string = '';
  sizeDrawer: number = 1000;
  visibleDrawerShow: boolean = false;

  constructor(injector: Injector) {
    super(injector);
  }

  override ngOnInit(): void {
    this.initComponent();
    this.getAllWarehouseOrganizations();
  }

  initComponent() {
    this.user = this.warehouseLocalStorage.WarehouseGetTokenLocalStorage();
    let currentLang = null;
    currentLang = this.translate.currentLang;
    if (currentLang === undefined) {
      currentLang =
        this.warehouseLocalStorage.WarehouseGetLanguageLocalStorage();
    }
    this.translate.use(currentLang as string);
    this.breadcrumbItems = {
      parent: {
        title: this.translate.instant('side.nav.left.organization.title'),
      },
    };
    this.organizationsHeaderTable = [
      {
        title: this.translate.instant('header.table.organization.id'),
        show: true,
      },
      {
        title: this.translate.instant('header.table.organization.name'),
        show: true,
      },
      {
        title: this.translate.instant('header.table.organization.referent'),
        show: true,
      },
      {
        title: this.translate.instant('header.table.organization.package'),
        show: true,
      },
      {
        title: this.translate.instant('header.table.organization.trial'),
        show: true,
      },
      {
        title: this.translate.instant(
          'header.table.organization.collaborators'
        ),
        show: true,
      },
      {
        title: this.translate.instant('side.nav.left.help.datagrid.createdAt'),
        show: true,
      },
    ];
  }

  getAllWarehouseOrganizations() {
    this.organizationService.getAllOrganizations().subscribe(
      (response: ResponseOrganizationModel[]) => {
        this.warehouseOrganizations = response;
        console.log('organizations: ', this.warehouseOrganizations);
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

  handleOnStatus(organization: ResponseOrganizationModel) {}

  handleOnShow(organization: ResponseOrganizationModel) {
    this.visibleDrawerShow = true;
    this.titleDrawer = organization.organization.organizationName;
    this.organizationDatatable = organization;
  }

  handleOnEdit(organization: ResponseOrganizationDataModel) {}

  handleOnDelete(organization: ResponseOrganizationDataModel) {}

  handleOnCloseDrawer() {
    this.visibleDrawerShow = false;
  }

  handleOnResetFilter() {
    this.getAllWarehouseOrganizations();
  }

  handleOnOrganizationsFiltered(organizations: ResponseOrganizationModel[]) {
    this.warehouseOrganizations = organizations;
  }

  handleOnHeadersTable(headers: HeaderTableModel[]) {
    this.organizationsHeaderTable = headers;
  }
}
