import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
// import { UserType } from 'src/app/enums/user-type';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  hide: boolean = false;
  constructor(private router: Router) {
  }

  // isAdmin() {
  //   let userType = Number(localStorage.getItem('userType'));
  //   return userType == UserType.Admin;
  // }

  // isSuperAdmin() {
  //   let userType = Number(localStorage.getItem('userType'));
  //   return userType == UserType.SuperAdmin;
  // }
}
