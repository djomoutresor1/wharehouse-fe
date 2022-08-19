import { HttpErrorResponse } from '@angular/common/http';
import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { WarehouseBaseComponent } from 'src/app/base/warehouse-base/warehouse-base.component';
import { AlertType } from 'src/app/shared/enums/alert-type-enums';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { StatusType } from 'src/app/shared/enums/status-type-enums';
import { Utils } from 'src/app/shared/enums/utils-enums';
import { ResponseLoginModel } from 'src/model/auth/response/response-login-model';
import { ResponseModel } from 'src/model/auth/response/response-model';
@Component({
  selector: 'warehouse-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends WarehouseBaseComponent implements OnInit {
  username?: string;
  passwordVisible = false;
  password?: string;
  remember: boolean = false;
  isLogged: boolean = false;
  dataUserActive: boolean = true;
  dataUserStatus: boolean = false;
  alertTypeModal: string = '';
  messageAlertModal: string = '';
  descriptionAlertModal: string = '';
  dataUserEmail: string = '';
  expiredRemember: number = 0;

  constructor(injector: Injector) {
    super(injector);
    this.checkIfUserIsAlreadyLogged();
    this.checkIfUserIsRemember();
  }

  override ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.validateForm = this.fb.group({
      username: [
        this.username,
        [Validators.required, Validators.min(5), Validators.max(15)],
      ],
      password: [this.password, [Validators.required]],
      remember: [this.remember],
    });
  }

  checkIfUserIsRemember() {
    if (localStorage.getItem(Utils.WAREHOUSE_REMEMBER_ME)) {
      this.expiredRemember = JSON.parse(
        localStorage.getItem(Utils.WAREHOUSE_REMEMBER_ME) as string
      )?.expiredAt;

      if (this.expiredRemember > new Date().getTime()) {
        this.remember = true;
        this.username = JSON.parse(
          localStorage.getItem(Utils.WAREHOUSE_REMEMBER_ME) as string
        )?.username;
        this.password = JSON.parse(
          localStorage.getItem(Utils.WAREHOUSE_REMEMBER_ME) as string
        )?.password;
      } else {
        localStorage.removeItem(Utils.WAREHOUSE_REMEMBER_ME);
      }
    }
  }

  handleOnOkModal(event: any) {
    this.authorizationService
      .userVerificationEmail(this.dataUserEmail)
      .subscribe(
        (response: ResponseModel) => {
          this.successNotificationVerification();
          setTimeout(() => {
            this.isAuth = false;
          }, 4000);
          this.validateForm.reset();
        },
        (error: HttpErrorResponse) => {
          if (error.status === 403) {
            // Expiration token
            this.expirationToken();
          } else {
            console.log('error: ', error);
            this.errorAlertType(error?.error?.message);
          }
        }
      );
  }

  submitForm() {
    this.dataUserActive = true;
    this.dataUserStatus = false;
    let userData = {
      username: this.validateForm.controls['username']?.value.toLowerCase(),
      password: this.validateForm.controls['password']?.value,
    };

    this.authentificationService.userLogin(userData).subscribe(
      (response: ResponseLoginModel) => {
        this.handleOnRememberMe();
        this.dataUserActive = response?.active;
        this.dataUserEmail = response?.email;
        this.dataUserStatus = this.checkUserStatus(response?.userInfo?.status);

        if (!this.dataUserActive) {
          this.alertTypeModal = AlertType.ALERT_WARNING;
          this.messageAlertModal = this.translate.instant(
            'message.verification.email.title'
          );
          this.okText = this.translate.instant(
            'message.verification.email.cta'
          );
          this.descriptionAlertModal = this.translate.instant(
            'message.verification.email.description'
          );
          // this.alertModalActive();
        } else if (this.dataUserStatus) {
          this.alertTypeModal = AlertType.ALERT_INFO;
          this.messageAlertModal = this.translate.instant(
            'message.verification.profile.title'
          );
          this.okText = this.translate.instant(
            'message.verification.profile.cta'
          );
          this.descriptionAlertModal = this.translate.instant(
            'message.verification.profile.description'
          );
          // this.alertModalActive();
        } else {
          this.warehouseLocalStorage.WarehouseSetTokenLocalStorage(response);
          this.successNotificationType(response);
        }
      },
      (error: HttpErrorResponse) => {
        if (error.status === 403) {
          // Expiration token
          this.expirationToken();
        } else {
          console.log('error: ', error);
          this.errorAlertType(error?.error || error?.error?.message);
        }
      }
    );
  }

  checkUserStatus(status: string): boolean {
    if (
      status === StatusType.STATUS_PENDING ||
      status === StatusType.STATUS_DISABLED
    ) {
      return true;
    } else {
      return false;
    }
  }

  successNotificationType(userInfo: ResponseLoginModel): void {
    this.isLogged = true;
    this.alertType = AlertType.ALERT_SUCCESS;
    this.messageAlert =
      this.translate.instant('message.welcome') + `${userInfo?.username}`;
    this.descriptionAlert = userInfo?.message;
    this.router.navigate([`${Pages.WAREHOUSE}/${Pages.DASHBOARD}`]);
  }

  successNotificationVerification() {
    this.isAuth = true;
    this.alertType = AlertType.ALERT_SUCCESS;
    this.messageAlert = this.translate.instant(
      'message.verification.email.confirmation'
    );
  }

  alertModalActive() {
    this.alertTypeModal = AlertType.ALERT_WARNING;
    this.messageAlertModal = this.translate.instant(
      'message.verification.email.title'
    );
    this.okText = this.translate.instant('message.verification.email.cta');
    this.descriptionAlertModal = this.translate.instant(
      'message.verification.email.description'
    );
  }

  handleOnRememberMe() {
    if (this.validateForm.controls['remember']?.value) {
      localStorage.setItem(
        Utils.WAREHOUSE_REMEMBER_ME,
        JSON.stringify({
          expiredAt: new Date().getTime() + this.WAREHOUSE_AFTER_7_DAYS, // Add expiration time
          username: this.validateForm.controls['username']?.value.toLowerCase(),
          password: this.validateForm.controls['password']?.value,
        })
      );
    } else {
      localStorage.removeItem(Utils.WAREHOUSE_REMEMBER_ME);
    }
  }
}
