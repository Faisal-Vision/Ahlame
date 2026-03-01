import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';

export interface Project {
  id: number;
  title: string;
  category: string;
  completedDate: string;
  client: string;
  location: string;
  briefDescription: string;
  bannerImage: string;
  mainImage: string;
  defaultImage: string;
  images?: string[];
  overview: ProjectOverview;
  listingThumbnail: string;
  listingSummary: string;
  projectLink: string;
}

export interface ProjectOverview {
  description: string;
  projectChallenges?: string[];
  projectOverview: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsCatalogService {
  projects: Project[] = [
    // المشاريع الخمسة كما وضعتها سابقاً
    {
      id: 1,
      title: "Software License Supply & Installation",
      category: "Technology",
      completedDate: "23-12-2023",
      client: "Robert Fox",
      location: "Kingdom of Saudi Arabia – Riyadh – Eastern Ring Rd.",
      briefDescription: "We supply various software systems’ licenses and provide installation services.",
      bannerImage: "assets/images/banner/banner-inner-page.webp",
      mainImage: "assets/images/case/case-image.webp",
      defaultImage: "assets/images/case/case-image-blur.webp",
      images: [
        "assets/images/case/case-details-image2.webp",
        "assets/images/case/case-details-image3.webp"
      ],
      overview: {
        description: "Detailed description of the solution provided, the technology stack, and methodologies used.",
        projectChallenges: [
          "Technology Consultancy",
          "Maintenance and Support",
          "Requirements Gathering",
          "Best practices implementation"
        ],
        projectOverview: "Project overview with insights into the development process and technology highlights."
      },
      listingThumbnail: "assets/images/case/case-image1.webp",
      listingSummary: "Web app integration with innovative technology and streamlined features for user experience.",
      projectLink: "/case-details/1"
    },
    {
      id: 2,
      title: "Events & Advertisement",
      category: "Consulting",
      completedDate: "15-09-2023",
      client: "Green Energy Solutions",
      location: "Kingdom of Saudi Arabia – Riyadh – Eastern Ring Rd.",
      briefDescription: "We organize and operate events, exhibitions, seminars, and conferences related to the IT field.",
      bannerImage: "assets/images/banner/banner-inner-page.webp",
           mainImage: "assets/images/case/case-details-image4.webp",
      defaultImage: "assets/images/case/case-details-image4-blur.webp",
      images: [
        "assets/images/case/case-details-image4.webp",
        "assets/images/case/case-details-image4.webp"
      ],
      overview: {
        description: "Optimization project for cloud infrastructure focusing on performance, security, and cost management.",
        projectChallenges: [
          "Cost Reduction",
          "Security Enhancements",
          "Performance Optimization",
          "Scalability Improvements"
        ],
        projectOverview: "Consulting services tailored to enhance cloud efficiency and support long-term scalability."
      },
      listingThumbnail: "assets/images/case/case-image2.webp",
      listingSummary: "Cloud consulting services aimed at achieving efficient infrastructure and optimized performance.",
      projectLink: "/case-details/2"
    },
    {
      id: 3,
      title: "AI Solutions",
      category: "Technology",
      completedDate: "30-06-2023",
      client: "Fashion Hub",
      location: "Kingdom of Saudi Arabia – Riyadh – Eastern Ring Rd.",
      briefDescription: "A complete redesign of an e-commerce platform with enhanced user experience and scalability.",
      bannerImage: "assets/images/banner/banner-inner-page.webp",
          mainImage: "assets/images/case/case-details-image4.webp",
      defaultImage: "assets/images/case/case-details-image4-blur.webp",
      images: [
        "assets/images/case/case-details-image4.webp",
        "assets/images/case/case-details-image4.webp"
      ],
      overview: {
        description: "Redesign project focusing on improved user experience, mobile responsiveness, and scalability.",
        projectChallenges: [
          "UX/UI Improvements",
          "Scalability Enhancement",
          "Mobile Optimization",
          "Backend Efficiency"
        ],
        projectOverview: "Complete platform overhaul to align with current e-commerce trends and client needs."
      },
      listingThumbnail: "assets/images/case/case-image3.webp",
      listingSummary: "E-commerce platform redesign with focus on user experience, scalability, and mobile optimization.",
      projectLink: "/case-details/3"
    },
    {
      id: 4,
      title: "Cyber-Security Solutions",
      category: "Consulting",
      completedDate: "10-11-2023",
      client: "Retail Insights Ltd.",
      location: "Kingdom of Saudi Arabia – Riyadh – Eastern Ring Rd.",
      briefDescription: "Consulting for implementing a data analytics solution to drive insights and improve decision-making.",
      bannerImage: "assets/images/banner/banner-inner-page.webp",
      mainImage: "assets/images/case/case-details-image10.webp",
      defaultImage: "assets/images/case/case-details-image10-blur.webp",
      images: [
        "assets/images/case/case-details-image10.webp",
        "assets/images/case/case-details-image10.webp"
      ],
      overview: {
        description: "Data analytics solution to provide actionable insights, enhancing retail operations and strategies.",
        projectChallenges: [
          "Data Collection",
          "Insight Generation",
          "Integration with Existing Systems",
          "Training and Support"
        ],
        projectOverview: "Implementation of a data-driven solution to empower retail decisions and strategic planning."
      },
      listingThumbnail: "assets/images/case/case-image4.webp",
      listingSummary: "Data analytics consulting tailored for retail to enhance insights and operational efficiency.",
      projectLink: "/case-details/4"
    },
    {
      id: 5,
      title: "Business Intelligence",
      category: "AI",
      completedDate: "15-05-2024",
      client: "Global Tech Solutions",
      location: "Kingdom of Saudi Arabia – Riyadh – Eastern Ring Rd.",
      briefDescription: "A sophisticated AI-driven chatbot solution tailored for customer support automation and engagement enhancement.",
      bannerImage: "assets/images/banner/banner-inner-ai.webp",
      mainImage: "assets/images/case/ai-customer-support-main.webp",
      defaultImage: "assets/images/case/ai-customer-support-main-blur.webp",
      images: [
        "assets/images/case/ai-customer-support1.webp",
        "assets/images/case/ai-customer-support2.webp"
      ],
      overview: {
        description: "Implemented an AI-powered chatbot to streamline customer interactions, improve response times, and enhance engagement with real-time, data-driven insights.",
        projectChallenges: [
          "Natural language processing for diverse inquiries",
          "Seamless integration with CRM systems",
          "Ensuring data privacy and security",
          "Providing scalability for peak traffic periods"
        ],
        projectOverview: "This project transformed the client’s customer service experience through AI, reducing workload for human agents and enabling 24/7 support capabilities."
      },
      listingThumbnail: "assets/images/case/ai-listing-thumbnail.webp",
      listingSummary: "Automated customer support with AI, boosting engagement and response speed while enhancing customer satisfaction.",
      projectLink: "/case-details/5"
    }
  ];

  constructor() {}

  getProjectById(id: number): Observable<Project> {
    return of(this.projects.find(project => project.id === id)).pipe(
      map(project => {
        if (!project) {
          throw new Error(`Project with id '${id}' not found.`);
        }
        return project;
      }),
      catchError(error => throwError(() => `Error: ${error}`))
    );
  }

  getAllProjects(): Observable<Project[]> {
    return of(this.projects);
  }
}
