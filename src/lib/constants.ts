import {
  Shield,
  Clock,
  Users,
  Award,
  Search,
  Share2,
  MapPin,
  Code2,
  Smartphone,
  Apple,
  ShoppingCart,
  Store,
  Palette,
  CreditCard,
  Video,
  Brain,
  Globe,
  type LucideIcon,
} from "lucide-react";

export interface NavLink {
  label: string;
  href: string;
}

export interface ServiceItem {
  icon: LucideIcon;
  title: string;
  href: string;
}

export interface FeaturedService {
  icon: LucideIcon;
  title: string;
  description: string;
  tags: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  highlights: string[];
  tags: string[];
  image?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
}

export const navLinks: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
];

export const allServices: ServiceItem[] = [
  { icon: Search, title: "SEO", href: "/services" },
  { icon: Share2, title: "Social Media Management", href: "/services" },
  { icon: MapPin, title: "Google Business Profile", href: "/services" },
  { icon: Code2, title: "Web Development", href: "/services" },
  { icon: Smartphone, title: "Android Apps", href: "/services" },
  { icon: Apple, title: "iOS Apps", href: "/services" },
  { icon: ShoppingCart, title: "Ecommerce", href: "/services" },
  { icon: Store, title: "Customized Ecommerce Store", href: "/services" },
  { icon: Palette, title: "Logo & Brochure Designing", href: "/services" },
  { icon: CreditCard, title: "Business Card Designing", href: "/services" },
  { icon: Video, title: "Video Editing", href: "/services" },
  { icon: Brain, title: "AI Integration", href: "/services" },
];

export const featuredServices: FeaturedService[] = [
  {
    icon: Search,
    title: "Search Engine Optimization",
    description:
      "Data-driven SEO strategies that improve rankings, increase organic traffic, and generate qualified leads for your business across Google and local search.",
    tags: ["Keyword Research", "On-Page SEO", "Local SEO", "Analytics"],
  },
  {
    icon: Share2,
    title: "Social Media Management",
    description:
      "End-to-end social media strategy, content creation, and community management to build brand authority and drive engagement on LinkedIn, Instagram, and Facebook.",
    tags: ["Content Strategy", "LinkedIn Marketing", "Brand Positioning", "Analytics"],
  },
  {
    icon: MapPin,
    title: "Google Business Profile",
    description:
      "Optimize and manage your Google Business Profile to dominate local search, showcase reviews, and convert nearby customers searching for your services.",
    tags: ["Profile Optimization", "Review Management", "Local Visibility", "Google Maps"],
  },
];

export const heroFeatures = [
  { icon: Search, label: "SEO & Growth", desc: "Rank higher, grow faster" },
  { icon: Share2, label: "Social Media", desc: "Build brand authority" },
  { icon: Code2, label: "Web Development", desc: "Custom & scalable solutions" },
  { icon: Globe, label: "Global Reach", desc: "Premium digital solutions worldwide" },
];

export const stats = [
  { value: 15, suffix: "+", label: "Projects Delivered" },
  { value: 15, suffix: "+", label: "Global Clients" },
  { value: 2, suffix: "+", label: "Years Experience" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
];

export const whyChooseUs = [
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Industry-standard security practices protecting your data and applications.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description:
      "Committed timelines with transparent progress tracking and communication.",
  },
  {
    icon: Users,
    title: "Dedicated Team",
    description:
      "Expert developers and marketers assigned to your project from start to finish.",
  },
  {
    icon: Award,
    title: "Quality Assured",
    description:
      "Rigorous testing and code reviews ensuring exceptional product quality.",
  },
];

export const trackRecord = [
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 15, suffix: "+", label: "Projects Completed" },
  { value: 2, suffix: "+", label: "Countries Served" },
  { value: 15, suffix: "+", label: "Happy Clients" },
];

export const projects: Project[] = [
  {
    id: "al-hadaf",
    title: "Al Hadaf Metal Coating",
    category: "Web Development",
    description:
      "Corporate website for an industrial metal coating company with service descriptions, testimonials, and blog.",
    highlights: ["99.9% uptime", "100% SEO optimization"],
    tags: ["React", "Node.js", "Google Sheets API"],
  },
  {
    id: "burhani-guards",
    title: "Burhani Guards Performance Tracker",
    category: "Web Application",
    description:
      "Custom web application for managing security personnel performance, attendance, and reporting.",
    highlights: ["3s load time", "100% user satisfaction"],
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    id: "himmat-oilfield",
    title: "Himmat Oilfield Shopify Store",
    category: "Ecommerce",
    description:
      "Ecommerce platform for oilfield equipment with product catalog, cart, and secure checkout.",
    highlights: ["5-star rating", "30% engagement increase"],
    tags: ["Shopify Plus", "Liquid", "JavaScript"],
  },
  {
    id: "safinat",
    title: "Safinat Safinaas Ecom App",
    category: "Ecommerce",
    description:
      "Fashion ecommerce web application with dynamic listings, reviews, and personalized recommendations.",
    highlights: ["2000+ products", "50% faster inquiries"],
    tags: ["Webflow", "Custom Code", "Analytics"],
  },
  {
    id: "advance-cinematics",
    title: "Advance Cinematics Portfolio",
    category: "Portfolio Website",
    description:
      "Cinematic portfolio for a Senior Video Editor and Motion Graphics Designer with Vimeo and YouTube integration.",
    highlights: ["Cinematic UI", "Premium media showcase"],
    tags: ["React", "Tailwind CSS", "Vimeo", "YouTube"],
  },
  {
    id: "badshah-property",
    title: "Badshah Property",
    category: "Real Estate",
    description:
      "Modern real estate website for property listings, lead generation, and local SEO optimization.",
    highlights: ["Improved lead generation", "Local SEO visibility"],
    tags: ["React", "Tailwind CSS", "Shadcn UI"],
  },
  {
    id: "aadtra-smm",
    title: "AADTRA Social Media",
    category: "Digital Marketing",
    description:
      "LinkedIn-focused social media management for industrial brand presence in Oil & Gas and Infrastructure.",
    highlights: ["B2B authority building", "Industry engagement"],
    tags: ["LinkedIn", "Content Strategy", "Canva"],
  },
  {
    id: "mahakal-bike",
    title: "Mahakal Bike Rental",
    category: "Web Development",
    description:
      "Bike rental booking platform for tourists and pilgrims visiting Mahakal Temple in Ujjain.",
    highlights: ["Seamless bookings", "Local SEO optimized"],
    tags: ["React", "Tailwind CSS", "Shadcn UI"],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Industrial Client",
    role: "Marketing Director",
    company: "AADTRA",
    quote:
      "Hussaini IT Services transformed our LinkedIn presence. Their strategic content approach helped us build authority in the industrial sector and attract serious B2B decision-makers.",
    rating: 5,
  },
  {
    id: "2",
    name: "Business Owner",
    role: "Founder",
    company: "Gulfpole",
    quote:
      "The team delivered consistent, professional social media management that strengthened our brand credibility across GCC markets. Engagement from contractors and infrastructure companies increased significantly.",
    rating: 5,
  },
  {
    id: "3",
    name: "Property Developer",
    role: "Director",
    company: "Badshah Property",
    quote:
      "Our new website looks premium and generates quality leads daily. The local SEO optimization has made a real difference in property search visibility.",
    rating: 5,
  },
  {
    id: "4",
    name: "Creative Professional",
    role: "Senior Video Editor",
    company: "Advance Cinematics",
    quote:
      "They built a cinematic portfolio that truly represents my work. Fast loading, beautiful design, and seamless Vimeo integration — exactly what I needed to impress clients.",
    rating: 5,
  },
  {
    id: "5",
    name: "Homestay Owner",
    role: "Manager",
    company: "Saifuddin & Sons Homestay",
    quote:
      "Our homestay website near Mahakal Temple has increased direct bookings and inquiries. Clean design, mobile-friendly, and perfectly targeted for pilgrims and tourists.",
    rating: 5,
  },
];

export const technologies = [
  "React",
  "Next.js",
  "Node.js",
  "AWS",
  "Shopify",
  "WordPress",
  "Flutter",
  "TypeScript",
  "Google Ads",
  "Meta Ads",
  "Canva",
  "Webflow",
];

export const companyInfo = {
  name: "Hussaini IT Services",
  email: "hello@hussainitservices.com",
  phone: "+971 56 524 2459",
  location: "High Wycombe, UK & Ujjain, India",
  // Must match the primary domain used in Google Search Console (www)
  website: "https://www.hussainiitservices.com",
};
