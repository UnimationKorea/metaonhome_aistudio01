
export interface BilingualText {
  en: string;
  kr: string;
}

export interface Asset {
  id: string;
  name: string;
  url: string; // Base64 for local persistence simulation
  type: string;
  date: string;
}

export interface Post {
  id: string;
  slug: string;
  title: BilingualText;
  summary: BilingualText;
  content: BilingualText;
  coverImage: string;
  tags: string[];
  publishDate: string;
  published: boolean;
  seo: {
    title: string;
    description: string;
  };
}

export interface SiteSection {
  id: string;
  name: string;
  title: BilingualText;
  subtitle: BilingualText;
  content?: BilingualText;
  cta?: {
    text: BilingualText;
    link: string;
  };
}

export interface Inquiry {
  id: string;
  name: string;
  company: string;
  role: string;
  email: string;
  country: string;
  message: string;
  date: string;
}

export interface SiteConfig {
  accentColor: string;
  siteName: string;
  contactEmail: string;
}
