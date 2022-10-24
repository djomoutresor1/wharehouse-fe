import { HttpErrorResponse } from '@angular/common/http';
import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { WarehouseBaseComponent } from 'src/app/base/warehouse-base/warehouse-base.component';
import { OperationType } from 'src/app/shared/enums/operation-type-enums';
import { ResponseModel } from 'src/model/auth/response/response-model';

@Component({
  selector: 'warehouse-recovery-email',
  templateUrl: './recovery-email.component.html',
  styleUrls: ['./recovery-email.component.scss'],
})
export class RecoveryEmailComponent
  extends WarehouseBaseComponent
  implements OnInit
{
  userLocalStorage: any;
  form!: FormGroup;
  userEmailPec: string = '';
  userInfoEmailPecVerified: boolean = false;

  constructor(injector: Injector) {
    super(injector);
  }

  override ngOnInit(): void {
    this.getUserInState();
    this.initForm();
  }

  getUserInState() {
    this.userLocalStorage =
      this.warehouseLocalStorage?.WarehouseGetTokenLocalStorage();
    this.userEmailPec = this.userLocalStorage?.emailPec;
    this.userInfoEmailPecVerified =
      this.userLocalStorage?.userInfo?.emailPecVerified;
  }

  initForm() {
    this.validateForm = this.fb.group({
      emailPec: [null, [Validators.required, Validators.email]],
      codeOne: '',
      codeTwo: '',
      codeThree: '',
      codeFourth: '',
      codeFive: '',
      codeSix: '',
    });
  }

  submitForm() {
    this.isAuth = false;
    let emailPec = this.validateForm.controls['emailPec'].value;
    this.profilService
      .onUpdateEmailPecUser(emailPec, this.userLocalStorage?.userId)
      .subscribe(
        (response: ResponseModel) => {
          this.successAlertType(response?.message);
          let newUser =
            this.warehouseLocalStorage.WarehouseGetTokenLocalStorage();
          newUser = {
            ...newUser,
            emailPec: response?.object?.emailPec,
          };
          this.warehouseLocalStorage.WarehouseSetTokenLocalStorage(newUser);
          this.getUserInState();
        },
        (error: HttpErrorResponse) => {
          console.log('error: ', error);
          if (error.status === 403) {
            // Expiration token
            this.expirationToken();
          } else {
            this.errorAlertType(error?.error.message);
          }
        }
      );
  }

  handleIsNumberKey(evt: any) {
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
    return true;
  }

  handleOnKeyTab(event: any) {
    let nextInput = event.srcElement.nextElementSibling; // get the sibling element

    var target = event.target || event.srcElement;
    var id = target.id;
    console.log(id.maxlength); // prints undefined

    if (!this.handleIsNumberKey(event)) {
      if (nextInput == null)
        // check the maxLength from here
        return;
      else nextInput.focus(); // focus if not null
    }
  }

  handleOnChangeCode() {
    this.isAuth = false;
    let codeOne = this.validateForm.controls['codeOne'].value;
    let codeTwo = this.validateForm.controls['codeTwo'].value;
    let codeThree = this.validateForm.controls['codeThree'].value;
    let codeFourth = this.validateForm.controls['codeFourth'].value;
    let codeFive = this.validateForm.controls['codeFive'].value;
    let codeSix = this.validateForm.controls['codeSix'].value;

    let code = [codeOne, codeTwo, codeThree, codeFourth, codeFive, codeSix];

    if (code.join('')?.length === 6) {
      // Length code is 6
      this.profilService
        .onVerificationCodeUser(
          code.join(''),
          'EMAIL_PEC_VERIFICATION',
          this.userLocalStorage?.userId
        )
        .subscribe(
          (response: ResponseModel) => {
            if (response?.object) {
              this.handleOnUpdateInfosUser();
            }
          },
          (error: HttpErrorResponse) => {
            console.log('error: ', error);
            if (error.status === 403) {
              // Expiration token
              this.expirationToken();
            } else {
              this.errorAlertType(error?.error.message);
            }
          }
        );
    }
  }

  handleOnUpdateInfosUser() {
    this.profilService
      .onUpdateUserInfosByOperationType(
        this.userLocalStorage?.userId,
        OperationType.EMAIL_PEC_VERIFICATION
      )
      .subscribe(
        (response: ResponseModel) => {
          this.successAlertType(response?.message);
          let newUser =
            this.warehouseLocalStorage.WarehouseGetTokenLocalStorage();
          newUser = {
            ...newUser,
            userInfo: response.object,
          };
          this.warehouseLocalStorage.WarehouseSetTokenLocalStorage(newUser);
          this.getUserInState();
        },
        (error: HttpErrorResponse) => {
          console.log('error: ', error);
          if (error.status === 403) {
            // Expiration token
            this.expirationToken();
          } else {
            this.errorAlertType(error?.error.message);
          }
        }
      );
  }

  handleOnSendAgainCode() {
    this.isAuth = false;
    this.profilService
      .onSendAgainCodeByOperationType(
        this.userLocalStorage?.userId,
        OperationType.EMAIL_PEC_VERIFICATION
      )
      .subscribe(
        (response: ResponseModel) => {
          this.successAlertType(response?.message);
        },
        (error: HttpErrorResponse) => {
          console.log('error: ', error);
          if (error.status === 403) {
            // Expiration token
            this.expirationToken();
          } else {
            this.errorAlertType(error?.error.message);
          }
        }
      );
  }
}
