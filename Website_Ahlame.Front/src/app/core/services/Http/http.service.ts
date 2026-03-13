import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { IResponseResult } from '../../Interfaces/Shared/IResponseResult';
import { EnvService } from 'src/app/env.service';
import { SweetAlertService } from '../SweetAlert/sweet-alert.service';
import { environment } from 'src/environments/environment';
 import { lastValueFrom, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
// export class HttpService {

//   get currentLang(): string {
//     return localStorage.getItem('lang') || environment.defaultLang;
//   }

//   constructor(
//     private http: HttpClient,
//     private _sweetAlertService: SweetAlertService,
//     private envService: EnvService
//   ) {}

//   get<T>(apiName: string, param?: any): Promise<T> {
//     return lastValueFrom(
//       this.http.get<T>(`${this.envService.BACKEND_URL}${apiName}`, { params: param }).pipe(
//         catchError((error) => { this.errorHandling(); return throwError(() => error); }),
//         map((event: any) => event)
//       ), { defaultValue: null as T }
//     );
//   }

//   getBlob(apiName: string, param?: any): Promise<Blob> {
//     return lastValueFrom(
//       this.http.get(`${this.envService.BACKEND_URL}${apiName}`, {
//         params: param, responseType: 'blob'
//       }).pipe(
//         catchError((error) => { this.errorHandling(); return throwError(() => error); }),
//         map((event: any) => event)
//       ), { defaultValue: null as any }
//     );
//   }

//   post<T>(apiName: string, body?: any): Promise<T> {
//     return lastValueFrom(
//       this.http.post<T>(`${this.envService.BACKEND_URL}${apiName}`, body).pipe(
//         catchError((error) => { this.errorHandling(); return throwError(() => error); }),
//         map((event: any) => { this.alertHandling(event); return event; })
//       ), { defaultValue: null as T }
//     );
//   }

//   postAsGet<T>(apiName: string, body?: any): Promise<T> {
//     return lastValueFrom(
//       this.http.post<T>(`${this.envService.BACKEND_URL}${apiName}`, body).pipe(
//         catchError((error) => { this.errorHandling(); return throwError(() => error); }),
//         map((event: any) => event)
//       ), { defaultValue: null as T }
//     );
//   }

//   put<T>(apiName: string, body: any): Promise<T> {
//     return lastValueFrom(
//       this.http.put<T>(`${this.envService.BACKEND_URL}${apiName}`, body).pipe(
//         catchError((error) => { this.errorHandling(); return throwError(() => error); }),
//         map((event: any) => { this.alertHandling(event); return event; })
//       ), { defaultValue: null as T }
//     );
//   }

//   async delete<T>(apiName: string): Promise<T | undefined> {
//     const confirmed = await this._sweetAlertService.ConfirmDelete();
//     if (!confirmed) return undefined;
//     return lastValueFrom(
//       this.http.delete<T>(`${this.envService.BACKEND_URL}${apiName}`).pipe(
//         catchError((error) => { this.errorHandling(); return throwError(() => error); }),
//         map((event: any) => { this.alertHandling(event); return event; })
//       ), { defaultValue: undefined }
//     );
//   }

//   async confirmPost<T>(apiName: string, body: any): Promise<T | undefined> {
//     const confirmed = await this._sweetAlertService.ConfirmModifications();
//     if (!confirmed) return undefined;
//     return lastValueFrom(
//       this.http.post<T>(`${this.envService.BACKEND_URL}${apiName}`, body).pipe(
//         catchError((error) => { this.errorHandling(); return throwError(() => error); }),
//         map((event: any) => { this.alertHandling(event); return event; })
//       ), { defaultValue: undefined }
//     );
//   }

//   alertHandling(event: any): void {
//     if (!event) return;
//     const msg = this.currentLang === 'ar' ? event.arabicMessage : event.message;
//     event.success
//       ? this._sweetAlertService.AlertSuccess(msg)
//       : this._sweetAlertService.AlertError(msg);
//   }

//   errorHandling(): void {
//     this._sweetAlertService.AlertError(
//       this.currentLang === 'ar'
//         ? 'حدث خطأ ما يرجى المحاولة مرة اخرى'
//         : 'Something went wrong please try again'
//     );
//   }
// }

export class HttpService {
    currentLang: string = "";

    constructor(private http: HttpClient, private _sweetAlertService: SweetAlertService, private envService: EnvService) {
        this.currentLang = localStorage.getItem('lang') || environment.defaultLang;
    }


get<T>(apiName: string, param?: any): Promise<T> {
  return new Promise((resolve, reject) => {
    this.http.get<T>(`${this.envService.BACKEND_URL}${apiName}`, { params: param })
      .subscribe({
        next: (data) => resolve(data),
        error: (error) => {
          this.errorHandling();
          reject(error);
        }
      });
  });
}
    getBlob<Blob>(apiName: string, param?: any): Promise<Blob> {
        return this.http.get<IResponseResult>(`${this.envService.BACKEND_URL}${apiName}`, { params: param ,responseType: 'blob' as 'json'})
            .pipe(
                catchError((error: any) => {
                    console.error('An error occurred:', error);
                    this.errorHandling();
                    return throwError(error); // Re-throw the error to propagate it
                }),
                map((event: any) => {
                    return event;
                })
            ).toPromise();

    }

    post<T>(apiName: string, body?: any) {
        return this.http.post<IResponseResult>(`${this.envService.BACKEND_URL}${apiName}`, body)
            .pipe(
                catchError((error: any) => {
                    console.error('An error occurred:', error);
                    this.errorHandling();
                    return throwError(error); // Re-throw the error to propagate it
                }),
                map((event: any) => {
                    this.alertHandling(event);
                    return event;
                })
            ).toPromise();
    }

    postAsGet<T>(apiName: string, body?: any) {
        return this.http.post<IResponseResult>(`${this.envService.BACKEND_URL}${apiName}`, body)
            .pipe(
                catchError((error: any) => {
                    console.error('An error occurred:', error);
                    this.errorHandling();
                    return throwError(error); // Re-throw the error to propagate it
                }),
                map((event: any) => {
                    // this.alertHandling(event);
                    return event;
                })
            ).toPromise();
    }

    put<T>(apiName: string, body: any): Promise<any> {
        return this.http.put(`${this.envService.BACKEND_URL}${apiName}`, body)
            .pipe(
                catchError((error: any) => {
                    console.error('An error occurred:', error);
                    this.errorHandling();
                    return throwError(error); // Re-throw the error to propagate it
                }),
                map((event: any) => {
                    this.alertHandling(event);
                    return event;
                })
            ).toPromise();
    }

    async delete<T>(apiName: string): Promise<any> {
        var confirmResualt = await this._sweetAlertService.ConfirmDelete();
        if (confirmResualt) {
            return this.http.delete(`${this.envService.BACKEND_URL}${apiName}`)
                .pipe(
                    catchError((error: any) => {
                        console.error('An error occurred:', error);
                        this.errorHandling();
                        return throwError(error); // Re-throw the error to propagate it
                    }),
                    map((event: any) => {
                        this.alertHandling(event);
                        return event;
                    })
                ).toPromise();
        }
    }

    async confirmPost<T>(apiName: string,body:any): Promise<any> {
        var confirmResualt = await this._sweetAlertService.ConfirmModifications();
        if (confirmResualt) {
            return this.http.post(`${this.envService.BACKEND_URL}${apiName}`,body)
                .pipe(
                    catchError((error: any) => {
                        console.error('An error occurred:', error);
                        this.errorHandling();
                        return throwError(error); // Re-throw the error to propagate it
                    }),
                    map((event: any) => {
                        this.alertHandling(event);
                        return event;
                    })
                ).toPromise();
        }
    }

    alertHandling(event: any): void {
        if (event.success) {
            this._sweetAlertService.AlertSuccess(((this.currentLang == "ar") ? event.arabicMessage : event.message));
        }
        else {
            this._sweetAlertService.AlertError(((this.currentLang == "ar") ? event.arabicMessage : event.message));

        }
    }

    errorHandling(): void {
        this._sweetAlertService.AlertError(((this.currentLang == "ar") ? "حدث خطأ ما يرجى المحاولة مرة اخرى" : "Something went wrong please try again"));
    }
}
