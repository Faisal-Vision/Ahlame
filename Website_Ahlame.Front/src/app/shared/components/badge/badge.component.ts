import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent {

  @Input() color!: string;
  @Input() isYellow: boolean = true;
  @Input() isSkyBlue: boolean = false;
}
