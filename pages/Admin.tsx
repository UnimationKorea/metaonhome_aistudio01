
import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  Mail, 
  Eye,
  CheckCircle2,
  AlertCircle,
  Image as ImageIcon,
  Upload,
  Search,
  X,
  ChevronRight,
  Menu,
  ExternalLink,
  Zap
} from 'lucide-react';
import { store } from '../services/store';
import { Post, SiteSection, SiteConfig, Inquiry, Asset } from '../types';

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2000&auto=format&fit=crop";

const Admin: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'posts' | 'sections' | 'inquiries' | 'assets' | 'settings'>('dashboard');
  const [pass, setPass] = useState('');
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Data States
  const [posts, setPosts] = useState<Post[]>([]);
  const [sections, setSections] = useState<SiteSection[]>([]);
  const [config, setConfig] = useState<SiteConfig>(store.getConfig());
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);

  // Editing state
  const [editingPost, setEditingPost] = useState<Partial<Post> | null>(null);
  const [isAssetPickerOpen, setIsAssetPickerOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isLoggedIn) {
      refreshData();
    }
  }, [isLoggedIn]);

  const refreshData = () => {
    setPosts([...store.getPosts()].reverse());
    setSections([...store.getSections()]);
    setInquiries([...store.getInquiries()].reverse());
    setAssets([...store.getAssets()]);
  };

  const showNotify = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pass === 'uni01') {
      setIsLoggedIn(true);
      showNotify('Session Authorized.');
    } else {
      showNotify('Access Denied: Invalid Credentials', 'error');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      showNotify('File too large (Max 2MB for local storage)', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const newAsset: Asset = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        url: base64String,
        type: file.type,
        date: new Date().toISOString()
      };
      store.addAsset(newAsset);
      setAssets(store.getAssets());
      showNotify('Asset synchronized.');
      
      if (editingPost) {
        setEditingPost({ ...editingPost, coverImage: base64String });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSavePost = () => {
    if (!editingPost?.title?.en || !editingPost?.slug) {
      showNotify('Missing Required Fields', 'error');
      return;
    }
    
    try {
      const p = {
        ...editingPost,
        id: editingPost.id || Math.random().toString(36).substr(2, 9),
        publishDate: editingPost.publishDate || new Date().toISOString(),
        published: editingPost.published ?? true,
        coverImage: editingPost.coverImage || PLACEHOLDER_IMAGE,
        tags: editingPost.tags || ['Announcement'],
        seo: editingPost.seo || { title: editingPost.title.en, description: editingPost.summary?.en || '' }
      } as Post;
      
      store.savePost(p);
      refreshData();
      setEditingPost(null);
      showNotify('Story Successfully Published.');
    } catch (err) {
      showNotify('Sync Error: Persistence Failure.', 'error');
    }
  };

  const handleDeletePost = (id: string) => {
    if (confirm('Permanently delete this story?')) {
      store.deletePost(id);
      refreshData();
      showNotify('Story removed.');
    }
  };

  const handleDeleteAsset = (id: string) => {
    if (confirm('Permanently remove this asset?')) {
      store.deleteAsset(id);
      setAssets(store.getAssets());
      showNotify('Asset deleted.');
    }
  };

  const navItems = [
    { id: 'dashboard', icon: <LayoutDashboard size={20} />, label: 'Overview' },
    { id: 'posts', icon: <FileText size={20} />, label: 'Studio' },
    { id: 'assets', icon: <ImageIcon size={20} />, label: 'Assets' },
    { id: 'sections', icon: <Edit3 size={20} />, label: 'Builder' },
    { id: 'inquiries', icon: <Mail size={20} />, label: 'Leads' },
  ];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0B0B0F] flex items-center justify-center p-6 font-sans">
        <form onSubmit={handleLogin} className="glass-card p-10 md:p-14 rounded-[3rem] w-full max-w-md border-purple-500/20 shadow-2xl">
          <div className="w-20 h-20 bg-gradient-purple rounded-3xl flex items-center justify-center mb-10 mx-auto rotate-6 shadow-xl shadow-purple-600/30">
            <LayoutDashboard className="text-white" size={36} />
          </div>
          <h1 className="text-3xl font-black text-center mb-2 tracking-tighter uppercase">Admin Console</h1>
          <p className="text-gray-500 text-center mb-12 text-sm font-medium">MetaOn Global Restricted Access</p>
          
          <div className="space-y-4">
            <input 
              type="password" 
              placeholder="Authorization Key" 
              value={pass}
              onChange={e => setPass(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-center tracking-[0.5em] font-black"
              autoFocus
            />
            <button className="w-full bg-purple-600 py-5 rounded-2xl font-black hover:bg-purple-700 transition-all shadow-xl shadow-purple-600/30 uppercase tracking-widest text-sm">
              Verify
            </button>
          </div>
          
          {notification?.type === 'error' && (
            <p className="text-red-400 text-center mt-8 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 animate-pulse">
              <AlertCircle size={14} /> {notification.message}
            </p>
          )}
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B0F] flex flex-col md:flex-row text-gray-200">
      {notification && (
        <div className={`fixed top-8 right-8 z-[200] px-8 py-5 rounded-2xl shadow-2xl flex items-center gap-4 animate-in slide-in-from-right-10 ${notification.type === 'success' ? 'bg-green-500/10 border border-green-500/20 text-green-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'}`}>
          {notification.type === 'success' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
          <span className="font-bold text-sm tracking-tight">{notification.message}</span>
        </div>
      )}

      {/* Sidebar */}
      <aside className="hidden md:flex w-72 border-r border-white/5 p-8 flex-col gap-2 bg-[#0D0D12] sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-14 px-2">
          <div className="w-10 h-10 bg-gradient-purple rounded-xl flex items-center justify-center">
            <span className="font-black text-white italic text-lg">M</span>
          </div>
          <span className="font-black text-xl tracking-tighter uppercase">CONSOLE<span className="text-purple-500">.</span></span>
        </div>
        
        <nav className="space-y-2 flex-1">
          {navItems.map(item => (
            <button 
              key={item.id}
              onClick={() => { setActiveTab(item.id as any); setEditingPost(null); }}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all group ${activeTab === item.id ? 'bg-purple-600 text-white shadow-lg' : 'hover:bg-white/5 text-gray-500 hover:text-gray-300'}`}
            >
              <span>{item.icon}</span>
              <span className="font-black text-xs uppercase tracking-widest">{item.label}</span>
            </button>
          ))}
        </nav>

        <button onClick={() => setIsLoggedIn(false)} className="flex items-center gap-4 px-6 py-4 rounded-2xl text-red-400/60 hover:text-red-400 hover:bg-red-500/10 w-full transition-all font-black text-xs uppercase tracking-widest">
          <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* Main Area */}
      <main className="flex-1 p-6 md:p-14 overflow-y-auto max-h-screen">
        <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" />

        {activeTab === 'dashboard' && (
          <div className="space-y-12 max-w-6xl animate-in fade-in duration-700">
            <header>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">MetaOn <span className="text-purple-500">Hub</span></h2>
              <p className="text-gray-500 font-medium">Real-time platform metrics and management console.</p>
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Total Stories', value: posts.length, color: 'border-purple-600', icon: <FileText size={16}/> },
                { label: 'Media Assets', value: assets.length, color: 'border-blue-500', icon: <ImageIcon size={16}/> },
                { label: 'Global Leads', value: inquiries.length, color: 'border-emerald-500', icon: <Mail size={16}/> },
                { label: 'Active Tasks', value: 12, color: 'border-amber-500', icon: <Zap size={16}/> }
              ].map((stat, i) => (
                <div key={i} className={`glass-card p-8 rounded-[2.5rem] border-t-4 ${stat.color} hover:translate-y-[-4px] transition-transform`}>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
                    <span className="text-gray-600">{stat.icon}</span>
                  </div>
                  <h3 className="text-5xl font-black tracking-tighter">{stat.value}</h3>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'posts' && (
          <div className="space-y-10 max-w-6xl">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div>
                <h2 className="text-4xl font-black tracking-tighter uppercase">Content <span className="text-purple-500">Studio</span></h2>
                <p className="text-gray-500 mt-2">Create and curate MetaOn global updates.</p>
              </div>
              {!editingPost && (
                <button 
                  onClick={() => setEditingPost({ title: { en: '', kr: '' }, summary: { en: '', kr: '' }, content: { en: '', kr: '' }, tags: ['News'], coverImage: '', slug: 'post-' + Date.now(), published: true })}
                  className="w-full sm:w-auto bg-purple-600 flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-black hover:bg-purple-700 transition-all text-xs uppercase tracking-widest shadow-xl shadow-purple-900/40"
                >
                  <Plus size={18} /> New Story
                </button>
              )}
            </header>

            {editingPost ? (
              <div className="glass-card p-8 md:p-14 rounded-[3rem] space-y-12 animate-in zoom-in-95 duration-500">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-white/5 pb-10">
                   <h3 className="text-3xl font-black tracking-tighter">{editingPost.id ? 'Edit Narrative' : 'Draft New Narrative'}</h3>
                   <div className="flex gap-3 w-full sm:w-auto">
                     <button onClick={() => setEditingPost(null)} className="flex-1 px-8 py-4 rounded-xl border border-white/10 font-black uppercase text-[10px] tracking-widest">Cancel</button>
                     <button onClick={handleSavePost} className="flex-1 bg-purple-600 px-10 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-purple-600/20">Sync & Publish</button>
                   </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-12">
                  <div className="lg:col-span-4 space-y-8">
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest">Visual Cover</label>
                      <div className="flex gap-2">
                        <input className="flex-1 bg-white/5 border border-white/10 p-5 rounded-2xl outline-none text-[10px]" placeholder="URL or select from library" value={editingPost.coverImage} onChange={e => setEditingPost({...editingPost, coverImage: e.target.value})} />
                        <button onClick={() => setIsAssetPickerOpen(true)} className="p-5 bg-purple-600/20 text-purple-400 rounded-2xl hover:bg-purple-600 hover:text-white transition-all"><ImageIcon size={20} /></button>
                      </div>
                      <div className="aspect-video rounded-3xl overflow-hidden border border-white/10 bg-white/5">
                        <img src={editingPost.coverImage || PLACEHOLDER_IMAGE} className="w-full h-full object-cover" alt="Cover Preview" />
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-8 space-y-10">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest">Story Title (EN)</label>
                        <input className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl font-bold" value={editingPost.title?.en} onChange={e => setEditingPost({...editingPost, title: {...editingPost.title!, en: e.target.value}})} />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest">Story Title (KR)</label>
                        <input className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl font-bold" value={editingPost.title?.kr} onChange={e => setEditingPost({...editingPost, title: {...editingPost.title!, kr: e.target.value}})} />
                      </div>
                    </div>
                    <div className="space-y-3">
                        <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest">Story Narrative (EN)</label>
                        <textarea className="w-full bg-white/5 border border-white/10 p-8 rounded-[2.5rem] h-64 outline-none leading-relaxed text-gray-300" value={editingPost.content?.en} onChange={e => setEditingPost({...editingPost, content: {...editingPost.content!, en: e.target.value}})} />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map(p => (
                  <div key={p.id} className="glass-card rounded-[2.5rem] overflow-hidden group border border-white/5 relative">
                    <div className="aspect-video relative overflow-hidden">
                      <img src={p.coverImage} className="w-full h-full object-cover" alt="" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                        <button onClick={() => setEditingPost(p)} className="p-4 bg-white text-black rounded-full shadow-xl"><Edit3 size={18}/></button>
                        <button onClick={() => handleDeletePost(p.id)} className="p-4 bg-red-600 text-white rounded-full shadow-xl"><Trash2 size={18}/></button>
                      </div>
                    </div>
                    <div className="p-8">
                      <h4 className="font-bold text-lg leading-tight line-clamp-2">{p.title.en}</h4>
                      <p className="text-[10px] font-black uppercase text-gray-600 mt-4 tracking-widest">{new Date(p.publishDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'assets' && (
          <div className="space-y-12 max-w-7xl">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div>
                <h2 className="text-4xl font-black tracking-tighter uppercase">Asset <span className="text-purple-500">Library</span></h2>
                <p className="text-gray-500 mt-2 font-medium">Localized cloud for digital assets.</p>
              </div>
              <button onClick={() => fileInputRef.current?.click()} className="w-full sm:w-auto bg-purple-600 flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-black hover:bg-purple-700 transition-all text-xs uppercase tracking-widest shadow-xl">
                <Upload size={18} /> Upload Media
              </button>
            </header>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {assets.map(asset => (
                <div key={asset.id} className="glass-card rounded-[2rem] overflow-hidden group border border-white/5 relative aspect-square">
                  <img src={asset.url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={asset.name} />
                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 p-4">
                    <button onClick={() => { navigator.clipboard.writeText(asset.url); showNotify('Base64 copied.'); }} className="w-full py-3 bg-white/10 hover:bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Copy URL</button>
                    <button onClick={() => handleDeleteAsset(asset.id)} className="w-full py-3 bg-red-600/20 hover:bg-red-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Inquiries */}
        {activeTab === 'inquiries' && (
          <div className="space-y-10 max-w-6xl">
             <header>
                <h2 className="text-4xl font-black tracking-tighter uppercase">Global <span className="text-purple-500">Leads</span></h2>
                <p className="text-gray-500 mt-2">Incoming business intelligence from the landing portal.</p>
              </header>
            <div className="space-y-6">
              {inquiries.map(inv => (
                <div key={inv.id} className="glass-card p-10 rounded-[2.5rem] border border-white/5 relative hover:border-purple-500/20 transition-all">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
                    <div>
                       <h4 className="font-black text-2xl tracking-tight mb-2">{inv.name}</h4>
                       <p className="text-purple-400 font-bold text-sm">{inv.email} • {inv.company}</p>
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-gray-600 bg-white/5 px-4 py-2 rounded-full">
                      {new Date(inv.date).toLocaleString()}
                    </div>
                  </div>
                  <div className="p-8 bg-white/5 rounded-[2rem] text-gray-300 leading-relaxed font-medium italic">
                    "{inv.message}"
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Global Modal for Asset Selection */}
        {isAssetPickerOpen && (
          <div className="fixed inset-0 z-[250] flex items-center justify-center p-6 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-300">
            <div className="glass-card w-full max-w-5xl h-[80vh] rounded-[3.5rem] overflow-hidden flex flex-col border-purple-500/20 shadow-2xl">
              <div className="p-10 border-b border-white/5 flex justify-between items-center">
                <h3 className="text-2xl font-black uppercase tracking-tighter">Media Library Selection</h3>
                <button onClick={() => setIsAssetPickerOpen(false)} className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all"><X /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {assets.map(asset => (
                  <button 
                    key={asset.id} 
                    onClick={() => { if (editingPost) setEditingPost({...editingPost, coverImage: asset.url}); setIsAssetPickerOpen(false); }}
                    className="aspect-square relative rounded-[2rem] overflow-hidden border border-white/10 hover:border-purple-500 transition-all group active:scale-95"
                  >
                    <img src={asset.url} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" alt="" />
                    <div className="absolute inset-0 bg-purple-600/0 hover:bg-purple-600/40 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
                      <Plus className="text-white" size={32} />
                    </div>
                  </button>
                ))}
                {assets.length === 0 && (
                  <div className="col-span-full py-20 text-center flex flex-col items-center gap-6">
                    <ImageIcon size={48} className="text-gray-700" />
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">No assets available. Upload media first.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
