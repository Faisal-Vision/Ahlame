import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateFn } from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationService } from "src/app/core/services/Account/authentication.service";
import { LocalStorageService } from "src/app/core/services/Account/local-storage.service";
@Injectable({
  providedIn: "root",
})
class PermissionsService {

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authenticationService.IsLogin()) {
      const allowedRoles: number[] = next.data['allowedRoles'] || [];
      var userType = Number(localStorage.getItem('userType'));
      if (allowedRoles.length > 0 && (allowedRoles.includes(userType))) {
        return true;
      }
      else {
        if (allowedRoles.length == 0) { return true; }
        this.authenticationService.logout();
        return false;
      }

    }
    else { 
      this.authenticationService.logout();
      return false; 
    }



  }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(PermissionsService).canActivate(next, state);
}

