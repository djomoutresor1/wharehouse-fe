import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pages } from 'src/app/shared/enums/pages-enums';
import { ForgottenPasswordComponent } from './auth/forgotten-password/forgotten-password.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { WarehouseComponent } from './warehouse.component';

const routes: Routes = [
  { path: '', component: WarehouseComponent },
  {
    path: `${Pages.WAREHOUSE}/${Pages.LOGIN}`,
    component: LoginComponent,
  },
  {
    path: `${Pages.WAREHOUSE}/${Pages.REGISTER}`,
    component: RegisterComponent,
  },
  {
    path: `${Pages.WAREHOUSE}/${Pages.FORGOTPASSWORD}`,
    component: ForgottenPasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WarehouseRoutingModule {}
