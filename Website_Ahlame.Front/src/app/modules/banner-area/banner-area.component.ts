import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LangService } from 'src/app/core/services/lang/lang.service';

@Component({
  selector: 'app-banner-area',
  templateUrl: './banner-area.component.html',
  styleUrls: ['./banner-area.component.scss'],
})
export class BannerAreaComponent  {

  bannerSlides = [
    {
    backgroundImage: "assets/images/banner/footer-bg-dark-CwXgSqTv.webp",
    content: {
      // subtitle: {
      //   text: "Transforming Ideas into Digital Solutions",
      // },
      title: {
        text: "Explore the World of Beauty and Fashion",
      },
      description: { 
        text: "Drive business success with tailored digital strategies and technology-driven solutions.",
        breakingText: "Empowering businesses to evolve and excel in a competitive landscape.",
      },
      button: {
        text: "Discover Our Services",
        link: "/about",
      },
    },
    }

 
  ];

  constructor(
    private lang: LangService,
    private translate: TranslateService,
  ) {
  }
}
