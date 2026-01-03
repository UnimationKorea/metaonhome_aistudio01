
import React from 'react';
import Navbar from '../components/Navbar';
import BilingualDisplay from '../components/BilingualDisplay';
import { ShieldCheck, BookOpen, School, GraduationCap } from 'lucide-react';

const Clients: React.FC = () => {
  const clients = [
    {
      icon: <BookOpen className="text-purple-400" />,
      title: { en: "Educational Publishers", kr: "교육 출판사" },
      content: { 
        en: "Seeking a robust digital platform to host offline content without high development costs.", 
        kr: "별도의 개발 비용 없이 오프라인 콘텐츠를 디지털화할 강력한 플랫폼이 필요한 기업을 위해." 
      }
    },
    {
      icon: <School className="text-purple-400" />,
      title: { en: "Academy Franchises", kr: "학원 프랜차이즈" },
      content: { 
        en: "Looking to reduce teacher dependency through automated assignment and management (LMS).", 
        kr: "자동화된 LMS를 통해 교사 의존도를 낮추고 운영 효율을 높이려는 교육 본사를 위해." 
      }
    },
    {
      icon: <GraduationCap className="text-purple-400" />,
      title: { en: "Innovative Language Schools", kr: "혁신적인 어학원" },
      content: { 
        en: "Aims to increase student retention and provide transparent video-based learning history to parents.", 
        kr: "학생 유지율을 높이고 학부모에게 영상 기반의 투명한 학습 리포트를 제공하고자 하는 기관을 위해." 
      }
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
             <BilingualDisplay 
              text={{ en: "Partner with MetaOn", kr: "메타온의 파트너가 되어보세요" }}
              enClassName="text-5xl font-extrabold mb-4"
              krClassName="text-2xl text-gray-400"
            />
          </div>

          <div className="glass-card p-12 rounded-[3rem] mb-24 border border-purple-500/10">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/3">
                <ShieldCheck className="text-purple-500 mx-auto md:mx-0 mb-6" size={80} />
                <BilingualDisplay 
                  text={{ en: "White-Labeling", kr: "화이트 라벨링 기술" }}
                  enClassName="text-3xl font-bold mb-2"
                  krClassName="text-xl text-gray-400"
                />
              </div>
              <div className="md:w-2/3 border-l border-white/10 md:pl-12">
                <BilingualDisplay 
                  text={{ 
                    en: "MetaOn offers unparalleled flexibility, allowing partners to reflect their brand identity as if it were their own dedicated portal.", 
                    kr: "메타온은 독보적인 유연성을 제공하여, 파트너사의 브랜드 아이덴티티를 투영한 자체 전용 포털처럼 운영할 수 있게 합니다." 
                  }}
                  enClassName="text-xl leading-relaxed text-gray-300"
                  krClassName="text-lg text-gray-500 mt-4"
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {clients.map((c, i) => (
              <div key={i} className="glass-card p-10 rounded-3xl hover:border-purple-500/30 transition-all flex flex-col items-center text-center">
                <div className="mb-8 p-5 bg-white/5 rounded-full">{c.icon}</div>
                <BilingualDisplay text={c.title} enClassName="text-2xl font-bold mb-6" krClassName="text-lg text-gray-400" />
                <BilingualDisplay text={c.content} enClassName="text-gray-400" krClassName="text-gray-500 text-sm mt-4" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Clients;
