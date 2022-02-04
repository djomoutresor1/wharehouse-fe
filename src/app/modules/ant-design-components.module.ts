import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzResultModule } from 'ng-zorro-antd/result';

@NgModule({
  exports: [NzButtonModule, NzIconModule, NzResultModule],
})
export class AntDesignComponentsModule {}
