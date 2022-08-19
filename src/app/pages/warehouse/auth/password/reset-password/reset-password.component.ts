import { HttpErrorResponse } from '@angular/common/http';
import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { WarehouseBaseComponent } from 'src/app/base/warehouse-base/warehouse-base.component';
import { AlertType } from 'src/app/shared/enums/alert-type-enums';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { PathParams } from 'src/app/shared/enums/path-params-enums';
import { Utils } from 'src/app/shared/enums/utils-enums';
import { ResponseModel } from 'src/model/auth/response/response-model';
import { ResponseResetModel } from 'src/model/auth/response/response-reset-model';

@Component({
  selector: 'warehouse-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent extends WarehouseBaseComponent implements OnInit {
  isResetPassword: boolean = false;
  passwordVisible = false;
  password: string = '';
  confirmPasswordVisible = false;
  confirmPassword?: string;
  isSecurePassword: boolean = false;

  idLinkResetPassword: any;
  expirationLink: any;
  verifyType: any;

  isExpiredLink: boolean = false;

  constructor(injector: Injector
  ) {
    super(injector);
    this.idLinkResetPassword = this.route.snapshot.queryParamMap.get(
      PathParams.ID_LINK_RESET_PASSWORD
    );
    this.expirationLink = this.route.snapshot.queryParamMap.get(
      PathParams.EXPIRATION_LINK
    );
    this.verifyType = this.route.snapshot.queryParamMap.get(
      PathParams.VERIFY_TYPE
    );
  }

  override ngOnInit(): void {
    this.initComponent();
    this.initForm();
    this.checkIfIdLinkResetPasswordAndVerifyTypeAreCorrects();
  }

  initComponent() {
    let currentLang = null;
    currentLang = this.translate.currentLang;
    if (currentLang === undefined) {
      currentLang =
        this.warehouseLocalStorage.WarehouseGetLanguageLocalStorage();
    }
    this.translate.use(currentLang as string);
  }

  initForm() {
    this.validateForm = this.fb.group({
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });
  }

  checkIfIdLinkResetPasswordAndVerifyTypeAreCorrects() {
    this.authorizationService
      .userVerifyLink(this.idLinkResetPassword, this.verifyType)
      .subscribe(
        (response: ResponseResetModel) => {
          this.user = response;
          this.checkIfExpirationLinkIsCorrect();
        },
        (error: HttpErrorResponse) => {
          if (error.status === 403) {
            // Expiration token
            this.expirationToken();
          } else {
            this.isResetPassword = true;
            this.errorAlertType(error?.error || error?.error?.message);
          }
        }
      );
  }

  checkIfExpirationLinkIsCorrect() {
    let now = new Date().getTime();
    let expiredLinkUrl = new Date(this.expirationLink).getTime();
    let expiredLinkUser = new Date(this.user?.expiryDate).getTime();
    // First verify if the expired date in url is same with expired date user's in db
    if (this.verifyTheCorrectDate(expiredLinkUrl, expiredLinkUser)) {
      // Compare the expired date with the current date
      if (expiredLinkUrl > now) {
        this.isExpiredLink = false;
      } else {
        this.isExpiredLink = true;
        this.errorAlertType(
          this.translate.instant('validations.link.expiration')
        );
      }
    } else {
      this.isExpiredLink = true;
      this.errorAlertType(this.translate.instant('validations.link.date'));
    }
  }

  verifyTheCorrectDate(
    expiredLinkUrl: number,
    expiredLinkUser: number
  ): boolean {
    // We have the precision lost before the last fourth numbers
    // Then, first, i will remove the last fourth numbers in both dates
    let correctExpiredLinkUrl = expiredLinkUrl
      .toString()
      .slice(0, expiredLinkUrl.toString().length - 4);
    let correctExpiredLinkUser = expiredLinkUser
      .toString()
      .slice(0, expiredLinkUser.toString().length - 4);

    return correctExpiredLinkUrl === correctExpiredLinkUser ? true : false;
  }

  submitForm() {
    this.isAuth = false;
    let password = this.validateForm.controls['password']?.value;
    let confirmPassword = this.validateForm.controls['confirmPassword']?.value;
    if (confirmPassword !== password) {
      let message = "Password and confirm password don't match. Try again.";
      this.errorAlertType(message);
    } else {
      this.authorizationService
        .userResetPassword(this.user?.user?.email, password)
        .subscribe(
          (response: ResponseModel) => {
            localStorage.removeItem(Utils.WAREHOUSE_REMEMBER_ME);
            this.successNotificationType(response);
          },
          (error: HttpErrorResponse) => {
            if (error.status === 403) {
              // Expiration token
              this.expirationToken();
            } else {
              this.isResetPassword = true;
              this.errorAlertType(error?.error || error?.error?.message);
            }
          }
        );
    }
  }

  successNotificationType(userInfo: ResponseModel): void {
    this.isAuth = true;
    this.alertType = AlertType.ALERT_SUCCESS;
    this.messageAlert = `Well done ${userInfo?.object?.fullname}`;
    this.descriptionAlert = userInfo?.message;
    setTimeout(() => {
      this.router.navigate([`${Pages.WAREHOUSE}/${Pages.LOGIN}`]);
    }, 2000);
  }

  handleOnSendLink() {
    this.router.navigate([`${Pages.WAREHOUSE}/${Pages.FORGOT_PASSWORD}`]);
  }

  handleOnNotifyPassword(event: boolean) {
    this.isSecurePassword = event;
  }

  handleOnChangePassword() {
    this.password = this.validateForm.controls['password']?.value;
  }

  handleOnOkModal(event: string) {
    this.warehouseLocalStorage.WarehouseRemoveTokenLocalStorage();
    window.location.reload();
    this.router.navigate([`${Pages.WAREHOUSE}/${Pages.LOGIN}`]);
  }
}
