import { HttpErrorResponse } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { AuthentificationService } from 'src/app/services/auth/authentification.service';
import { AlertType } from 'src/app/shared/enums/alert-type-enums';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { WarehouseLocalStorage } from 'src/app/utils/warehouse-local-storage';
import { ResponseLoginModel } from 'src/model/auth/response/response-login-model';

const fakeProfil = {
  fullName: 'Mario Rossi',
  userName: 'admin',
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
  passwordVisible = false;
  password?: string;
  isAuth: boolean = false;
  isLogged: boolean = false;
  alertType: string = '';
  messageAlert: string = '';
  descriptionAlert: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authentificationService: AuthentificationService,
    private warehouseLocalStorage: WarehouseLocalStorage
  ) {
    this.checkIfUserIsAlreadyLogged();
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [
        null,
        [Validators.required, Validators.min(5), Validators.max(15)],
      ],
      password: [null, [Validators.required]],
      remember: [false],
    });
  }

  checkIfUserIsAlreadyLogged() {
    let user = this.warehouseLocalStorage.WarehouseGetTokenLocalStorage();
    if (user?.token) {
      this.router.navigate([`${Pages.WAREHOUSE}/${Pages.DASHBOARD}`]);
    }
  }

  submitForm() {
    let userData = {
      username: this.validateForm.controls['userName']?.value.toLowerCase(),
      password: this.validateForm.controls['password']?.value,
    };

    this.authentificationService.userLogin(userData).subscribe(
      (response: ResponseLoginModel) => {
        console.log('response: ', response);
        this.warehouseLocalStorage.WarehouseSetTokenLocalStorage(response);
        this.successNotificationType(response);
      },
      (error: HttpErrorResponse) => {
        console.log('error: ', error);
        this.errorAlertType(error.error);
      }
    );
    // login From Localstorage
    // let data = JSON.parse(localStorage.getItem('formData') || 'null');

    // if (user == data?.userName && passId == data?.password) {
    //   this.isAuth = true;
    //   this.getRegisterOrNot();
    //   setTimeout(() => {
    //     (this.isAuth = false),
    //       this.router.navigate([`${Pages.WAREHOUSE}/${Pages.DASHBOARD}`]);
    //   }, 1000);
    // } else if (user === 'admin' && passId === 'Qwerty84.') {
    //   this.isAuth = true;
    //   localStorage.setItem('formData', JSON.stringify(fakeProfil));
    //   this.getRegisterOrNot();
    //   setTimeout(() => {
    //     (this.isAuth = false),
    //       this.router.navigate([`${Pages.WAREHOUSE}/${Pages.DASHBOARD}`]);
    //   }, 1000);
    // } else {
    //   this.isAuth = true;
    //   this.getRegisterOrNot();
    //   setTimeout(() => {
    //     this.isAuth = false;
    //   }, 2000);
    //   this.router.navigate([`${Pages.WAREHOUSE}/${Pages.LOGIN}`]);
    // }
  }

  getRegisterOrNot() {
    let user = this.validateForm.controls['userName']?.value;
    let passId = this.validateForm.controls['password']?.value;
    let data = JSON.parse(localStorage.getItem('formData') || 'null');

    if (
      (user == data?.userName && passId == data?.password) ||
      (user == 'admin' && passId == 'Qwerty84.')
    ) {
      this.alertType = AlertType.ALERT_SUCCESS;
      this.messageAlert = 'logged successful!';
    } else if (
      (user !== data?.userName && passId !== data?.password) ||
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

  getCaptcha() {}

  confirmationValidator() {}

  handleOnRegister() {
    this.router.navigate([`${Pages.WAREHOUSE}/${Pages.REGISTER}`]);
  }

  handleOnForgotPassword() {
    this.router.navigate([`${Pages.WAREHOUSE}/${Pages.FORGOTPASSWORD}`]);
  }

  handleOnChangeInput() {
    // If the alert incorrect password is opened,
    // when the user point the password/confirm password, the alert disappear.
    if (this.isAuth) {
      this.isAuth = !this.isAuth;
    }
  }
}
