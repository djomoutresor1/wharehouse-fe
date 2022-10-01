import { HttpErrorResponse } from '@angular/common/http';
import { ViewService } from 'src/app/services/view-file.service';
import { Component, Injector, OnInit } from '@angular/core';
import { WarehouseBaseComponent } from 'src/app/base/warehouse-base/warehouse-base.component';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { StatusType } from 'src/app/shared/enums/status-type-enums';
import { Utils } from 'src/app/shared/enums/utils-enums';
import { ResponseModel } from 'src/model/auth/response/response-model';
import { ResponseUserDataModel } from 'src/model/auth/response/response-user-data-model';
import { ResponseUserModel } from 'src/model/auth/response/response-user-model';
interface ItemData {
  id: 45;
}

@Component({
  selector: 'warehouse-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss'],
})
export class AllUsersComponent extends WarehouseBaseComponent implements OnInit {
  listOfSelection = [
    {
      text: 'Select All Row',
      onSelect: () => {
        this.onAllChecked(true);
      },
    },
    {
      text: 'Select Odd Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) =>
          this.updateCheckedSet(data.id, index % 2 !== 0)
        );
        this.refreshCheckedStatus();
      },
    },
    {
      text: 'Select Even Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) =>
          this.updateCheckedSet(data.id, index % 2 === 0)
        );
        this.refreshCheckedStatus();
      },
    },
  ];
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly ItemData[] = [];
  setOfCheckedId = new Set<number>();
  allUsers: any;
  warehouseUsers: ResponseUserDataModel[] = [];
  tmpUsers: ResponseUserDataModel[] = [];
  titleDrawer: string = '';
  sizeDrawer: number = 1000;
  visibleDrawerShow: boolean = false;
  visibleDrawerStatus: boolean = false;
  mode: string = Utils.WAREHOUSE_MODE_PROFILE_DATATABLE;
  userDatatable!: ResponseUserModel;
  userStatusSelected: string = '';

  constructor(injector: Injector, private viewService: ViewService) {
    super(injector);
  }

  override ngOnInit(): void {
    this.user = this.warehouseLocalStorage.WarehouseGetTokenLocalStorage();
    this.getAllWarehousUsers();
  }

  getAllWarehousUsers() {
    this.profilService.getAllUsers().subscribe(
      (users: ResponseUserDataModel[]) => {
        this.warehouseUsers = users;
        // Take all users and remove the current user connected
        this.allUsers = users?.filter(
          (user) => user.user.userId !== this.user?.userId
        );
        this.tmpUsers = this.allUsers;
        console.log("this.allUsers: ", this.allUsers);
        
      },
      (error: HttpErrorResponse) => {
        if (error.status === 403) {
          // Expiration token
          this.expirationToken();
        } else {
          console.log('Error Occured during downloading: ', error);
          this.errorAlertType(error?.error.message);
        }
      }
    );
  }

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach((item) =>
      this.updateCheckedSet(item.id, value)
    );
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: readonly ItemData[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every((item) =>
      this.setOfCheckedId.has(item.id)
    );
    this.indeterminate =
      this.listOfCurrentPageData.some((item) =>
        this.setOfCheckedId.has(item.id)
      ) && !this.checked;
  }

  handleOnNavigate(url: String) {
    this.router.navigate([`${Pages.WAREHOUSE}/${url}`]);
  }

  formatUserStatus(status: string): string {
    switch (status) {
      case StatusType.STATUS_ACTIVE:
        return this.translate.instant('dataTable.status.active');
      case StatusType.STATUS_DISABLED:
        return this.translate.instant('dataTable.status.disabled');
      case StatusType.STATUS_PENDING:
        return this.translate.instant('dataTable.status.pending');
      default:
        return this.translate.instant('dataTable.status.pending');
    }
  }

  handleOnShow(user: ResponseUserModel) {
    this.visibleDrawerShow = true;
    this.titleDrawer = user.fullname;
    this.userDatatable = user;
  }

  handleOnEdit(user: ResponseUserModel) {
    console.log('user - handleOnEdit: ', user);
  }

  handleOnStatus(user: ResponseUserDataModel) {
    this.visibleDrawerStatus = true;
    this.titleDrawer = this.translate.instant(
      'operation.confirmation.change.status'
    );
    this.userDatatable = user.user;
    this.userDatatable.userInfo = user.userInfo;
    this.userStatusSelected = this.userDatatable.userInfo.status;
  }

  handleOnDelete(user: ResponseUserModel) {
    this.nzModalService.confirm({
      nzTitle:
        '<h4>' +
        this.translate.instant('dashboard.modal.deleteUser.title') +
        '</h4>',
      nzContent:
        '<p>' +
        this.translate.instant('dashboard.modal.deleteUser.subtitle') +
        '</p>',
      nzCancelText: this.translate.instant('dashboard.cta.no'),
      nzOkText: this.translate.instant('dashboard.cta.yes'),
      nzOnOk: () => {
        this.profilService.onDeleteUser(user?.userId).subscribe(
          (response: any) => {
            this.successAlertType(response?.message);
            this.getAllWarehousUsers();
          },
          (error: HttpErrorResponse) => {
            if (error.status === 403) {
              // Expiration token
              this.expirationToken();
            } else {
              console.log('Error Occured during downloading: ', error);
              this.errorAlertType(error?.error.message || error?.message);
            }
          }
        );
      },
    });
  }

  handleOnCloseDrawer() {
    this.visibleDrawerShow = false;
    this.visibleDrawerStatus = false;
  }

  handleOnChangeStatus() {
    this.isAuth = false;
    this.dashboardService
      .adminChangeStatusUser(
        this.user?.userId,
        this.userDatatable?.userId,
        this.userStatusSelected
      )
      .subscribe(
        (response: ResponseModel) => {
          this.successAlertType(response?.message);
          this.visibleDrawerStatus = false;
          this.getAllWarehousUsers();
        },
        (error: HttpErrorResponse) => {
          if (error.status === 403) {
            // Expiration token
            this.expirationToken();
          } else {
            console.log('Error Occured during downloading: ', error);
            this.errorAlertType(error?.error.message || error?.message);
          }
        }
      );
  }

  handleOnResetFilter() {
    this.getAllWarehousUsers();
  }

  handleOnUsersFitered(users: ResponseUserDataModel[]) {
    this.allUsers = users;
  }
}
