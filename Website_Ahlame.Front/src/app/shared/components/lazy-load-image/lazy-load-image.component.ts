import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-lazy-load-image',
  templateUrl: './lazy-load-image.component.html',
  styleUrls: ['./lazy-load-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LazyLoadImageComponent {
  @Input() imageSrc!: string; // High-quality image URL
  @Input() defaultImage!: string;
  @Input() errorImage: string = 'https://via.placeholder.com/300x200?text=Error+Loading'; // Error fallback image
  @Input() alt: string = '';
  @Input() class: string = '';
  @Input() style?: any;
  @Input() width?: string = '';
  @Input() height?: string = '';
  @Input() loading: string = 'lazy'; // Lazy loading enabled by default
}
