import { Component, Injector, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { WarehouseBaseComponent } from 'src/app/base/warehouse-base/warehouse-base.component';

@Component({
  selector: 'warehouse-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss'],
})
export class RegisterUserComponent
  extends WarehouseBaseComponent
  implements OnInit
{

  @Input() validateUserForm!: FormGroup;

  passwordVisible = false;
  password: string = '';
  confirmPasswordVisible = false;
  confirmPassword?: string;
  isSecurePassword: boolean = false;

  constructor(injector: Injector) {
    super(injector);
  }

  override ngOnInit(): void {
    this.validateUserForm = new FormGroup({
      gender: new FormControl(),
      fullName: new FormControl(),
      username: new FormControl(),
      email: new FormControl(),
      role: new FormControl(),
      password: new FormControl(),
      confirmPassword: new FormControl(),
  });
  }

  handleOnChangePassword() {
    this.password = this.validateForm.controls['password']?.value;
  }

  handleOnNotifyPassword(event: boolean) {
    this.isSecurePassword = event;
  }
}
