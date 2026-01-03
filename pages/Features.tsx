
import React from 'react';
import Navbar from '../components/Navbar';
import BilingualDisplay from '../components/BilingualDisplay';
import { Cpu, Gamepad2, Users, Bot, ShieldCheck } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <Gamepad2 className="text-purple-500" />,
      title: { en: "3-Step Immersive System", kr: "3단계 몰입형 시스템" },
      items: [
        { en: "Study Zone: 50+ game-based activities.", kr: "학습존: 50여 종의 게임형 액티비티" },
        { en: "Meta Planet: Converse with NPCs for review.", kr: "메타 플래닛: NPC 대화형 복습 시스템" },
        { en: "Battle Zone: Master through real-time battles.", kr: "대결 학습존: 실시간 퀴즈 대결을 통한 마스터" }
      ]
    },
    {
      icon: <Cpu className="text-purple-500" />,
      title: { en: "AI Courseware", kr: "AI 코스웨어" },
      items: [
        { en: "Analyzes learning data for tailored guides.", kr: "학습 데이터 분석을 통한 맞춤형 가이드" },
        { en: "Diagnostic reports for personalized growth.", kr: "개인 맞춤형 성장을 위한 진단 리포트" },
        { en: "Enhanced AI evaluation from 2026.", kr: "2026년부터 강화된 AI 진단 평가 제공" }
      ]
    },
    {
      icon: <Bot className="text-purple-500" />,
      title: { en: "MetaOn II (AI Tutor)", kr: "메타온 II (AI 튜터)" },
      items: [
        { en: "Automatic level measurement and conversation.", kr: "자동 레벨 측정 및 대화 방식 제안" },
        { en: "Natural correction of learning weaknesses.", kr: "학습 취약점의 자연스러운 수정" },
        { en: "Real-world conversational training.", kr: "실제 대화 환경에서의 훈련 시스템" }
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <BilingualDisplay 
              text={{ en: "Key Features & Strengths", kr: "특장점 및 플랫폼 경쟁력" }}
              enClassName="text-4xl font-bold mb-4"
              krClassName="text-xl text-gray-400"
            />
          </div>

          <div className="space-y-24">
            {features.map((f, i) => (
              <div key={i} className="grid lg:grid-cols-2 gap-16 items-start">
                <div className={`${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="mb-8 p-4 bg-purple-500/10 rounded-2xl w-fit">{f.icon}</div>
                  <BilingualDisplay 
                    text={f.title} 
                    enClassName="text-3xl font-bold mb-8" 
                    krClassName="text-xl text-gray-400"
                  />
                  <div className="space-y-6">
                    {f.items.map((item, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="mt-2 w-1.5 h-1.5 bg-purple-600 rounded-full flex-shrink-0"></div>
                        <BilingualDisplay 
                          text={item} 
                          enClassName="text-gray-300 font-medium" 
                          krClassName="text-gray-500 text-sm"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="aspect-video glass-card rounded-3xl overflow-hidden relative">
                   <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/10 to-transparent"></div>
                   <img src={`https://picsum.photos/seed/feature-${i}/1200/800`} className="w-full h-full object-cover opacity-60" alt="" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
