import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { WarehouseBaseComponent } from 'src/app/base/warehouse-base/warehouse-base.component';
import { StatusType } from 'src/app/shared/enums/status-type-enums';
import { ResponseHelpModel } from 'src/model/configuration/response/response-help-model';

@Component({
  selector: 'warehouse-header-help',
  templateUrl: './header-helps.component.html',
  styleUrls: ['./header-helps.component.scss'],
})
export class HeaderHelpsComponent
  extends WarehouseBaseComponent
  implements OnInit
{
  @Input() title: string = '';
  @Input() visible: boolean = false;
  @Output() handleOnNotifyCloseDrawerHelp: EventEmitter<any> =
    new EventEmitter<any>();

  helps!: ResponseHelpModel[];
  help!: ResponseHelpModel;
  tmpHelps!: ResponseHelpModel[];
  search!: string;

  sizeDrawerHelp: number = 600;
  childrenSizeDrawerHelp: number = 500;
  showMoreHelp: boolean = false;
  childrenVisible: boolean = false;

  constructor(injector: Injector) {
    super(injector);
  }

  override ngOnInit(): void {
    this.handleOnGetHelps();
  }

  handleOnGetHelps() {
    this.configurationService.getAllHelps().subscribe(
      (response: ResponseHelpModel[]) => {
        this.helps = response.filter(
          (help) => help.status.toLocaleLowerCase() === StatusType.STATUS_ACTIVE
        );
        this.tmpHelps = this.helps;
      },
      (error: HttpErrorResponse) => {
        if (error.status === 403) {
          // Expiration token
          this.expirationToken();
        } else {
          this.errorAlertType(error?.error.message);
        }
      }
    );
  }

  handleOnSearchHelps() {
    if (this.search) {
      this.helps = this.tmpHelps.filter(
        (help: ResponseHelpModel) =>
          help.title.toLowerCase().indexOf(this.search.toLowerCase()) >= 0 ||
          help.description.toLowerCase().indexOf(this.search.toLowerCase()) >= 0
      );
    } else {
      this.helps = this.tmpHelps;
    }
  }

  handleOnCloseDrawerHelp() {
    this.handleOnNotifyCloseDrawerHelp.emit();
  }

  handleOnOpenChildren(help: ResponseHelpModel) {
    this.childrenVisible = true;
    this.help = help;
  }

  handleOnShowMore() {
    this.showMoreHelp = !this.showMoreHelp;
  }

  handleOnCloseChildren() {
    this.childrenVisible = false;
  }
}
