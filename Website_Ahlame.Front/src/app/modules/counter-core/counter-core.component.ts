import { Component } from '@angular/core';
import { ServiceCatalogService } from 'src/app/core/services/Service-area/service-catalog.service';


@Component({
  selector: 'app-counter-core',
  templateUrl: './counter-core.component.html',
  styleUrls: ['./counter-core.component.scss']

})
export class CounterCoreComponent {
  constructor(private readonly serviceCatalogService: ServiceCatalogService) {
  
   }


}
