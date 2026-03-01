import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HomeService } from 'src/app/core/services/Home/home.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
 
  Islogin:boolean =false;

  constructor(private homeService:HomeService,
    private router: Router,
    public dialog: MatDialog,
    private translate: TranslateService){}

  ngOnInit(): void
  {
  
    //this.openRegisterPopup();
    // this.Islogin = this.authService.IsLogin();
    //localStorage.clear()
  
  }


}


