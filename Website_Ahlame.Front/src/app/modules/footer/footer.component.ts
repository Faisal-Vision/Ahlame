import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
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
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
services: Service[] = [];
  constructor(private serviceCatalogService: ServiceCatalogService) {}

  ngOnInit(): void {
    this.serviceCatalogService.getAllServices().subscribe({
      next: (data) => (this.services = data),
      error: (e) => console.error(e),
    });
  }
}
