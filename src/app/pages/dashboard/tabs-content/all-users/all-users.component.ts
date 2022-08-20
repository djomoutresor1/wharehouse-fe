import { HttpErrorResponse } from '@angular/common/http';
import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { WarehouseBaseComponent } from 'src/app/base/warehouse-base/warehouse-base.component';
import { AlertType } from 'src/app/shared/enums/alert-type-enums';
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
  searchForm!: FormGroup;
  listOfTypeEmailVerification = [
    {
      label: this.translate.instant('dashboard.dataTable.status.all'),
      value: Utils.WAREHOUSE_PREFIX_ALL,
    },
    { label: this.translate.instant('profile.verified'), value: true },
    { label: this.translate.instant('profile.notVerified'), value: false },
  ];
  listOfStatus = [
    {
      label: this.translate.instant('dashboard.dataTable.status.all'),
      value: Utils.WAREHOUSE_PREFIX_ALL,
      style: '',
    },
    {
      label: this.translate.instant('dashboard.dataTable.status.active'),
      value: StatusType.STATUS_ACTIVE,
      style: AlertType.ALERT_SUCCESS,
    },
    {
      label: this.translate.instant('dashboard.dataTable.status.pending'),
      value: StatusType.STATUS_PENDING,
      style: AlertType.ALERT_WARNING,
    },
    {
      label: this.translate.instant('dashboard.dataTable.status.disabled'),
      value: StatusType.STATUS_DISABLED,
      style: AlertType.ALERT_ERROR,
    },
  ];
  listOfRoles = [
    {
      label: this.translate.instant('dashboard.dataTable.status.all'),
      value: Utils.WAREHOUSE_PREFIX_ALL,
    },
    { label: 'Admin', value: Utils.ROLE_ADMIN },
    { label: 'User', value: Utils.ROLE_USER },
    { label: 'Moderator', value: Utils.ROLE_MODERATOR },
  ];
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
  tmpUsers: ResponseUserDataModel[] = [];
  titleDrawer: string = '';
  sizeDrawer: number = 1000;
  visibleDrawerShow: boolean = false;
  visibleDrawerStatus: boolean = false;
  mode: string = Utils.WAREHOUSE_MODE_PROFILE_DATATABLE;
  userDatatable!: ResponseUserModel;
  search: string = '';
  userStatusSelected: string = '';
  selectedStatus: string = 'all';
  selectedRole: string = 'all';
  selectedTypeEmail: string = 'all';

  constructor(injector: Injector) { super(injector); }

  override ngOnInit(): void {
    this.initSearch();
    this.user = this.warehouseLocalStorage.WarehouseGetTokenLocalStorage();
    this.getAllWarehousUsers();
  }

  initSearch() {
    this.searchForm = this.fb.group({
      search: '',
      typeEmailVerification: Utils.WAREHOUSE_PREFIX_ALL,
      status: Utils.WAREHOUSE_PREFIX_ALL,
      role: Utils.WAREHOUSE_PREFIX_ALL,
    });
  }

  getAllWarehousUsers() {
    this.profilService.getAllUsers().subscribe(
      (users: ResponseUserDataModel[]) => {
        // Take all users and remove the current user connected
        this.allUsers = users?.filter(
          (user) => user.user.userId !== this.user?.userId
        );
        this.tmpUsers = this.allUsers;
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

  getUserStatusSelected(value: string) {
    return this.listOfStatus.find((element) => element?.value === value)?.style;
  }

  formatUserStatus(status: string): string {
    switch (status) {
      case StatusType.STATUS_ACTIVE:
        return this.translate.instant('dashboard.dataTable.status.active');
      case StatusType.STATUS_DISABLED:
        return this.translate.instant('dashboard.dataTable.status.disabled');
      case StatusType.STATUS_PENDING:
        return this.translate.instant('dashboard.dataTable.status.pending');
      default:
        return this.translate.instant('dashboard.dataTable.status.pending');
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

  handleOnSearchUsers() {
    let search = this.searchForm.controls['search']?.value;
    let typeEmailVerification =
      this.searchForm.controls['typeEmailVerification']?.value;
    let status = this.searchForm.controls['status']?.value;
    let role = this.searchForm.controls['role']?.value;

    this.handleOnSearchUser(search);
    this.handleOnSelectRole(role);
    this.handleOnSelectTypeEmailVerification(typeEmailVerification);
    this.handleOnSelectStatus(status);
  }

  handleOnSearchUser(search: string) {
    if (search) {
      this.allUsers = this.tmpUsers.filter(
        (user: ResponseUserDataModel) =>
          user.user.fullname.toLowerCase().indexOf(search.toLowerCase()) >= 0 ||
          user.user.email.toLowerCase().indexOf(search.toLowerCase()) >= 0
      );
    } else {
      this.allUsers = this.tmpUsers;
    }
  }

  handleOnSelectTypeEmailVerification(typeEmailVerification: boolean | string) {
    if (typeEmailVerification === Utils.WAREHOUSE_PREFIX_ALL) {
      this.allUsers = this.allUsers;
    } else {
      this.allUsers = this.allUsers?.filter(
        (user: ResponseUserDataModel) =>
          user.user.active === typeEmailVerification
      );
    }
  }

  handleOnSelectStatus(status: string) {
    if (status === Utils.WAREHOUSE_PREFIX_ALL) {
      this.allUsers = this.allUsers;
    } else {
      this.allUsers = this.allUsers?.filter(
        (user: ResponseUserDataModel) => user.userInfo.status === status
      );
    }
  }

  handleOnSelectRole(role: string) {
    if (role === Utils.WAREHOUSE_PREFIX_ALL) {
      this.allUsers = this.allUsers;
    } else {
      this.allUsers = this.allUsers?.filter((user: ResponseUserDataModel) => {
        return user.user.roles
          .map((userRole: any) => {
            return userRole?.name;
          })
          .includes(role.toUpperCase());
      });
    }
  }

  handleOnResetFilter() {
    this.search = '';
    this.initSearch();
    this.getAllWarehousUsers();
  }

  handleOnSearchClear() {
    this.search = '';
    this.searchForm.controls['search'].reset();
    this.handleOnSearchUsers();
  }

  onExportExcellFile(){
    this.viewProfilService.getExportUsers().subscribe(
      (response: any) => {
          console.log(response)
      },
      (error: HttpErrorResponse) => {
        if (error.status === 403) {
          // Expiration token
          this.alertType = AlertType.ALERT_WARNING;
          this.okText = this.translate.instant('message.timeout.cta');
          this.messageAlert = this.translate.instant('message.timeout.title');
          this.descriptionAlert = this.translate.instant(
            'message.timeout.description'
          );
          this.isExpiredToken = true;
        } else {
          console.log('enable to export excel file, ERROR: ' + error?.message);
          this.errorAlertType(error?.message);
        }
      })

  }
}

