
import React from 'react';
import Navbar from '../components/Navbar';
import BilingualDisplay from '../components/BilingualDisplay';
import { Layers, Globe, Zap, Target } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <BilingualDisplay 
              text={{ en: "What is MetaOn?", kr: "메타온은 무엇인가요?" }}
              enClassName="text-5xl font-extrabold mb-4"
              krClassName="text-2xl text-gray-400"
            />
            <div className="w-20 h-1 bg-purple-600 mx-auto mt-8"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
            <div className="space-y-8">
              <BilingualDisplay 
                text={{ 
                  en: "MetaOn is an intelligent English learning platform specifically designed for kindergarten and elementary school students.", 
                  kr: "메타온은 유치 및 초등학생을 위해 설계된 지능형 영어 교육 플랫폼입니다." 
                }}
                enClassName="text-2xl font-semibold leading-relaxed"
                krClassName="text-lg text-gray-400"
              />
              <BilingualDisplay 
                text={{ 
                  en: "It creates an immersive educational ecosystem by seamlessly integrating traditional learning with a 3-step metaverse experience: Study Zone, Meta Planet, and Battle Zone.", 
                  kr: "학습존, 메타 플래닛, 대결 학습존으로 이어지는 3단계 입체 학습 시스템을 통해 몰입도 높은 교육 생태계를 구축합니다." 
                }}
                enClassName="text-gray-300 leading-loose"
                krClassName="text-gray-500"
              />
            </div>
            <div className="glass-card p-2 rounded-3xl overflow-hidden">
              <img src="https://picsum.photos/seed/metaon-vision/800/600" className="rounded-2xl" alt="Vision" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-32">
            <div className="glass-card p-10 rounded-3xl border-l-4 border-purple-600">
              <Target className="text-purple-500 mb-6" size={40} />
              <BilingualDisplay 
                text={{ en: "Our Philosophy", kr: "핵심 철학" }}
                enClassName="text-2xl font-bold mb-4"
                krClassName="text-lg text-gray-400"
              />
              <BilingualDisplay 
                text={{ 
                  en: "Korean reading habits lead to English reading habits. We focus on fostering linguistic thinking beyond simple memorization.", 
                  kr: "한글 독서 습관이 영어 독서 습관을 이끌어준다는 철학 아래, 단순 암기를 넘어 언어적 사고력을 기르는 데 집중합니다." 
                }}
                enClassName="text-gray-400"
                krClassName="text-gray-500 mt-2"
              />
            </div>
            <div className="glass-card p-10 rounded-3xl border-l-4 border-purple-400">
              <Zap className="text-purple-400 mb-6" size={40} />
              <BilingualDisplay 
                text={{ en: "Metaphor for Success", kr: "성공을 위한 비유" }}
                enClassName="text-2xl font-bold mb-4"
                krClassName="text-lg text-gray-400"
              />
              <BilingualDisplay 
                text={{ 
                  en: "MetaOn is a 'Smart Kitchen Platform'. You bring your ingredients (content), and we provide the professional tools for a learning feast.", 
                  kr: "메타온은 '스마트 키친 플랫폼'입니다. 귀사가 재료(콘텐츠)를 가져오면, 저희는 학습의 만찬을 위한 전문적인 도구와 환경을 제공합니다." 
                }}
                enClassName="text-gray-400"
                krClassName="text-gray-500 mt-2"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
