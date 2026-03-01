import { Injectable } from "@angular/core";
import { HttpService } from "../Http/http.service";
import { IResponseResult } from "../../Interfaces/Shared/IResponseResult";

@Injectable({
  providedIn: "root",
})
export class HomeService {
  constructor(public httpService: HttpService) {}

  GetHomeData(OrganizationId :number) {
    let Url =`Home/GetHomeData?OrganizationId=${OrganizationId}` ;
    return this.httpService.get<IResponseResult>(Url);
  }
  
  
  
}
