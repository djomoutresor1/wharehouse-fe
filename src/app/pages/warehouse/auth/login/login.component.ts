import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { Pages } from 'src/app/shared/enums/pages-enums';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  passwordVisible = false;
  password?: string;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }

  dispData() {
    // console.log(JSON.parse(localStorage.getItem('formData')));
  }

  submitForm() {
    let user = this.validateForm.controls['userName'].value;
    let passId = this.validateForm.controls['password'].value;
    // login From Localstorage
    let data = JSON.parse(localStorage.getItem('formData') || 'null');

    if ((user == data.userName && passId == data.password) || (user === 'admin' && passId === 'Qwerty84.')) {
      alert('You are logged!');
      this.router.navigate([`${Pages.WAREHOUSE}/${Pages.DASHBOARD}`]);
    } else {
      alert('login failed!');
      this.router.navigate([`${Pages.WAREHOUSE}/${Pages.LOGIN}`]);
    }
  }

  updateConfirmValidator() {}

  getCaptcha() {}

  confirmationValidator() {}

  handleOnRegister() {
    this.router.navigate([`${Pages.WAREHOUSE}/${Pages.REGISTER}`]);
  }

  forgotOnPassword(){
    this.router.navigate([`${Pages.WAREHOUSE}/${Pages.FORGOTPASSWORD}`]);
  }
}
