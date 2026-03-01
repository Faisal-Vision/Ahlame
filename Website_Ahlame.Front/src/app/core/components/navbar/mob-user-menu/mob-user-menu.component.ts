import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/core/services/Account/authentication.service';
import { LangService } from 'src/app/core/services/lang/lang.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mob-user-menu',
  templateUrl: './mob-user-menu.component.html',
  styleUrls: ['./mob-user-menu.component.scss']
})
export class MobUserMenuComponent {
  viewMenu: boolean = false;
  userProfileImageUrl = "";
  userName = "";
  loggedIn = false;
  currentLang = '';
  darkTheme: any;
  constructor(public dialog: MatDialog, private langService: LangService, private lang: LangService,

    private router: Router,private authService: AuthenticationService,private translate: TranslateService) { }
  ngOnInit(): void {
    var localStorageTheme = localStorage.getItem('theme');
    if(localStorageTheme == 'dark')
    {

      this.darkTheme = true;

    this.langService.currentTheme.next('dark' );
    localStorage.setItem('theme', 'dark' );
    }
    else
    {
      this.darkTheme = false;

    this.langService.currentTheme.next('light');
    localStorage.setItem('theme',  'light');
    }


    this.currentLang = localStorage.getItem('lang') || environment.defaultLang;

    if(this.currentLang=="ar")
      {
        this.userName = localStorage.getItem('nameAr') || '';
      }
      else{
        this.userName = localStorage.getItem('nameEn') || '';
      }



  }



 
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
   // this.userSubscription.unsubscribe();
    //this.langSubscription.unsubscribe();
    this.viewMenu = false;
  }

  logout()
  {

    // this.authService.logout().subscribe(res=>{
    //   if(res)
    //   {

    //    localStorage.removeItem("StudentData");

    //     sessionStorage.clear();
    //     localStorage.clear();

    //     this.router.navigate([`/sign-in`]);
    //   }
    // })
  }

  changeLanguage() {
    const lang = this.currentLang == 'ar' ? 'en' : 'ar'
    this.currentLang = lang
    this.lang.langChanged(lang)
  }

  goToLogin()
  {
    this.router.navigate([`/sign-in`]);
  }

  toggleDarkTheme(): void {
    this.darkTheme = document.body.classList.toggle('dark');
    this.langService.currentTheme.next(this.darkTheme ? 'dark' : 'light');
    localStorage.setItem('theme', this.darkTheme ? 'dark' : 'light');
  }


  navigateToProfile(){

    this.router.navigate(['/profile']);
  }


  toggleMenu(){
    this.viewMenu = !this.viewMenu;
  }
}
