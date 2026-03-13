import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ContactService } from 'src/app/core/services/Contact/contact.service';
import { SweetAlertService } from 'src/app/core/services/SweetAlert/sweet-alert.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public contactForm!: FormGroup;
  formSubmitted = false;
  isLoading = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _contactService: ContactService,
    private _sweetAlertService: SweetAlertService, 
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.contactForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(250)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      subject: [''],
      message: ['', [Validators.required]]
    });
  }

  get formControl() {
    return this.contactForm.controls;
  }

  async onSubmit() {
    this.formSubmitted = true;
    
    if (!this.contactForm.valid) {
      return;
    }

    this.isLoading = true;

    try {
      let body = {
        id: 0,
        name: this.contactForm.get('name')?.value ?? '',
        email: this.contactForm.get('email')?.value ?? '',
        phone: this.contactForm.get('phone')?.value ?? '',
        subject: this.contactForm.get('subject')?.value ?? '',
        message: this.contactForm.get('message')?.value ?? '',
      };

      const result: any = await this._contactService.AddContact(body);
      
      if (result?.success) {
        this.contactForm.reset();
        this.formSubmitted = false;
      } 
    } catch (error) {
      console.error('Error sending message:', error);
      this._sweetAlertService.AlertSuccess(this.translate.instant("Sent successfully"));
        this.contactForm.reset();

    } finally {
      this.isLoading = false;
    }
  }
}
