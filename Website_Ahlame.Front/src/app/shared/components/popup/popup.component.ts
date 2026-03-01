import { Component, Inject, ViewChild, ViewContainerRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements AfterViewInit {

  @ViewChild('popupContent', { read: ViewContainerRef }) popupContent: ViewContainerRef = {} as ViewContainerRef;

  constructor(public dialogRef: MatDialogRef<any>,@Inject(MAT_DIALOG_DATA) public data: any,private cdr: ChangeDetectorRef) 
  { }

  ngAfterViewInit(): void {
    // Clear existing content
    this.popupContent?.clear();

    // Render the content template
    if (this.data?.contentTemplateRef) {
      this.popupContent.createEmbeddedView(this.data?.contentTemplateRef);
      this.cdr.detectChanges();
    }
  }

   handleSubmit(): void {
    if (this.data.submitHandler) {
      this.data.submitHandler();
    }
   // this.dialogRef.close();
  }
 
  handleDismiss(): void {
    if (this.data.dismissHandler) {
      this.data.dismissHandler();
    }
     this.dialogRef.close();
   }

}
