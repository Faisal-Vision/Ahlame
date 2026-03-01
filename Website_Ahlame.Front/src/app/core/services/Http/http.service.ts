import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IResponseResult } from '../../Interfaces/Shared/IResponseResult';
import { EnvService } from 'src/app/env.service';
import { SweetAlertService } from '../SweetAlert/sweet-alert.service';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class HttpService {
    currentLang: string = "";

    constructor(private http: HttpClient, private _sweetAlertService: SweetAlertService, private envService: EnvService) {
        this.currentLang = localStorage.getItem('lang') || environment.defaultLang;
    }

    get<T>(apiName: string, param?: any): Promise<T> {
        return this.http.get<IResponseResult>(`${this.envService.BACKEND_URL}${apiName}`, { params: param })
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
