import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { LangService } from 'src/app/core/services/lang/lang.service';

@Directive({
  selector: '[setRtl]'
})
export class RtlDirective {

  constructor(private elRef: ElementRef, private renderer: Renderer2, private lang: LangService) {
    this.switchClassBasedOnLanguage();
  }

  /*Switch rtl class based on the chosen language from Translation Service*/
  switchClassBasedOnLanguage() {
    this.lang.currentLang.subscribe(lang => {
      lang === 'ar' ? this.renderer.addClass(this.elRef.nativeElement, 'rtl') : this.renderer.removeClass(this.elRef.nativeElement, 'rtl');
    });
  }
}
