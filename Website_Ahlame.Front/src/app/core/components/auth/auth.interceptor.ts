import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError, from } from 'rxjs';
import { map, catchError, switchMap, finalize } from 'rxjs/operators';
import { AuthenticationService } from "../../services/Account/authentication.service"
import { LoadingService } from '../../services/loading/loading.service';
import { Router } from '@angular/router';
import { EnvService } from 'src/app/env.service';



@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor( private authenticationService: AuthenticationService ,private router:Router,private loadingService: LoadingService, private AuthenticationService: AuthenticationService,private envService: EnvService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return from(this.authenticationService.getToken())
      .pipe(
          switchMap(token => {

              if (token) {
                  request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
              }

              // Check if the request body contains form data
                if (request.body instanceof FormData) {

                } else {
                    if (!request.headers.has('Content-Type')) {
                        request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
                    }
                }

              this.loadingService.setLoading(true, request.url);
              return next.handle(request).pipe(
                  map((event: HttpEvent<any>) => {
                      if (event instanceof HttpResponse) {
                      }

                      return event;
                  },(err: any)=>{
                  }),
                  catchError((error: HttpErrorResponse) => {

                      if(error.url?.includes(this.envService.BACKEND_URL) && error.status == 401){

                            localStorage.clear();
                            // this.router.navigateByUrl(`auth/sign-in`);
                           // this.events.publish('unAuthorizedUser',true);

                    }

                      return throwError(error);
                  }),
                  finalize(() => this.loadingService.setLoading(false, request.url))
              );
          })
      );
    }
}
