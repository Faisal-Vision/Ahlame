import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError, of } from 'rxjs';
import { map, catchError, switchMap, finalize } from 'rxjs/operators';
import { AuthenticationService } from "../../services/Account/authentication.service"
import { LoadingService } from '../../services/loading/loading.service';
import { Router } from '@angular/router';
import { EnvService } from 'src/app/env.service';



@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        private loadingService: LoadingService,
        private envService: EnvService
    ) { }

 intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authenticationService.getToken();

    if (token) {
        request = request.clone({ 
            headers: request.headers.set('Authorization', 'Bearer ' + token) 
        });
    }

    if (!(request.body instanceof FormData)) {
        if (!request.headers.has('Content-Type')) {
            request = request.clone({ 
                headers: request.headers.set('Content-Type', 'application/json') 
            });
        }
    }

    this.loadingService.setLoading(true, request.url);

    return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {
            return event;
        }),
        catchError((error: HttpErrorResponse) => {
            if (error.url?.includes(this.envService.BACKEND_URL) && error.status === 401) {
                localStorage.clear();
                this.router.navigateByUrl('auth/login');
            }
            return throwError(() => error);
        }),
        finalize(() => this.loadingService.setLoading(false, request.url))
    );
}
}