import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './sun-modules/material/material.module';
import { TextComponent } from './components/text/text.component';
import { BadgeComponent } from './components/badge/badge.component';
import { ButtonComponent } from './components/button/button.component';
import { ActionButtonComponent } from './components/action-button/action-button.component';
import { ImageComponent } from './components/image/image.component';
import { UserRateComponent } from './components/user-rate/user-rate.component';
import { RtlDirective } from './directive/rtl.directive';
import { ThemeDirective } from './directive/theme.directive';
import { BackToBtnComponent } from './components/back-to-btn/back-to-btn.component';

import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { InputComponent } from './components/input/input.component';
import { RadioComponent } from './components/radio/radio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ValidationHandlerPipe } from './pipes/validation-handler.pipe';
import { PageBreadcrumbComponent } from './components/page-breadcrumb/page-breadcrumb.component';
import { PopupComponent } from './components/popup/popup.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ConfettiComponent } from './components/confetti/confetti.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { LazyLoadImageComponent } from './components/lazy-load-image/lazy-load-image.component';


const MODULES = [
  CommonModule,
  HttpClientModule,
  TranslateModule,
  MaterialModule,
  FormsModule,
  ReactiveFormsModule,
  LazyLoadImageModule,
]
const COMPONENTS = [
  TextComponent,
  BadgeComponent,
  ButtonComponent,
  ActionButtonComponent,
  ImageComponent,
  UserRateComponent,
  RtlDirective,
  ThemeDirective,
  BackToBtnComponent,
  ConfirmationDialogComponent,
  InputComponent,
  RadioComponent,
  ValidationHandlerPipe,
  PageBreadcrumbComponent,
  PopupComponent,
  PaginationComponent,
  ConfettiComponent,
  LazyLoadImageComponent
]

@NgModule({
  declarations: [
    ...COMPONENTS,

  ],
  imports: [
    ...MODULES,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    })
  ],
  exports: [
    ...MODULES,
    ...COMPONENTS
  ]
})
export class SharedModule { }
