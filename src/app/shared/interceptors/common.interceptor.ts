import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../enums/auth-enums';
import { WarehouseLocalStorage } from 'src/app/utils/warehouse-local-storage';
import { ResponseLoginModel } from 'src/model/auth/response/response-login-model';
import { Router } from '@angular/router';
import { Pages } from '../enums/pages-enums';
import { AuthorizationService } from 'src/app/services/auth/authorization.service';
import { ExternalApi } from '../enums/external-api-enums';

@Injectable()
export class CommonInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private warehouseLocalStorage: WarehouseLocalStorage,
    private authorizationService: AuthorizationService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log('url chiamato: ' + request.url);

    const user: ResponseLoginModel =
      this.warehouseLocalStorage.WarehouseGetTokenLocalStorage();
    const isApiUrl = request.url.startsWith(environment.apiBaseUrl);

    console.log('token: ', user?.token);
    // image will be save in localstorage and get it
    if (
      !request.url.endsWith(Auth.WAREHOUSE_LOGIN_USER) &&
      !request.url.endsWith(Auth.WAREHOUSE_REGISTER_USER) &&
      !request.url.includes(Auth.WAREHOUSE_DELETE_USER) &&
      !request.url.includes(Auth.WAREHOUSE_FORGOT_PASSWORD) &&
      !request.url.includes(Auth.WAREHOUSE_VERIFY_LINK) &&
      !request.url.includes(Auth.WAREHOUSE_RESET_PASSWORD) &&
      !request.url.endsWith(Auth.WAREHOUSE_UPLOAD_IMAGE) &&
      !request.url.endsWith(Auth.WAREHOUSE_VERIFICATION_EMAIL) &&
      !request.url.includes(Auth.WAREHOUSE_ACTIVATE_DESATTIVATE_USER) &&
      !request.url.endsWith(Pages.REGISTER_STEP_2) &&
      !request.url.includes(Pages.REGISTER_STEP_3) &&
      !request.url.includes(ExternalApi.WAREHOUSE_WORLD_COUNTRIES) &&
      !request.url.includes('../assets/i18n/')
    ) {
      if (user?.token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${user?.token}`,
            'Content-Type': Auth.WAREHOUSE_APPLICATION_JSON,
            REMOTE_USER: user?.userId, // Pass the userId or matricule generated in register fase for earch user in BE, TODO in BE
            refreshToken: user?.refreshToken,
            ROLES: user?.roles?.join(','), // Array of roles, want like this -> ROLE_USER,ROLE_ADMIN,ROLE_MODERATOR
          },
        });
      } else {
        this.router.navigate([`${Pages.WAREHOUSE}/${Pages.LOGIN}`]);
      }
    } else {
      // If user is already connected, and want to go to Login/Register page
      // Redirect to dashboard page.
      if (user?.token) {
        this.router.navigate([`${Pages.WAREHOUSE}/${Pages.DASHBOARD}`]);
      }
    }

    return next.handle(request);
  }
}
