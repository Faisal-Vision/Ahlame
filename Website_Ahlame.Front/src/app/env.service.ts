import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EnvService {
  // API url
  public BACKEND_URL= '';


  // Whether or not to enable debug mode
  public enableDebug = true;
  constructor() {}
}