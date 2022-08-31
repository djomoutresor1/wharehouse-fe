import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { WarehouseBaseComponent } from 'src/app/base/warehouse-base/warehouse-base.component';
import { AlertType } from 'src/app/shared/enums/alert-type-enums';
import { StatusType } from 'src/app/shared/enums/status-type-enums';
import { Utils } from 'src/app/shared/enums/utils-enums';
import { ResponseUserDataModel } from 'src/model/auth/response/response-user-data-model';
import * as XLSX from 'xlsx';

@Component({
  selector: 'warehouse-advanced-filters',
  templateUrl: './advanced-filters.component.html',
  styleUrls: ['./advanced-filters.component.scss'],
})
export class AdvancedFiltersComponent
  extends WarehouseBaseComponent
  implements OnInit
{
  @Input() tmpUsers: ResponseUserDataModel[] = [];
  @Input() warehouseUsers: ResponseUserDataModel[] = [];
  @Output() handleOnNotifyUsersFiltered: EventEmitter<ResponseUserDataModel[]> =
    new EventEmitter<ResponseUserDataModel[]>();
  @Output() handleOnNotifyResetFilter: EventEmitter<any> =
    new EventEmitter<any>();

  searchForm!: FormGroup;

  usersFiltered: ResponseUserDataModel[] = [];
  search: string = '';
  selectedStatus: string = 'all';
  selectedRole: string = 'all';
  selectedTypeEmail: string = 'all';

  listOfTypeEmailVerification = [
    {
      label: this.translate.instant('dataTable.status.all'),
      value: Utils.WAREHOUSE_PREFIX_ALL,
    },
    { label: this.translate.instant('profile.verified'), value: true },
    { label: this.translate.instant('profile.notVerified'), value: false },
  ];
  listOfStatus = [
    {
      label: this.translate.instant('dataTable.status.all'),
      value: Utils.WAREHOUSE_PREFIX_ALL,
      style: '',
    },
    {
      label: this.translate.instant('dataTable.status.active'),
      value: StatusType.STATUS_ACTIVE,
      style: AlertType.ALERT_SUCCESS,
    },
    {
      label: this.translate.instant('dataTable.status.pending'),
      value: StatusType.STATUS_PENDING,
      style: AlertType.ALERT_WARNING,
    },
    {
      label: this.translate.instant('dataTable.status.disabled'),
      value: StatusType.STATUS_DISABLED,
      style: AlertType.ALERT_ERROR,
    },
  ];
  listOfRoles = [
    {
      label: this.translate.instant('dataTable.status.all'),
      value: Utils.WAREHOUSE_PREFIX_ALL,
    },
    { label: 'Admin', value: Utils.ROLE_ADMIN },
    { label: 'User', value: Utils.ROLE_USER },
    { label: 'Moderator', value: Utils.ROLE_MODERATOR },
  ];

  constructor(injector: Injector) {
    super(injector);
  }

  override ngOnInit(): void {
    this.initSearch();
  }

  handleOnSearchUsers() {
    let search = this.searchForm.controls['search']?.value;
    let typeEmailVerification =
      this.searchForm.controls['typeEmailVerification']?.value;
    let status = this.searchForm.controls['status']?.value;
    let role = this.searchForm.controls['role']?.value;
    let createdAtStart = moment(
      this.searchForm.controls['createdAt']?.value?.[0]
    ).format(this.dateFormatTwo);
    let createdAtEnd = moment(
      this.searchForm.controls['createdAt']?.value?.[1]
    ).format(this.dateFormatTwo);

    let now = moment(new Date()).format(this.dateFormatTwo);
    
    this.handleOnSearchUser(search);
    this.handleOnSelectRole(role);
    this.handleOnSelectTypeEmailVerification(typeEmailVerification);
    this.handleOnSelectStatus(status);
    if(now !== createdAtStart && now !== createdAtEnd) {
      this.handleOnSelectCreatedAt(createdAtStart, createdAtEnd);
    }
    this.handleOnNotifyUsersFiltered.emit(this.usersFiltered);
  }

  handleOnSearchUser(search: string) {
    if (search) {
      this.usersFiltered = this.tmpUsers.filter(
        (user: ResponseUserDataModel) =>
          user.user.fullname.toLowerCase().indexOf(search.toLowerCase()) >= 0 ||
          user.user.email.toLowerCase().indexOf(search.toLowerCase()) >= 0
      );
    } else {
      this.usersFiltered = this.tmpUsers;
    }
  }

  handleOnSelectTypeEmailVerification(typeEmailVerification: boolean | string) {
    if (typeEmailVerification === Utils.WAREHOUSE_PREFIX_ALL) {
      this.usersFiltered = this.usersFiltered;
    } else {
      this.usersFiltered = this.usersFiltered?.filter(
        (user: ResponseUserDataModel) =>
          user.user.active === typeEmailVerification
      );
    }
  }

  handleOnSelectStatus(status: string) {
    if (status === Utils.WAREHOUSE_PREFIX_ALL) {
      this.usersFiltered = this.usersFiltered;
    } else {
      this.usersFiltered = this.usersFiltered?.filter(
        (user: ResponseUserDataModel) => user.userInfo.status === status
      );
    }
  }

  handleOnSelectCreatedAt(start: string, end: string) {
    this.usersFiltered = this.usersFiltered?.filter(
      (user: ResponseUserDataModel) =>
        new Date(user.user.createdAt.split(' ')[0]).getTime() >=
          new Date(start).getTime() &&
        new Date(user.user.createdAt.split(' ')[0]).getTime() <=
          new Date(end).getTime()
    );
  }

  handleOnSelectRole(role: string) {
    if (role === Utils.WAREHOUSE_PREFIX_ALL) {
      this.usersFiltered = this.usersFiltered;
    } else {
      this.usersFiltered = this.usersFiltered?.filter(
        (user: ResponseUserDataModel) => {
          return user.user.roles
            .map((userRole: any) => {
              return userRole?.name;
            })
            .includes(role.toUpperCase());
        }
      );
    }
  }

  handleOnResetFilter() {
    this.search = '';
    this.initSearch();
    this.usersFiltered = [];
    this.handleOnNotifyResetFilter.emit();
  }

  handleOnSearchClear() {
    this.search = '';
    this.searchForm.controls['search'].reset();
    this.handleOnSearchUsers();
  }

  getUserStatusSelected(value: string) {
    return this.listOfStatus.find((element) => element?.value === value)?.style;
  }

  initSearch() {
    this.searchForm = this.fb.group({
      search: '',
      typeEmailVerification: Utils.WAREHOUSE_PREFIX_ALL,
      status: Utils.WAREHOUSE_PREFIX_ALL,
      role: Utils.WAREHOUSE_PREFIX_ALL,
      createdAt: [],
    });
  }

  handleOnExportUsers() {
    let users = !!this.usersFiltered?.length
      ? this.usersFiltered
      : this.warehouseUsers;
    const csvUser = users?.map((user: ResponseUserDataModel) => {
      return {
        UserID: user.user.userId,
        FullName: user.user.fullname,
        Pseudo: user.user.username,
        Gender: user.user.gender,
        Email: user.user.email,
        EmailPEC: user.user.emailPec,
        EmailVerification: user.user.active,
        Status: user.userInfo.status,
        Roles: user.user.roles.map((role: any) => role?.name).join(','),
        DateOfBirth: user.user.dateOfBirth,
        Country: user.userAddress.country,
        State: user.userAddress.state,
        ZipCode: user.userAddress.zipCode,
        AddressLine: user.userAddress.addressLine,
        Phone: user.userContact.phonePrefix
          ? user.userContact.phonePrefix + ' ' + user.userContact.phoneNumber
          : '',
        Landline: user.userContact.landlinePrefix
          ? user.userContact.landlinePrefix +
            ' ' +
            user.userContact.landlineNumber
          : '',
        LastLogin: user.user.lastLogin,
        CreatedAt: user.user.createdAt,
      };
    });
    const workBook = XLSX.utils.book_new(); // Create a new blank book
    const workSheet = XLSX.utils.json_to_sheet(csvUser);

    XLSX.utils.book_append_sheet(workBook, workSheet, 'Users WareHouse System'); // Add the worksheet to the book
    XLSX.writeFile(workBook, 'warehouse_users.xlsx'); // Initiate a file download in browser
  }
}
