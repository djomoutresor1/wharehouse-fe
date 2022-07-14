import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TablesService } from 'src/app/services/tables.service';
import { AlertType } from 'src/app/shared/enums/alert-type-enums';
import { Models } from '../../../model/populateModel';

@Component({
  selector: 'corsiaTable',
  templateUrl: './corsia-table.component.html',
  styleUrls: [
    './corsia-table.component.scss',
    '../rack-table/rack-table.component.scss',
  ],
})
export class CorsiaTableComponent implements OnInit {
  // rowsTable: LaneModel[] = [];
  lanes: any;
  laanes: any;
  corsiaTable: any;
  rackTable: any;
  alertType: string = '';
  messageAlert: string = '';
  okText: string = '';
  isExpiredToken: boolean = false;
  descriptionAlert: string = '';
  isAuth: boolean = false;

  constructor(
    private tablesService: TablesService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.tablesService.getDataTable().subscribe(
      (response) => {
        console.log('response2: ', response);
        this.lanes = response.lanes[0].rows;
        this.laanes = this.lanes[0].shelves;
        this.corsiaTable = this.lanes.forEach((element: any) => {
          console.log('corsiaTable10: ', element.row);
        });
        console.log('response5: ', this.laanes);
      },
      (error: HttpErrorResponse) => {
        if (error.status === 403) {
          // Expiration token
          this.alertType = AlertType.ALERT_WARNING;
          this.okText = this.translate.instant('message.timeout.cta');
          this.messageAlert = this.translate.instant('message.timeout.title');
          this.descriptionAlert = this.translate.instant(
            'message.timeout.description'
          );
          this.isExpiredToken = true;
        } else {
          console.log('Error: ', error);
          this.errorAlertType(error?.error?.message);
        }
      }
    );
  }

  errorAlertType(message: string): void {
    this.isAuth = true;
    this.alertType = AlertType.ALERT_ERROR;
    this.messageAlert = message;
  }
}
