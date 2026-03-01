import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.scss'],
})
export class MobileNavComponent {
  @Output() close = new EventEmitter<void>();

  // Emit close event
  closeSidebar() {
    this.close.emit();
  }
}
