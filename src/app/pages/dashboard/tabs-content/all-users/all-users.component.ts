import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ProfilService } from 'src/app/services/profil.service';
import { AlertType } from 'src/app/shared/enums/alert-type-enums';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { Utils } from 'src/app/shared/enums/utils-enums';
import { WarehouseLocalStorage } from 'src/app/utils/warehouse-local-storage';
import { ResponseLoginModel } from 'src/model/auth/response/response-login-model';
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
export class AllUsersComponent implements OnInit {
  searchForm!: FormGroup;
  listOfStatus = [
    {
      label: this.translate.instant('dashboard.dataTable.status.all'),
      value: Utils.WAREHOUSE_PREFIX_ALL,
    },
    { label: this.translate.instant('profile.verified'), value: true },
    { label: this.translate.instant('profile.notVerified'), value: false },
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
  user!: ResponseLoginModel;
  messageAlert: string = '';
  alertType: string = '';
  isAuth: boolean = false;
  okText: string = '';
  descriptionAlert: string = '';
  isExpiredToken: boolean = false;
  titleDrawer: string = '';
  sizeDrawer: string = 'large';
  visibleDrawer: boolean = false;
  mode: string = Utils.WAREHOUSE_MODE_PROFILE_DATATABLE;
  userDatatable!: ResponseUserModel;
  search: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private profilService: ProfilService,
    private warehouseLocalStorage: WarehouseLocalStorage,
    private nzModalService: NzModalService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.initSearch();
    this.user = this.warehouseLocalStorage.WarehouseGetTokenLocalStorage();
    this.getAllWarehousUsers();
  }

  initSearch() {
    this.searchForm = this.fb.group({
      search: '',
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
          this.alertType = AlertType.ALERT_WARNING;
          this.okText = this.translate.instant('message.timeout.cta');
          this.messageAlert = this.translate.instant('message.timeout.title');
          this.descriptionAlert = this.translate.instant(
            'message.timeout.description'
          );
          this.isExpiredToken = true;
        } else {
          console.log('Error Occured during downloading: ', error);
          this.errorAlertType(error?.error.message);
        }
      }
    );
  }

  nameUser(role: string) {
    switch (role) {
      case Utils.ROLE_ADMIN:
        return Utils.ADMINS;
        break;
      case Utils.ROLE_MODERATOR:
        return Utils.MODERATOR;
        break;
      case Utils.ROLE_USER:
        return Utils.USER;
        break;
      default:
        return Utils.USER;
        break;
    }
  }

  rolesUser(data: any) {
    return data
      .map((currElement: any) => {
        return this.nameUser(currElement.name);
      })
      .join(',');
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

  getRoleName(role: any) {
    switch (role?.name) {
      case Utils.ROLE_ADMIN:
        return Utils.ADMINS;
        break;
      case Utils.ROLE_MODERATOR:
        return Utils.MODERATOR;
        break;
      case Utils.ROLE_USER:
        return Utils.USER;
        break;
      default:
        return Utils.USER;
        break;
    }
  }

  getUserColorRole(role: any) {
    switch (role?.name) {
      case Utils.ROLE_USER:
        return '#0096c8';
        break;
      case Utils.ROLE_MODERATOR:
        return '#ffc107';
        break;
      case Utils.ROLE_ADMIN:
        return '#2a7a39';
        break;
      default:
        return '#0096c8';
        break;
    }
  }

  getRoleIcon(role: any) {
    switch (role?.name) {
      case Utils.ROLE_USER:
        return 'user';
        break;
      case Utils.ROLE_MODERATOR:
        return 'user-switch';
        break;
      case Utils.ROLE_ADMIN:
        return 'team';
        break;
      default:
        return 'user';
        break;
    }
  }

  handleOnShow(user: ResponseUserModel) {
    this.visibleDrawer = true;
    this.titleDrawer = user.fullname;
    this.userDatatable = user;
  }

  handleOnEdit(user: ResponseUserModel) {
    console.log('user - handleOnEdit: ', user);
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
              this.alertType = AlertType.ALERT_WARNING;
              this.okText = this.translate.instant('message.timeout.cta');
              this.messageAlert = this.translate.instant(
                'message.timeout.title'
              );
              this.descriptionAlert = this.translate.instant(
                'message.timeout.description'
              );
              this.isExpiredToken = true;
            } else {
              console.log('Error Occured during downloading: ', error);
              this.errorAlertType(error?.error.message || error?.message);
            }
          }
        );
      },
    });
  }

  errorAlertType(message: string): void {
    this.isAuth = true;
    this.alertType = AlertType.ALERT_ERROR;
    this.messageAlert = message;
  }

  successAlertType(message: string): void {
    this.isAuth = true;
    this.alertType = AlertType.ALERT_SUCCESS;
    this.messageAlert = message;
  }

  handleOncloseDrawer() {
    this.visibleDrawer = false;
  }

  handleOnSearchUsers() {
    let search = this.searchForm.controls['search']?.value;
    let status = this.searchForm.controls['status']?.value;
    let role = this.searchForm.controls['role']?.value;

    this.handleOnSearchUser(search);
    this.handleOnSelectRole(role);
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

  handleOnSelectStatus(status: boolean | string) {
    if (status === Utils.WAREHOUSE_PREFIX_ALL) {
      this.allUsers = this.allUsers;
    } else {
      this.allUsers = this.allUsers?.filter(
        (user: ResponseUserDataModel) => user.user.active === status
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
}
