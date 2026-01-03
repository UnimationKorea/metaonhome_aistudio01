
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import BilingualDisplay from '../components/BilingualDisplay';
import { store } from '../services/store';
import { Post } from '../types';
import { Link } from 'react-router-dom';
import { Calendar, Tag, ArrowRight } from 'lucide-react';

const News: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    setPosts(store.getPosts().filter(p => p.published).reverse());
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <BilingualDisplay 
              text={{ en: "MetaOn News & Updates", kr: "메타온 최신 소식" }}
              enClassName="text-4xl font-bold mb-4"
              krClassName="text-xl text-gray-400"
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map(post => (
              <Link key={post.id} to={`/post/${post.slug}`} className="group block glass-card rounded-3xl overflow-hidden hover:-translate-y-2 transition-all border-white/5">
                <div className="aspect-video relative overflow-hidden">
                  <img src={post.coverImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4 text-[10px] text-gray-500 uppercase tracking-widest">
                    <span className="flex items-center gap-1"><Calendar size={12}/> {new Date(post.publishDate).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1"><Tag size={12}/> {post.tags[0]}</span>
                  </div>
                  <BilingualDisplay 
                    text={post.title} 
                    enClassName="text-xl font-bold mb-4 line-clamp-2" 
                    krClassName="text-sm text-gray-400 line-clamp-1" 
                  />
                  <div className="mt-8 flex items-center gap-2 text-purple-400 font-semibold group-hover:gap-4 transition-all">
                    Read Story <ArrowRight size={18} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default News;
