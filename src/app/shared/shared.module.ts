import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AntDesignComponentsModule } from '../modules/ant-design-components.module';
import { AlertComponent } from './composants/alert/alert.component';
import { ErrorPageComponent } from './composants/error-page/error-page.component';
import { HorizontalLaneComponent } from './composants/horizontal-lane/horizontal-lane.component';
import { VerticalLaneComponent } from './composants/vertical-lane/vertical-lane.component';
import {
  FontAwesomeModule,
  FaIconComponent,
  FaDuotoneIconComponent,
} from '@fortawesome/angular-fontawesome';
import { FontawesomeComponent } from './composants/fontawesome/fontawesome.component';
import { LoadingComponent } from './composants/loading/loading.component';
import { NotificationComponent } from './composants/notification/notification.component';
import { CapitalizeFirstLetterPipe } from './pipes/capitalize-first-letter.pipe';
import { ModalComponent } from './composants/modal/modal.component';
import { MultilanguageComponent } from './composants/multilanguage/multilanguage.component';
import { BreadcrumbComponent } from './composants/breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [
    VerticalLaneComponent,
    HorizontalLaneComponent,
    ErrorPageComponent,
    AlertComponent,
    FontawesomeComponent,
    LoadingComponent,
    NotificationComponent,
    CapitalizeFirstLetterPipe,
    ModalComponent,
    MultilanguageComponent,
    BreadcrumbComponent
  ],
  imports: [
    CommonModule,
    AntDesignComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  entryComponents: [FaIconComponent, FaDuotoneIconComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    VerticalLaneComponent,
    HorizontalLaneComponent,
    ErrorPageComponent,
    AlertComponent,
    FontawesomeComponent,
    FaIconComponent,
    FaDuotoneIconComponent,
    LoadingComponent,
    NotificationComponent,
    CapitalizeFirstLetterPipe,
    ModalComponent,
    MultilanguageComponent,
    BreadcrumbComponent
  ],
})
export class SharedModule {}
