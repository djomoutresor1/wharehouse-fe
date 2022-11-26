import { HttpErrorResponse } from '@angular/common/http';
import { ViewService } from 'src/app/services/view-file.service';
import { Component, Injector, OnInit } from '@angular/core';
import { WarehouseBaseComponent } from 'src/app/base/warehouse-base/warehouse-base.component';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { Utils } from 'src/app/shared/enums/utils-enums';
import { ResponseModel } from 'src/model/auth/response/response-model';
import { ResponseUserDataModel } from 'src/model/auth/response/response-user-data-model';
import { ResponseUserModel } from 'src/model/auth/response/response-user-model';
import { HeaderTableModel } from 'src/model/utils/header-table-model';

@Component({
  selector: 'warehouse-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss'],
})
export class AllUsersComponent
  extends WarehouseBaseComponent
  implements OnInit
{
  checked = false;
  indeterminate = false;
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
  usersHeaderTable: HeaderTableModel[] = [];
  headerIndex: number = 0;

  constructor(injector: Injector, private viewService: ViewService) {
    super(injector);
  }

  override ngOnInit(): void {
    this.user = this.warehouseLocalStorage.WarehouseGetTokenLocalStorage();
    this.initComponent();
    this.getAllWarehousUsers();
  }

  initComponent() {
    this.usersHeaderTable = [
      {
        title: this.translate.instant('profile.personalData.userId'),
        show: true,
      },
      {
        title: this.translate.instant('profile.personalData.fullname'),
        show: true,
      },
      {
        title: this.translate.instant('register.email.placeholder'),
        show: true,
      },
      {
        title: this.translate.instant('verifyEmail.title'),
        show: true,
      },
      {
        title: this.translate.instant('profile.roles'),
        show: true,
      },
      {
        title: this.translate.instant('profile.status'),
        show: true,
      },
      {
        title: this.translate.instant('profile.personalData.dateOfBorn'),
        show: true,
      },
      {
        title: this.translate.instant('profile.lastLogin'),
        show: true,
      },
    ];
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

  handleOnNavigate(url: String) {
    this.router.navigate([`${Pages.WAREHOUSE}/${url}`]);
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
    this.userStatusSelected = '';
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

  handleOnUsersFiltered(users: ResponseUserDataModel[]) {
    this.allUsers = users;
  }

  handleOnHeadersTable(headers: HeaderTableModel[]) {
    this.usersHeaderTable = headers;
  }
}
