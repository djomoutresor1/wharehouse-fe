import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/auth/authentification.service';
import { FlagService } from 'src/app/services/flag.service';
import { ProfilService } from 'src/app/services/profil.service';
import { AlertType } from 'src/app/shared/enums/alert-type-enums';
import { Auth } from 'src/app/shared/enums/auth-enums';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { Utils } from 'src/app/shared/enums/utils-enums';
import { WarehouseLocalStorage } from 'src/app/utils/warehouse-local-storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'warehouse-register-step-three',
  templateUrl: './register-step-three.component.html',
  styleUrls: [
    './register-step-three.component.scss',
    '../register-step-one/register-step-one.component.scss',
  ],
})
export class RegisterStepThreeComponent implements OnInit {
  validateForm!: FormGroup;
  isAuth: boolean = false;
  alertType: string = '';
  messageAlert: string = '';
  countryAndFlagData: any;
  dateFormat = 'dd/MM/YYYY';

  selectedValue = { label: 'User', value: 'user' };
  steps: string[] = [
    'User Informations',
    'Verification Email',
    'Registration User',
  ];
  currentStep: number = 2;
  selectedFile: any;
  event1: any;
  imgURL: any;
  receivedImageData: any;
  base64Data: any;
  convertedImage: any;
  showbuttonUpload: boolean = false;
  showInputUpload: boolean = true;
  dateSelected: string = "";
  modelPaese: any;
  countrySelected: string = '';
  countryDialCode: string = '';
  userId: string = '';

  private apiServerUrl = environment.apiBaseUrl;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authentificationService: AuthentificationService,
    private warehouseLocalStorage: WarehouseLocalStorage,
    private http: HttpClient,
    private flagService: FlagService,
    private profilService: ProfilService
  ) {
    this.checkIfUserIsAlreadyLogged();
  }

  ngOnInit(): void {
    let data = localStorage.getItem('response');
    let dataUserId = JSON.parse(data as string).user.userId;

    console.log('responseLocalGett: ',JSON.parse(data as string).user.userId);
    this.profilService.onActivateUser(dataUserId).subscribe((response:any)=>{
      console.log('responseOnActivate: ', response),
      this.successAlertTypeActivate(response?.message);
      (error: HttpErrorResponse) => {
        this.errorAlertType(error.error.message);
      }
    })
    this.initForm();
    this.flagService.getDialCodeAndCountryFlag().subscribe(
      (response: { data: any }) => {
        this.countryAndFlagData = response.data;
        console.log('response: ', this.countryAndFlagData);
      },
      (err: string) => {
        console.log('enable to retrieve data country and flag ' + err);
      }
    );
  }
  

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  initForm() {
    this.validateForm = this.fb.group({
      image: '',
      dateOfBirth: '',
      phoneNumber: ['', [ Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(10), Validators.maxLength(10)]],
      country: ['', [Validators.required]],
    });
  }

  checkIfUserIsAlreadyLogged() {
    let user = this.warehouseLocalStorage.WarehouseGetTokenLocalStorage();
    if (user?.token) {
      this.router.navigate([`${Pages.WAREHOUSE}/${Pages.DASHBOARD}`]);
    }
  }

  submitForm() {
    let data = localStorage.getItem('response');
    let userNameData = JSON.parse(data as string).user.username;
    let userData = {
      dateOfBirth: this.validateForm.controls['dateOfBirth']?.value,
      phoneNumber: ('+'+ this.countryDialCode + this.validateForm.controls['phoneNumber']?.value),
      country: this.validateForm.controls['country']?.value,
    };
    this.authentificationService
      .userRegisterStepThree(userData, Utils.WAREHOUSE_STEP_THREE,userNameData)
      .subscribe(
        (response: any) => {
          this.successAlertType(response?.message);
        },
        (error: HttpErrorResponse) => {
          this.errorAlertType(error.error.message);
        }
      );
  }

  errorAlertType(message: string): void {
    this.isAuth = true;
    this.alertType = AlertType.ALERT_ERROR;
    this.messageAlert = message;
  }

  successAlertTypeActivate(message: string): void {
    this.isAuth = true;
    this.alertType = AlertType.ALERT_SUCCESS;
    this.messageAlert = message;
    setTimeout(() => {
      this.isAuth = false;
    }, 2000);
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

  onUploadFotoProfile() {
    const uploadData = new FormData();
    this.showbuttonUpload = false;
    this.showInputUpload = false;
    uploadData.append('myFile', this.selectedFile, this.selectedFile?.name);

    this.http
      .post(`${this.apiServerUrl}${Auth.WAREHOUSE_UPLOAD_IMAGE}`, uploadData)
      .subscribe(
        (res) => {
          console.log(res);
          this.receivedImageData = res;
          this.base64Data = this.receivedImageData.pic;
          this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data;
        },
        (err) => console.log('Error Occured duringng saving: ' + err)
      );
  }

  onFileChanged(event: any) {
    //   this.onUploadFotoProfile();
    this.showbuttonUpload = true;
    this.showInputUpload = false;
    this.selectedFile = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
    };
  }

  handleOnChangeDate(date: any) {
    console.log("handleOnChangeDate: ", date);
  }

  handleOnFlagSelected() {
    if (!!this.countryAndFlagData?.length) {
      let country = this.countryAndFlagData?.find(
        (countryFlag: any) => countryFlag?.name === this.countrySelected
      );
      return country?.flag;
    }
  }

  handleonSelectCountry(selectedCountry: string) {
    console.log("handleOnChangeCountry: ", selectedCountry);
    this.countrySelected = selectedCountry;
    if (!!this.countryAndFlagData?.length) {
      let country = this.countryAndFlagData?.find(
        (countryFlag: any) => countryFlag?.name === this.countrySelected
      );
      this.countryDialCode = country?.dialCode;
    }
  }
}
