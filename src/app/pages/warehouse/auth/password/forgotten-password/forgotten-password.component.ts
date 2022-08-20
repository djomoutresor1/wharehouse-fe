import { HttpErrorResponse } from '@angular/common/http';
import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { WarehouseBaseComponent } from 'src/app/base/warehouse-base/warehouse-base.component';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { ResponseModel } from 'src/model/auth/response/response-model';

@Component({
  selector: 'warehouse-forgottenPassword',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.scss'],
})
export class ForgottenPasswordComponent extends WarehouseBaseComponent implements OnInit {
  isMailSent: boolean = false;
  email: string = '';

  constructor(injector: Injector) {
    super(injector);
    this.checkIfUserIsAlreadyLogged();
  }

  override ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }

  submitForm() {
    this.email = this.validateForm.controls['email'].value;
    this.authorizationService.userForgotPassword(this.email).subscribe(
      (response: ResponseModel) => {
        this.isMailSent = true;
      },
      (error: HttpErrorResponse) => {
        if (error.status === 403) {
          // Expiration token
          this.expirationToken();
        } else {
          this.isMailSent = false;
          this.errorAlertType(error?.error || error?.error?.message);
        }
      }
    );
  }

  handleOnOkModal(event: string) {
    this.warehouseLocalStorage.WarehouseRemoveTokenLocalStorage();
    window.location.reload();
    this.router.navigate([`${Pages.WAREHOUSE}/${Pages.LOGIN}`]);
  }
}
