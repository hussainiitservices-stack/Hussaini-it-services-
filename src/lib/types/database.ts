export interface DbTestimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  website_url: string | null;
  location: string | null;
  logo_url: string | null;
  is_published: boolean;
  created_at: string;
}

export type PortfolioCoverType = "logo" | "screenshot";

export interface DbPortfolio {
  id: string;
  title: string;
  category: string;
  description: string;
  highlights: string[];
  tags: string[];
  logo_url: string | null;
  image_url: string | null;
  cover_type: PortfolioCoverType;
  project_url: string | null;
  is_published: boolean;
  sort_order: number;
  created_at: string;
}

export interface DbContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  created_at: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}
