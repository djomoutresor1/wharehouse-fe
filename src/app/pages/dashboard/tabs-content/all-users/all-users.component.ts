import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ProfilService } from 'src/app/services/profil.service';
import { AlertType } from 'src/app/shared/enums/alert-type-enums';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { Utils } from 'src/app/shared/enums/utils-enums';
import { WarehouseLocalStorage } from 'src/app/utils/warehouse-local-storage';
import { ResponseLoginModel } from 'src/model/auth/response/response-login-model';
interface ItemData {
  id: 45;
}

@Component({
  selector: 'warehouse-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss'],
})
export class AllUsersComponent implements OnInit {
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
  user!: ResponseLoginModel;
  messageAlert: string = '';
  alertType: string = '';
  isAuth: boolean = false;
  okText: string = '';
  descriptionAlert: string = '';
  isExpiredToken: boolean = false;
  titleDrawer: string = "";
  sizeDrawer: string = "large"
  visibleDrawer: boolean = false;
  mode: string = Utils.WAREHOUSE_MODE_PROFILE_DATATABLE;
  userDatatable!: ResponseLoginModel;

  constructor(
    private router: Router,
    private profilService: ProfilService,
    private warehouseLocalStorage: WarehouseLocalStorage,
    private nzModalService: NzModalService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.user = this.warehouseLocalStorage.WarehouseGetTokenLocalStorage();
    this.getAllWarehousUsers();
  }

  getAllWarehousUsers() {
    this.profilService.getAllUsers().subscribe(
      (users: ResponseLoginModel[]) => {
        // Take all users and remove the current user connected
        this.allUsers = users?.filter(
          (user) => user.userId !== this.user?.userId
        );
        console.log('allUsers: ', users);
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

  handleOnShow(user: ResponseLoginModel) {
    this.visibleDrawer = true;
    this.titleDrawer = user.fullname;
    this.userDatatable = user;
  }

  handleOnEdit(user: ResponseLoginModel) {
    console.log('user - handleOnEdit: ', user);
  }

  handleOnDelete(user: ResponseLoginModel) {
    console.log('user - handleOnDelete: ', user);
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
            console.log('onResponseDelete: ', response);
            this.successAlertType(response?.message);
            this.getAllWarehousUsers();
          },
          (error: HttpErrorResponse) => {
            console.log('error: ', error);
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
}
