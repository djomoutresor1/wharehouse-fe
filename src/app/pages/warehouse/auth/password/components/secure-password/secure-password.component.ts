import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ProgressType } from 'src/app/shared/enums/progress-type-enums';
import { Utils } from 'src/app/shared/enums/utils-enums';

@Component({
  selector: 'warehouse-secure-password',
  templateUrl: './secure-password.component.html',
  styleUrls: ['./secure-password.component.scss'],
})
export class SecurePasswordComponent implements OnInit {
  @Input() password: string = '';
  @Output() notifyOnPassword: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  hasLowerCase: boolean = false;
  hasUpperCase: boolean = false;
  hasNumber: boolean = false;
  hasSpecialCharacter: boolean = false;
  hasCorrectLength: boolean = false;
  progressPercent: number = 0;
  progressStatus: any;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    let currentPassword: string = changes['password'].currentValue;
    this.hasLowerCase = this.checkIfHasLowerCase(currentPassword);
    this.hasUpperCase = this.checkIfHasUpperCase(currentPassword);
    this.hasNumber = this.checkIfHasNumber(currentPassword);
    this.hasSpecialCharacter = this.checkIfHasSpecialCharacter(currentPassword);
    this.hasCorrectLength = this.checkIfHasCorrectLength(currentPassword);

    if (
      this.checkIfHasLowerCase(currentPassword) &&
      this.checkIfHasUpperCase(currentPassword)
    ) {
      this.progressPercent = 30;
      this.progressStatus = ProgressType.PROGRESS_EXCEPTION;
      if (this.checkIfHasNumber(currentPassword)) {
        this.progressPercent = 50;
        this.progressStatus = ProgressType.PROGRESS_EXCEPTION;
      }
      if (this.checkIfHasSpecialCharacter(currentPassword)) {
        this.progressPercent = 75;
        this.progressStatus = ProgressType.PROGRESS_ACTIVE;
      }
      if (this.checkIfHasCorrectLength(currentPassword)) {
        this.progressPercent = 100;
        this.progressStatus = ProgressType.PROGRESS_SUCCESS;
      }
    } else {
      this.progressPercent = 0;
      this.progressStatus = ProgressType.PROGRESS_NORMAL;
    }
    this.notifyOnPassword.emit(
      this.hasLowerCase &&
        this.hasUpperCase &&
        this.hasNumber &&
        this.hasSpecialCharacter &&
        this.hasCorrectLength
        ? true
        : false
    );
  }

  checkIfHasLowerCase(password: string): boolean {
    return password.toUpperCase() !== password ? true : false;
  }

  checkIfHasUpperCase(password: string): boolean {
    return password.toLowerCase() !== password ? true : false;
  }

  checkIfHasNumber(password: string): boolean {
    return /\d/.test(password);
  }

  checkIfHasSpecialCharacter(password: string): boolean {
    return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  }

  checkIfHasCorrectLength(password: string): boolean {
    return password?.length >= 8 && password?.length <= 30 ? true : false;
  }
}
