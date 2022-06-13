import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnyFn } from '@ngrx/store/src/selector';
import { TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';

import { AuthentificationService } from 'src/app/services/auth/authentification.service';
import { AuthorizationService } from 'src/app/services/auth/authorization.service';
import { AlertType } from 'src/app/shared/enums/alert-type-enums';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { Utils } from 'src/app/shared/enums/utils-enums';
import { WarehouseLocalStorage } from 'src/app/utils/warehouse-local-storage';
import { ResponseLoginModel } from 'src/model/auth/response/response-login-model';

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
  dataUserActive:boolean = false;
  alertType: string = '';
  messageAlert: string = '';
  descriptionAlert: string = '';
  WAREHOUSE_AFTER_7_DAYS = 7 * 24 * 60 * 60 * 1000;
  expiredRemember: number = 0;

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
      console.log('expiredRemember: ', this.expiredRemember);

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


  submitForm() {

    let userData = {
      username: this.validateForm.controls['username']?.value.toLowerCase(),
      password: this.validateForm.controls['password']?.value,
    };

    this.authentificationService.userLogin(userData).subscribe(
      (response: ResponseLoginModel) => {
        this.warehouseLocalStorage.WarehouseSetTokenLocalStorage(response);
        this.handleOnRememberMe();
        console.log(" responseData: ",response);
        this.dataUserActive = response.active;
    
        if(!this.dataUserActive){
          // you have to verify your correct email
            this.nzModalService.confirm({
              nzTitle: '<h4>' + this.translate.instant('dashboard.modal.check.title') + '</h4>',
              nzContent: '<p>' + this.translate.instant('dashboard.modal.check.subtitle') + '</p>',
              nzCancelText: this.translate.instant('dashboard.cta.back'),
              nzOkText: this.translate.instant('dashboard.cta.verification'),
              nzOnOk: () => {
                this.authorizationService.userVerificationEmail(response?.email).subscribe(
                  (response:any)=>{
                    this.successNotificationVerification();
                    setTimeout(() => {
                      this.isAuth = false;
                    }, 3000);
                    this.validateForm.reset()
                  },
                  (error: HttpErrorResponse) => {
                    this.errorAlertType(error.error);
                  })
                }
         })
      }else{
        this.successNotificationType(response);
      }
    },
      (error: HttpErrorResponse) => {
        this.errorAlertType(error.error);
      }
    );
  
}
  getRegisterOrNot() {
    let user = this.validateForm.controls['username']?.value;
    let passId = this.validateForm.controls['password']?.value;
    let data = JSON.parse(localStorage.getItem('formData') || 'null');

    if (
      (user == data?.username && passId == data?.password) ||
      (user == 'admin' && passId == 'Qwerty84.')
    ) {
      this.alertType = AlertType.ALERT_SUCCESS;
      this.messageAlert = 'logged successful!';
    } else if (
      (user !== data?.username && passId !== data?.password) ||
      (user !== 'admin' && passId !== 'Qwerty84.')
    ) {
      this.alertType = AlertType.ALERT_ERROR;
      this.messageAlert = 'login failed!';
    }
  }

  errorAlertType(message: string): void {
    this.isAuth = true;
    this.alertType = AlertType.ALERT_ERROR;
    this.messageAlert = message;
  }

  successNotificationType(userInfo: ResponseLoginModel): void {
    this.isLogged = true;
    this.alertType = AlertType.ALERT_SUCCESS;
    this.messageAlert = `Welcome to warehouse ${userInfo?.username}`;
    this.descriptionAlert = userInfo?.message;
    this.router.navigate([`${Pages.WAREHOUSE}/${Pages.DASHBOARD}`]);
  }

  successNotificationVerification(){
      this.isAuth = true;
      this.alertType = AlertType.ALERT_INFO;
      this.messageAlert = 'send verification has been seen in your email, please check your email';
  //  this.router.navigate([`${Pages.WAREHOUSE}/${Pages.DASHBOARD}`]);
  }

  getCaptcha() {}

  confirmationValidator() {}

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
