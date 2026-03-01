import { Component } from '@angular/core';
import { ServiceCatalogService } from 'src/app/core/services/Service-area/service-catalog.service';

interface Service {
  title: string;
  name: string;
  description: string;
  icon: string;
  shape: string;
  image: string;
  benefits: string[];
  faq: { question: string; answer: string }[];
}

@Component({
  selector: 'app-about-area',
  templateUrl: './about-area.component.html',
  styleUrls: ['./about-area.component.scss']

})
export class AboutAreaComponent {
  services: Service[] = [];
  constructor(private readonly serviceCatalogService: ServiceCatalogService) {
    this.serviceCatalogService.getAllServices().subscribe((data: any) => {
      this.services = data;
    });
   }


   // Dynamic state map for all images
  imageLoadState: { [key: string]: boolean } = {};

  // Function to handle image load event and set its state
  onImageLoaded(imageUrl: string): void {
    this.imageLoadState[imageUrl] = true;
  }
}
