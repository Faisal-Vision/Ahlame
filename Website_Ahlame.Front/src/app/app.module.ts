import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './core/components/footer/footer.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { LayoutComponent } from './core/components/layout/layout.component';
import { SharedModule } from './shared/shared.module';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { register } from 'swiper/element/bundle';
import { UserMenuComponent } from './core/components/navbar/user-menu/user-menu.component';
import { HttpService } from './core/services/Http/http.service';
import { HttpConfigInterceptor } from "./core/components/auth/auth.interceptor";
import { LottieModule } from 'ngx-lottie';
import { MobUserMenuComponent } from './core/components/navbar/mob-user-menu/mob-user-menu.component';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import {SideMenuComponent} from './core/components/side-menu/side-menu.component'
import { EnvServiceProvider } from "./env.service.provider";
import { TopHeaderComponent } from './core/components/top-header/top-header.component';
import { MobileNavComponent } from './modules/mobile-nav/mobile-nav.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';

register();
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    LayoutComponent,
    UserMenuComponent,
    MobUserMenuComponent,
    SideMenuComponent,
    TopHeaderComponent,
    MobileNavComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
    BrowserAnimationsModule,
    LottieModule.forRoot({ player: playerFactory }),
    LazyLoadImageModule
],
  providers: [
    EnvServiceProvider,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    TranslateService, HttpService,{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpConfigInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
export function playerFactory() {
  return import(/* webpackChunkName: 'lottie-web' */ 'lottie-web');
}
