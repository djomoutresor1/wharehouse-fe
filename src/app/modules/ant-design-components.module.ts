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
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { TranslateModule } from '@ngx-translate/core';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
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
    NzNotificationModule,
    NzStepsModule,
    NzCardModule,
    NzTagModule,
    TranslateModule,
    NzProgressModule,
    NzImageModule,
    NzRadioModule,
    NzDatePickerModule,
    NzDropDownModule,
    NzUploadModule,
    NzBadgeModule,
    NzDrawerModule,
    NzToolTipModule,
    NzCollapseModule,
    NzTabsModule,
    NzEmptyModule,
    NzDescriptionsModule
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
    NzNotificationModule,
    NzStepsModule,
    NzCardModule,
    NzTagModule,
    TranslateModule,
    NzProgressModule,
    NzImageModule,
    NzRadioModule,
    NzDatePickerModule,
    NzDropDownModule,
    NzUploadModule,
    NzBadgeModule,
    NzDrawerModule,
    NzToolTipModule,
    NzCollapseModule,
    NzTabsModule,
    NzEmptyModule,
    NzDescriptionsModule
  ],
  providers: [{ provide: NZ_ICONS, useValue: icons }],
})
export class AntDesignComponentsModule {}
