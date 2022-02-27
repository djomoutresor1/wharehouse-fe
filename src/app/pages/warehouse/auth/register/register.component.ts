import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Pages } from 'src/app/shared/enums/pages-enums';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  validateForm!: FormGroup;
  passwordVisible = false;
  password?: string;
  confirmPasswordVisible = false;
  confirmPassword?: string;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      fullName: [null, [Validators.required, Validators.min(5), Validators.max(25)]],
      userName: [null, [Validators.required, Validators.min(5), Validators.max(15)]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]
    });
  }

  submitForm() {
    console.log(this.validateForm.controls);
  }

  handleOnLogin() {
    this.router.navigate([`${Pages.WAREHOUSE}/${Pages.LOGIN}`]);
  }
}
