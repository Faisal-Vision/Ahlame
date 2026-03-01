
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../Http/http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(public httpService: HttpService,private router:Router) { }

  isAuthenticated(): Promise<boolean> {
    //TODO:  check token exist in storage
    return new Promise((resolve, reject) => {
      resolve(this.IsLogin());
    });
  }

  getToken(): Promise<string>
 {

    return new Promise((resolve, reject) => {
      var token  = "";

      var data = localStorage.getItem("token");
      if(data)
      token = data?data:"";
      resolve(token);
    });
  }

  login(studentLoginVM: any)
  {
    return this.httpService.post("Account/Login", studentLoginVM);
  }

  loginSSO(studentLoginVM: any)
  {
    return this.httpService.post("Account/LoginSSO", studentLoginVM);
  }

  logout()
  {
    localStorage.clear();
    // this.router.navigateByUrl(`auth/sign-in`);
    //return this.httpService.get("Account/StudentLogout");
  }

  IsLogin():boolean
  {
    const storedValue = localStorage.getItem("token");
    if (storedValue !== null)
      return true;
    else
    {
      // this.router.navigateByUrl(`auth/sign-in`);
      return false;
    }
  }
}
