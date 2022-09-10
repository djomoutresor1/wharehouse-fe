import { NgModule } from '@angular/core';
import { WarehouseRoutingModule } from './warehouse-routing.module';
import { WarehouseComponent } from './warehouse.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterStepOneComponent } from './auth/register/register-step-one/register-step-one.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AntDesignComponentsModule } from 'src/app/modules/ant-design-components.module';
import { ForgottenPasswordComponent } from './auth/password/forgotten-password/forgotten-password.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from './auth/password/reset-password/reset-password.component';
import { ChangePasswordComponent } from './auth/password/change-password/change-password.component';
import { SecurePasswordComponent } from './components/secure-password/secure-password.component';
import { RegisterStepThreeComponent } from './auth/register/register-step-three/register-step-three.component';
import { RegisterStepTwoComponent } from './auth/register/register-step-two/register-step-two.component';
import { ManageAccountComponent } from './components/manage-account/manage-account.component';
import { RecoveryEmailComponent } from './components/recovery-email/recovery-email.component';

@NgModule({
  declarations: [
    WarehouseComponent,
    LoginComponent,
    RegisterStepOneComponent,
    ForgottenPasswordComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    SecurePasswordComponent,
    RegisterStepTwoComponent,
    RegisterStepThreeComponent,
    ManageAccountComponent,
    RecoveryEmailComponent,
  ],
  imports: [
    ReactiveFormsModule,
    AntDesignComponentsModule,
    WarehouseRoutingModule,
    SharedModule,
    CommonModule,
  ],
  exports: [WarehouseComponent, LoginComponent, RegisterStepOneComponent],
})
export class WarehouseModule {}
