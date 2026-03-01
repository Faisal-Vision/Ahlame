import { Component } from '@angular/core';
import { ServiceCatalogService } from 'src/app/core/services/Service-area/service-catalog.service';


@Component({
  selector: 'app-value-core',
  templateUrl: './value-core.component.html',
  styleUrls: ['../banner-area/banner-area.component.scss']

})
export class ValueCoreComponent {
  constructor(private readonly serviceCatalogService: ServiceCatalogService) {
  
   }


}
