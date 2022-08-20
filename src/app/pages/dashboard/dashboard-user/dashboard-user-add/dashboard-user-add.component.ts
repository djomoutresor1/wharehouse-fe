import { HttpErrorResponse } from '@angular/common/http';
import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { LangChangeEvent } from '@ngx-translate/core';
import { AlertType } from 'src/app/shared/enums/alert-type-enums';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { BreadcrumbItemsModel } from 'src/model/utils/breadcrumb-items-model';
import * as _ from 'lodash';
import { ResponseUserInsertModel } from 'src/model/dashboard/response/response-user-insert-model';
import { UserInsertModel } from 'src/model/dashboard/request/user-insert-model';
import { UserContactModel } from 'src/model/dashboard/request/user-contact-model';
import { UserAddressModel } from 'src/model/dashboard/request/user-address-model';
import * as moment from 'moment';
import { Subject, takeUntil } from 'rxjs';
import { WarehouseBaseComponent } from 'src/app/base/warehouse-base/warehouse-base.component';
@Component({
  selector: 'warehouse-dashboard-user-add',
  templateUrl: './dashboard-user-add.component.html',
  styleUrls: ['./dashboard-user-add.component.scss'],
})
export class DashboardUserAddComponent extends WarehouseBaseComponent implements OnInit {
  breadcrumbItems!: BreadcrumbItemsModel;
  countryAndFlagData: any[] = [];
  countryStatesData: any[] = [];
  prefixPhoneData: any[] = [];
  showbuttonUpload: boolean = false;
  countrySelected: string = '';
  stateSelected: string = '';
  landlinePrefixSelected: string = '';
  countryDialCode: string = '';
  imgURL: any;
  selectedFile: any;
  landlineNumberValidate: string = '';
  isFormFieldsValidate: boolean = true;

  onDestroy$ = new Subject<any>();

  constructor(injector: Injector) { super(injector); }

  override ngOnInit(): void {
    this.initForm();
    this.initComponent();
    this.getCountriesAndPrefixPhoneWorld();
    this.translate.onLangChange
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((lang: LangChangeEvent) => {
        console.log('lang: ', lang);
      });
  }

  initForm() {
    this.validateForm = this.fb.group({
      fullName: [
        '',
        [Validators.required, Validators.min(5), Validators.max(25)],
      ],
      username: [
        '',
        [Validators.required, Validators.min(5), Validators.max(15)],
      ],
      email: ['', [Validators.required, Validators.email]],
      emailPec: [null, [Validators.email]],
      role: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      image: '',
      dateOfBirth: ['', [Validators.required]],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(8),
          Validators.maxLength(10),
        ],
      ],
      landlinePrefix: [null],
      landlineNumber: [''],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zipCode: ['', [Validators.minLength(4), Validators.maxLength(6)]],
      address: ['', [Validators.required]],
    });
  }

  initComponent() {
    this.user = this.warehouseLocalStorage.WarehouseGetTokenLocalStorage();
    console.log('currentLang: ', this.translate.currentLang);
    let currentLang = null;
    currentLang = this.translate.currentLang;
    if (currentLang === undefined) {
      currentLang =
        this.warehouseLocalStorage.WarehouseGetLanguageLocalStorage();
    }
    this.translate.use(currentLang as string);
    this.breadcrumbItems = {
      parent: {
        title: this.translate.instant('profile.title'),
        url: 'dashboard/my-profile',
      },
      children: [
        {
          title: this.translate.instant('profile.add.title'),
        },
      ],
    };
  }

  getCountriesAndPrefixPhoneWorld() {
    this.flagService.getDialCodeAndCountryFlag().subscribe(
      (response: { data: any }) => {
        this.countryAndFlagData = response.data;
        this.prefixPhoneData = response.data?.filter((prefix: any) => {
          return prefix?.dialCode !== undefined && prefix?.dialCode !== ' ';
        });
        // Only take the unique prefix phone
        this.prefixPhoneData = _.uniqWith(this.prefixPhoneData, _.isEqual);
      },
      (error: HttpErrorResponse) => {
        console.log('Unenable to retrieve data country and flag ' + error);
        if (error.status === 403) {
          // Expiration token
          this.expirationToken();
        } else {
          this.errorAlertType(error?.error.message);
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

  successAlertTypeComponent(message: string): void {
    this.isAuth = true;
    this.alertType = AlertType.ALERT_SUCCESS;
    this.messageAlert = message;
    this.descriptionAlert = this.translate.instant(
      'operation.confirmation.insert.user'
    );
    setTimeout(() => {
      this.router.navigate([`${Pages.WAREHOUSE}/${Pages.DASHBOARD}`]);
    }, 500);
  }

  handleOnRemoneImage() {
    this.imgURL = '';
    this.showbuttonUpload = false;
  }

  handleOnChangeDate(date: any) {
    console.log('handleOnChangeDate: ', date);
  }

  handleOnCountrySelected() {
    if (!!this.countryAndFlagData?.length) {
      let country = this.countryAndFlagData?.find(
        (countryFlag: any) => countryFlag?.name === this.countrySelected
      );
      return country?.flag;
    }
  }

  handleOnFlagSelected(flag: any): string {
    let country = this.countryAndFlagData?.find(
      (country: any) => country?.name === flag?.nzValue
    );
    return country?.flag;
  }

  handleOnKeyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  getPhonePrefixNumber(): string {
    return this.countryDialCode?.includes('+')
      ? this.countryDialCode
      : '+' + this.countryDialCode;
  }

  handleOnSelectCountry(selectedCountry: string) {
    this.countrySelected = selectedCountry;
    if (!!this.countryAndFlagData?.length) {
      let country = this.countryAndFlagData?.find(
        (countryFlag: any) => countryFlag?.name === this.countrySelected
      );
      this.countryDialCode = country?.dialCode;
    }
    if (!!this.countrySelected?.length) {
      this.handleOnGetStatesByCountry();
    }
  }

  handleOnGetStatesByCountry() {
    this.stateSelected = '';
    this.flagService.getStatesByCountry(this.countrySelected).subscribe(
      (states) => {
        this.countryStatesData = states.data?.states;
      },
      (error: HttpErrorResponse) => {
        if (error.status === 403) {
          // Expiration token
          this.expirationToken();
        } else {
          this.errorAlertType(error?.error.message);
        }
      }
    );
  }

  handleOnSelectState(selectedState: string) {
    this.stateSelected = selectedState;
  }

  handleOnInsertUser() {
    this.isAuth = false;
    let userContact: UserContactModel = {
      landlinePrefix: this.landlinePrefixSelected !== null ? this.landlinePrefixSelected : '',
      phoneNumber: this.validateForm.controls['phoneNumber']?.value,
      landlineNumber: this.validateForm.controls['landlineNumber']?.value,
      phonePrefix: this.getPhonePrefixNumber(),
    };

    let userAddress: UserAddressModel = {
      country: this.validateForm.controls['country']?.value,
      state: this.validateForm.controls['state']?.value,
      addressLine: this.validateForm.controls['address']?.value,
      zipCode: this.validateForm.controls['zipCode']?.value,
    };

    let userData: UserInsertModel = {
      fullname: this.validateForm.controls['fullName']?.value,
      username: this.validateForm.controls['username']?.value.toLowerCase(),
      email: this.validateForm.controls['email']?.value,
      emailPec: this.validateForm.controls['emailPec']?.value,
      dateOfBirth: moment(
        this.validateForm.controls['dateOfBirth']?.value
      ).format('L'),
      contact: userContact,
      address: userAddress,
      role: this.validateForm.controls['role']?.value,
      gender: this.validateForm.controls['gender']?.value,
    };

    console.log('userData: ', userData);

    // this.handleOnFieldsValidation(userData);

    if (!!userData?.emailPec?.length) {
      this.checkIfPecEmailIsNotEmpty(userData);
    } else {
      this.handleOnAdminInsertUser(userData);
    }
  }

  handleOnFieldsValidation(userData: UserInsertModel): void {
    let message = '';
    let phone = userData?.contact?.phonePrefix + userData?.contact?.phoneNumber;
    let landline =
      userData?.contact?.landlinePrefix + userData?.contact?.landlineNumber;
    if (userData?.email === userData?.emailPec) {
      message = this.translate.instant('message.insertUser.email');
    } else if (phone?.trim() === landline?.trim()) {
      message = this.translate.instant('message.insertUser.phone');
    }
    this.isFormFieldsValidate = !!message?.length ? false : true;
    this.errorAlertType(message);
  }

  handleOnAdminInsertUser(userData: UserInsertModel) {
    this.dashboardService.adminInsertUser(userData).subscribe(
      (response: ResponseUserInsertModel) => {
        console.log('response: ', response);
        //this.handleOnUploadImageProfile(response?.object?.userId as string);
        this.successAlertTypeComponent(response?.message);
      },
      (error: HttpErrorResponse) => {
        if (error.status === 403) {
          // Expiration token
          this.expirationToken();
        } else {
          this.errorAlertType(error?.error.message);
        }
      }
    );
  }

  checkIfPecEmailIsNotEmpty(userData: UserInsertModel) {
    this.nzModalService.confirm({
      nzTitle:
        '<h4>' +
        this.translate.instant('dashboard.modal.insertUser.title') +
        '</h4>',
      nzContent:
        '<p>' +
        this.translate.instant('dashboard.modal.insertUser.subtitle') +
        '</p>',
      nzCancelText: this.translate.instant('dashboard.cta.back'),
      nzOkText: this.translate.instant('dashboard.cta.create.user'),
      nzOnOk: () => {
        this.handleOnAdminInsertUser(userData);
      },
    });
  }

  // handleOnUploadImageProfile(userId: string) {
  //   // Instantiate a FormData to store form fields and encode the file
  //   let uploadData = new FormData();
  //   // Add file content to prepare the request
  //   uploadData.append('file', this.selectedFile);

  //   this.imageService.uploadImageProfile(uploadData, userId).subscribe(
  //     (response: any) => {
  //       this.successAlertTypeComponent(response?.message);
  //     },
  //     (error: HttpErrorResponse) => {
  //       console.log('Error Occured duringng uploading file: ', error);
  //       if (error.status === 403) {
  //         // Expiration token
  //         this.alertType = AlertType.ALERT_WARNING;
  //         this.okText = this.translate.instant('message.timeout.cta');
  //         this.messageAlert = this.translate.instant('message.timeout.title');
  //         this.descriptionAlert = this.translate.instant(
  //           'message.timeout.description'
  //         );
  //         this.isExpiredToken = true;
  //       } else {
  //         this.errorAlertType(error?.message || error?.error?.message);
  //       }
  //     }
  //   );
  // }

  handleOnSelectLandlinePrefix(landlinePrefix: string) {
    this.landlinePrefixSelected = landlinePrefix;
    if (landlinePrefix === null || landlinePrefix === undefined) {
      this.landlineNumberValidate = '';
      this.validateForm.patchValue({
        landlineNumber: '',
      });
      this.validateForm.get('landlineNumber')?.clearValidators();
    } else {
      if (landlinePrefix) {
        this.validateForm.controls['landlineNumber'].setValidators([
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(8),
          Validators.maxLength(10),
        ]);
        this.handleOnChoiceLandlineMobile();
      }
    }
  }

  handleOnBack() {
    this.router.navigate([`${Pages.WAREHOUSE}/${Pages.DASHBOARD}`]);
  }

  // Add + at first of the prefix
  handleOnFormatPrefix(prefix: string): string {
    return prefix?.startsWith('+') ? prefix : '+' + prefix;
  }

  handleOnOkModal(event: string) {
    this.warehouseLocalStorage.WarehouseRemoveTokenLocalStorage();
    window.location.reload();
    this.router.navigate([`${Pages.WAREHOUSE}/${Pages.LOGIN}`]);
  }

  handleOnChoiceLandlineMobile() {
    if (this.landlinePrefixSelected) {
      this.landlineNumberValidate = AlertType.ALERT_ERROR;
      if (!!this.validateForm.controls['landlineNumber'].value?.length) {
        this.landlineNumberValidate =
          this.validateForm.controls['landlineNumber'].value?.length < 8 ||
          this.validateForm.controls['landlineNumber'].value?.length > 10
            ? AlertType.ALERT_ERROR
            : '';
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
}
