import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { PopupComponent } from 'src/app/shared/components/popup/popup.component';
import { environment } from 'src/environments/environment';
import { ContactService } from 'src/app/core/services/Contact/contact.service';

@Component({
  selector: 'app-contact-admin',
  templateUrl: './contact-admin.component.html',
  styleUrls: ['./contact-admin.component.scss']
})
export class ContactAdminComponent {

  public Form!: FormGroup;
  currentLang: string = "";
  userList: any = [];
  selectedId: number = 0;

  @ViewChild('popupContent') popupContent = {} as TemplateRef<any>;

  constructor(
    private _formBuilder: FormBuilder,
    private _contactService: ContactService,
    private translate: TranslateService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.currentLang = localStorage.getItem('lang') || environment.defaultLang;
    this.getAllUsers();
  }

  async getAllUsers() {
    const result: any = await this._contactService.GetAll();
    if (result.success) {
      this.userList = result.returnObject;
    }
  }

  buildForm() {
    this.Form = this._formBuilder.group({
      id:      new FormControl(0, [Validators.required]),
      name:    new FormControl('', [Validators.required, Validators.maxLength(250)]),
      email:   new FormControl('', [Validators.required, Validators.email]),
      phone:   new FormControl(''),
      subject: new FormControl(''),
      message: new FormControl('', [Validators.required]),
    });
  }

  get formControl() {
    return this.Form.controls;
  }

  async openPoupp(id: number) {
    this.buildForm();
    if (id > 0) {
      const result: any = await this._contactService.GetById(id);
      if (result?.success) {
        this.selectedId = result.returnObject.id;
        this.Form.get('name')?.setValue(result?.returnObject?.name);
        this.Form.get('email')?.setValue(result?.returnObject?.email);
        this.Form.get('phone')?.setValue(result?.returnObject?.phone);
        this.Form.get('subject')?.setValue(result?.returnObject?.subject);
        this.Form.get('message')?.setValue(result?.returnObject?.message);
      }
    } else {
      this.selectedId = 0;
      this.Form.get('name')?.setValue('');
      this.Form.get('email')?.setValue('');
      this.Form.get('phone')?.setValue('');
      this.Form.get('subject')?.setValue('');
      this.Form.get('message')?.setValue('');
    }
    this.dialog.open(PopupComponent, {
      data: {
        header: id > 0 ? this.translate.instant("edit") : this.translate.instant("add"),
        submitButtonText: this.translate.instant("save"),
        dismissButtonText: this.translate.instant("cancel"),
        contentTemplateRef: this.popupContent,
        submitHandler: () => {
          if (id == 0)
            this.Add();
          else
            this.Edit();
        },
        dismissHandler: () => {

        },
      },
      panelClass: 'modal-dialog',
    });
  }

  async Add() {
    if (!this.Form.valid)
      return;
    let body = {
      id: 0,
      name:    this.Form.get('name')?.value ?? '',
      email:   this.Form.get('email')?.value ?? '',
      phone:   this.Form.get('phone')?.value ?? '',
      subject: this.Form.get('subject')?.value ?? '',
      message: this.Form.get('message')?.value ?? '',
    };
    const result: any = await this._contactService.AddContact(body);
    if (result?.success) {
      this.getAllUsers();
      this.dialog.closeAll();
    }
  }

  async Edit() {
    if (!this.Form.valid)
      return;
    let body = {
      id:      this.selectedId,
      name:    this.Form.get('name')?.value ?? '',
      email:   this.Form.get('email')?.value ?? '',
      phone:   this.Form.get('phone')?.value ?? '',
      subject: this.Form.get('subject')?.value ?? '',
      message: this.Form.get('message')?.value ?? '',
    };
    const result: any = await this._contactService.UpdateContact(body);
    if (result?.success) {
      this.getAllUsers();
      this.dialog.closeAll();
    }
  }

  async Delete(Id: number) {
    const result: any = await this._contactService.Delete(Id);
    if (result.success) {
      this.dialog.closeAll();
      this.getAllUsers();
    }
  }

}