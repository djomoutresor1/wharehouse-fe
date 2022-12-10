import { HttpErrorResponse } from '@angular/common/http';
import { Component, Injector, OnInit } from '@angular/core';
import { WarehouseBaseComponent } from 'src/app/base/warehouse-base/warehouse-base.component';
import { AlertType } from 'src/app/shared/enums/alert-type-enums';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { StatusType } from 'src/app/shared/enums/status-type-enums';
import { Utils } from 'src/app/shared/enums/utils-enums';
import { ResponseModel } from 'src/model/auth/response/response-model';
import { ResponseUserModel } from 'src/model/auth/response/response-user-model';
import { BreadcrumbItemsModel } from 'src/model/utils/breadcrumb-items-model';

@Component({
  selector: 'warehouse-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss'],
})
export class PreferencesComponent
  extends WarehouseBaseComponent
  implements OnInit
{
  userLogged!: ResponseUserModel;
  breadcrumbItems!: BreadcrumbItemsModel;
  passwordVisible: boolean = false;
  passwordUser!: string;
  mode: any;
  theme: any;
  account: boolean = false;
  accountName!: string;
  actionMode!: string;
  isVisible: boolean = false;
  isOkLoading: boolean = false;
  isSuccess: boolean = false;

  constructor(injector: Injector) {
    super(injector);
    if (localStorage.getItem('theme') !== undefined) {
      this.theme = localStorage.getItem('theme');
    }
    if (localStorage.getItem('mode') !== undefined) {
      this.mode = localStorage.getItem('mode');
    }
  }

  override ngOnInit(): void {
    this.initComponent();
  }

  initComponent() {
    this.userLogged = this.warehouseLocalStorage.WarehouseGetTokenLocalStorage();
    let currentLang = null;
    currentLang = this.translate.currentLang;
    if (currentLang === undefined) {
      currentLang =
        this.warehouseLocalStorage.WarehouseGetLanguageLocalStorage();
    }
    this.translate.use(currentLang as string);
    this.breadcrumbItems = {
      parent: {
        title: this.translate.instant('profile.preferences.title'),
      },
    };
  }

  handleOnNavigate(url: String) {
    this.router.navigate([`${Pages.WAREHOUSE}/${url}`]);
  }

  handleOnChangeTheme(selectedTheme: any) {
    this.dashboardService.handleOnChangeTheme(selectedTheme);
  }

  handleOnChangeMode(selectedMode: any) {
    this.dashboardService.handleOnChangeMode(selectedMode);
  }

  handleOnDisabled(disabledMode: boolean) {
    this.account = disabledMode;
  }

  handleOnAction(action: string) {
    this.isVisible = true;
    this.actionMode = action;
  }

  handleOnCancelOperation() {
    this.isVisible = false;
    this.passwordUser = '';
  }

  handleOnOkOperation() {
    this.isSuccess = false;
    let user = this.warehouseLocalStorage.WarehouseGetTokenLocalStorage();
    if (this.actionMode === Utils.WAREHOUSE_ACTION_DISABLE) {
      this.handleOnOkDisabled(user?.userId);
    } else {
      this.handleOnOkDeleted(user?.userId);
    }
  }

  handleOnOkDisabled(userId: string) {
    this.profilService
      .onChangeStatusUser(userId, StatusType.STATUS_DISABLED, this.passwordUser)
      .subscribe(
        (response: ResponseModel) => {
          this.handleOnCancelOperation();
          this.successAlertTypeAndRedirectLogin(response?.message);
        },
        (error: HttpErrorResponse) => {
          if (error.status === 403) {
            // Expiration token
            this.expirationToken();
          } else {
            this.errorAlertType(error?.error.message);
          }
        }
      );
  }

  handleOnOkDeleted(userId: string) {
    this.profilService.onDeleteUser(userId).subscribe(
      (response: ResponseModel) => {
        this.handleOnCancelOperation();
        this.successAlertTypeAndRedirectLogin(response?.message);
      },
      (error: HttpErrorResponse) => {
        if (error.status === 403) {
          // Expiration token
          this.expirationToken();
        } else {
          this.errorAlertType(error?.error.message);
        }
      }
    );
  }

  successAlertTypeAndRedirectLogin(message: string): void {
    this.isSuccess = true;
    this.alertType = AlertType.ALERT_SUCCESS;
    this.messageAlert = message;
    this.descriptionAlert =
      this.translate.instant('message.changePassword.success.description') +
      this.translate.instant('message.preferences.success.description');
    // First cancel the token in localStorage
    // because the user could refresh the page without click in the OK button in modal confirmation
    this.warehouseLocalStorage.WarehouseRemoveTokenLocalStorage();
    setTimeout(() => {
      this.isSuccess = false;
      this.router.navigate([`${Pages.WAREHOUSE}/${Pages.LOGIN}/`]);
    }, 5000);
  }

  handleOnGetMessageModal() {
    if (this.actionMode === 'delete') {
      return this.translate.instant('profile.preferences.modal.message.delete');
    }
    if (this.actionMode === 'disabled') {
      return this.translate.instant(
        'profile.preferences.modal.message.disabled'
      );
    }
  }

  handleOnCheckPasswordUser() {
    return this.passwordUser.length > 6 ? false : true;
  }
}
