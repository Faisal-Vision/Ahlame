import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LangService {
  currentLang: BehaviorSubject<string> = new BehaviorSubject('en');
  currentTheme: BehaviorSubject<string> = new BehaviorSubject(localStorage.getItem('theme') ?? environment.defaultTheme);
  constructor(private translate: TranslateService) { }

  langChanged(lang: any) {
    const elEn = document.querySelector('#bootstrap-en');
    const elAr = document.querySelector('#bootstrap-ar');
    this.translate.use(lang)
    if (lang === 'ar') {
      // add bootstrap ar
      elEn && elEn.remove();

      this.generateLinkElement({
        id: 'bootstrap-ar',
        href: 'assets/vendor/bootstrap/bootstrap.rtl.min.css',
        dir: 'rtl',
        lang: 'ar',
      });

    } else {
      // en
      elAr && elAr.remove();
      this.generateLinkElement({
        id: 'bootstrap-en',
        href: 'assets/vendor/bootstrap/bootstrap.min.css',
        dir: 'ltr',
        lang: 'en',
      });
    }
    localStorage.setItem('lang', lang);
    this.currentLang.next(lang);
  }
  generateLinkElement(props: any) {
    const el = document.createElement('link');
    const htmlEl = document.getElementsByTagName('html')[0];
    el.rel = 'stylesheet';
    el.href = props.href;
    el.id = props.id;
    document.head.prepend(el);
    htmlEl.setAttribute('dir', props.dir);
    htmlEl.setAttribute('lang', props.lang);
    // this.loaderService.isLoading.next(false);
  }


  
}
