import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-to-btn',
  templateUrl: './back-to-btn.component.html',
  styleUrls: ['./back-to-btn.component.scss']
})
export class BackToBtnComponent {
  @Input() link!: string;

  constructor(
    private router: Router  ) {}

  goto() {
    this.router.navigate([this.link]);
  }
}
