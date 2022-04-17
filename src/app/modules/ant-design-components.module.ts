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
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
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
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSelectModule } from 'ng-zorro-antd/select';

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
    NzAlertModule,
    NzBreadCrumbModule,
    NzBackTopModule,
    NzAvatarModule,
    NzModalModule,
    NzSwitchModule,
    NzTableModule,
    NzPopconfirmModule ,
    NzPopoverModule,
    NzSpinModule,
    NzSelectModule,
    NzNotificationModule
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
    NzAlertModule,
    NzBreadCrumbModule,
    NzBackTopModule,
    NzAvatarModule,
    NzModalModule,
    NzSwitchModule,
    NzTableModule,
    NzPopconfirmModule ,
    NzPopoverModule,
    NzSpinModule,
    NzSelectModule,
    NzNotificationModule
  ],
  providers: [{ provide: NZ_ICONS, useValue: icons }],
})
export class AntDesignComponentsModule {}
