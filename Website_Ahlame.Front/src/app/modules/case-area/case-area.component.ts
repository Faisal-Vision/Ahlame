import { Component, OnInit } from '@angular/core';
import {
  ProjectsCatalogService,
  Project as ServiceProject,
} from 'src/app/core/services/projectsService/projects-catalog.service';

/** Extended display model — adds UI-only fields on top of the service model */
export interface DisplayProject extends ServiceProject {
  categoryType: 'perfume' | 'makeup' | 'skincare';
  categoryIcon: string;
  price?: string;
  notes?: string[];
}

@Component({
  selector: 'app-case-area',
  templateUrl: './case-area.component.html',
  styleUrls: ['./case-area.component.scss'],
})
export class CaseAreaComponent implements OnInit {

  /**
   * Sample beauty/fragrance data — replace with real API data.
   * Images use Unsplash source URLs (free-to-use, no key required).
   * Swap the URLs with your own CDN images in production.
   */
  projects: DisplayProject[] = [
    {
      id: 1,
      title: 'Velvet Oud',
      category: 'Perfume',
      categoryType: 'perfume',
      categoryIcon: 'fa-spray-can-sparkles',
      briefDescription: 'A rich oriental fragrance with deep oud heart and amber base.',
      price: 'SAR 349',
      notes: ['Oud', 'Amber', 'Rose'],
      mainImage: 'https://cdn.salla.sa/nymGz/485e6b33-45dd-4598-9562-70ad38bdf006-500x500-ciWFuiW8AUEdWbcNzwc2vqGeXnN3XFwzdsY9HQrI.png',
      defaultImage: 'assets/images/placeholder/perfume.jpg',
      bannerImage: '',
      listingThumbnail: '',
      listingSummary: '',
      projectLink: '',
      completedDate: '',
      client: '',
      location: '',
      overview: { description: '', projectOverview: '' },
    },
    {
      id: 2,
      title: 'Silk Rouge Lipstick',
      category: 'Makeup',
      categoryType: 'makeup',
      categoryIcon: 'fa-wand-magic-sparkles',
      briefDescription: 'Long-lasting matte formula enriched with vitamin E for all-day wear.',
      price: 'SAR 89',
      notes: ['Matte', 'SPF 15', 'Vegan'],
      mainImage: 'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/mby/mby56677/l/19.jpg',
      defaultImage: 'assets/images/placeholder/makeup.jpg',
      bannerImage: '',
      listingThumbnail: '',
      listingSummary: '',
      projectLink: '',
      completedDate: '',
      client: '',
      location: '',
      overview: { description: '', projectOverview: '' },
    },
    {
      id: 3,
      title: 'Rose Noir EDP',
      category: 'Perfume',
      categoryType: 'perfume',
      categoryIcon: 'fa-spray-can-sparkles',
      briefDescription: 'Mysterious floral woody scent with Bulgarian rose and dark musk.',
      price: 'SAR 290',
      notes: ['Rose', 'Musk', 'Vetiver'],
      mainImage: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&auto=format&fit=crop',
      defaultImage: 'assets/images/placeholder/perfume.jpg',
      bannerImage: '',
      listingThumbnail: '',
      listingSummary: '',
      projectLink: '',
      completedDate: '',
      client: '',
      location: '',
      overview: { description: '', projectOverview: '' },
    },
    {
      id: 4,
      title: 'Glow Serum Foundation',
      category: 'Makeup',
      categoryType: 'makeup',
      categoryIcon: 'fa-wand-magic-sparkles',
      briefDescription: 'Buildable coverage with hyaluronic acid for a luminous natural finish.',
      price: 'SAR 145',
      notes: ['Hyaluronic', 'SPF 30', 'Glow'],
      mainImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop',
      defaultImage: 'assets/images/placeholder/makeup.jpg',
      bannerImage: '',
      listingThumbnail: '',
      listingSummary: '',
      projectLink: '',
      completedDate: '',
      client: '',
      location: '',
      overview: { description: '', projectOverview: '' },
    },
    {
      id: 5,
      title: 'Gold Oud Intense',
      category: 'Perfume',
      categoryType: 'perfume',
      categoryIcon: 'fa-spray-can-sparkles',
      briefDescription: 'A bold statement fragrance blending saffron, oud, and golden vanilla.',
      price: 'SAR 420',
      notes: ['Saffron', 'Oud', 'Vanilla'],
      mainImage: 'https://media.zid.store/c6174eb7-2065-4fdc-9367-8ba333b53155/ed059c4d-ef02-4fb0-826b-b875d0f96c3a.png',
      defaultImage: 'assets/images/placeholder/perfume.jpg',
      bannerImage: '',
      listingThumbnail: '',
      listingSummary: '',
      projectLink: '',
      completedDate: '',
      client: '',
      location: '',
      overview: { description: '', projectOverview: '' },
    },
    {
      id: 6,
      title: 'Velvet Eye Palette',
      category: 'Makeup',
      categoryType: 'makeup',
      categoryIcon: 'fa-wand-magic-sparkles',
      briefDescription: '12 richly pigmented shades for day-to-night smoky and glam looks.',
      price: 'SAR 195',
      notes: ['12 Shades', 'Blendable', 'Cruelty-Free'],
      mainImage: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&auto=format&fit=crop',
      defaultImage: 'assets/images/placeholder/makeup.jpg',
      bannerImage: '',
      listingThumbnail: '',
      listingSummary: '',
      projectLink: '',
      completedDate: '',
      client: '',
      location: '',
      overview: { description: '', projectOverview: '' },
    },
    {
      id: 7,
      title: 'Aqua Blanche',
      category: 'Perfume',
      categoryType: 'perfume',
      categoryIcon: 'fa-spray-can-sparkles',
      briefDescription: 'Fresh aquatic notes with white flowers and clean cedarwood dry-down.',
      price: 'SAR 265',
      notes: ['Aquatic', 'Jasmine', 'Cedar'],
      mainImage: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=600&auto=format&fit=crop',
      defaultImage: 'assets/images/placeholder/perfume.jpg',
      bannerImage: '',
      listingThumbnail: '',
      listingSummary: '',
      projectLink: '',
      completedDate: '',
      client: '',
      location: '',
      overview: { description: '', projectOverview: '' },
    },
    {
      id: 8,
      title: 'Hydra Glow Moisturiser',
      category: 'Skincare',
      categoryType: 'skincare',
      categoryIcon: 'fa-droplet',
      briefDescription: 'Intensive 24h hydration with ceramides, niacinamide and aloe vera.',
      price: 'SAR 120',
      notes: ['Ceramides', 'Niacinamide', 'Aloe'],
      mainImage: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&auto=format&fit=crop',
      defaultImage: 'assets/images/placeholder/skincare.jpg',
      bannerImage: '',
      listingThumbnail: '',
      listingSummary: '',
      projectLink: '',
      completedDate: '',
      client: '',
      location: '',
      overview: { description: '', projectOverview: '' },
    },
  ];

  isRTL = false;

  constructor(
    private readonly projectCatalogService: ProjectsCatalogService
  ) {}

  ngOnInit(): void {
    // Uncomment to load from API instead of sample data:
    // this.fetchProjects();
    this.isRTL = document.documentElement.getAttribute('dir') === 'rtl';
  }

  private fetchProjects(): void {
    this.projectCatalogService.getAllProjects().subscribe({
      next: (data: ServiceProject[]) => {
        this.projects = data.map((p) => ({
          ...p,
          categoryType: this.resolveCategoryType(p.category),
          categoryIcon: this.resolveCategoryIcon(p.category),
        }));
      },
      error: (error: unknown) => {
        console.error('Error loading projects:', error);
      },
    });
  }

  /** Map category string → display type */
  private resolveCategoryType(category: string): 'perfume' | 'makeup' | 'skincare' {
    const c = category.toLowerCase();
    if (c.includes('perfume') || c.includes('fragrance') || c.includes('عطر')) return 'perfume';
    if (c.includes('skin') || c.includes('بشرة'))                               return 'skincare';
    return 'makeup';
  }

  /** Map category string → FontAwesome icon class */
  private resolveCategoryIcon(category: string): string {
    const c = category.toLowerCase();
    if (c.includes('perfume') || c.includes('fragrance') || c.includes('عطر')) return 'fa-spray-can-sparkles';
    if (c.includes('skin') || c.includes('بشرة'))                               return 'fa-droplet';
    return 'fa-wand-magic-sparkles';
  }

  trackByProjectId(index: number, project: DisplayProject): number {
    return project.id ?? index;
  }
}