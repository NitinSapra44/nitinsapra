// Database Types
export interface About {
  id: string;
  name: string;
  title: string;
  bio: string; // HTML content
  profile_image_url?: string;
  location?: string;
  email?: string;
  linkedin_url?: string;
  github_url?: string;
  upwork_url?: string;
  fiverr_url?: string;
  resume_url?: string;
  years_experience: number;
  total_projects: number;
  total_clients: number;
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: string;
  name: string;
  icon?: string; // Emoji or identifier
  icon_url?: string; // Image URL
  category?: string;
  proficiency?: number; // 1-5
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string; // HTML content
  project_type: 'web' | 'mobile';
  tech_stack: string[]; // Array of tech tags
  live_demo_url?: string;
  code_url?: string;
  image_url?: string;
  featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  company?: string;
  role?: string;
  testimonial_text: string;
  rating?: number; // 1-5
  avatar_url?: string;
  display_order: number;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  created_at: string;
}

// Form Types
export interface AboutFormData {
  name: string;
  title: string;
  bio: string;
  profile_image_url?: string;
  location?: string;
  email?: string;
  linkedin_url?: string;
  github_url?: string;
  upwork_url?: string;
  fiverr_url?: string;
  resume_url?: string;
  years_experience: number;
  total_projects: number;
  total_clients: number;
}

export interface SkillFormData {
  name: string;
  icon?: string;
  icon_url?: string;
  category?: string;
  proficiency?: number;
  display_order: number;
}

export interface ProjectFormData {
  title: string;
  subtitle?: string;
  description: string;
  project_type: 'web' | 'mobile';
  tech_stack: string[];
  live_demo_url?: string;
  code_url?: string;
  image_url?: string;
  featured: boolean;
  display_order: number;
}

export interface TestimonialFormData {
  client_name: string;
  company?: string;
  role?: string;
  testimonial_text: string;
  rating?: number;
  avatar_url?: string;
  display_order: number;
  featured: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
