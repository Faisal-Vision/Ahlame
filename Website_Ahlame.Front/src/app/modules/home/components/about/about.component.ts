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
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
 services: Service[] = [];
  constructor(private readonly serviceCatalogService: ServiceCatalogService) {
    this.serviceCatalogService.getAllServices().subscribe((data: any) => {
      this.services = data;
    });
   }
}
