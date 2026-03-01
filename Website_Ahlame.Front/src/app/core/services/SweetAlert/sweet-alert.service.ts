import { Injectable } from "@angular/core";
import Swal from "sweetalert2";
import { TranslateService } from '@ngx-translate/core';



@Injectable({
  providedIn: "root",
})
export class SweetAlertService {

  constructor(private translate: TranslateService) { }

  AlertSuccess(message: string) {
    Swal.fire({
      text: message,
      icon: 'success',
      toast: true,
      animation: true,
      position: 'top-start',
      showConfirmButton: false,
      showCancelButton: false,
      showCloseButton: true,
      timer: 3000,
      
    });
  }

  AlertError(message: string) {
    Swal.fire({
      text: message,
      icon: 'error',
      toast: true,
      animation: true,
      position: 'top-start',
      showConfirmButton: false,
      showCancelButton: false,
      showCloseButton: true,
      timer: 3000
    });
  }

  ConfirmDelete(): Promise<boolean> {
    return Swal.fire({
      text: this.translate.instant("deletemessage"),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translate.instant("Yes"),
      cancelButtonText: this.translate.instant("No"),
    }).then((result) => {
      return result.isConfirmed;
    });
  }

  Confirm(msg: string): Promise<boolean> {
    return Swal.fire({
      text: msg,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translate.instant("Yes"),
      cancelButtonText: this.translate.instant("No"),
    }).then((result) => {
      return result.isConfirmed;
    });
  }

  ConfirmModifications(): Promise<boolean> {
    return Swal.fire({
      text: this.translate.instant("SureModifications"),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translate.instant("Yes"),
      cancelButtonText: this.translate.instant("No"),
    }).then((result) => {
      return result.isConfirmed;
    });
  }

}
