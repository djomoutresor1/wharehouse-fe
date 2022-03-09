import { NgModule } from '@angular/core';
import { WarehouseRoutingModule } from './warehouse-routing.module';
import { WarehouseComponent } from './warehouse.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AntDesignComponentsModule } from 'src/app/modules/ant-design-components.module';
import { ForgottenPasswordComponent } from './auth/forgotten-password/forgotten-password.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { RackTableComponent } from 'src/app/table/rack-table/rack-table.component';

@NgModule({
  declarations: [WarehouseComponent, LoginComponent, RegisterComponent, ForgottenPasswordComponent],
  imports: [
    ReactiveFormsModule,
    AntDesignComponentsModule,
    WarehouseRoutingModule,
    SharedModule,
    CommonModule
  ],
  exports: [WarehouseComponent, LoginComponent, RegisterComponent],
})
export class WarehouseModule {}
