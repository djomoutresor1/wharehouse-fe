import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { WarehouseBaseComponent } from 'src/app/base/warehouse-base/warehouse-base.component';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'warehouse-dashboard-sider',
  templateUrl: './dashboard-sider.component.html',
  styleUrls: ['./dashboard-sider.component.scss'],
  imports: [SharedModule],
  standalone: true
})
export class DashboardSiderComponent extends WarehouseBaseComponent implements OnInit {
  @Input() isCollapsed: boolean = false;
  @Output() handleOnNotifyNavigation: EventEmitter<string> =
    new EventEmitter<string>();

  constructor(injector: Injector) { super(injector); }

  override ngOnInit(): void {}

  handleOnNavigate(url: string) {
    this.handleOnNotifyNavigation.emit(url);
  }
}
