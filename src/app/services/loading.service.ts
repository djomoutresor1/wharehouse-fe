import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  errorMessage = new BehaviorSubject('none');

  isLoading = new BehaviorSubject(false);

  constructor() {}

  getErrorMessage() {
    return this.errorMessage;
  }
}
