export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface Service {
  title: string;
  name: string;
  description: string;
  HowWeCanHelp: string;
  icon: string;
  shape: string;
  image: string;
  defaultImage: string;
  benefits: string[];
  faq: ServiceFaq[];
}

export interface ServiceCategory {
  category: string;
  summary: string;
  icon: string;
  services: Service[];
}
