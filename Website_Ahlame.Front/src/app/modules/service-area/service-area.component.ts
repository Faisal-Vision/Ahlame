import { Component, ElementRef, ViewChild, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject, of } from 'rxjs';

export interface Service {
  title: string;
}

export interface ServiceCategory {
  category: string;
  icon: string;
  summary: string;
  services: Service[];
  accentColor?: string; // optional: for card accent
}

@Component({
  selector: 'app-service-area',
  templateUrl: './service-area.component.html',
  styleUrls: ['./service-area.component.scss'],
})
export class ServiceAreaComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('swiper2', { static: false }) swiper2!: ElementRef;

  services: Service[] = [];
  isLoading = false;
  errorMessage: string | null = null;
  private destroy$ = new Subject<void>();

  // ✅ بيانات العطور والمكياج المضمّنة مباشرةً
  categories: ServiceCategory[] = [
    {
      category: 'Perfumes & Fragrances',
      icon: 'fa-solid fa-spray-can-sparkles',
      accentColor: '#ad7733',
      summary:
        'Discover our exclusive collection of luxury perfumes and oriental fragrances crafted from the finest ingredients.',
      services: [
        { title: 'Luxury Oriental Oud' },
        { title: 'Fresh Floral Bouquets' },
        { title: 'Woody & Amber Blends' },
        { title: 'Unisex Signature Scents' },
        { title: 'Gift Sets & Coffrets' },
      ],
    },
    {
      category: 'Skincare & Serums',
      icon: 'fa-solid fa-droplet',
      accentColor: '#4e7661',
      summary:
        'Premium skincare routines with serums, moisturizers, and treatments designed for every skin type and concern.',
      services: [
        { title: 'Anti-Aging Serums' },
        { title: 'Brightening Treatments' },
        { title: 'Hydrating Moisturizers' },
        { title: 'Eye & Lip Care' },
        { title: 'Natural & Organic Range' },
      ],
    },
    {
      category: 'Makeup & Color',
      icon: 'fa-solid fa-wand-sparkles',
      accentColor: '#ad7733',
      summary:
        'Bold, long-lasting makeup essentials — from flawless foundations to vivid lip colors and eye-catching palettes.',
      services: [
        { title: 'Foundation & Concealer' },
        { title: 'Eyeshadow Palettes' },
        { title: 'Lipstick & Lip Gloss' },
        { title: 'Mascara & Eyeliner' },
        { title: 'Setting Spray & Primers' },
      ],
    },
    {
      category: 'Hair Care',
      icon: 'fa-solid fa-scissors',
      accentColor: '#4e7661',
      summary:
        'Nourishing hair care products including shampoos, masks, and styling essentials for silky, healthy hair.',
      services: [
        { title: 'Moisturizing Shampoos' },
        { title: 'Deep Conditioning Masks' },
        { title: 'Hair Oils & Serums' },
        { title: 'Styling Creams & Gels' },
        { title: 'Scalp Treatment Kits' },
      ],
    },
    {
      category: 'Body & Bath',
      icon: 'fa-solid fa-bath',
      accentColor: '#ad7733',
      summary:
        'Indulge in luxurious body care — scrubs, lotions, and bath essentials that leave your skin glowing and soft.',
      services: [
        { title: 'Body Scrubs & Exfoliants' },
        { title: 'Nourishing Body Lotions' },
        { title: 'Bath Bombs & Salts' },
        { title: 'Hand & Foot Creams' },
        { title: 'Shower Gels & Oils' },
      ],
    },
    {
      category: 'Nails & Accessories',
      icon: 'fa-solid fa-hand-sparkles',
      accentColor: '#4e7661',
      summary:
        'Trendy nail polishes, treatments, and beauty accessories to complete your everyday glamour look.',
      services: [
        { title: 'Gel & Classic Nail Polish' },
        { title: 'Nail Strengthening Treatments' },
        { title: 'Nail Art Kits' },
        { title: 'Makeup Brushes & Tools' },
        { title: 'Beauty Organizers & Cases' },
      ],
    },
  ];

  ngOnInit(): void {
    // No API call needed — data is static
    this.services = this.categories.flatMap((cat) => cat.services);
  }

  ngAfterViewInit(): void {
    const swiperParams: any = {
      breakpoints: {
        0: { slidesPerView: 1 },
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
      navigation: {
        nextEl: '.custom-next-button',
        prevEl: '.custom-prev-button',
      },
    };

    if (this.swiper2?.nativeElement) {
      Object.assign(this.swiper2.nativeElement, swiperParams);
      this.swiper2.nativeElement.initialize();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}