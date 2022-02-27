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
      remember: [true]
    });
  }

  submitForm() {
    console.log(this.validateForm.controls['userName'].value);
  }

  updateConfirmValidator() {}

  getCaptcha() {}

  confirmationValidator() {}

  handleOnRegister() {
    this.router.navigate([`${Pages.WAREHOUSE}/${Pages.REGISTER}`]);
  }
}
