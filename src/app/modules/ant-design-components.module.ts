import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule, NZ_ICONS } from 'ng-zorro-antd/icon';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import {
  MenuFoldOutline,
  MenuUnfoldOutline,
  FormOutline,
  DashboardOutline,
} from '@ant-design/icons-angular/icons';

const icons = [
  MenuFoldOutline,
  MenuUnfoldOutline,
  DashboardOutline,
  FormOutline,
];
@NgModule({
  imports: [
    NzButtonModule,
    NzIconModule,
    NzResultModule,
    NzFormModule,
    NzLayoutModule,
    NzMenuModule,
  ],
  exports: [
    NzButtonModule,
    NzIconModule,
    NzResultModule,
    NzFormModule,
    NzLayoutModule,
    NzMenuModule,
  ],
  providers: [{ provide: NZ_ICONS, useValue: icons }],
})
export class AntDesignComponentsModule {}
