import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/auth/authentification.service';
import { AlertType } from 'src/app/shared/enums/alert-type-enums';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { ResponseRegisterModel } from 'src/model/auth/response/response-register-model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  validateForm!: FormGroup;
  passwordVisible = false;
  password?: string;
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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authentificationService: AuthentificationService
  ) {}

  ngOnInit(): void {
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
    });
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
        username: this.validateForm.controls['userName']?.value,
        email: this.validateForm.controls['email']?.value,
        password: this.validateForm.controls['password']?.value,
        role: this.validateForm.controls['role']?.value,
      };
      this.authentificationService.userRegister(userData).subscribe(
        (response: ResponseRegisterModel) => {
          this.successAlertType(response?.message);
        },
        (error) => {
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
}
