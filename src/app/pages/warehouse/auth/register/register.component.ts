import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfilService } from 'src/app/services/profil.service';
import { AlertType } from 'src/app/shared/enums/alert-type-enums';
import { Pages } from 'src/app/shared/enums/pages-enums';

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
  role:string = ''
  rolesList = [
    { label: 'Admin', value: ['admin']},
    { label: 'User', value: ['user']},
    { label: 'Moderator', value: ['moderator']}
  ];
  selectedValue = { label: 'User', value: 'user'}


  constructor(private fb: FormBuilder, private router: Router,private profilService:ProfilService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      fullName: [null, [Validators.required, Validators.min(5), Validators.max(25)]],
      userName: [null, [Validators.required, Validators.min(5), Validators.max(15)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
      role: [null, [Validators.required]],
    });
  }

  roleChoice(event:any): void {
  this.role = event?.value; 
  console.log("eventttt: ", this.role)
  }

  submitForm() {
    // console.log(this.validateForm.controls);
    let formData = {
      fullName: this.validateForm.controls['fullName']?.value,
      userName: this.validateForm.controls['userName']?.value,
      email: this.validateForm.controls['email']?.value,
      password: this.validateForm.controls['password']?.value,
      role: this.validateForm.controls['role']?.value.value,
    };
  //  this.profilService.register(formData);
    localStorage.setItem('formData', JSON.stringify(formData));
    console.log('formData: ', formData);
    this.isAuth = true;
    this.alertType = AlertType.ALERT_SUCCESS;
    this.messageAlert = 'successful registered!';
    setTimeout(() => {
      this.isAuth = false;
      this.router.navigate([`${Pages.WAREHOUSE}/${Pages.LOGIN}`]);
    }, 2000);
  }

  handleOnLogin() {
    this.router.navigate([`${Pages.WAREHOUSE}/${Pages.LOGIN}`]);
  }
}
