import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AuthentificationService } from 'src/app/services/auth/authentification.service';
import { AuthorizationService } from 'src/app/services/auth/authorization.service';
import { AlertType } from 'src/app/shared/enums/alert-type-enums';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { Utils } from 'src/app/shared/enums/utils-enums';
import { WarehouseLocalStorage } from 'src/app/utils/warehouse-local-storage';
import { ResponseLoginModel } from 'src/model/auth/response/response-login-model';
import { ResponseModel } from 'src/model/auth/response/response-model';

const fakeProfil = {
  fullName: 'Mario Rossi',
  username: 'admin',
  email: 'mario.rossi@hotmail.fr',
  password: 'Qwerty84.',
};

@Component({
  selector: 'warehouse-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  username?: string;
  passwordVisible = false;
  password?: string;
  remember: boolean = false;
  isAuth: boolean = false;
  isLogged: boolean = false;
  dataUserActive: boolean = true;
  alertType: string = '';
  messageAlert: string = '';
  descriptionAlert: string = '';
  alertTypeModal: string = '';
  messageAlertModal: string = '';
  descriptionAlertModal: string = '';
  okText: string = '';
  dataUserEmail: string = '';
  WAREHOUSE_AFTER_7_DAYS = 7 * 24 * 60 * 60 * 1000;
  expiredRemember: number = 0;
  isExpiredToken: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private translate: TranslateService,
    private nzModalService: NzModalService,
    private authentificationService: AuthentificationService,
    private warehouseLocalStorage: WarehouseLocalStorage,
    private authorizationService: AuthorizationService
  ) {
    this.checkIfUserIsAlreadyLogged();
    this.checkIfUserIsRemember();
  }

  ngOnInit(): void {
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

  checkIfUserIsAlreadyLogged() {
    let user = this.warehouseLocalStorage.WarehouseGetTokenLocalStorage();
    if (user?.token) {
      this.router.navigate([`${Pages.WAREHOUSE}/${Pages.DASHBOARD}`]);
    }
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
            this.alertType = AlertType.ALERT_WARNING;
            this.okText = this.translate.instant('message.timeout.cta');
            this.messageAlert = this.translate.instant('message.timeout.title');
            this.descriptionAlert = this.translate.instant(
              'message.timeout.description'
            );
            this.isExpiredToken = true;
          } else {
            console.log('error: ', error);
            this.errorAlertType(error?.error?.message);
          }
        }
      );
  }

  submitForm() {
    this.dataUserActive = true;
    let userData = {
      username: this.validateForm.controls['username']?.value.toLowerCase(),
      password: this.validateForm.controls['password']?.value,
    };

    this.authentificationService.userLogin(userData).subscribe(
      (response: ResponseLoginModel) => {
        this.handleOnRememberMe();
        this.dataUserActive = response?.active;
        this.dataUserEmail = response?.email;

        if (!this.dataUserActive) {
          this.alertModalActive();
        } else {
          this.warehouseLocalStorage.WarehouseSetTokenLocalStorage(response);
          this.successNotificationType(response);
        }
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
          console.log('error: ', error);
          this.errorAlertType(error?.error || error?.error?.message);
        }
      }
    );
  }

  errorAlertType(message: string): void {
    this.isAuth = true;
    this.alertType = AlertType.ALERT_ERROR;
    this.messageAlert = message;
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

  handleOnRegister() {
    this.router.navigate([`${Pages.WAREHOUSE}/${Pages.REGISTER}`]);
  }

  handleOnForgotPassword() {
    this.router.navigate([`${Pages.WAREHOUSE}/${Pages.FORGOT_PASSWORD}`]);
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

  handleOnChangeInput() {
    // If the alert incorrect password is opened,
    // when the user point the password/confirm password, the alert disappear.
    if (this.isAuth) {
      this.isAuth = !this.isAuth;
    }
  }
}
