import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AntDesignComponentsModule } from '../modules/ant-design-components.module';
import { ErrorPageComponent } from './composants/error-page/error-page.component';
import { HorizontalLaneComponent } from './composants/horizontal-lane/horizontal-lane.component';
import { VerticalLaneComponent } from './composants/vertical-lane/vertical-lane.component';

@NgModule({
  declarations: [VerticalLaneComponent, HorizontalLaneComponent, ErrorPageComponent],
  imports: [CommonModule, AntDesignComponentsModule],
  exports: [VerticalLaneComponent, HorizontalLaneComponent, ErrorPageComponent],
})
export class SharedModule {}
