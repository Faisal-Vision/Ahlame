import { Injectable } from "@angular/core";
import { HttpService } from "../Http/http.service";
import { IResponseResult } from "../../Interfaces/Shared/IResponseResult";


@Injectable({
  providedIn: "root",
})

export class ContactService{    
    constructor(public httpService: HttpService) {}

    GetAll() 
    {      
     let Url =`Contact/GetAll` ;
     return this.httpService.get<IResponseResult>(Url);
    }
      
    GetById(Id:number)
    {
     let Url =`Contact/GetById?id=${Id}`;
     return this.httpService.get<IResponseResult>(Url);
    }


    AddContact(body: any)
    {
     let Url =`Contact/AddContact` ;
     return this.httpService.post<IResponseResult>(Url, body);
    }

    UpdateContact(body: any)
    {
      let Url =`Contact/UpdateContact` ;
      return this.httpService.put<IResponseResult>(Url, body);
    }

    Delete(Id:number)
    {
     const url = `Contact/Delete?id=${Id}`;
     return this.httpService.delete<IResponseResult>(url);
    }
}