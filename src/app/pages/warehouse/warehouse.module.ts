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
import { CookiesComponent } from './web/cookies/cookies.component';
import { CguComponent } from './web/cgu/cgu.component';
import { HelpContactComponent } from './web/help-contact/help-contact.component';
import { PrivacyPolicyComponent } from './web/privacy-policy/privacy-policy.component';
import { LegalInfoComponent } from './web/legal-info/legal-info.component';
import { AboutUsComponent } from './web/about-us/about-us.component';
import { AuthTemplateLeftComponent } from './auth/components/auth-template-left/auth-template-left.component';
import { RegisterUserComponent } from './auth/components/register-user/register-user.component';
import { RegisterOrganizationComponent } from './auth/components/register-organization/register-organization.component';

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
    CookiesComponent,
    CguComponent,
    HelpContactComponent,
    PrivacyPolicyComponent,
    LegalInfoComponent,
    AboutUsComponent,
    AuthTemplateLeftComponent,
    RegisterUserComponent,
    RegisterOrganizationComponent,
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
