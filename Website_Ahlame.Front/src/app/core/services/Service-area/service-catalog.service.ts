import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Service, ServiceCategory } from './service.model';

@Injectable({
  providedIn: 'root',
})
export class ServiceCatalogService {
  private categories: ServiceCategory[] = [

    // ══════════════════════════════════════════════════════════
    //  1. عطور وروائح
    // ══════════════════════════════════════════════════════════
    {
      category: 'CATEGORY_PERFUMES',
      summary: 'SUMMARY_PERFUMES',
      icon: 'fa-solid fa-spray-can-sparkles',
      services: [
        {
          title: 'SERVICE_OUD_LUXURY',
          name: 'SERVICE_OUD_LUXURY',
          description: 'DESC_OUD_LUXURY',
          HowWeCanHelp: 'HOW_OUD_LUXURY',
          icon: 'fa-solid fa-spray-can-sparkles',
          shape: 'assets/images/shape/service-item-shape.png',
          image: 'https://m.media-amazon.com/images/I/71wAOIGCeXL._AC_UF894,1000_QL80_.jpg',
          defaultImage: 'https://m.media-amazon.com/images/I/71wAOIGCeXL._AC_UF894,1000_QL80_.jpg',
          benefits: ['BENEFIT_OUD_1', 'BENEFIT_OUD_2', 'BENEFIT_OUD_3', 'BENEFIT_OUD_4'],
          faq: [{ question: 'FAQ_OUD_Q1', answer: 'FAQ_OUD_A1' }, { question: 'FAQ_OUD_Q2', answer: 'FAQ_OUD_A2' }],
        },
        {
          title: 'SERVICE_FLORAL',
          name: 'SERVICE_FLORAL',
          description: 'DESC_FLORAL',
          HowWeCanHelp: 'HOW_FLORAL',
          icon: 'fa-solid fa-fan',
          shape: 'assets/images/shape/service-item-shape.png',
          image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&auto=format&fit=crop',
          defaultImage: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&auto=format&fit=crop',
          benefits: ['BENEFIT_FLORAL_1', 'BENEFIT_FLORAL_2', 'BENEFIT_FLORAL_3', 'BENEFIT_FLORAL_4'],
          faq: [{ question: 'FAQ_FLORAL_Q1', answer: 'FAQ_FLORAL_A1' }, { question: 'FAQ_FLORAL_Q2', answer: 'FAQ_FLORAL_A2' }],
        },
        {
          title: 'SERVICE_WOODY',
          name: 'SERVICE_WOODY',
          description: 'DESC_WOODY',
          HowWeCanHelp: 'HOW_WOODY',
          icon: 'fa-solid fa-tree',
          shape: 'assets/images/shape/service-item-shape.png',
          image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=600&auto=format&fit=crop',
          defaultImage: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=600&auto=format&fit=crop',
          benefits: ['BENEFIT_WOODY_1', 'BENEFIT_WOODY_2', 'BENEFIT_WOODY_3', 'BENEFIT_WOODY_4'],
          faq: [{ question: 'FAQ_WOODY_Q1', answer: 'FAQ_WOODY_A1' }, { question: 'FAQ_WOODY_Q2', answer: 'FAQ_WOODY_A2' }],
        },
        {
          title: 'SERVICE_UNISEX',
          name: 'SERVICE_UNISEX',
          description: 'DESC_UNISEX',
          HowWeCanHelp: 'HOW_UNISEX',
          icon: 'fa-solid fa-star',
          shape: 'assets/images/shape/service-item-shape.png',
          image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&auto=format&fit=crop',
          defaultImage: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&auto=format&fit=crop',
          benefits: ['BENEFIT_UNISEX_1', 'BENEFIT_UNISEX_2', 'BENEFIT_UNISEX_3', 'BENEFIT_UNISEX_4'],
          faq: [{ question: 'FAQ_UNISEX_Q1', answer: 'FAQ_UNISEX_A1' }, { question: 'FAQ_UNISEX_Q2', answer: 'FAQ_UNISEX_A2' }],
        },
        {
          title: 'SERVICE_GIFT_SET',
          name: 'SERVICE_GIFT_SET',
          description: 'DESC_GIFT_SET',
          HowWeCanHelp: 'HOW_GIFT_SET',
          icon: 'fa-solid fa-gift',
          shape: 'assets/images/shape/service-item-shape.png',
          image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&auto=format&fit=crop',
          defaultImage: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&auto=format&fit=crop',
          benefits: ['BENEFIT_GIFT_1', 'BENEFIT_GIFT_2', 'BENEFIT_GIFT_3', 'BENEFIT_GIFT_4'],
          faq: [{ question: 'FAQ_GIFT_Q1', answer: 'FAQ_GIFT_A1' }, { question: 'FAQ_GIFT_Q2', answer: 'FAQ_GIFT_A2' }],
        },
        {
          title: 'SERVICE_TRAVEL_SIZE',
          name: 'SERVICE_TRAVEL_SIZE',
          description: 'DESC_TRAVEL_SIZE',
          HowWeCanHelp: 'HOW_TRAVEL_SIZE',
          icon: 'fa-solid fa-suitcase',
          shape: 'assets/images/shape/service-item-shape.png',
          image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&auto=format&fit=crop',
          defaultImage: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&auto=format&fit=crop',
          benefits: ['BENEFIT_TRAVEL_1', 'BENEFIT_TRAVEL_2', 'BENEFIT_TRAVEL_3', 'BENEFIT_TRAVEL_4'],
          faq: [{ question: 'FAQ_TRAVEL_Q1', answer: 'FAQ_TRAVEL_A1' }, { question: 'FAQ_TRAVEL_Q2', answer: 'FAQ_TRAVEL_A2' }],
        },
      ],
    },

    // ══════════════════════════════════════════════════════════
    //  2. عناية بالبشرة
    // ══════════════════════════════════════════════════════════
    {
      category: 'CATEGORY_SKINCARE',
      summary: 'SUMMARY_SKINCARE',
      icon: 'fa-solid fa-droplet',
      services: [
        {
          title: 'SERVICE_ANTI_AGING', name: 'SERVICE_ANTI_AGING',
          description: 'DESC_ANTI_AGING', HowWeCanHelp: 'HOW_ANTI_AGING',
          icon: 'fa-solid fa-clock-rotate-left',
          shape: 'assets/images/shape/service-item-shape.png',
          image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&auto=format&fit=crop',
          defaultImage: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&auto=format&fit=crop',
          benefits: ['BENEFIT_ANTIAGING_1', 'BENEFIT_ANTIAGING_2', 'BENEFIT_ANTIAGING_3', 'BENEFIT_ANTIAGING_4'],
          faq: [{ question: 'FAQ_ANTIAGING_Q1', answer: 'FAQ_ANTIAGING_A1' }, { question: 'FAQ_ANTIAGING_Q2', answer: 'FAQ_ANTIAGING_A2' }],
        },
        {
          title: 'SERVICE_BRIGHTENING', name: 'SERVICE_BRIGHTENING',
          description: 'DESC_BRIGHTENING', HowWeCanHelp: 'HOW_BRIGHTENING',
          icon: 'fa-solid fa-sun',
          shape: 'assets/images/shape/service-item-shape.png',
          image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&auto=format&fit=crop',
          defaultImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&auto=format&fit=crop',
          benefits: ['BENEFIT_BRIGHT_1', 'BENEFIT_BRIGHT_2', 'BENEFIT_BRIGHT_3', 'BENEFIT_BRIGHT_4'],
          faq: [{ question: 'FAQ_BRIGHT_Q1', answer: 'FAQ_BRIGHT_A1' }, { question: 'FAQ_BRIGHT_Q2', answer: 'FAQ_BRIGHT_A2' }],
        },
        {
          title: 'SERVICE_MOISTURIZER', name: 'SERVICE_MOISTURIZER',
          description: 'DESC_MOISTURIZER', HowWeCanHelp: 'HOW_MOISTURIZER',
          icon: 'fa-solid fa-droplet',
          shape: 'assets/images/shape/service-item-shape.png',
          image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&auto=format&fit=crop',
          defaultImage: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&auto=format&fit=crop',
          benefits: ['BENEFIT_MOIST_1', 'BENEFIT_MOIST_2', 'BENEFIT_MOIST_3', 'BENEFIT_MOIST_4'],
          faq: [{ question: 'FAQ_MOIST_Q1', answer: 'FAQ_MOIST_A1' }, { question: 'FAQ_MOIST_Q2', answer: 'FAQ_MOIST_A2' }],
        },
        {
          title: 'SERVICE_EYE_LIP', name: 'SERVICE_EYE_LIP',
          description: 'DESC_EYE_LIP', HowWeCanHelp: 'HOW_EYE_LIP',
          icon: 'fa-solid fa-eye',
          shape: 'assets/images/shape/service-item-shape.png',
          image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&auto=format&fit=crop',
          defaultImage: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&auto=format&fit=crop',
          benefits: ['BENEFIT_EYELIP_1', 'BENEFIT_EYELIP_2', 'BENEFIT_EYELIP_3', 'BENEFIT_EYELIP_4'],
          faq: [{ question: 'FAQ_EYELIP_Q1', answer: 'FAQ_EYELIP_A1' }, { question: 'FAQ_EYELIP_Q2', answer: 'FAQ_EYELIP_A2' }],
        },
        {
          title: 'SERVICE_ORGANIC', name: 'SERVICE_ORGANIC',
          description: 'DESC_ORGANIC', HowWeCanHelp: 'HOW_ORGANIC',
          icon: 'fa-solid fa-leaf',
          shape: 'assets/images/shape/service-item-shape.png',
          image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop',
          defaultImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop',
          benefits: ['BENEFIT_ORGANIC_1', 'BENEFIT_ORGANIC_2', 'BENEFIT_ORGANIC_3', 'BENEFIT_ORGANIC_4'],
          faq: [{ question: 'FAQ_ORGANIC_Q1', answer: 'FAQ_ORGANIC_A1' }, { question: 'FAQ_ORGANIC_Q2', answer: 'FAQ_ORGANIC_A2' }],
        },
        {
          title: 'SERVICE_SUNSCREEN', name: 'SERVICE_SUNSCREEN',
          description: 'DESC_SUNSCREEN', HowWeCanHelp: 'HOW_SUNSCREEN',
          icon: 'fa-solid fa-umbrella-beach',
          shape: 'assets/images/shape/service-item-shape.png',
          image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&auto=format&fit=crop',
          defaultImage: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&auto=format&fit=crop',
          benefits: ['BENEFIT_SUN_1', 'BENEFIT_SUN_2', 'BENEFIT_SUN_3', 'BENEFIT_SUN_4'],
          faq: [{ question: 'FAQ_SUN_Q1', answer: 'FAQ_SUN_A1' }, { question: 'FAQ_SUN_Q2', answer: 'FAQ_SUN_A2' }],
        },
      ],
    },

    // ══════════════════════════════════════════════════════════
    //  3. مكياج وألوان
    // ══════════════════════════════════════════════════════════
    {
      category: 'CATEGORY_MAKEUP',
      summary: 'SUMMARY_MAKEUP',
      icon: 'fa-solid fa-wand-sparkles',
      services: [
        {
          title: 'SERVICE_FOUNDATION', name: 'SERVICE_FOUNDATION',
          description: 'DESC_FOUNDATION', HowWeCanHelp: 'HOW_FOUNDATION',
          icon: 'fa-solid fa-palette',
          shape: 'assets/images/shape/service-item-shape.png',
          image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop',
          defaultImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop',
          benefits: ['BENEFIT_FOUND_1', 'BENEFIT_FOUND_2', 'BENEFIT_FOUND_3', 'BENEFIT_FOUND_4'],
          faq: [{ question: 'FAQ_FOUND_Q1', answer: 'FAQ_FOUND_A1' }, { question: 'FAQ_FOUND_Q2', answer: 'FAQ_FOUND_A2' }],
        },
        {
          title: 'SERVICE_EYESHADOW', name: 'SERVICE_EYESHADOW',
          description: 'DESC_EYESHADOW', HowWeCanHelp: 'HOW_EYESHADOW',
          icon: 'fa-solid fa-eye',
          shape: 'assets/images/shape/service-item-shape.png',
          image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&auto=format&fit=crop',
          defaultImage: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&auto=format&fit=crop',
          benefits: ['BENEFIT_EYE_1', 'BENEFIT_EYE_2', 'BENEFIT_EYE_3', 'BENEFIT_EYE_4'],
          faq: [{ question: 'FAQ_EYE_Q1', answer: 'FAQ_EYE_A1' }, { question: 'FAQ_EYE_Q2', answer: 'FAQ_EYE_A2' }],
        },
        {
          title: 'SERVICE_LIPSTICK', name: 'SERVICE_LIPSTICK',
          description: 'DESC_LIPSTICK', HowWeCanHelp: 'HOW_LIPSTICK',
          icon: 'fa-solid fa-heart',
          shape: 'assets/images/shape/service-item-shape.png',
          image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&auto=format&fit=crop',
          defaultImage: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&auto=format&fit=crop',
          benefits: ['BENEFIT_LIP_1', 'BENEFIT_LIP_2', 'BENEFIT_LIP_3', 'BENEFIT_LIP_4'],
          faq: [{ question: 'FAQ_LIP_Q1', answer: 'FAQ_LIP_A1' }, { question: 'FAQ_LIP_Q2', answer: 'FAQ_LIP_A2' }],
        },
        {
          title: 'SERVICE_MASCARA', name: 'SERVICE_MASCARA',
          description: 'DESC_MASCARA', HowWeCanHelp: 'HOW_MASCARA',
          icon: 'fa-solid fa-wand-magic-sparkles',
          shape: 'assets/images/shape/service-item-shape.png',
          image: 'https://images.unsplash.com/photo-1512207736890-6ffed8a84e8d?w=600&auto=format&fit=crop',
          defaultImage: 'https://images.unsplash.com/photo-1512207736890-6ffed8a84e8d?w=600&auto=format&fit=crop',
          benefits: ['BENEFIT_MASC_1', 'BENEFIT_MASC_2', 'BENEFIT_MASC_3', 'BENEFIT_MASC_4'],
          faq: [{ question: 'FAQ_MASC_Q1', answer: 'FAQ_MASC_A1' }, { question: 'FAQ_MASC_Q2', answer: 'FAQ_MASC_A2' }],
        },
        {
          title: 'SERVICE_PRIMER', name: 'SERVICE_PRIMER',
          description: 'DESC_PRIMER', HowWeCanHelp: 'HOW_PRIMER',
          icon: 'fa-solid fa-spray-can',
          shape: 'assets/images/shape/service-item-shape.png',
          image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&auto=format&fit=crop',
          defaultImage: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&auto=format&fit=crop',
          benefits: ['BENEFIT_PRIM_1', 'BENEFIT_PRIM_2', 'BENEFIT_PRIM_3', 'BENEFIT_PRIM_4'],
          faq: [{ question: 'FAQ_PRIM_Q1', answer: 'FAQ_PRIM_A1' }, { question: 'FAQ_PRIM_Q2', answer: 'FAQ_PRIM_A2' }],
        },
        {
          title: 'SERVICE_BLUSH', name: 'SERVICE_BLUSH',
          description: 'DESC_BLUSH', HowWeCanHelp: 'HOW_BLUSH',
          icon: 'fa-solid fa-circle',
          shape: 'assets/images/shape/service-item-shape.png',
          image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop',
          defaultImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop',
          benefits: ['BENEFIT_BLUSH_1', 'BENEFIT_BLUSH_2', 'BENEFIT_BLUSH_3', 'BENEFIT_BLUSH_4'],
          faq: [{ question: 'FAQ_BLUSH_Q1', answer: 'FAQ_BLUSH_A1' }, { question: 'FAQ_BLUSH_Q2', answer: 'FAQ_BLUSH_A2' }],
        },
      ],
    },

    // ══════════════════════════════════════════════════════════
    //  4. عناية بالشعر
    // ══════════════════════════════════════════════════════════
    {
      category: 'CATEGORY_HAIRCARE',
      summary: 'SUMMARY_HAIRCARE',
      icon: 'fa-solid fa-scissors',
      services: [
        {
          title: 'SERVICE_SHAMPOO', name: 'SERVICE_SHAMPOO',
          description: 'DESC_SHAMPOO', HowWeCanHelp: 'HOW_SHAMPOO',
          icon: 'fa-solid fa-pump-soap',
          shape: 'assets/images/shape/service-item-shape.png',
          image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&auto=format&fit=crop',
          defaultImage: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&auto=format&fit=crop',
          benefits: ['BENEFIT_SHAMP_1', 'BENEFIT_SHAMP_2', 'BENEFIT_SHAMP_3', 'BENEFIT_SHAMP_4'],
          faq: [{ question: 'FAQ_SHAMP_Q1', answer: 'FAQ_SHAMP_A1' }, { question: 'FAQ_SHAMP_Q2', answer: 'FAQ_SHAMP_A2' }],
        },
        {
          title: 'SERVICE_HAIR_MASK', name: 'SERVICE_HAIR_MASK',
          description: 'DESC_HAIR_MASK', HowWeCanHelp: 'HOW_HAIR_MASK',
          icon: 'fa-solid fa-jar',
          shape: 'assets/images/shape/service-item-shape.png',
          image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&auto=format&fit=crop',
          defaultImage: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&auto=format&fit=crop',
          benefits: ['BENEFIT_HMASK_1', 'BENEFIT_HMASK_2', 'BENEFIT_HMASK_3', 'BENEFIT_HMASK_4'],
          faq: [{ question: 'FAQ_HMASK_Q1', answer: 'FAQ_HMASK_A1' }, { question: 'FAQ_HMASK_Q2', answer: 'FAQ_HMASK_A2' }],
        },
        {
          title: 'SERVICE_HAIR_OIL', name: 'SERVICE_HAIR_OIL',
          description: 'DESC_HAIR_OIL', HowWeCanHelp: 'HOW_HAIR_OIL',
          icon: 'fa-solid fa-bottle-droplet',
          shape: 'assets/images/shape/service-item-shape.png',
          image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&auto=format&fit=crop',
          defaultImage: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&auto=format&fit=crop',
          benefits: ['BENEFIT_HOIL_1', 'BENEFIT_HOIL_2', 'BENEFIT_HOIL_3', 'BENEFIT_HOIL_4'],
          faq: [{ question: 'FAQ_HOIL_Q1', answer: 'FAQ_HOIL_A1' }, { question: 'FAQ_HOIL_Q2', answer: 'FAQ_HOIL_A2' }],
        },
        {
          title: 'SERVICE_STYLING', name: 'SERVICE_STYLING',
          description: 'DESC_STYLING', HowWeCanHelp: 'HOW_STYLING',
          icon: 'fa-solid fa-scissors',
          shape: 'assets/images/shape/service-item-shape.png',
          image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&auto=format&fit=crop',
          defaultImage: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&auto=format&fit=crop',
          benefits: ['BENEFIT_STYL_1', 'BENEFIT_STYL_2', 'BENEFIT_STYL_3', 'BENEFIT_STYL_4'],
          faq: [{ question: 'FAQ_STYL_Q1', answer: 'FAQ_STYL_A1' }, { question: 'FAQ_STYL_Q2', answer: 'FAQ_STYL_A2' }],
        },
        {
          title: 'SERVICE_SCALP', name: 'SERVICE_SCALP',
          description: 'DESC_SCALP', HowWeCanHelp: 'HOW_SCALP',
          icon: 'fa-solid fa-hand-sparkles',
          shape: 'assets/images/shape/service-item-shape.png',
          image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&auto=format&fit=crop',
          defaultImage: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&auto=format&fit=crop',
          benefits: ['BENEFIT_SCALP_1', 'BENEFIT_SCALP_2', 'BENEFIT_SCALP_3', 'BENEFIT_SCALP_4'],
          faq: [{ question: 'FAQ_SCALP_Q1', answer: 'FAQ_SCALP_A1' }, { question: 'FAQ_SCALP_Q2', answer: 'FAQ_SCALP_A2' }],
        },
        {
          title: 'SERVICE_HAIR_COLOR', name: 'SERVICE_HAIR_COLOR',
          description: 'DESC_HAIR_COLOR', HowWeCanHelp: 'HOW_HAIR_COLOR',
          icon: 'fa-solid fa-paintbrush',
          shape: 'assets/images/shape/service-item-shape.png',
          image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop',
          defaultImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop',
          benefits: ['BENEFIT_HCOL_1', 'BENEFIT_HCOL_2', 'BENEFIT_HCOL_3', 'BENEFIT_HCOL_4'],
          faq: [{ question: 'FAQ_HCOL_Q1', answer: 'FAQ_HCOL_A1' }, { question: 'FAQ_HCOL_Q2', answer: 'FAQ_HCOL_A2' }],
        },
      ],
    },

    // ══════════════════════════════════════════════════════════
    //  5. جسم وحمام
    // ══════════════════════════════════════════════════════════
    {
      category: 'CATEGORY_BODY',
      summary: 'SUMMARY_BODY',
      icon: 'fa-solid fa-bath',
      services: [
        {
          title: 'SERVICE_SCRUB', name: 'SERVICE_SCRUB',
          description: 'DESC_SCRUB', HowWeCanHelp: 'HOW_SCRUB',
          icon: 'fa-solid fa-soap',
          shape: 'assets/images/shape/service-item-shape.png',
          image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&auto=format&fit=crop',
          defaultImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&auto=format&fit=crop',
          benefits: ['BENEFIT_SCRUB_1', 'BENEFIT_SCRUB_2', 'BENEFIT_SCRUB_3', 'BENEFIT_SCRUB_4'],
          faq: [{ question: 'FAQ_SCRUB_Q1', answer: 'FAQ_SCRUB_A1' }, { question: 'FAQ_SCRUB_Q2', answer: 'FAQ_SCRUB_A2' }],
        },
        {
          title: 'SERVICE_BODY_LOTION', name: 'SERVICE_BODY_LOTION',
          description: 'DESC_BODY_LOTION', HowWeCanHelp: 'HOW_BODY_LOTION',
          icon: 'fa-solid fa-pump-medical',
          shape: 'assets/images/shape/service-item-shape.png',
          image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&auto=format&fit=crop',
          defaultImage: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&auto=format&fit=crop',
          benefits: ['BENEFIT_BLOC_1', 'BENEFIT_BLOC_2', 'BENEFIT_BLOC_3', 'BENEFIT_BLOC_4'],
          faq: [{ question: 'FAQ_BLOC_Q1', answer: 'FAQ_BLOC_A1' }, { question: 'FAQ_BLOC_Q2', answer: 'FAQ_BLOC_A2' }],
        },
        {
          title: 'SERVICE_BATH_BOMB', name: 'SERVICE_BATH_BOMB',
          description: 'DESC_BATH_BOMB', HowWeCanHelp: 'HOW_BATH_BOMB',
          icon: 'fa-solid fa-circle-dot',
          shape: 'assets/images/shape/service-item-shape.png',
          image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&auto=format&fit=crop',
          defaultImage: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&auto=format&fit=crop',
          benefits: ['BENEFIT_BATH_1', 'BENEFIT_BATH_2', 'BENEFIT_BATH_3', 'BENEFIT_BATH_4'],
          faq: [{ question: 'FAQ_BATH_Q1', answer: 'FAQ_BATH_A1' }, { question: 'FAQ_BATH_Q2', answer: 'FAQ_BATH_A2' }],
        },
        {
          title: 'SERVICE_HAND_FOOT', name: 'SERVICE_HAND_FOOT',
          description: 'DESC_HAND_FOOT', HowWeCanHelp: 'HOW_HAND_FOOT',
          icon: 'fa-solid fa-hand',
          shape: 'assets/images/shape/service-item-shape.png',
          image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&auto=format&fit=crop',
          defaultImage: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&auto=format&fit=crop',
          benefits: ['BENEFIT_HF_1', 'BENEFIT_HF_2', 'BENEFIT_HF_3', 'BENEFIT_HF_4'],
          faq: [{ question: 'FAQ_HF_Q1', answer: 'FAQ_HF_A1' }, { question: 'FAQ_HF_Q2', answer: 'FAQ_HF_A2' }],
        },
        {
          title: 'SERVICE_SHOWER_GEL', name: 'SERVICE_SHOWER_GEL',
          description: 'DESC_SHOWER_GEL', HowWeCanHelp: 'HOW_SHOWER_GEL',
          icon: 'fa-solid fa-shower',
          shape: 'assets/images/shape/service-item-shape.png',
          image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&auto=format&fit=crop',
          defaultImage: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&auto=format&fit=crop',
          benefits: ['BENEFIT_SGEL_1', 'BENEFIT_SGEL_2', 'BENEFIT_SGEL_3', 'BENEFIT_SGEL_4'],
          faq: [{ question: 'FAQ_SGEL_Q1', answer: 'FAQ_SGEL_A1' }, { question: 'FAQ_SGEL_Q2', answer: 'FAQ_SGEL_A2' }],
        },
        {
          title: 'SERVICE_BODY_OIL', name: 'SERVICE_BODY_OIL',
          description: 'DESC_BODY_OIL', HowWeCanHelp: 'HOW_BODY_OIL',
          icon: 'fa-solid fa-bottle-water',
          shape: 'assets/images/shape/service-item-shape.png',
          image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&auto=format&fit=crop',
          defaultImage: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&auto=format&fit=crop',
          benefits: ['BENEFIT_BOIL_1', 'BENEFIT_BOIL_2', 'BENEFIT_BOIL_3', 'BENEFIT_BOIL_4'],
          faq: [{ question: 'FAQ_BOIL_Q1', answer: 'FAQ_BOIL_A1' }, { question: 'FAQ_BOIL_Q2', answer: 'FAQ_BOIL_A2' }],
        },
      ],
    },

    // ══════════════════════════════════════════════════════════
    //  6. أظافر وإكسسوارات
    // ══════════════════════════════════════════════════════════
    {
      category: 'CATEGORY_NAILS',
      summary: 'SUMMARY_NAILS',
      icon: 'fa-solid fa-hand-sparkles',
      services: [
        {
          title: 'SERVICE_GEL_POLISH', name: 'SERVICE_GEL_POLISH',
          description: 'DESC_GEL_POLISH', HowWeCanHelp: 'HOW_GEL_POLISH',
          icon: 'fa-solid fa-paintbrush',
          shape: 'assets/images/shape/service-item-shape.png',
          image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&auto=format&fit=crop',
          defaultImage: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&auto=format&fit=crop',
          benefits: ['BENEFIT_GEL_1', 'BENEFIT_GEL_2', 'BENEFIT_GEL_3', 'BENEFIT_GEL_4'],
          faq: [{ question: 'FAQ_GEL_Q1', answer: 'FAQ_GEL_A1' }, { question: 'FAQ_GEL_Q2', answer: 'FAQ_GEL_A2' }],
        },
        {
          title: 'SERVICE_NAIL_TREATMENT', name: 'SERVICE_NAIL_TREATMENT',
          description: 'DESC_NAIL_TREATMENT', HowWeCanHelp: 'HOW_NAIL_TREATMENT',
          icon: 'fa-solid fa-hand-holding-heart',
          shape: 'assets/images/shape/service-item-shape.png',
          image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&auto=format&fit=crop',
          defaultImage: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&auto=format&fit=crop',
          benefits: ['BENEFIT_NTRT_1', 'BENEFIT_NTRT_2', 'BENEFIT_NTRT_3', 'BENEFIT_NTRT_4'],
          faq: [{ question: 'FAQ_NTRT_Q1', answer: 'FAQ_NTRT_A1' }, { question: 'FAQ_NTRT_Q2', answer: 'FAQ_NTRT_A2' }],
        },
        {
          title: 'SERVICE_NAIL_ART', name: 'SERVICE_NAIL_ART',
          description: 'DESC_NAIL_ART', HowWeCanHelp: 'HOW_NAIL_ART',
          icon: 'fa-solid fa-pen-nib',
          shape: 'assets/images/shape/service-item-shape.png',
          image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&auto=format&fit=crop',
          defaultImage: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&auto=format&fit=crop',
          benefits: ['BENEFIT_NART_1', 'BENEFIT_NART_2', 'BENEFIT_NART_3', 'BENEFIT_NART_4'],
          faq: [{ question: 'FAQ_NART_Q1', answer: 'FAQ_NART_A1' }, { question: 'FAQ_NART_Q2', answer: 'FAQ_NART_A2' }],
        },
        {
          title: 'SERVICE_BRUSHES', name: 'SERVICE_BRUSHES',
          description: 'DESC_BRUSHES', HowWeCanHelp: 'HOW_BRUSHES',
          icon: 'fa-solid fa-brush',
          shape: 'assets/images/shape/service-item-shape.png',
          image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop',
          defaultImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop',
          benefits: ['BENEFIT_BRSH_1', 'BENEFIT_BRSH_2', 'BENEFIT_BRSH_3', 'BENEFIT_BRSH_4'],
          faq: [{ question: 'FAQ_BRSH_Q1', answer: 'FAQ_BRSH_A1' }, { question: 'FAQ_BRSH_Q2', answer: 'FAQ_BRSH_A2' }],
        },
        {
          title: 'SERVICE_ORGANIZER', name: 'SERVICE_ORGANIZER',
          description: 'DESC_ORGANIZER', HowWeCanHelp: 'HOW_ORGANIZER',
          icon: 'fa-solid fa-box-open',
          shape: 'assets/images/shape/service-item-shape.png',
          image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&auto=format&fit=crop',
          defaultImage: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&auto=format&fit=crop',
          benefits: ['BENEFIT_ORG_1', 'BENEFIT_ORG_2', 'BENEFIT_ORG_3', 'BENEFIT_ORG_4'],
          faq: [{ question: 'FAQ_ORG_Q1', answer: 'FAQ_ORG_A1' }, { question: 'FAQ_ORG_Q2', answer: 'FAQ_ORG_A2' }],
        },
        {
          title: 'SERVICE_ACCESSORIES', name: 'SERVICE_ACCESSORIES',
          description: 'DESC_ACCESSORIES', HowWeCanHelp: 'HOW_ACCESSORIES',
          icon: 'fa-solid fa-sparkles',
          shape: 'assets/images/shape/service-item-shape.png',
          image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&auto=format&fit=crop',
          defaultImage: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&auto=format&fit=crop',
          benefits: ['BENEFIT_ACC_1', 'BENEFIT_ACC_2', 'BENEFIT_ACC_3', 'BENEFIT_ACC_4'],
          faq: [{ question: 'FAQ_ACC_Q1', answer: 'FAQ_ACC_A1' }, { question: 'FAQ_ACC_Q2', answer: 'FAQ_ACC_A2' }],
        },
      ],
    },
  ];

  private services: Service[] = this.categories.flatMap((category) => category.services);

  getServiceCategories(): Observable<ServiceCategory[]> {
    return of(this.categories);
  }

  getServiceByName(name: string): Observable<Service> {
    return of(this.services.find((service) => service.name === name)).pipe(
      map((service) => {
        if (!service) {
          throw new Error(`Service with name '${name}' not found.`);
        }
        return service;
      }),
      catchError((error) => throwError(() => `Error: ${error.message}`))
    );
  }

  getAllServices(): Observable<Service[]> {
    return of(this.services);
  }

  findCategoryByServiceName(name: string): ServiceCategory | undefined {
    return this.categories.find((category) =>
      category.services.some((service) => service.name === name)
    );
  }
}
