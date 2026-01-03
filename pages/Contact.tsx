
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import BilingualDisplay from '../components/BilingualDisplay';
import { store } from '../services/store';
import { Mail, Globe, MapPin, Zap } from 'lucide-react';

const Contact: React.FC = () => {
  const [inquiry, setInquiry] = useState({ name: '', company: '', role: '', email: '', country: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      store.addInquiry({ ...inquiry, role: inquiry.role || 'N/A' });
      setStatus('success');
      setInquiry({ name: '', company: '', role: '', email: '', country: '', message: '' });
    }, 1000);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <BilingualDisplay 
                text={{ en: "Get in Touch", kr: "파트너십 문의" }}
                enClassName="text-5xl font-extrabold mb-4"
                krClassName="text-2xl text-gray-400"
              />
              <p className="text-gray-400 mt-10 mb-16 text-lg">
                Ready to take your educational content into the metaverse? Our team is here to help you transform your vision.
              </p>

              <div className="space-y-10">
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-purple-600/10 rounded-2xl flex items-center justify-center text-purple-500 flex-shrink-0"><Mail /></div>
                  <div>
                    <h4 className="font-bold text-lg">Email Support</h4>
                    <p className="text-gray-400">webmaster@eduree.com</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-purple-600/10 rounded-2xl flex items-center justify-center text-purple-500 flex-shrink-0"><MapPin /></div>
                  <div>
                    <h4 className="font-bold text-lg">Location</h4>
                    <p className="text-gray-400 leading-relaxed">804, EnC Dream Tower 7, 46 Digital-ro 9-gil, Geumcheon-gu, Seoul, Republic of Korea.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card p-12 rounded-[3rem] border-white/10 relative">
              {status === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-20 animate-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-8">
                    <Zap size={40} />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Inquiry Sent!</h3>
                  <p className="text-gray-400">Thank you for reaching out. We will contact you shortly.</p>
                  <button onClick={() => setStatus('idle')} className="mt-12 text-purple-400 font-bold hover:underline">Send another message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase">Name</label>
                      <input required className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-purple-500 outline-none" placeholder="Full Name" value={inquiry.name} onChange={e => setInquiry({...inquiry, name: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
                      <input required type="email" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-purple-500 outline-none" placeholder="Email Address" value={inquiry.email} onChange={e => setInquiry({...inquiry, email: e.target.value})} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase">Company</label>
                    <input className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-purple-500 outline-none" placeholder="Company / Organization Name" value={inquiry.company} onChange={e => setInquiry({...inquiry, company: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase">Message</label>
                    <textarea required rows={5} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-purple-500 outline-none resize-none" placeholder="How can we help your business?" value={inquiry.message} onChange={e => setInquiry({...inquiry, message: e.target.value})}></textarea>
                  </div>
                  <button disabled={status === 'sending'} className="w-full bg-purple-600 hover:bg-purple-700 py-5 rounded-2xl font-bold text-lg shadow-xl shadow-purple-600/20 transition-all disabled:opacity-50">
                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
