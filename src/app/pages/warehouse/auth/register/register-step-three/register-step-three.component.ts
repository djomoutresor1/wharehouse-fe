import { HttpErrorResponse } from '@angular/common/http';
import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import * as moment from 'moment';
import { WarehouseBaseComponent } from 'src/app/base/warehouse-base/warehouse-base.component';
import { AlertType } from 'src/app/shared/enums/alert-type-enums';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { Utils } from 'src/app/shared/enums/utils-enums';
@Component({
  selector: 'warehouse-register-step-three',
  templateUrl: './register-step-three.component.html',
  styleUrls: [
    './register-step-three.component.scss',
    '../register-step-one/register-step-one.component.scss',
  ],
})
export class RegisterStepThreeComponent extends WarehouseBaseComponent implements OnInit {
  isNoAuth: boolean = false;
  messageNotification: string = '';
  countryAndFlagData: any;
  selectedFile: any;
  imgURL: any;
  showbuttonUpload: boolean = false;
  countrySelected: string = '';
  countryDialCode: string = '';
  userId: string = '';

  constructor(
    injector: Injector
  ) {
    super(injector);
    this.checkIfUserIsAlreadyLogged();
  }

  override ngOnInit(): void {
    this.currentStep = 2;
    this.initForm();
    this.getWorldCountries();
  }

  getWorldCountries() {
    this.flagService.getDialCodeAndCountryFlag().subscribe(
      (response: { data: any }) => {
        this.countryAndFlagData = response.data;
      },
      (error: HttpErrorResponse) => {
        if (error.status === 403) {
          // Expiration token
          this.expirationToken();
        } else {
          console.log('enable to retrieve data country and flag ' + error);
          this.errorAlertType(error?.error || error?.error?.message);
        }
      }
    );
  }

  handleOnKeyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  initForm() {
    this.validateForm = this.fb.group({
      image: '',
      dateOfBirth: ['', [Validators.required]],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(6),
          Validators.maxLength(10),
        ],
      ],
      country: ['', [Validators.required]],
    });
  }

  getCountryDialCode(): string {
    return this.countryDialCode.includes('+')
      ? this.countryDialCode
      : '+' + this.countryDialCode;
  }

  submitForm() {
    let user = JSON.parse(
      localStorage.getItem(Utils.WAREHOUSE_JWT_TOKEN) as string
    );

    if (!!this.imgURL?.length) {
      this.handleOnUploadImageProfile(user?.user?.userId);
    }
    let userData = {
      dateOfBirth: moment(
        this.validateForm.controls['dateOfBirth']?.value
      ).format('L'),
      phonePrefix: this.getCountryDialCode(),
      phoneNumber: this.validateForm.controls['phoneNumber']?.value,
      country: this.validateForm.controls['country']?.value,
    };
    this.authentificationService
      .userRegisterStepThree(
        userData,
        Utils.WAREHOUSE_STEP_THREE,
        user?.user?.username
      )
      .subscribe(
        (response: any) => {
          this.successAlertType(response?.message);
          // Remove the localStorage leave in step 2 to identy the user registering.
          this.warehouseLocalStorage.WarehouseRemoveTokenLocalStorage();
          // Remove the remember, if it was present in the past
          localStorage.removeItem(Utils.WAREHOUSE_REMEMBER_ME);
        },
        (error: HttpErrorResponse) => {
          if (error.status === 403) {
            // Expiration token
            this.expirationToken();
          } else {
            console.log('enable to retrieve data country and flag ' + error);
            this.errorAlertType(error?.error || error?.error?.message);
          }
        }
      );
  }

  successNotificationType(message: string): void {
    this.isAuth = true;
    this.alertType = AlertType.ALERT_SUCCESS;
    this.messageNotification = message;
  }

  handleOnUploadImageProfile(userId: string) {
    // Instantiate a FormData to store form fields and encode the file
    let uploadData = new FormData();
    // Add file content to prepare the request
    uploadData.append('file', this.selectedFile);

    this.imageService.uploadImageProfile(uploadData, userId, Utils.WAREHOUSE_AVATAR_IMAGE).subscribe(
      (response: any) => {
        this.successNotificationType(response?.message);
      },
      (error: HttpErrorResponse) => {
        if (error.status === 403) {
          // Expiration token
          this.expirationToken();
        } else {
          console.log('Error Occured duringng saving: ', error);
          this.errorAlertType(error?.error || error?.error?.message);
        }
      }
    );
  }

  handleOnFileChanged(event: any) {
    this.handleOnChangeInput();
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
    if (this.checkFileValidation(this.selectedFile)) {
      this.showbuttonUpload = true;
      let reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = () => {
        this.imgURL = reader.result;
      };
    }
  }

  checkFileValidation(file: File): boolean {
    const fileExt: string =
      '.' + file.name.split('.')[file.name.split('.').length - 1].toLowerCase();
    if (this.acceptPictures.includes(fileExt)) {
      if (file.size < this.WAREHOUSE_MAX_SIZE_FILE) {
        return true;
      } else {
        this.errorAlertType(this.translate.instant('validations.upload.size'));
        return false;
      }
    } else {
      this.errorAlertType(
        this.translate.instant('validations.upload.extensions')
      );
      return false;
    }
  }

  handleOnRemoneImage() {
    this.imgURL = '';
    this.showbuttonUpload = false;
  }

  handleOnChangeDate(dateSelected: Date) {
    if(!this.handleOnCheckAlmost18YearsOld(dateSelected)) {
      this.handleOnModalAlmost18YearsOld();
    }
  }

  handleOnFlagSelected() {
    if (!!this.countryAndFlagData?.length) {
      let country = this.countryAndFlagData?.find(
        (countryFlag: any) => countryFlag?.name === this.countrySelected
      );
      return country?.flag;
    }
  }

  handleOnSelectCountry(selectedCountry: string) {
    this.countrySelected = selectedCountry;
    if (!!this.countryAndFlagData?.length) {
      let country = this.countryAndFlagData?.find(
        (countryFlag: any) => countryFlag?.name === this.countrySelected
      );
      this.countryDialCode = country?.dialCode;
    }
  }

  handleOnOkModal(event: string) {
    this.warehouseLocalStorage.WarehouseRemoveTokenLocalStorage();
    window.location.reload();
    this.router.navigate([`${Pages.WAREHOUSE}/${Pages.LOGIN}`]);
  }
}
