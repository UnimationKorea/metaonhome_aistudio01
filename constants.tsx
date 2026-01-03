
import { Post, SiteSection, SiteConfig } from './types';

export const INITIAL_SECTIONS: SiteSection[] = [
  {
    id: 'hero',
    name: 'Hero',
    title: {
      en: 'MetaOn: The Next Generation AI & Metaverse Learning Platform',
      kr: '메타온: 차세대 AI 및 메타버스 학습 플랫폼'
    },
    subtitle: {
      en: 'Redefining elementary education through immersive technology and AI-driven growth.',
      kr: '몰입형 기술과 AI 중심의 성장을 통해 초등 교육을 재정의합니다.'
    }
  },
  {
    id: 'about',
    name: 'What is MetaOn?',
    title: {
      en: 'Intelligent Learning Ecosystem',
      kr: '지능형 학습 생태계'
    },
    subtitle: {
      en: 'Seamlessly integrating traditional learning with a 3-step metaverse experience: Study Zone, Meta Planet, and Battle Zone.',
      kr: '학습존, 메타 플래닛, 대결 학습존으로 이어지는 3단계 입체 학습 시스템을 완벽하게 통합합니다.'
    },
    content: {
      en: 'Our core philosophy is that "Korean reading habits lead to English reading habits," fostering linguistic thinking beyond simple memorization.',
      kr: '"한글 독서 습관이 영어 독서 습관을 이끌어준다"는 철학 아래, 단순 암기를 넘어 언어적 사고력을 기르는 데 집중합니다.'
    }
  },
  {
    id: 'features',
    name: 'Key Features',
    title: {
      en: 'Cutting-edge Educational Differentiators',
      kr: '최첨단 교육 차별화 요소'
    },
    subtitle: {
      en: 'Experience a platform built for the future of digital native students.',
      kr: '디지털 네이티브 학생들을 위한 미래형 플랫폼을 경험하세요.'
    }
  }
];

export const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    slug: 'metaon-2-launch',
    title: {
      en: 'Metaon II (AI Tutor System) is Officially Launched',
      kr: 'Metaon II (AI Tutor System) 서비스 공식 개시'
    },
    summary: {
      en: 'A revolutionary approach to language learning with our new AI Tutor System.',
      kr: '새로운 AI 튜터 시스템과 함께하는 혁신적인 언어 학습 방식입니다.'
    },
    content: {
      en: 'The AI Tutor System represents a completely different approach from traditional learning methods. It automatically measures student levels, suggests conversation styles, and naturally corrects weaknesses. Various latest AI technologies are combined in the student conversation system to allow children to train for natural real-life conversations.',
      kr: 'AI Tutor System은 기존의 학습 방식과는 전혀 다른 새로운 방식입니다. 학생들의 레벨을 자동적으로 측정해서 대화 방식을 제안하고, 학습의 취약점을 찾아서 자연스럽게 수정합니다. 학생 대화 시스템에는 여러가지 최신 AI 기술이 조합을 이루어 아이들이 자연스럽게 실제 대화하는 훈련을 할 수 있도록 합니다.'
    },
    coverImage: 'https://picsum.photos/seed/metaon1/1200/600',
    tags: ['Announcement', 'AI'],
    publishDate: new Date().toISOString(),
    published: true,
    seo: {
      title: 'Metaon II Launch | AI Tutor',
      description: 'Discover the new AI Tutor System from MetaOn.'
    }
  }
];

export const SITE_DEFAULT_CONFIG: SiteConfig = {
  accentColor: '#7C3AED',
  siteName: 'MetaOn Global',
  contactEmail: 'webmaster@eduree.com'
};
