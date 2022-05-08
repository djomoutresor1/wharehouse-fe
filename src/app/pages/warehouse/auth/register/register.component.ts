import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/auth/authentification.service';
import { WarehouseLocalStorage } from 'src/app/utils/warehouse-local-storage';
import { AlertType } from 'src/app/shared/enums/alert-type-enums';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { ResponseRegisterModel } from 'src/model/auth/response/response-register-model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ImageService } from 'src/app/services/image.service';
import { environment } from 'src/environments/environment';
import { Auth } from 'src/app/shared/enums/auth-enums';


@Component({
  selector: 'warehouse-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  validateForm!: FormGroup;
  passwordVisible = false;
  password: string = "";
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
    'User Informations',
    'Verification Email',
    'Registration User',
  ];
  currentStep: number = 0;
  selectedFile: any;
  event1: any;
  imgURL: any;
  receivedImageData: any;
  base64Data: any;
  convertedImage: any;
  showbuttonUpload:boolean = false;
  showInputUpload:boolean = true;
  isSecurePassword: boolean = false;

  private apiServerUrl = environment.apiBaseUrl;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authentificationService: AuthentificationService,
    private warehouseLocalStorage: WarehouseLocalStorage,
    private http: HttpClient,
    private imageService: ImageService
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
      userName: [
        null,
        [Validators.required, Validators.min(5), Validators.max(15)],
      ],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
      role: [null, [Validators.required]],
      image:null,
    });
  }

  checkIfUserIsAlreadyLogged() {
    let user = this.warehouseLocalStorage.WarehouseGetTokenLocalStorage();
    if (user?.token) {
      this.router.navigate([`${Pages.WAREHOUSE}/${Pages.DASHBOARD}`]);
    }
  }

  roleChoice(event: any): void {
    this.role = event?.value;
    console.log('eventttt: ', this.role);
  }

  submitForm() {
    // console.log(this.validateForm.controls);
    // Verify the password and confirm password
    let password = this.validateForm.controls['password']?.value;
    let confirmPassword = this.validateForm.controls['confirmPassword']?.value;
    if (confirmPassword !== password) {
      let message = "Password and confirm password don't match. Try again.";
      this.errorAlertType(message);
    } else {
      let userData = {
        fullname: this.validateForm.controls['fullName']?.value,
        username: this.validateForm.controls['userName']?.value.toLowerCase(),
        email: this.validateForm.controls['email']?.value,
        password: this.validateForm.controls['password']?.value,
        role: this.validateForm.controls['role']?.value,
      };
   //   this.onUploadFotoProfile();
      this.authentificationService.userRegister(userData).subscribe(
        (response: ResponseRegisterModel) => {
          this.successAlertType(response?.message);
        },
        (error: HttpErrorResponse) => {
          this.errorAlertType(error.error.message);
        }
      );
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

  onUploadFotoProfile() {

    const uploadData = new FormData();
    this.showbuttonUpload = false;
    this.showInputUpload = false;
    uploadData.append('myFile', this.selectedFile, this.selectedFile?.name);
  
    this.http.post(`${this.apiServerUrl}${Auth.WAREHOUSE_UPLOAD_IMAGE}`,uploadData).subscribe(
                 res => {console.log(res);
                         this.receivedImageData = res;
                         this.base64Data = this.receivedImageData.pic;
                         this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data; },
                 err => console.log('Error Occured duringng saving: ' + err)
              );
  }
  
 /* onUploadFotoProfile() {

    const uploadData = new FormData();
   // uploadData.append('myFile', this.selectedFile, this.selectedFile?.name);
  
  
    this.imageService.getUploadImageProfil().subscribe(
                 res => {console.log(res);
                         this.receivedImageData = res;
                         this.base64Data = this.receivedImageData.pic;
                         this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data; },
                 err => console.log('Error Occured duringng saving: ' + err)
              );
  }*/

  

  onFileChanged(event: any) {
 //   this.onUploadFotoProfile();
    this.showbuttonUpload = true
    this.showInputUpload = false
    this.selectedFile = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
    };
  }

  handleOnChangePassword() {
    this.password = this.validateForm.controls['password']?.value;
  }
  
  handleOnNotifyPassword(event: boolean) {
    this.isSecurePassword = event;
  }
}
