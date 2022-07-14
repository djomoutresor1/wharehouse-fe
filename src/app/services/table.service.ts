import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LaneModel } from 'src/model/corsia/lane-model';
import { LanesModel } from 'src/model/corsia/lanes-model';
import { AlertType } from '../shared/enums/alert-type-enums';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  data: LaneModel[] = [];
  alertType: string = '';
  messageAlert: string = '';
  okText: string = '';
  isExpiredToken: boolean = false;
  descriptionAlert: string = '';
  isAuth: boolean = false;

  constructor(private http: HttpClient, private translate: TranslateService) {}

  public getDataTable() {
    return this.http.get<LanesModel>('../assets/mocks/dashboard.json');
  }

  ngOnInit(): void {
    this.getDataTable().subscribe(
      (response) => {
        console.log('response: ', response);
        this.data = response.lanes;
        console.log('dataTable: ', response.lanes);
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
