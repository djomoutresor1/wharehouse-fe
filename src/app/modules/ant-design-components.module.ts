import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule, NZ_ICONS } from 'ng-zorro-antd/icon';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import {
  MenuFoldOutline,
  MenuUnfoldOutline,
  FormOutline,
  DashboardOutline,
  UserOutline,
  LockOutline,
  EyeInvisibleOutline,
  MailOutline,
} from '@ant-design/icons-angular/icons';

const icons = [
  MenuFoldOutline,
  MenuUnfoldOutline,
  DashboardOutline,
  FormOutline,
  UserOutline,
  LockOutline,
  EyeInvisibleOutline,
  MailOutline,
];
@NgModule({
  imports: [
    NzButtonModule,
    NzIconModule,
    NzResultModule,
    NzFormModule,
    NzLayoutModule,
    NzPageHeaderModule,
    NzSliderModule,
    NzMenuModule,
    NzInputModule,
    NzCheckboxModule,
    NzDividerModule,
    NzTypographyModule,
  ],
  exports: [
    NzButtonModule,
    NzIconModule,
    NzResultModule,
    NzFormModule,
    NzLayoutModule,
    NzPageHeaderModule,
    NzSliderModule,
    NzMenuModule,
    NzInputModule,
    NzCheckboxModule,
    NzDividerModule,
    NzTypographyModule,
  ],
  providers: [{ provide: NZ_ICONS, useValue: icons }],
})
export class AntDesignComponentsModule {}
