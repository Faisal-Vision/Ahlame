import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations'; // Import animation functions
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  animations: [
    // Animation triggers
    trigger('slideInLeft', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('0.3s', style({ transform: 'translateX(0)' })),
      ]),
    ]),
    trigger('slideInRight', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('0.3s', style({ transform: 'translateX(0)' })),
      ]),
    ]),
  ],
})
export class PaginationComponent {
  @Input() currentPage: number=0;
  @Input() itemsPerPage: number=0;
  @Input() totalItems: number=0;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter();

  constructor(private translate: TranslateService){
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  onPageChange(page: number): void {
    this.pageChanged.emit(page);
  }
}
