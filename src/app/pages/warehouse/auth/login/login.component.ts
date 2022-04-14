import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { AlertType } from 'src/app/shared/enums/alert-type-enums';
import { Pages } from 'src/app/shared/enums/pages-enums';


const fakeProfil =   
{
  fullName: 'Mario Rossi',
  userName: 'admin',
  email: 'mario.rossi@hotmail.fr',
  password: 'Qwerty84.'
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  passwordVisible = false;
  password?: string;
  isAuth: boolean = false;
  alertType: string = '';
  messageAlert: string = '';
  

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required, Validators.min(5), Validators.max(15)]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }

  submitForm() {
    let user = this.validateForm.controls['userName']?.value;
    let passId = this.validateForm.controls['password']?.value;
    // login From Localstorage
    let data = JSON.parse(localStorage.getItem('formData') || 'null');

    if ((user == data?.userName && passId == data?.password)) {
      this.isAuth = true;
      this.getRegisterOrNot();
      setTimeout(() => {
        (this.isAuth = false),
          this.router.navigate([`${Pages.WAREHOUSE}/${Pages.DASHBOARD}`]);
      }, 1000);
    } else 
    if((user === 'admin' && passId === 'Qwerty84.')){
      this.isAuth = true;
      localStorage.setItem('formData', JSON.stringify(fakeProfil));
      this.getRegisterOrNot();
      setTimeout(() => {
        (this.isAuth = false),
          this.router.navigate([`${Pages.WAREHOUSE}/${Pages.DASHBOARD}`]);
      }, 1000);
    }
    else {
      this.isAuth = true;
      this.getRegisterOrNot();
      setTimeout(() => {
        this.isAuth = false;
      }, 2000);
      this.router.navigate([`${Pages.WAREHOUSE}/${Pages.LOGIN}`]);
    }
  }

  getRegisterOrNot() {
    let user = this.validateForm.controls['userName']?.value;
    let passId = this.validateForm.controls['password']?.value;
    let data = JSON.parse(localStorage.getItem('formData') || 'null');

    if (
      (user == data?.userName && passId == data?.password) ||
      (user == 'admin' && passId == 'Qwerty84.')
    ) {
      this.alertType = AlertType.ALERT_SUCCESS;
      this.messageAlert = 'logged successful!';
    } else if (
      (user !== data?.userName && passId !== data?.password) ||
      (user !== 'admin' && passId !== 'Qwerty84.')
    ) {
      this.alertType = AlertType.ALERT_ERROR;
      this.messageAlert = 'login failed!';
    }
  }


  getCaptcha() {}

  confirmationValidator() {}

  handleOnRegister() {
    this.router.navigate([`${Pages.WAREHOUSE}/${Pages.REGISTER}`]);
  }

  forgotOnPassword() {
    this.router.navigate([`${Pages.WAREHOUSE}/${Pages.FORGOTPASSWORD}`]);
  }
}
