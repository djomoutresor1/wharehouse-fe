import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { ForgottenPasswordComponent } from './auth/password/forgotten-password/forgotten-password.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterStepOneComponent } from './auth/register/register-step-one/register-step-one.component';
import { ResetPasswordComponent } from './auth/password/reset-password/reset-password.component';
import { WarehouseComponent } from './warehouse.component';
import { RegisterStepThreeComponent } from './auth/register/register-step-three/register-step-three.component';
import { RegisterStepTwoComponent } from './auth/register/register-step-two/register-step-two.component';
import { LegalInfoComponent } from './web/legal-info/legal-info.component';
import { CguComponent } from './web/cgu/cgu.component';
import { CookiesComponent } from './web/cookies/cookies.component';
import { PrivacyPolicyComponent } from './web/privacy-policy/privacy-policy.component';
import { HelpContactComponent } from './web/help-contact/help-contact.component';

const routes: Routes = [
  {
    path: '',
    component: WarehouseComponent,
  },
  {
    path: `${Pages.WAREHOUSE}`,
    children: [
      { path: `${Pages.LOGIN}`, component: LoginComponent },
      { path: `${Pages.REGISTER}`, component: RegisterStepOneComponent },
      { path: `${Pages.REGISTER_STEP_2}`, component: RegisterStepTwoComponent },
      {
        path: `${Pages.REGISTER_STEP_3}`,
        component: RegisterStepThreeComponent,
      },
      {
        path: `${Pages.RESET_PASSWORD}`, //http://localhost:4201/warehouse/noAuth/resetPassword?idLinkResetPassword=:idLinkResetPassword&expirationLink=:expirationLink&verifyType=:verifyType
        component: ResetPasswordComponent,
      },
      {
        path: `${Pages.FORGOT_PASSWORD}`,
        component: ForgottenPasswordComponent,
      },
    ],
  },
  { path: `${Pages.LEGAL_INFO}`, component: LegalInfoComponent },
  { path: `${Pages.CGU}`, component: CguComponent },
  { path: `${Pages.COOKIES}`, component: CookiesComponent },
  { path: `${Pages.PRIVACY_POLICY}`, component: PrivacyPolicyComponent },
  { path: `${Pages.HELP_CONTACT}`, component: HelpContactComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WarehouseRoutingModule {}
