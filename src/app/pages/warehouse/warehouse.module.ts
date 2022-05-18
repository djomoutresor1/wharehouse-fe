import { NgModule } from '@angular/core';
import { WarehouseRoutingModule } from './warehouse-routing.module';
import { WarehouseComponent } from './warehouse.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AntDesignComponentsModule } from 'src/app/modules/ant-design-components.module';
import { ForgottenPasswordComponent } from './auth/password/forgotten-password/forgotten-password.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from './auth/password/reset-password/reset-password.component';
import { ChangePasswordComponent } from './auth/password/change-password/change-password.component';
import { SecurePasswordComponent } from './auth/password/components/secure-password/secure-password.component';
import { RegisterStepTwoComponent } from './auth/register/register-step-two/register-step-two.component';
import { RegisterStepThreeComponent } from './auth/register/register-step-three/register-step-three.component';

@NgModule({
  declarations: [
    WarehouseComponent,
    LoginComponent,
    RegisterComponent,
    ForgottenPasswordComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    SecurePasswordComponent,
    RegisterStepTwoComponent,
    RegisterStepThreeComponent,
  ],
  imports: [
    ReactiveFormsModule,
    AntDesignComponentsModule,
    WarehouseRoutingModule,
    SharedModule,
    CommonModule,
  ],
  exports: [WarehouseComponent, LoginComponent, RegisterComponent],
})
export class WarehouseModule {}
