import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { LangService } from 'src/app/core/services/lang/lang.service';

@Component({
  selector: 'app-page-breadcrumb',
  templateUrl: './page-breadcrumb.component.html',
  styleUrls: ['./page-breadcrumb.component.scss']
})
export class PageBreadcrumbComponent {
  @Input() title!: string;
  @Input() descrption!: string;
  @Input() icon!: string;
  lang:any;
 constructor(private langService: LangService){}

  langSubscription!: Subscription
  ngOnInit(): void {
    this.langSubscription = this.langService.currentLang.subscribe(res => {
      this.lang = res;
    })
  }
}
