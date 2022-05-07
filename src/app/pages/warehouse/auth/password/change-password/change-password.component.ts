import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/auth/authorization.service';
import { AlertType } from 'src/app/shared/enums/alert-type-enums';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { WarehouseLocalStorage } from 'src/app/utils/warehouse-local-storage';
import { ResponseModel } from 'src/model/auth/response/response-model';

@Component({
  selector: 'warehouse-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  validateForm!: FormGroup;
  oldPasswordVisible = false;
  oldPassword?: string;
  passwordVisible = false;
  password?: string;
  confirmPasswordVisible = false;
  confirmPassword?: string;
  isError: boolean = false;
  isSuccess: boolean = false;
  alertType: string = '';
  messageAlert: string = '';
  okText: string = '';
  descriptionAlert: string = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authorizationService: AuthorizationService,
    private warehouseLocalStorage: WarehouseLocalStorage
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.validateForm = this.fb.group({
      oldPassword: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });
  }

  submitForm() {
    let oldPassword = this.validateForm.controls['oldPassword']?.value;
    let password = this.validateForm.controls['password']?.value;
    let confirmPassword = this.validateForm.controls['confirmPassword']?.value;
    if (this.checkValidationsPassword(oldPassword, password, confirmPassword)) {
      let user = this.warehouseLocalStorage.WarehouseGetTokenLocalStorage();
      this.authorizationService
        .userChangePassword(user?.userId, oldPassword, password)
        .subscribe(
          (response: ResponseModel) => {
            this.successAlertType(response?.message);
          },
          (error: HttpErrorResponse) => {
            if (error?.status === 404) {
              this.errorAlertType(error?.error?.message);
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
      message = 'Old password and new password cannot be the same. Try again.';
      this.errorAlertType(message);
    }
    if (confirmPassword !== password) {
      message = "Password and confirm password don't match. Try again.";
      this.errorAlertType(message);
    }
    return !!message?.length ? false : true;
  }

  successAlertType(message: string): void {
    this.isSuccess = true;
    this.alertType = AlertType.ALERT_SUCCESS;
    this.messageAlert = message;
    this.okText = 'Login with your new password';
    this.descriptionAlert =
      'It is necessary logout to continue in Warehouse System.';
    // First cancel the token in localStorage
    // because the user could refresh the page without click in the OK button in modal confirmation
    this.warehouseLocalStorage.WarehouseRemoveTokenLocalStorage();
  }

  errorAlertType(message: string): void {
    this.isError = true;
    this.alertType = AlertType.ALERT_ERROR;
    this.messageAlert = message;
  }

  handleOnNavigate(url: String) {
    this.router.navigate([`${Pages.WAREHOUSE}/${url}`]);
  }

  handleOnChangeInput() {
    // If the alert incorrect password is opened,
    // when the user point the password/confirm password, the alert disappear.
    if (this.isError) {
      this.isError = !this.isError;
    }
  }

  handleOnOkModal(event: string) {
    this.warehouseLocalStorage.WarehouseRemoveTokenLocalStorage();
    window.location.reload();
    this.router.navigate([`${Pages.WAREHOUSE}/${Pages.LOGIN}`]);
  }
}
