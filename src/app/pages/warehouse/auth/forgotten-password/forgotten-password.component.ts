import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertType } from 'src/app/shared/enums/alert-type-enums';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { WarehouseLocalStorage } from 'src/app/utils/warehouse-local-storage';

@Component({
  selector: 'warehouse-forgottenPassword',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.scss'],
})
export class ForgottenPasswordComponent implements OnInit {
  validateForm!: FormGroup;
  isAuth: boolean = false;
  isMailSent: boolean = false;
  alertType: string = '';
  messageAlert: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private warehouseLocalStorage: WarehouseLocalStorage
  ) {
    this.checkIfUserIsAlreadyLogged();
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }

  checkIfUserIsAlreadyLogged() {
    let user = this.warehouseLocalStorage.WarehouseGetTokenLocalStorage();
    if (user?.token) {
      this.router.navigate([`${Pages.WAREHOUSE}/${Pages.DASHBOARD}`]);
    }
  }

  submitFormModule() {
    let passId = this.validateForm.controls['email'].value;

    // data From Localstorage
    let data = JSON.parse(localStorage.getItem('formData') || 'null');

    if (passId == data?.email) {
      this.isAuth = true;
      this.alertType = AlertType.ALERT_SUCCESS;
      this.messageAlert = 'your password:  ' + data.password;
      setTimeout(() => {
        this.isAuth = false;
        this.router.navigate([`${Pages.WAREHOUSE}/${Pages.LOGIN}`]);
      }, 5000);
    } else {
      this.isAuth = true;
      this.alertType = AlertType.ALERT_ERROR;
      this.messageAlert = 'your are not register yet!';
      setTimeout(() => {
        this.isAuth = false;
        this.router.navigate([`${Pages.WAREHOUSE}/${Pages.REGISTER}`]);
      }, 2000);
    }
  }

  returnOnLogin() {
    this.router.navigate([`${Pages.WAREHOUSE}/${Pages.LOGIN}`]);
  }
}
