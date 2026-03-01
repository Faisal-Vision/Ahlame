import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceCatalogService } from 'src/app/core/services/Service-area/service-catalog.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Service, ServiceCategory } from 'src/app/core/services/Service-area/service.model';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss']
})
export class ServiceDetailsComponent implements OnInit, OnDestroy {
  service!: Service;
  errorMessage: string | null = null;
  allServices: Service[] = [];
  currentServiceTitle: string = '';
  faqActiveIndex: number | null = null;
  sidebarActiveIndex: number | null = null;
  currentCategory: ServiceCategory | null = null;
  categories: ServiceCategory[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private serviceCatalogService: ServiceCatalogService
  ) {}

  ngOnInit(): void {
    // Subscribe to route parameter changes
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        const serviceName = params.get('name') || '';
        this.loadService(serviceName);
      });

    // Load all services only once
    this.loadCategories();
  }

  private loadService(serviceName: string): void {
    this.serviceCatalogService
      .getServiceByName(serviceName)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (serviceData: Service) => {
          this.service = serviceData;
          this.currentServiceTitle = serviceData.title;
          this.currentCategory = this.serviceCatalogService.findCategoryByServiceName(serviceData.name) || null;

          // Auto-expand the current category in sidebar
          if (this.currentCategory && this.categories.length > 0) {
            const categoryIndex = this.categories.findIndex(cat => cat.category === this.currentCategory?.category);
            if (categoryIndex !== -1) {
              this.sidebarActiveIndex = categoryIndex;
            }
          }

          this.errorMessage = null;
        },
        error: (error) => {
          console.error('Error fetching service:', error);
          this.errorMessage = 'Service not found.';
        }
      });
  }

  private loadCategories(): void {
    this.serviceCatalogService
      .getServiceCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (categories: ServiceCategory[]) => {
          this.categories = categories;
          this.allServices = categories.flatMap((category) => category.services);
          this.errorMessage = null;
        },
        error: (error) => {
          console.error('Error fetching service categories:', error);
          this.errorMessage = 'Could not load services.';
        }
      });
  }

  toggleFAQ(index: number): void {
    this.faqActiveIndex = this.faqActiveIndex === index ? null : index;
  }

  toggleSidebarCategory(index: number): void {
    this.sidebarActiveIndex = this.sidebarActiveIndex === index ? null : index;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
