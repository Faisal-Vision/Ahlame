import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { BannerAreaComponent } from '../banner-area/banner-area.component';
import { NavbarComponent } from 'src/app/core/components/navbar/navbar.component';
import { ServiceAreaComponent } from '../service-area/service-area.component';
import { AboutAreaComponent } from '../about-area/about-area.component';
import { CounterAreaComponent } from '../counter-area/counter-area.component';
import { CaseAreaComponent } from '../case-area/case-area.component';
import { OfferAreaComponent } from '../offer-area/offer-area.component';
import { ProcessAreaComponent } from '../process-area/process-area.component';
import { FooterComponent } from '../footer/footer.component';
import { ServiceComponent } from './components/service/service.component';
import { ServiceDetailsComponent } from './components/service-details/service-details.component';
import { CaseListComponent } from './components/case-list/case-list.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { Error404Component } from './components/error-404/error-404.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { ContactAdminComponent } from '../contact-admin/contact-admin.component';
import { AuthGuard } from 'src/app/shared/guard/admin.guard';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent  // ✅ HomeComponent يحتوي على كل الـ sub-components
  },
  {
    path: 'service',
    component: ServiceComponent
  },
  {
    path: 'service-details/:name',
    component: ServiceDetailsComponent
  },
  {
    path: 'case',
    component: CaseListComponent
  },
  {
    path: 'case/:id',
    component: CaseListComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'terms-and-conditions',
    component: TermsAndConditionsComponent
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'contact-admin',
    component: ContactAdminComponent,
      canActivate: [AuthGuard]  

  },
  { path: '**', component: Error404Component, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }