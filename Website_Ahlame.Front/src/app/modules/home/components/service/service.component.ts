import { Component, OnDestroy, OnInit } from '@angular/core';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ServiceCatalogService } from 'src/app/core/services/Service-area/service-catalog.service';
import { Service, ServiceCategory } from 'src/app/core/services/Service-area/service.model';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})

export class ServiceComponent implements OnInit, OnDestroy {
  categories: ServiceCategory[] = [];
  isLoading = false;
  errorMessage: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(private serviceCatalogService: ServiceCatalogService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  trackByServiceName(_: number, service: Service): string {
    return service.name;
  }

  trackByCategory(_: number, category: ServiceCategory): string {
    return category.category;
  }

  private loadCategories(): void {
    this.isLoading = true;
    this.serviceCatalogService
      .getServiceCategories()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: (data: ServiceCategory[]) => {
          this.categories = data;
          this.errorMessage = data.length ? null : 'No services available at the moment.';
        },
        error: (error) => {
          console.error(error);
          this.errorMessage = 'Unable to load services right now.';
        },
      });
  }
}


