import { Injectable } from "@angular/core";
import { IResponseResult } from "../../Interfaces/Shared/IResponseResult";
import { HttpService } from "../Http/http.service";
import { HttpClient } from "@angular/common/http";
import { EnvService } from "src/app/env.service";


@Injectable({
    providedIn: "root",
})
export class SettingsService {
    constructor(public httpService: HttpService,
        private _httpClient:HttpClient,
        private envService: EnvService) 
        { }

    GetSettings() {
        let Url = `Setting/GetSettings`;
        return this.httpService.get<IResponseResult>(Url);
    }

    GetSignatures() {
        let Url = `Setting/GetSignatures`;
        return this.httpService.get<IResponseResult>(Url);
    }

    SaveSettings(body:any) {
        let Url = `Setting/SaveSettings`;
        return this.httpService.post<IResponseResult>(Url,body);
    }

    UpSertSignature(body:any) {
        let Url = this.envService.BACKEND_URL+`Setting/UpSertSignature`;
        return this._httpClient.post<IResponseResult>(Url,body).toPromise();
    }
}
