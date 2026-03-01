import { Component } from '@angular/core';
import { ServiceCatalogService } from 'src/app/core/services/Service-area/service-catalog.service';


@Component({
  selector: 'app-manager-area',
  templateUrl: './manager-area.component.html',
  styleUrls: ['./manager-area.component.scss']

})
export class ManagerAreaComponent {
  constructor(private readonly serviceCatalogService: ServiceCatalogService) {
  
   }


}
