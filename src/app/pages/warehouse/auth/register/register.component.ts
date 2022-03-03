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
  isAuth: boolean = false;
  alertType: string = '';
  messageAlert: string = '';

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      fullName: [null, [Validators.required, Validators.min(5), Validators.max(25)]],
      userName: [null, [Validators.required, Validators.min(5), Validators.max(15)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]
    });
  }

  submitForm() {
    debugger
   // console.log(this.validateForm.controls);
    let formData = {
      fullName:this.validateForm.controls['fullName']?.value,
      userName:this.validateForm.controls['userName']?.value,
      email:this.validateForm.controls['email']?.value,
      password:this.validateForm.controls['password']?.value,
  }
  localStorage.setItem('formData', JSON.stringify(formData));
  console.log("formData: ", formData);
  this.isAuth = true;
  this.alertType = 'success';
  this.messageAlert = 'successful registered!';
  setTimeout(() => {
    (this.isAuth = false),
      this.router.navigate([`${Pages.WAREHOUSE}/${Pages.LOGIN}`]);
  }, 2000);
  }

  handleOnLogin() {
    this.router.navigate([`${Pages.WAREHOUSE}/${Pages.LOGIN}`]);
  }
}
