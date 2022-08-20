import { HttpErrorResponse } from '@angular/common/http';
import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { WarehouseBaseComponent } from 'src/app/base/warehouse-base/warehouse-base.component';
import { AlertType } from 'src/app/shared/enums/alert-type-enums';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { Utils } from 'src/app/shared/enums/utils-enums';
import { ResponseModel } from 'src/model/auth/response/response-model';
import { ResponseUserModel } from 'src/model/auth/response/response-user-model';
import { BreadcrumbItemsModel } from 'src/model/utils/breadcrumb-items-model';

@Component({
  selector: 'warehouse-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent extends WarehouseBaseComponent implements OnInit {
  oldPasswordVisible = false;
  oldPassword?: string;
  passwordVisible = false;
  password: string = '';
  confirmPasswordVisible = false;
  confirmPassword?: string;
  isSuccess: boolean = false;
  isSecurePassword: boolean = false;

  breadcrumbItems!: BreadcrumbItemsModel;
  profileURL: any;

  constructor(injector: Injector) {
    super(injector);
  }

  override ngOnInit(): void {
    this.initComponent();
    this.initForm();
    this.getInfosUser();
  }

  initComponent() {
    this.user = this.warehouseLocalStorage.WarehouseGetTokenLocalStorage();
    console.log('currentLang: ', this.translate.currentLang);
    let currentLang = null;
    currentLang = this.translate.currentLang;
    if (currentLang === undefined) {
      currentLang =
        this.warehouseLocalStorage.WarehouseGetLanguageLocalStorage();
    }
    this.translate.use(currentLang as string);
    this.breadcrumbItems = {
      parent: {
        title: this.translate.instant('profile.title'),
        url: 'dashboard/my-profile',
      },
      children: [
        {
          title: this.translate.instant('changePassword.title'),
        },
      ],
    };
  }

  getInfosUser() {
    this.profilService.getUserInfos(this.user?.userId).subscribe(
      (response: ResponseUserModel) => {
        if (response?.profileImage) {
          let objectURL =
            'data:image/jpeg;base64,' +
            response?.profileImage?.find(
              (profile) => profile.imageType === Utils.WAREHOUSE_AVATAR_IMAGE
            )?.data;
          this.profileURL = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        }
      },
      (error: HttpErrorResponse) => {
        if (error.status === 403) {
          // Expiration token
          this.expirationToken();
        } else {
          console.log('Error Occured duringng downloading: ', error);
          this.errorAlertType(error?.error || error?.error?.message);
        }
      }
    );
  }

  initForm() {
    this.validateForm = this.fb.group({
      oldPassword: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });
  }

  handleOnChangePassword() {
    this.password = this.validateForm.controls['password']?.value;
  }

  submitForm() {
    let oldPassword = this.validateForm.controls['oldPassword']?.value;
    let password = this.validateForm.controls['password']?.value;
    let confirmPassword = this.validateForm.controls['confirmPassword']?.value;
    if (this.checkValidationsPassword(oldPassword, password, confirmPassword)) {
      this.authorizationService
        .userChangePassword(this.user?.userId, oldPassword, password)
        .subscribe(
          (response: ResponseModel) => {
            this.successAlertTypeComponent(response?.message);
          },
          (error: HttpErrorResponse) => {
            if (error.status === 403) {
              // Expiration token
              this.expirationToken();
            } else {
              console.log('Error Occured duringng downloading: ', error);
              this.errorAlertType(error?.error || error?.error?.message);
            }
          }
        );
    }
  }

  checkValidationsPassword(
    oldPassword: string,
    password: string,
    confirmPassword: string
  ): boolean {
    let message = '';
    if (oldPassword === password) {
      message = this.translate.instant('message.changePassword.newPassword');
      this.errorAlertType(message);
    }
    if (confirmPassword !== password) {
      message = this.translate.instant(
        'message.changePassword.confirmPassword'
      );
      this.errorAlertType(message);
    }
    return !!message?.length ? false : true;
  }

  successAlertTypeComponent(message: string): void {
    this.isSuccess = true;
    this.alertType = AlertType.ALERT_SUCCESS;
    this.messageAlert = message;
    this.okText = this.translate.instant(
      'message.changePassword.success.title'
    );
    this.descriptionAlert = this.translate.instant(
      'message.changePassword.success.description'
    );
    // First cancel the token in localStorage
    // because the user could refresh the page without click in the OK button in modal confirmation
    this.warehouseLocalStorage.WarehouseRemoveTokenLocalStorage();
  }

  handleOnNavigate(url: String) {
    this.router.navigate([`${Pages.WAREHOUSE}/${url}`]);
  }

  handleOnOkModal(event: string) {
    this.warehouseLocalStorage.WarehouseRemoveTokenLocalStorage();
    window.location.reload();
    this.router.navigate([`${Pages.WAREHOUSE}/${Pages.LOGIN}`]);
  }

  handleOnNotifyPassword(event: boolean) {
    this.isSecurePassword = event;
  }

  handleOnBack() {
    this.router.navigate([
      `${Pages.WAREHOUSE}/${Pages.DASHBOARD}/${Pages.PROFILE}`,
    ]);
  }
}
