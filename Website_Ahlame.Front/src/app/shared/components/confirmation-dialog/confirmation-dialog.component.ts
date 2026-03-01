import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

import { LangService } from 'src/app/core/services/lang/lang.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {
  currentLang: any;
  userName: any;
  langSubscription!: Subscription;
  userSubscription!: Subscription;
  constructor(private _snackBar: MatSnackBar, private langService: LangService,
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router:Router
  ) { }
  ngOnInit(): void {

    this.langSubscription = this.langService.currentLang.subscribe(res => {
      this.currentLang = res;
    });
   
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteAccount() {
    // this.profileService.deleteAccount().subscribe((res: any) => {
    //   if (res.success) {
    //     this._snackBar.open(this.currentLang == 'en' ? res.message : res.arabicMessage, '', { duration: 2000 });
    //     localStorage.clear();
    //     this.userDataProfileService.updateUserDetails(null);
        
    //     localStorage.setItem("deleteAccount","true")
        
    //     setTimeout(() => {
    //       this.router.navigateByUrl('/home');
    //     }, 1000);
        
        
        

    //   }
    //   else {
    //     this._snackBar.open(this.currentLang == 'en' ? res.message : res.arabicMessage, '', { duration: 2000 });
    //   }
    // }
    // );
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.userSubscription.unsubscribe();
    this.langSubscription.unsubscribe();
  }
}

