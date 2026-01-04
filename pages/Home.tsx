
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import BilingualDisplay from '../components/BilingualDisplay';
import { store } from '../services/store';
import { SiteSection, Post } from '../types';
import { Zap, Globe, Cpu, Users, Layers, ShieldCheck, Mail, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  const [sections, setSections] = useState<SiteSection[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [inquiry, setInquiry] = useState({ name: '', company: '', role: '', email: '', country: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    setSections(store.getSections());
    setPosts(store.getPosts().filter(p => p.published).slice(0, 3));
  }, []);

  const hero = sections.find(s => s.id === 'hero');
  const about = sections.find(s => s.id === 'about');
  const features = sections.find(s => s.id === 'features');

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('https://formspree.io/f/xeeolglw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(inquiry)
      });

      if (response.ok) {
        store.addInquiry({ ...inquiry, role: inquiry.role || 'N/A' });
        setStatus('success');
        setInquiry({ name: '', company: '', role: '', email: '', country: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
    }
  };

  return (
    <div className="relative overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-6 pt-32 pb-20">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] md:w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] md:w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full"></div>
        
        <div className="max-w-4xl text-center z-10 animate-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-xs font-semibold text-purple-400 mb-8 tracking-widest uppercase">
            <Zap size={14} /> AI-Powered Metaverse Learning
          </div>
          {hero && (
            <BilingualDisplay 
              text={hero.title} 
              enClassName="text-4xl md:text-7xl font-extrabold tracking-tight mb-4 leading-[1.1]"
              krClassName="text-lg md:text-3xl text-gray-400 font-medium mb-10"
            />
          )}
          {hero && (
            <BilingualDisplay 
              text={hero.subtitle} 
              enClassName="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
              krClassName="text-sm md:text-base text-gray-500 mt-2"
            />
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 px-10 py-4 rounded-xl font-bold transition-all hover:scale-105 shadow-lg shadow-purple-500/20">
              Get Started
            </button>
            <button className="w-full sm:w-auto glass-card hover:bg-white/10 px-10 py-4 rounded-xl font-bold transition-all border border-white/10">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="order-2 md:order-1">
            <div className="w-12 h-1 bg-purple-600 mb-8"></div>
            {about && (
              <>
                <BilingualDisplay 
                  text={about.title} 
                  enClassName="text-3xl md:text-5xl font-bold mb-6"
                  krClassName="text-lg md:text-2xl text-gray-400"
                />
                <BilingualDisplay 
                  text={about.subtitle} 
                  enClassName="text-base md:text-lg text-gray-400 mb-8 leading-relaxed"
                  krClassName="text-sm md:text-base text-gray-500 mb-8 italic"
                />
                <BilingualDisplay 
                  text={about.content!} 
                  enClassName="text-gray-300 leading-relaxed"
                  krClassName="text-gray-500 mt-3 text-sm"
                />
              </>
            )}
          </div>
          <div className="order-1 md:order-2 relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <img src="https://picsum.photos/seed/metaon-about/800/600" className="rounded-2xl relative shadow-2xl border border-white/5 w-full h-auto object-cover" alt="MetaOn Vision" />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-16 md:py-32 px-6">
        <div className="max-w-7xl mx-auto text-center mb-16 md:mb-24">
          {features && (
            <BilingualDisplay 
              text={features.title} 
              enClassName="text-3xl md:text-5xl font-bold mb-4"
              krClassName="text-lg md:text-2xl text-gray-400"
            />
          )}
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[
            { icon: <Layers className="text-purple-500" />, title: { en: 'Study Zone', kr: '학습존' }, desc: { en: '50+ game-based activities for daily learning.', kr: '50여 종의 게임형 액티비티' } },
            { icon: <Globe className="text-purple-500" />, title: { en: 'Meta Planet', kr: '메타 플래닛' }, desc: { en: 'Review through NPC conversations and rewards.', kr: 'NPC와 대화하며 즐기는 입체 복습' } },
            { icon: <Zap className="text-purple-500" />, title: { en: 'Battle Zone', kr: '대결 학습존' }, desc: { en: 'Real-time quiz battles with AI or peers.', kr: 'AI 또는 친구들과의 퀴즈 대결' } },
            { icon: <Cpu className="text-purple-500" />, title: { en: 'AI Courseware', kr: 'AI 코스웨어' }, desc: { en: 'Personalized growth and diagnostic reports.', kr: '개인 맞춤형 성장을 위한 진단 리포트' } },
            { icon: <ShieldCheck className="text-purple-500" />, title: { en: 'White-Labeling', kr: '화이트 라벨링' }, desc: { en: 'Reflect your brand identity seamlessly.', kr: '브랜드 아이덴티티를 투영하는 맞춤 플랫폼' } },
            { icon: <Users className="text-purple-500" />, title: { en: 'Multi-Stakeholder', kr: '통합 관리 시스템' }, desc: { en: 'Empowering publishers, franchises, and schools.', kr: '출판사, 프랜차이즈, 어학원을 위한 솔루션' } },
          ].map((f, i) => (
            <div key={i} className="glass-card p-8 md:p-10 rounded-3xl hover:border-purple-500/30 transition-all hover:-translate-y-2 group">
              <div className="mb-6 p-4 bg-purple-500/10 rounded-2xl w-fit group-hover:scale-110 transition-transform">{f.icon}</div>
              <BilingualDisplay text={f.title} enClassName="text-xl md:text-2xl font-bold mb-2" krClassName="text-sm md:text-base text-gray-400" />
              <BilingualDisplay text={f.desc} enClassName="text-gray-400 mt-4 leading-relaxed" krClassName="text-xs md:text-sm text-gray-500 mt-2" />
            </div>
          ))}
        </div>
      </section>

      {/* Latest News */}
      <section id="news" className="py-16 md:py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <BilingualDisplay 
              text={{ en: 'Latest News & Updates', kr: '최신 소식 및 업데이트' }} 
              enClassName="text-3xl md:text-5xl font-bold"
              krClassName="text-lg md:text-2xl text-gray-400"
            />
            <button className="flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition-colors group">
              View All <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <a key={post.id} href={`#/post/${post.slug}`} className="group glass-card rounded-[2rem] overflow-hidden block border border-white/5 transition-all">
                <div className="aspect-[16/10] relative overflow-hidden">
                  <img src={post.coverImage} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={post.title.en} />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {post.tags.slice(0, 1).map(t => <span key={t} className="text-[10px] uppercase tracking-widest bg-purple-600 px-3 py-1 rounded-full font-bold shadow-lg shadow-purple-900/40">{t}</span>)}
                  </div>
                </div>
                <div className="p-8">
                  <BilingualDisplay text={post.title} enClassName="text-xl font-bold line-clamp-2 leading-tight h-14" krClassName="text-sm text-gray-500 mt-2 line-clamp-1" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card rounded-[2.5rem] overflow-hidden grid lg:grid-cols-5 border border-white/10 shadow-2xl">
            <div className="lg:col-span-2 bg-gradient-purple p-8 md:p-12 text-white flex flex-col justify-between">
              <div>
                <BilingualDisplay 
                  text={{ en: 'Let\'s Create the Future Together', kr: '함께 미래를 만들어가세요' }} 
                  enClassName="text-3xl md:text-4xl font-bold mb-6"
                  krClassName="text-lg text-white/70"
                />
                <p className="text-white/80 mt-10 leading-relaxed">
                  Transform your educational vision into a metaverse reality. Contact us for demos, system details, and partnership opportunities.
                </p>
              </div>
              <div className="mt-12 space-y-6">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10"><Mail size={24} /></div>
                  <div>
                    <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Email Support</p>
                    <p className="font-semibold text-lg">webmaster@eduree.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3 p-8 md:p-12 bg-[#0D0D14]">
              {status === 'success' ? (
                <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-8">
                    <Zap size={40} />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 tracking-tight">Message Received!</h3>
                  <p className="text-gray-400 max-w-xs mx-auto">Thank you for reaching out. Our team will contact you very soon.</p>
                  <button onClick={() => setStatus('idle')} className="mt-10 px-8 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-bold transition-all">Send another message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmitInquiry} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Your Name</label>
                    <input 
                      required
                      type="text" 
                      value={inquiry.name} 
                      onChange={e => setInquiry({...inquiry, name: e.target.value})}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-purple-500 transition-all focus:ring-1 focus:ring-purple-500/20" 
                      placeholder="Full Name" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Email Address</label>
                    <input 
                      required
                      type="email" 
                      value={inquiry.email} 
                      onChange={e => setInquiry({...inquiry, email: e.target.value})}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-purple-500 transition-all focus:ring-1 focus:ring-purple-500/20" 
                      placeholder="email@example.com" 
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Organization</label>
                    <input 
                      type="text" 
                      value={inquiry.company} 
                      onChange={e => setInquiry({...inquiry, company: e.target.value})}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-purple-500 transition-all focus:ring-1 focus:ring-purple-500/20" 
                      placeholder="Company or School Name" 
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Message</label>
                    <textarea 
                      required
                      rows={5} 
                      value={inquiry.message} 
                      onChange={e => setInquiry({...inquiry, message: e.target.value})}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-purple-500 transition-all focus:ring-1 focus:ring-purple-500/20 resize-none" 
                      placeholder="Describe your needs..."
                    ></textarea>
                  </div>
                  <div className="sm:col-span-2">
                    <button 
                      type="submit" 
                      disabled={status === 'sending'}
                      className="w-full bg-purple-600 hover:bg-purple-700 py-5 rounded-xl font-bold text-lg transition-all disabled:opacity-50 hover:scale-[1.01] active:scale-[0.99] shadow-xl shadow-purple-600/20"
                    >
                      {status === 'sending' ? 'Transmitting...' : 'Send Inquiry'}
                    </button>
                    {status === 'error' && <p className="text-red-400 text-xs mt-4 text-center font-medium">Failed to send. Please check your network or try again.</p>}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/5 bg-[#0B0B0F] px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-purple rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20"><span className="text-xs font-bold italic">M</span></div>
              <span className="font-black text-xl tracking-tighter">META<span className="text-purple-500">ON</span></span>
            </div>
            <p className="text-xs text-gray-500 max-w-sm text-center md:text-left leading-relaxed">
              &copy; 2024 Unimation Korea, Inc. Empowering the future of global education through innovation and AI technology.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-[10px] font-black text-gray-500 uppercase tracking-widest">
            <a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a>
            <a href="#/admin" className="hover:text-purple-400 transition-colors flex items-center gap-2"><ShieldCheck size={14} /> Admin Access</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
