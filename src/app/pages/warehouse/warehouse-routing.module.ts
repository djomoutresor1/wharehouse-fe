import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { PathParams } from 'src/app/shared/enums/path-params-enums';
import { ForgottenPasswordComponent } from './auth/password/forgotten-password/forgotten-password.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ResetPasswordComponent } from './auth/password/reset-password/reset-password.component';
import { WarehouseComponent } from './warehouse.component';

const routes: Routes = [
  { path: '', component: WarehouseComponent },
  {
    path: `${Pages.WAREHOUSE}`,
    children: [
      { path: `${Pages.LOGIN}`, component: LoginComponent },
      {
        path: `${Pages.REGISTER}`,
        component: RegisterComponent,
      },
      {
        path: `${Pages.RESET_PASSWORD}`, //?idLinkResetPassword=:idLinkResetPassword&expirationLink=:expirationLink&verifyType=:verifyType
        component: ResetPasswordComponent,
      },
      {
        path: `${Pages.FORGOT_PASSWORD}`,
        component: ForgottenPasswordComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WarehouseRoutingModule {}
