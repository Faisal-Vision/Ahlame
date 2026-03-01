import { Component } from '@angular/core';
import { ServiceCatalogService } from 'src/app/core/services/Service-area/service-catalog.service';


@Component({
  selector: 'app-avision-area',
  templateUrl: './vision-area.component.html',
  styleUrls: ['../banner-area/banner-area.component.scss']

})
export class VisionAreaComponent {
  constructor(private readonly serviceCatalogService: ServiceCatalogService) {
  
   }


}
