
import { Post, SiteSection, SiteConfig, Inquiry, Asset } from '../types';
import { INITIAL_POSTS, INITIAL_SECTIONS, SITE_DEFAULT_CONFIG } from '../constants';

class StoreService {
  private STORAGE_KEY = 'metaon_cms_data';

  private data: {
    posts: Post[];
    sections: SiteSection[];
    config: SiteConfig;
    inquiries: Inquiry[];
    assets: Asset[];
  };

  constructor() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      this.data = JSON.parse(saved);
      // Ensure assets array exists for migration
      if (!this.data.assets) this.data.assets = [];
    } else {
      this.data = {
        posts: INITIAL_POSTS,
        sections: INITIAL_SECTIONS,
        config: SITE_DEFAULT_CONFIG,
        inquiries: [],
        assets: []
      };
      this.save();
    }
  }

  private save() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error("Storage limit exceeded. Local file storage (Base64) is limited in browsers.", e);
      alert("Warning: Local storage limit reached. Try using smaller images or external URLs.");
    }
  }

  // Assets
  getAssets() { return this.data.assets || []; }
  addAsset(asset: Asset) {
    this.data.assets = [asset, ...(this.data.assets || [])];
    this.save();
  }
  deleteAsset(id: string) {
    this.data.assets = this.data.assets.filter(a => a.id !== id);
    this.save();
  }

  // Posts
  getPosts() { return this.data.posts; }
  savePost(post: Post) {
    const idx = this.data.posts.findIndex(p => p.id === post.id);
    if (idx >= 0) this.data.posts[idx] = post;
    else this.data.posts.push(post);
    this.save();
  }
  deletePost(id: string) {
    this.data.posts = this.data.posts.filter(p => p.id !== id);
    this.save();
  }

  // Sections
  getSections() { return this.data.sections; }
  updateSection(section: SiteSection) {
    const idx = this.data.sections.findIndex(s => s.id === section.id);
    if (idx >= 0) {
      this.data.sections[idx] = section;
      this.save();
    }
  }

  // Config
  getConfig() { return this.data.config; }
  updateConfig(config: SiteConfig) {
    this.data.config = config;
    this.save();
  }

  // Inquiries
  getInquiries() { return this.data.inquiries; }
  addInquiry(inquiry: Omit<Inquiry, 'id' | 'date'>) {
    const newInquiry: Inquiry = {
      ...inquiry,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString()
    };
    this.data.inquiries.push(newInquiry);
    this.save();
  }
}

export const store = new StoreService();
