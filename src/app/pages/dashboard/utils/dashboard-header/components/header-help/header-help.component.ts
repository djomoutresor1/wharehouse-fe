import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { WarehouseBaseComponent } from 'src/app/base/warehouse-base/warehouse-base.component';

@Component({
  selector: 'warehouse-header-help',
  templateUrl: './header-help.component.html',
  styleUrls: ['./header-help.component.scss'],
})
export class HeaderHelpComponent extends WarehouseBaseComponent implements OnInit {
  @Input() title: string = '';
  @Input() visible: boolean = false;
  @Output() handleOnNotifyCloseDrawerHelp: EventEmitter<any> =
    new EventEmitter<any>();

  sizeDrawerHelp: number = 500;
  childrenSizeDrawerHelp: number = 400;
  showMoreHelp: boolean = false;
  childrenVisible: boolean = false;

  constructor(injector: Injector) {
    super(injector);
  }

  override ngOnInit(): void {}

  handleOnCloseDrawerHelp() {
    this.handleOnNotifyCloseDrawerHelp.emit();
  }

  handleOnOpenChildren() {
    this.childrenVisible = true;
  }

  handleOnShowMore() {
    this.showMoreHelp = !this.showMoreHelp;
  }

  handleOnCloseChildren() {
    this.childrenVisible = false;
  }
}
