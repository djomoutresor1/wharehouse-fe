import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Pages } from 'src/app/shared/enums/pages-enums';

@Component({
  selector: 'forgottenPassword',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.scss']
})
export class ForgottenPasswordComponent implements OnInit {
  validateForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      fullName: [null, [Validators.required, Validators.min(5), Validators.max(25)]],
      userName: [null, [Validators.required, Validators.min(5), Validators.max(15)]],
      email: [null, [Validators.required]],
    });
  }

  submitFormModule(){
    let user = this.validateForm.controls['userName'].value;
    let passId = this.validateForm.controls['email'].value;

        // data From Localstorage
    let data = JSON.parse(localStorage.getItem('formData') || 'null');

        if (user == data.userName && passId == data.email) {
          console.log("your password is: ", data.password)
          this.router.navigate([`${Pages.WAREHOUSE}/${Pages.DASHBOARD}`]);
        }

  }


  returnOnLogin(){
    this.router.navigate([`${Pages.WAREHOUSE}/${Pages.LOGIN}`]);
  }


}
