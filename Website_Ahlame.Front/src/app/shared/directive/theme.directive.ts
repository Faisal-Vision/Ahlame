import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { LangService } from 'src/app/core/services/lang/lang.service';

@Directive({
  selector: '[setDark]'
})
export class ThemeDirective {

  constructor(private elRef: ElementRef, private renderer: Renderer2, private lang: LangService) {
    this.switchClassBasedOnTheme();
  }
  /*Switch rtl class based on the chosen language from Translation Service*/
  switchClassBasedOnTheme() {
    this.lang.currentTheme.subscribe(theme => {
      theme === 'dark' ? this.renderer.addClass(this.elRef.nativeElement, 'dark') : this.renderer.removeClass(this.elRef.nativeElement, 'dark');
    });
  }
}
