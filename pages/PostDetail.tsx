
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BilingualDisplay from '../components/BilingualDisplay';
import { store } from '../services/store';
import { Post } from '../types';
import { Calendar, ChevronLeft, Share2 } from 'lucide-react';

const PostDetail: React.FC = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const found = store.getPosts().find(p => p.slug === slug);
    if (found) setPost(found);
  }, [slug]);

  if (!post) return null;

  return (
    <div className="min-h-screen">
      <Navbar />
      <article className="pt-40 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/news" className="inline-flex items-center gap-2 text-gray-500 hover:text-white mb-12 transition-colors">
            <ChevronLeft size={18} /> Back to News
          </Link>
          
          <img src={post.coverImage} className="w-full aspect-[21/9] object-cover rounded-3xl mb-16 border border-white/5 shadow-2xl" alt="" />
          
          <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/5">
            <div className="flex items-center gap-4 text-gray-500">
               <Calendar size={18} />
               <span className="text-sm font-medium">{new Date(post.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <button className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all text-gray-400"><Share2 size={20}/></button>
          </div>

          <BilingualDisplay 
            text={post.title} 
            enClassName="text-4xl md:text-5xl font-bold mb-10 leading-tight" 
            krClassName="text-2xl text-gray-400 mb-16"
          />

          <div className="space-y-16">
            <section className="prose prose-invert max-w-none">
              <h3 className="text-xl text-purple-400 font-bold mb-6">English Full Story</h3>
              <div className="text-gray-300 leading-loose text-lg whitespace-pre-wrap">{post.content.en}</div>
            </section>
            
            <section className="prose prose-invert max-w-none p-10 bg-white/[0.02] rounded-3xl border border-white/5">
              <h3 className="text-xl text-purple-400 font-bold mb-6">한국어 국문 소식</h3>
              <div className="text-gray-400 leading-loose text-base whitespace-pre-wrap">{post.content.kr}</div>
            </section>
          </div>
        </div>
      </article>
    </div>
  );
};

export default PostDetail;
