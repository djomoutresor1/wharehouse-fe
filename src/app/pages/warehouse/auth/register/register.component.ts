import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/auth/authentification.service';
import { WarehouseLocalStorage } from 'src/app/utils/warehouse-local-storage';
import { AlertType } from 'src/app/shared/enums/alert-type-enums';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { ResponseRegisterModel } from 'src/model/auth/response/response-register-model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Utils } from 'src/app/shared/enums/utils-enums';
import { AuthorizationService } from 'src/app/services/auth/authorization.service';
import { ResponseModel } from 'src/model/auth/response/response-model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'warehouse-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  validateForm!: FormGroup;
  passwordVisible = false;
  password: string = '';
  confirmPasswordVisible = false;
  confirmPassword?: string;
  isAuth: boolean = false;
  alertType: string = '';
  messageAlert: string = '';
  role: string = '';
  rolesList = [
    { label: 'Admin', value: 'admin' },
    { label: 'User', value: 'user' },
    { label: 'Moderator', value: 'moderator' },
  ];
  selectedValue = { label: 'User', value: 'user' };
  steps: string[] = [
    'register.step.information',
    'register.step.verification',
    'register.step.registration',
  ];
  currentStep: number = 0;
  selectedFile: any;
  event1: any;
  radioValue:any
  isSecurePassword: boolean = false;
  info:any
  isMailSent: boolean = false;
  email: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authentificationService: AuthentificationService,
    private warehouseLocalStorage: WarehouseLocalStorage,
    private http: HttpClient,
    private authorizationService: AuthorizationService
    private translate: TranslateService
  ) {
    this.checkIfUserIsAlreadyLogged();
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.validateForm = this.fb.group({
      fullName: [
        null,
        [Validators.required, Validators.min(5), Validators.max(25)],
      ],
      username: [
        null,
        [Validators.required, Validators.min(5), Validators.max(15)],
      ],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
      role: [null, [Validators.required]],
      gender: [null, [Validators.required]],
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
      fullname: this.validateForm.controls['fullName']?.value,
      username: this.validateForm.controls['username']?.value.toLowerCase(),
      email: this.validateForm.controls['email']?.value,
      password: this.validateForm.controls['password']?.value,
      confirmPassword: this.validateForm.controls['confirmPassword']?.value,
      role: this.validateForm.controls['role']?.value,
      gender: this.validateForm.controls['gender']?.value,
    };
    // console.log(this.validateForm.controls);
    // Verify the password and confirm password and username criteria
    let message = this.handleOnCheckValidation(
      userData.username,
      userData.password,
      userData.confirmPassword
    );
    this.email = this.validateForm.controls['email'].value;

    this.authorizationService.userVerificationEmail(this.email).subscribe(
      (response: ResponseModel) => {
        this.isMailSent = true;
      },
      (error: HttpErrorResponse) => {
        if (error?.status === 404) {
          this.isMailSent = false;
          this.errorAlertType(error?.error?.message);
        }
      }
    );
  /*  if (!!message?.length) {
      this.errorAlertType(message);
    } else {
      this.authentificationService
        .userRegisterStepOne(userData, Utils.WAREHOUSE_STEP_ONE)
        .subscribe(
          (response: ResponseRegisterModel) => {
            this.successAlertType(response?.message);
          },
          (error: HttpErrorResponse) => {
            this.errorAlertType(error.error.message);
          }
        );
    }*/
  }


  handleOnCheckValidation(
    username: string,
    password: string,
    confirmPassword: string
  ): string {
    let message = '';
    if (confirmPassword !== password) {
      message = this.translate.instant('validations.confirm.password');
      return message;
    } else if (username?.length <= 7) {
      message = this.translate.instant('validations.username');
      return message;
    } else {
      return message;
    }
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
    setTimeout(() => {
      this.isAuth = false;
      this.router.navigate([`${Pages.WAREHOUSE}/${Pages.LOGIN}`]);
    }, 2000);
  }

  handleOnLogin() {
    this.router.navigate([`${Pages.WAREHOUSE}/${Pages.LOGIN}`]);
  }

  handleOnChangeInput() {
    // If the alert incorrect password is opened,
    // when the user point the password/confirm password, the alert disappear.
    if (this.isAuth) {
      this.isAuth = !this.isAuth;
    }
  }

  handleOnChangePassword() {
    this.password = this.validateForm.controls['password']?.value;
  }

  handleOnNotifyPassword(event: boolean) {
    this.isSecurePassword = event;
  }
  
}
