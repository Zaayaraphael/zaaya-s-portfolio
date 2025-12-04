// Portfolio data type definitions

export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  photo: string;
  cvUrl?: string;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  url?: string;
}

export interface ExperienceData {
  yearsOfExperience: number;
  services: Service[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface AboutData {
  bio: string;
  photo: string;
  technologies: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  screenshot: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface EducationItem {
  id: string;
  category: 'degree' | 'certification' | 'course';
  title: string;
  institution: string;
  dates: string;
  description?: string;
  certificateUrl?: string;
}

export interface ContactInfo {
  email: string;
  description: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
}

export interface PortfolioData {
  personal: PersonalInfo;
  companies: Company[];
  experience: ExperienceData;
  about: AboutData;
  projects: Project[];
  education: EducationItem[];
  contact: ContactInfo;
  social: SocialLink[];
}