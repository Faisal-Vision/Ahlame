import { Injectable } from '@angular/core';

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
