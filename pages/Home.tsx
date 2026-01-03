
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
      // 1. Formspree API로 전송
      const response = await fetch('https://formspree.io/f/xeeolglw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(inquiry)
      });

      if (response.ok) {
        // 2. 내부 로컬 스토어에도 기록 (CMS용)
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
    <div className="relative">
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-6 pt-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full"></div>
        
        <div className="max-w-4xl text-center z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-purple-400 mb-8 tracking-widest uppercase">
            <Zap size={14} /> AI-Powered Metaverse Learning
          </div>
          {hero && (
            <BilingualDisplay 
              text={hero.title} 
              enClassName="text-5xl md:text-7xl font-extrabold tracking-tight mb-4"
              krClassName="text-2xl md:text-3xl text-gray-400 font-medium mb-8"
            />
          )}
          {hero && (
            <BilingualDisplay 
              text={hero.subtitle} 
              enClassName="text-xl text-gray-400 max-w-2xl mx-auto mb-10"
              krClassName="text-base text-gray-500 mt-2"
            />
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 shadow-lg shadow-purple-500/20">
              Get Started
            </button>
            <button className="glass-card hover:bg-white/10 px-8 py-4 rounded-xl font-bold transition-all">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="w-12 h-1 text-purple-600 mb-6 bg-purple-600"></div>
            {about && (
              <>
                <BilingualDisplay 
                  text={about.title} 
                  enClassName="text-4xl font-bold mb-6"
                  krClassName="text-xl text-gray-400"
                />
                <BilingualDisplay 
                  text={about.subtitle} 
                  enClassName="text-lg text-gray-400 mb-8 leading-relaxed"
                  krClassName="text-base text-gray-500 mb-8 italic"
                />
                <BilingualDisplay 
                  text={about.content!} 
                  enClassName="text-gray-300"
                  krClassName="text-gray-500 mt-2"
                />
              </>
            )}
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <img src="https://picsum.photos/seed/metaon-about/800/600" className="rounded-2xl relative shadow-2xl border border-white/5" alt="MetaOn Vision" />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center mb-16">
          {features && (
            <BilingualDisplay 
              text={features.title} 
              enClassName="text-4xl font-bold mb-4"
              krClassName="text-xl text-gray-400"
            />
          )}
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { icon: <Layers className="text-purple-500" />, title: { en: 'Study Zone', kr: '학습존' }, desc: { en: '50+ game-based activities for daily learning.', kr: '50여 종의 게임형 액티비티' } },
            { icon: <Globe className="text-purple-500" />, title: { en: 'Meta Planet', kr: '메타 플래닛' }, desc: { en: 'Review through NPC conversations and rewards.', kr: 'NPC와 대화하며 즐기는 입체 복습' } },
            { icon: <Zap className="text-purple-500" />, title: { en: 'Battle Zone', kr: '대결 학습존' }, desc: { en: 'Real-time quiz battles with AI or peers.', kr: 'AI 또는 친구들과의 퀴즈 대결' } },
            { icon: <Cpu className="text-purple-500" />, title: { en: 'AI Courseware', kr: 'AI 코스웨어' }, desc: { en: 'Personalized growth and diagnostic reports.', kr: '개인 맞춤형 성장을 위한 진단 리포트' } },
            { icon: <ShieldCheck className="text-purple-500" />, title: { en: 'White-Labeling', kr: '화이트 라벨링' }, desc: { en: 'Reflect your brand identity seamlessly.', kr: '브랜드 아이덴티티를 투영하는 맞춤 플랫폼' } },
            { icon: <Users className="text-purple-500" />, title: { en: 'Multi-Stakeholder', kr: '통합 관리 시스템' }, desc: { en: 'Empowering publishers, franchises, and schools.', kr: '출판사, 프랜차이즈, 어학원을 위한 솔루션' } },
          ].map((f, i) => (
            <div key={i} className="glass-card p-8 rounded-2xl hover:border-purple-500/30 transition-all hover:-translate-y-2">
              <div className="mb-6 p-3 bg-purple-500/10 rounded-xl w-fit">{f.icon}</div>
              <BilingualDisplay text={f.title} enClassName="text-xl font-bold mb-2" krClassName="text-sm text-gray-400" />
              <BilingualDisplay text={f.desc} enClassName="text-gray-400 mt-4" krClassName="text-xs text-gray-500 mt-1" />
            </div>
          ))}
        </div>
      </section>

      {/* Latest News */}
      <section id="news" className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <BilingualDisplay 
              text={{ en: 'Latest News & Updates', kr: '최신 소식 및 업데이트' }} 
              enClassName="text-4xl font-bold"
              krClassName="text-xl text-gray-400"
            />
            <button className="hidden md:flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition-colors">
              View All <ArrowRight size={18} />
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {posts.map(post => (
              <a key={post.id} href={`#/post/${post.slug}`} className="group glass-card rounded-2xl overflow-hidden block">
                <div className="aspect-video relative overflow-hidden">
                  <img src={post.coverImage} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={post.title.en} />
                </div>
                <div className="p-6">
                  <div className="flex gap-2 mb-4">
                    {post.tags.map(t => <span key={t} className="text-[10px] uppercase tracking-widest bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded">{t}</span>)}
                  </div>
                  <BilingualDisplay text={post.title} enClassName="text-lg font-bold line-clamp-2" krClassName="text-sm text-gray-400 mt-1" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section id="clients" className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <BilingualDisplay 
            text={{ en: 'Empowering Educational Leaders', kr: '글로벌 교육 리더를 위한 파트너십' }} 
            enClassName="text-4xl font-bold mb-4"
            krClassName="text-xl text-gray-400"
          />
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          {[
            { title: { en: 'Educational Publishers', kr: '교육 출판사' }, desc: { en: 'Digitalize offline content without high development costs.', kr: '오프라인 콘텐츠의 원활한 디지털화' } },
            { title: { en: 'Academy Franchises', kr: '학원 프랜차이즈' }, desc: { en: 'Reduce teacher dependency with automated LMS tools.', kr: '자동화된 LMS를 통한 운영 효율 증대' } },
            { title: { en: 'Language Schools', kr: '혁신적인 어학원' }, desc: { en: 'Increase retention and provide transparent history.', kr: '학생 유지율 제고 및 투명한 학습 리포트' } },
          ].map((c, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-purple-500">{i + 1}</span>
              </div>
              <BilingualDisplay text={c.title} enClassName="text-xl font-bold mb-4" krClassName="text-sm text-gray-400" />
              <BilingualDisplay text={c.desc} enClassName="text-gray-400" krClassName="text-sm text-gray-500" />
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-gradient-to-b from-[#0B0B0F] to-[#151520]">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card rounded-[2rem] overflow-hidden grid lg:grid-cols-5 border border-white/10">
            <div className="lg:col-span-2 bg-gradient-purple p-12 text-white flex flex-col justify-between">
              <div>
                <BilingualDisplay 
                  text={{ en: 'Let\'s Create the Future Together', kr: '함께 미래를 만들어가세요' }} 
                  enClassName="text-4xl font-bold mb-6"
                  krClassName="text-xl text-white/70"
                />
                <p className="text-white/80 mt-10 space-y-4">
                  Transform your educational vision into a metaverse reality. Contact us for demos and partnerships.
                </p>
              </div>
              <div className="mt-12 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"><Mail size={20} /></div>
                  <div>
                    <p className="text-xs text-white/50">Email Support</p>
                    <p className="font-medium">webmaster@eduree.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"><Globe size={20} /></div>
                  <div>
                    <p className="text-xs text-white/50">Developer</p>
                    <p className="font-medium">Unimation Korea, Inc.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3 p-12 bg-[#0B0B0F]">
              {status === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-6">
                    <Zap size={40} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Message Received!</h3>
                  <p className="text-gray-400">Our team will reach out to you within 24 hours.</p>
                  <button onClick={() => setStatus('idle')} className="mt-8 text-purple-400 hover:underline">Send another message</button>
                </div>
              ) : status === 'error' ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-6">
                    <ShieldCheck size={40} className="rotate-180" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-red-400">Submission Failed</h3>
                  <p className="text-gray-400">Something went wrong. Please try again or contact us via email.</p>
                  <button onClick={() => setStatus('idle')} className="mt-8 text-purple-400 hover:underline">Try again</button>
                </div>
              ) : (
                <form onSubmit={handleSubmitInquiry} className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase">Your Name</label>
                    <input 
                      required
                      type="text" 
                      name="name"
                      value={inquiry.name} 
                      onChange={e => setInquiry({...inquiry, name: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors" 
                      placeholder="John Doe" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase">Email Address</label>
                    <input 
                      required
                      type="email" 
                      name="email"
                      value={inquiry.email} 
                      onChange={e => setInquiry({...inquiry, email: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors" 
                      placeholder="john@example.com" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase">Company</label>
                    <input 
                      type="text" 
                      name="company"
                      value={inquiry.company} 
                      onChange={e => setInquiry({...inquiry, company: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors" 
                      placeholder="Organization Name" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase">Country</label>
                    <input 
                      type="text" 
                      name="country"
                      value={inquiry.country} 
                      onChange={e => setInquiry({...inquiry, country: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors" 
                      placeholder="Country" 
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase">Message</label>
                    <textarea 
                      required
                      name="message"
                      rows={4} 
                      value={inquiry.message} 
                      onChange={e => setInquiry({...inquiry, message: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors resize-none" 
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  <div className="sm:col-span-2">
                    <button 
                      type="submit" 
                      disabled={status === 'sending'}
                      className="w-full bg-purple-600 hover:bg-purple-700 py-4 rounded-xl font-bold transition-all disabled:opacity-50"
                    >
                      {status === 'sending' ? 'Sending...' : 'Send Inquiry'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-[#0B0B0F] px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-purple-600 rounded flex items-center justify-center"><span className="text-[10px] font-bold">M</span></div>
              <span className="font-bold">METAON GLOBAL</span>
            </div>
            <p className="text-xs text-gray-500 max-w-xs text-center md:text-left">
              &copy; 2024 Unimation Korea, Inc. All rights reserved. Registered in Seoul, Republic of Korea.
            </p>
          </div>
          <div className="flex gap-8 text-xs font-semibold text-gray-400 uppercase tracking-widest">
            <a href="#" className="hover:text-purple-400">Privacy</a>
            <a href="#" className="hover:text-purple-400">Terms</a>
            <a href="#" className="hover:text-purple-400">LMS Login</a>
            <a href="#/admin" className="hover:text-purple-400">Admin</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
