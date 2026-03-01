import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  ProjectsCatalogService,
  Project as ServiceProject,
} from 'src/app/core/services/projectsService/projects-catalog.service';
import { DisplayProject } from 'src/app/modules/case-area/case-area.component';

@Component({
  selector: 'app-case-list',
  templateUrl: './case-list.component.html',
  styleUrls: ['./case-list.component.scss']
})
export class CaseListComponent implements OnInit, OnDestroy {

  // ── Mode ──────────────────────────────────────────────────────────────────
  /** true  → نعرض تفاصيل منتج واحد
   *  false → نعرض قائمة المنتجات */
  isDetailView = false;

  // ── List view ─────────────────────────────────────────────────────────────
  projects: DisplayProject[] = [];

  // ── Detail view ───────────────────────────────────────────────────────────
  project: DisplayProject | null = null;
  relatedProjects: DisplayProject[] = [];
  activeImage = '';
  wishlisted = false;

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private projectCatalogService: ProjectsCatalogService
  ) {}

ngOnInit(): void {
  this.route.paramMap
    .pipe(takeUntil(this.destroy$))
    .subscribe((params) => {
      const id = params.get('id');

      this.project = null;
      this.relatedProjects = [];
      this.activeImage = '';
      this.wishlisted = false;

      if (id) {
        this.isDetailView = true;
        this.loadDetail(Number(id));
      } else {
        this.isDetailView = false;
        this.loadList();
      }
    });
}

private loadList(): void {
  // ✅ استخدم السامبل مباشرة بدون API
  this.projects = this.getSampleProjects();
}

private loadDetail(id: number): void {
  this.project = null;
  this.relatedProjects = [];
  this.activeImage = '';
  this.wishlisted = false;

  // ✅ استخدم السامبل مباشرة بدون API
  this.setDetail(id, this.getSampleProjects());
}

private setDetail(id: number, all: DisplayProject[]): void {
  this.project = all.find((p) => p.id === id) ?? null;

  if (this.project) {
    // ✅ activeImage من images أو mainImage
    this.activeImage = this.project.images?.[0] ?? this.project.mainImage;

    this.relatedProjects = all
      .filter((p) => p.id !== id && p.categoryType === this.project!.categoryType)
      .slice(0, 4);
  }
}

  // ── Wishlist toggle ───────────────────────────────────────────────────────
  toggleWishlist(): void {
    this.wishlisted = !this.wishlisted;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ── Helpers ───────────────────────────────────────────────────────────────
  private toDisplay(p: ServiceProject): DisplayProject {
    return {
      ...p,
      categoryType: this.resolveCategoryType(p.category),
      categoryIcon: this.resolveCategoryIcon(p.category),
    };
  }

  private resolveCategoryType(category: string): 'perfume' | 'makeup' | 'skincare' {
    const c = category.toLowerCase();
    if (c.includes('perfume') || c.includes('fragrance') || c.includes('عطر')) return 'perfume';
    if (c.includes('skin') || c.includes('بشرة')) return 'skincare';
    return 'makeup';
  }

  private resolveCategoryIcon(category: string): string {
    const c = category.toLowerCase();
    if (c.includes('perfume') || c.includes('fragrance') || c.includes('عطر')) return 'fa-spray-can-sparkles';
    if (c.includes('skin') || c.includes('بشرة')) return 'fa-droplet';
    return 'fa-wand-magic-sparkles';
  }

  trackById(index: number, item: DisplayProject): number {
    return item.id ?? index;
  }

// ── استبدل الـ overview.projectOverview و location و client بمفاتيح ترجمة ──

private getSampleProjects(): DisplayProject[] {
  return [
    {
      id: 1, title: 'Velvet Oud', category: 'Perfume', categoryType: 'perfume',
      categoryIcon: 'fa-spray-can-sparkles', price: 'SAR 349', notes: ['Oud', 'Amber', 'Rose'],
      briefDescription: 'A rich oriental fragrance with deep oud heart and amber base.',
      mainImage: 'https://cdn.salla.sa/nymGz/485e6b33-45dd-4598-9562-70ad38bdf006-500x500-ciWFuiW8AUEdWbcNzwc2vqGeXnN3XFwzdsY9HQrI.png',
      images: [
        'https://cdn.salla.sa/nymGz/485e6b33-45dd-4598-9562-70ad38bdf006-500x500-ciWFuiW8AUEdWbcNzwc2vqGeXnN3XFwzdsY9HQrI.png',
        'https://cdn.salla.sa/nymGz/485e6b33-45dd-4598-9562-70ad38bdf006-500x500-ciWFuiW8AUEdWbcNzwc2vqGeXnN3XFwzdsY9HQrI.png',
      ],
      overview: { description: '', projectOverview: 'VELVET_OUD_OVERVIEW' },  // ✅ مفتاح ترجمة
      defaultImage: '', bannerImage: '', listingThumbnail: '', listingSummary: '',
      projectLink: '', completedDate: '2024', client: 'CLIENT_AHLAME', location: 'LOCATION_RIYADH',
    },
    {
      id: 2, title: 'Silk Rouge Lipstick', category: 'Makeup', categoryType: 'makeup',
      categoryIcon: 'fa-wand-magic-sparkles', price: 'SAR 89', notes: ['Matte', 'SPF 15', 'Vegan'],
      briefDescription: 'Long-lasting matte formula enriched with vitamin E for all-day wear.',
      mainImage: 'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/mby/mby56677/l/19.jpg',
      images: [
        'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/mby/mby56677/l/19.jpg',
        'https://www.clarins.sa/dw/image/v2/AAFS_PRD/on/demandware.static/-/Sites-clarins-master-products/default/dw0718fc18/original/80094245_original_original_PLP.jpg?sw=520&sh=520',
      ],
      overview: { description: '', projectOverview: 'SILK_ROUGE_OVERVIEW' },  // ✅ مفتاح ترجمة
      defaultImage: '', bannerImage: '', listingThumbnail: '', listingSummary: '',
      projectLink: '', completedDate: '2024', client: 'CLIENT_AHLAME', location: 'LOCATION_RIYADH',
    },
    {
      id: 3, title: 'Rose Noir EDP', category: 'Perfume', categoryType: 'perfume',
      categoryIcon: 'fa-spray-can-sparkles', price: 'SAR 290', notes: ['Rose', 'Musk', 'Vetiver'],
      briefDescription: 'Mysterious floral woody scent with Bulgarian rose and dark musk.',
      mainImage: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&auto=format&fit=crop',
      images: ['https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&auto=format&fit=crop'],
      overview: { description: '', projectOverview: 'ROSE_NOIR_OVERVIEW' },  // ✅ مفتاح ترجمة
      defaultImage: '', bannerImage: '', listingThumbnail: '', listingSummary: '',
      projectLink: '', completedDate: '2024', client: 'CLIENT_AHLAME', location: 'LOCATION_RIYADH',
    },
    {
      id: 4, title: 'Glow Serum Foundation', category: 'Makeup', categoryType: 'makeup',
      categoryIcon: 'fa-wand-magic-sparkles', price: 'SAR 145', notes: ['Hyaluronic', 'SPF 30', 'Glow'],
      briefDescription: 'Buildable coverage with hyaluronic acid for a luminous natural finish.',
      mainImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop',
      images: ['https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop'],
      overview: { description: '', projectOverview: 'GLOW_SERUM_OVERVIEW' },  // ✅ مفتاح ترجمة
      defaultImage: '', bannerImage: '', listingThumbnail: '', listingSummary: '',
      projectLink: '', completedDate: '2024', client: 'CLIENT_AHLAME', location: 'LOCATION_RIYADH',
    },
    {
      id: 5, title: 'Gold Oud Intense', category: 'Perfume', categoryType: 'perfume',
      categoryIcon: 'fa-spray-can-sparkles', price: 'SAR 420', notes: ['Saffron', 'Oud', 'Vanilla'],
      briefDescription: 'A bold statement fragrance blending saffron, oud, and golden vanilla.',
      mainImage: 'https://media.zid.store/c6174eb7-2065-4fdc-9367-8ba333b53155/ed059c4d-ef02-4fb0-826b-b875d0f96c3a.png',
      images: ['https://media.zid.store/c6174eb7-2065-4fdc-9367-8ba333b53155/ed059c4d-ef02-4fb0-826b-b875d0f96c3a.png'],
      overview: { description: '', projectOverview: 'GOLD_OUD_OVERVIEW' },  // ✅ مفتاح ترجمة
      defaultImage: '', bannerImage: '', listingThumbnail: '', listingSummary: '',
      projectLink: '', completedDate: '2024', client: 'CLIENT_AHLAME', location: 'LOCATION_RIYADH',
    },
    {
      id: 6, title: 'Velvet Eye Palette', category: 'Makeup', categoryType: 'makeup',
      categoryIcon: 'fa-wand-magic-sparkles', price: 'SAR 195', notes: ['12 Shades', 'Blendable', 'Cruelty-Free'],
      briefDescription: '12 richly pigmented shades for day-to-night smoky and glam looks.',
      mainImage: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&auto=format&fit=crop',
      images: ['https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&auto=format&fit=crop'],
      overview: { description: '', projectOverview: 'VELVET_EYE_OVERVIEW' },  // ✅ مفتاح ترجمة
      defaultImage: '', bannerImage: '', listingThumbnail: '', listingSummary: '',
      projectLink: '', completedDate: '2024', client: 'CLIENT_AHLAME', location: 'LOCATION_RIYADH',
    },
    {
      id: 7, title: 'Aqua Blanche', category: 'Perfume', categoryType: 'perfume',
      categoryIcon: 'fa-spray-can-sparkles', price: 'SAR 265', notes: ['Aquatic', 'Jasmine', 'Cedar'],
      briefDescription: 'Fresh aquatic notes with white flowers and clean cedarwood dry-down.',
      mainImage: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=800&auto=format&fit=crop',
      images: ['https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=800&auto=format&fit=crop'],
      overview: { description: '', projectOverview: 'AQUA_BLANCHE_OVERVIEW' },  // ✅ مفتاح ترجمة
      defaultImage: '', bannerImage: '', listingThumbnail: '', listingSummary: '',
      projectLink: '', completedDate: '2024', client: 'CLIENT_AHLAME', location: 'LOCATION_RIYADH',
    },
    {
      id: 8, title: 'Hydra Glow Moisturiser', category: 'Skincare', categoryType: 'skincare',
      categoryIcon: 'fa-droplet', price: 'SAR 120', notes: ['Ceramides', 'Niacinamide', 'Aloe'],
      briefDescription: 'Intensive 24h hydration with ceramides, niacinamide and aloe vera.',
      mainImage: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&auto=format&fit=crop',
      images: ['https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&auto=format&fit=crop'],
      overview: { description: '', projectOverview: 'HYDRA_GLOW_OVERVIEW' },  // ✅ مفتاح ترجمة
      defaultImage: '', bannerImage: '', listingThumbnail: '', listingSummary: '',
      projectLink: '', completedDate: '2024', client: 'CLIENT_AHLAME', location: 'LOCATION_RIYADH',
    },
  ];
}
}