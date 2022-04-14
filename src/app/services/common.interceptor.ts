import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProfilService } from './profil.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class CommonInterceptor implements HttpInterceptor {
  constructor(private profilService: ProfilService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log('url chiamato: ' + request.url);

    const token = this.profilService.getAuthToken();
    const isApiUrl = request.url.startsWith(environment.apiBaseUrl);

    if (token && isApiUrl) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }

    return next.handle(request);
  }
}
