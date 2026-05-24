import { useState } from 'react';

(() => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href =
    'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap';
  document.head.appendChild(link);
})();

const CATS = {
  ONL: {
    name: 'Online Service Provider',
    emoji: '💻',
    tagline: 'Deliver your skills remotely — from anywhere.',
    color: '#1D4ED8',
    accent: '#DBEAFE',
  },
  LOC: {
    name: 'Local Service Business',
    emoji: '🏘️',
    tagline: 'Serve your community and get paid doing it.',
    color: '#047857',
    accent: '#D1FAE5',
  },
  CRE: {
    name: 'Creative / Content Business',
    emoji: '🎨',
    tagline: 'Turn your creativity into a cash-flowing brand.',
    color: '#B45309',
    accent: '#FEF3C7',
  },
  PRD: {
    name: 'Product / Reselling Business',
    emoji: '📦',
    tagline: 'Source smart, sell well, scale up.',
    color: '#6D28D9',
    accent: '#EDE9FE',
  },
  CON: {
    name: 'Consulting / Coaching',
    emoji: '🎯',
    tagline: 'Your experience is your product. Start selling it.',
    color: '#BE123C',
    accent: '#FFE4E6',
  },
  TEC: {
    name: 'Tech / Digital Business',
    emoji: '⚡',
    tagline: 'Build digital solutions. Create lasting income.',
    color: '#0369A1',
    accent: '#E0F2FE',
  },
  HND: {
    name: 'Hands-on / Trade Business',
    emoji: '🔧',
    tagline: 'Real skills. Real demand. Real income.',
    color: '#92400E',
    accent: '#FEF3C7',
  },
  MIN: {
    name: 'Ministry / Community Business',
    emoji: '🤝',
    tagline: 'Lead with purpose. Build something that lasts.',
    color: '#5B21B6',
    accent: '#EDE9FE',
  },
};

const QUESTIONS = [
  {
    id: 'gender',
    text: 'How do you identify?',
    note: 'Used only for personalization — never to limit your options.',
    type: 'info',
    options: [
      { text: 'Male', value: 'male' },
      { text: 'Female', value: 'female' },
      { text: 'Non-binary / Other', value: 'nonbinary' },
      { text: 'Prefer not to say', value: 'na' },
    ],
  },
  {
    id: 'age',
    text: 'What is your age range?',
    note: 'Used only for personalization — never to limit your options.',
    type: 'info',
    options: [
      { text: 'Under 18', value: 'teen' },
      { text: '18–24', value: 'young_adult' },
      { text: '25–34', value: 'adult' },
      { text: '35–49', value: 'mid_adult' },
      { text: '50+', value: 'senior' },
    ],
  },
  {
    id: 'time',
    text: 'How many hours per week can you realistically dedicate to building a new venture?',
    type: 'score',
    options: [
      { text: 'Less than 5 hours', value: 'tiny', scores: { PRD: 1, CRE: 1 } },
      {
        text: '5–10 hours',
        value: 'small',
        scores: { ONL: 1, CRE: 1, MIN: 1 },
      },
      {
        text: '10–20 hours',
        value: 'medium',
        scores: { LOC: 1, CON: 1, HND: 1, ONL: 1 },
      },
      {
        text: "20+ hours — I'm ready to go all in",
        value: 'large',
        scores: { TEC: 2, HND: 2, LOC: 1 },
      },
    ],
  },
  {
    id: 'skill',
    text: 'How would you describe your skill level in your primary area of interest?',
    type: 'score',
    options: [
      {
        text: "Beginner — I'm just starting out",
        value: 'beginner',
        scores: { PRD: 1, MIN: 1, CRE: 1 },
      },
      {
        text: 'Intermediate — I know a fair amount',
        value: 'intermediate',
        scores: { ONL: 1, LOC: 1, CRE: 1 },
      },
      {
        text: "Advanced — I'm quite good at what I do",
        value: 'advanced',
        scores: { CON: 2, TEC: 1, LOC: 1 },
      },
      {
        text: 'Expert — I have deep knowledge and experience',
        value: 'expert',
        scores: { CON: 3, TEC: 2, HND: 1 },
      },
    ],
  },
  {
    id: 'experience',
    text: 'Which best describes your professional background or strongest experience area?',
    type: 'score',
    options: [
      {
        text: 'Corporate / Office work',
        value: 'corporate',
        scores: { CON: 2, ONL: 2 },
      },
      {
        text: 'Trades / Manual labor / Technical',
        value: 'trades',
        scores: { HND: 3, LOC: 1 },
      },
      {
        text: 'Creative / Arts / Media',
        value: 'creative',
        scores: { CRE: 3, ONL: 1 },
      },
      {
        text: 'Technology / IT / Software',
        value: 'tech',
        scores: { TEC: 3, ONL: 1 },
      },
      {
        text: 'Sales / Marketing / Business',
        value: 'sales',
        scores: { PRD: 2, CON: 1, ONL: 1 },
      },
      {
        text: 'Teaching / Training / Coaching',
        value: 'teaching',
        scores: { CON: 3, MIN: 1 },
      },
      {
        text: 'Community / Nonprofit / Ministry',
        value: 'ministry',
        scores: { MIN: 3, CON: 1 },
      },
      {
        text: "No specific background yet — I'm starting fresh",
        value: 'none',
        scores: { PRD: 1, CRE: 1, MIN: 1 },
      },
    ],
  },
  {
    id: 'tech',
    text: 'How comfortable are you with technology — computers, apps, online tools?',
    type: 'score',
    options: [
      {
        text: 'Not comfortable — I keep things simple and basic',
        value: 'low',
        scores: { HND: 2, LOC: 2, MIN: 1 },
      },
      {
        text: 'Somewhat — I can figure things out when I need to',
        value: 'medium_low',
        scores: { PRD: 1, LOC: 1, CRE: 1 },
      },
      {
        text: 'Comfortable — I use tech tools regularly',
        value: 'medium',
        scores: { ONL: 2, PRD: 1, CRE: 1 },
      },
      {
        text: 'Very comfortable — I love technology',
        value: 'high',
        scores: { TEC: 3, ONL: 2 },
      },
    ],
  },
  {
    id: 'social',
    text: 'How would you describe your social comfort level and communication style?',
    type: 'score',
    options: [
      {
        text: 'I prefer to work alone with minimal interaction',
        value: 'introvert',
        scores: { CRE: 2, TEC: 2, PRD: 1 },
      },
      {
        text: 'Some interaction is fine, but not too much',
        value: 'ambivert_low',
        scores: { ONL: 2, PRD: 1, CRE: 1 },
      },
      {
        text: 'I enjoy meeting and working with people regularly',
        value: 'ambivert_high',
        scores: { LOC: 2, CON: 1, MIN: 1 },
      },
      {
        text: 'I love connecting, networking, and building relationships',
        value: 'extrovert',
        scores: { CON: 2, MIN: 2, LOC: 1 },
      },
    ],
  },
  {
    id: 'physical',
    text: 'How do you feel about physical or hands-on work?',
    type: 'score',
    options: [
      {
        text: 'I prefer screen-based or desk work',
        value: 'no_physical',
        scores: { ONL: 2, TEC: 2, CRE: 1 },
      },
      {
        text: 'A little physical activity is fine',
        value: 'light',
        scores: { PRD: 1, LOC: 1, MIN: 1 },
      },
      {
        text: 'I enjoy a healthy mix of both',
        value: 'mixed',
        scores: { LOC: 2, CRE: 1, HND: 1 },
      },
      {
        text: 'I thrive with physical, hands-on work',
        value: 'loves_physical',
        scores: { HND: 3, LOC: 2 },
      },
    ],
  },
  {
    id: 'budget',
    text: 'What is your realistic starting budget for your new venture?',
    type: 'score',
    options: [
      {
        text: '$0–$100 — I need to start nearly free',
        value: 'zero',
        scores: { CRE: 2, ONL: 2, MIN: 1 },
      },
      {
        text: '$100–$500 — I can make a small investment',
        value: 'small',
        scores: { PRD: 1, ONL: 1, CON: 1 },
      },
      {
        text: "$500–$2,000 — I'm willing to invest moderately",
        value: 'medium',
        scores: { LOC: 2, PRD: 2, TEC: 1 },
      },
      {
        text: "$2,000+ — I'm ready to invest significantly",
        value: 'large',
        scores: { HND: 2, LOC: 1, PRD: 2 },
      },
    ],
  },
  {
    id: 'income',
    text: 'What is your primary income goal for this venture?',
    type: 'score',
    options: [
      {
        text: 'Supplemental / hobby income (under $500/mo)',
        value: 'hobby',
        scores: { CRE: 2, MIN: 2 },
      },
      {
        text: 'Side income — $500 to $1,500/month',
        value: 'side',
        scores: { ONL: 2, PRD: 2, LOC: 1 },
      },
      {
        text: 'Solid part-time income — $2,000 to $5,000/month',
        value: 'part_time',
        scores: { CON: 2, LOC: 2, HND: 1 },
      },
      {
        text: 'Replace or exceed full-time income — $5,000+/month',
        value: 'full_time',
        scores: { TEC: 3, CON: 2, HND: 2 },
      },
    ],
  },
  {
    id: 'risk',
    text: 'How do you personally handle financial and business risk?',
    type: 'score',
    options: [
      {
        text: 'Very cautious — I need things to feel stable',
        value: 'very_low',
        scores: { ONL: 1, PRD: 1, MIN: 1 },
      },
      {
        text: 'Somewhat cautious — I take small, calculated risks',
        value: 'low',
        scores: { CRE: 1, LOC: 1, CON: 1 },
      },
      {
        text: 'Moderate — I can handle some uncertainty',
        value: 'medium',
        scores: { LOC: 2, PRD: 1, HND: 1 },
      },
      {
        text: "Bold — I'm okay with risk when the reward is worth it",
        value: 'high',
        scores: { TEC: 2, CON: 1, HND: 1 },
      },
    ],
  },
  {
    id: 'interests',
    text: 'Which area BEST describes your deepest interests or passions?',
    type: 'score',
    options: [
      {
        text: 'Technology, computers, or data',
        value: 'tech',
        scores: { TEC: 3, ONL: 1 },
      },
      {
        text: 'Arts, design, music, or creativity',
        value: 'arts',
        scores: { CRE: 3, ONL: 1 },
      },
      {
        text: 'Health, fitness, or wellness',
        value: 'health',
        scores: { LOC: 2, CON: 2, HND: 1 },
      },
      {
        text: 'Teaching, mentoring, or helping people grow',
        value: 'teaching',
        scores: { CON: 3, MIN: 2 },
      },
      {
        text: 'Building, fixing, or working with your hands',
        value: 'building',
        scores: { HND: 3, LOC: 1 },
      },
      {
        text: 'Business, money, and entrepreneurship itself',
        value: 'business',
        scores: { PRD: 2, CON: 1, TEC: 1 },
      },
      {
        text: 'Faith, community, or social impact',
        value: 'faith',
        scores: { MIN: 3, CON: 1 },
      },
      {
        text: 'Writing, storytelling, or content creation',
        value: 'writing',
        scores: { CRE: 2, ONL: 2 },
      },
      {
        text: 'Fashion, beauty, or personal care',
        value: 'fashion',
        scores: { LOC: 2, CRE: 2 },
      },
      {
        text: 'Food, cooking, or hospitality',
        value: 'food',
        scores: { HND: 2, LOC: 2 },
      },
    ],
  },
  {
    id: 'location_pref',
    text: 'Where would you prefer to do most of your work?',
    type: 'score',
    options: [
      {
        text: 'From home — my couch, desk, or coffee shop',
        value: 'home',
        scores: { ONL: 2, TEC: 2, CRE: 2 },
      },
      {
        text: 'A mix of home and out in the world',
        value: 'mixed',
        scores: { CON: 2, PRD: 1, MIN: 1 },
      },
      {
        text: 'Out in the community — neighborhoods, events, local spaces',
        value: 'community',
        scores: { MIN: 2, LOC: 2 },
      },
      {
        text: "At customers' homes or job sites",
        value: 'client_sites',
        scores: { HND: 3, LOC: 2 },
      },
    ],
  },
  {
    id: 'motivation',
    text: 'What motivates you MOST about starting something of your own?',
    type: 'score',
    options: [
      {
        text: 'Financial freedom and building real wealth',
        value: 'money',
        scores: { PRD: 2, TEC: 2, CON: 1 },
      },
      {
        text: 'Helping, serving, and making a real difference',
        value: 'helping',
        scores: { MIN: 2, CON: 2 },
      },
      {
        text: 'Expressing my creativity and passion',
        value: 'creativity',
        scores: { CRE: 3, ONL: 1 },
      },
      {
        text: 'Being my own boss and controlling my time',
        value: 'freedom',
        scores: { HND: 1, LOC: 1, ONL: 1, CRE: 1 },
      },
      {
        text: 'Building something meaningful that lasts',
        value: 'legacy',
        scores: { TEC: 2, MIN: 2, HND: 1 },
      },
    ],
  },
  {
    id: 'client_finding',
    text: 'How would you most naturally find your first customers or clients?',
    type: 'score',
    options: [
      {
        text: 'Social media content and online posting',
        value: 'social',
        scores: { CRE: 2, ONL: 2 },
      },
      {
        text: 'Word of mouth and personal referrals',
        value: 'word',
        scores: { MIN: 2, LOC: 2, HND: 1 },
      },
      {
        text: 'Online platforms and marketplaces (Etsy, Fiverr, Amazon, etc.)',
        value: 'platforms',
        scores: { ONL: 2, PRD: 2, TEC: 1 },
      },
      {
        text: 'Direct outreach, cold calls, or networking events',
        value: 'outreach',
        scores: { CON: 2, LOC: 1, PRD: 1 },
      },
      {
        text: 'Community events, church, or local organizations',
        value: 'events',
        scores: { MIN: 3, LOC: 2 },
      },
    ],
  },
  {
    id: 'energize',
    text: 'What kind of work leaves you feeling energized and fulfilled?',
    type: 'score',
    options: [
      {
        text: 'Creating or making something from nothing',
        value: 'making',
        scores: { CRE: 2, HND: 2, TEC: 1 },
      },
      {
        text: 'Solving problems and building efficient systems',
        value: 'systems',
        scores: { TEC: 3, CON: 1 },
      },
      {
        text: 'Organizing, buying, or selling things',
        value: 'selling',
        scores: { PRD: 3, LOC: 1 },
      },
      {
        text: 'Connecting with people and building community',
        value: 'connecting',
        scores: { MIN: 2, CON: 2, LOC: 1 },
      },
      {
        text: 'Teaching, coaching, or empowering others to grow',
        value: 'teaching',
        scores: { CON: 3, MIN: 1 },
      },
    ],
  },
  {
    id: 'learning',
    text: 'How do you feel about learning new skills for your business?',
    type: 'score',
    options: [
      {
        text: "I'd rather work with what I already know",
        value: 'no_learn',
        scores: { HND: 1, PRD: 1, CON: 1 },
      },
      {
        text: "I'll learn when I need to, but I prefer practical over theoretical",
        value: 'some_learn',
        scores: { LOC: 1, MIN: 1, CRE: 1 },
      },
      {
        text: 'I enjoy learning and growing step-by-step',
        value: 'enjoy_learn',
        scores: { ONL: 2, CON: 2, PRD: 1 },
      },
      {
        text: 'I love learning new things — challenges excite me!',
        value: 'love_learn',
        scores: { TEC: 3, CRE: 1, CON: 1 },
      },
    ],
  },
  {
    id: 'workstyle',
    text: 'Which work style feels most natural and comfortable to you?',
    type: 'score',
    options: [
      {
        text: 'Independent solo — I work best on my own terms',
        value: 'solo',
        scores: { CRE: 2, TEC: 1, ONL: 1 },
      },
      {
        text: 'Small focused team — a trusted few working closely together',
        value: 'small_team',
        scores: { HND: 1, LOC: 1, PRD: 1 },
      },
      {
        text: 'Leader or coordinator — I love directing and organizing others',
        value: 'leader',
        scores: { CON: 2, MIN: 1, LOC: 1 },
      },
      {
        text: 'Community-centered — I thrive when serving a broader group',
        value: 'community',
        scores: { MIN: 2, LOC: 1, CON: 1 },
      },
    ],
  },
];

function computeScores(answers) {
  const scores = {
    ONL: 0,
    LOC: 0,
    CRE: 0,
    PRD: 0,
    CON: 0,
    TEC: 0,
    HND: 0,
    MIN: 0,
  };
  QUESTIONS.forEach((q) => {
    if (q.type !== 'score') return;
    const val = answers[q.id];
    if (!val) return;
    const opt = q.options.find((o) => o.value === val);
    if (!opt?.scores) return;
    Object.entries(opt.scores).forEach(([cat, pts]) => {
      scores[cat] = (scores[cat] || 0) + pts;
    });
  });
  return scores;
}

function getTop3(scores) {
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([key]) => key);
}

// ── Intro ─────────────────────────────────────────────────────────────────
function IntroScreen({ onStart }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(160deg, #0F0C29 0%, #302B63 50%, #24243E 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        fontFamily: 'Plus Jakarta Sans, sans-serif',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #6366f133 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'relative',
          maxWidth: 580,
          width: '100%',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: '#ffffff12',
            border: '1px solid #ffffff22',
            borderRadius: 40,
            padding: '8px 18px',
            marginBottom: 28,
          }}
        >
          <span style={{ fontSize: 16 }}>✨</span>
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: '#C4B5FD',
              letterSpacing: '0.05em',
            }}
          >
            FREE ASSESSMENT — 5 MINUTES
          </span>
        </div>
        <h1
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(32px, 7vw, 54px)',
            fontWeight: 900,
            color: '#fff',
            lineHeight: 1.15,
            margin: '0 0 20px',
          }}
        >
          Discover Your
          <span
            style={{
              display: 'block',
              background: 'linear-gradient(90deg, #A78BFA, #60A5FA)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Entrepreneurial Path
          </span>
        </h1>
        <p
          style={{
            fontSize: 'clamp(15px, 2.5vw, 18px)',
            color: '#CBD5E1',
            lineHeight: 1.7,
            margin: '0 0 36px',
          }}
        >
          Not sure what type of business is right for you? Answer{' '}
          <strong style={{ color: '#A5B4FC' }}>
            {QUESTIONS.length} simple questions
          </strong>{' '}
          and discover your top 3 best-fit paths — free.
        </p>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 10,
            marginBottom: 40,
          }}
        >
          {[
            'Free to take',
            '8 business categories',
            'No experience needed',
            'Instant results',
          ].map((f) => (
            <div
              key={f}
              style={{
                background: '#ffffff0f',
                border: '1px solid #ffffff18',
                borderRadius: 20,
                padding: '6px 14px',
                fontSize: 13,
                color: '#94A3B8',
              }}
            >
              ✓ {f}
            </div>
          ))}
        </div>
        <button
          onClick={onStart}
          style={{
            background: 'linear-gradient(135deg, #7C3AED, #2563EB)',
            color: '#fff',
            border: 'none',
            borderRadius: 14,
            padding: '18px 48px',
            fontSize: 17,
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            boxShadow: '0 8px 32px #7C3AED44',
          }}
        >
          Start My Free Assessment →
        </button>
        <p style={{ marginTop: 16, fontSize: 13, color: '#64748B' }}>
          No sign-up required. 100% free.
        </p>
      </div>
    </div>
  );
}

// ── Question ──────────────────────────────────────────────────────────────
function QuestionScreen({
  question,
  qIndex,
  total,
  onAnswer,
  selected,
  onBack,
}) {
  const progress = (qIndex / total) * 100;
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#FAFAF9',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Plus Jakarta Sans, sans-serif',
      }}
    >
      <div
        style={{
          background: '#fff',
          borderBottom: '1px solid #F3F4F6',
          padding: '14px 20px',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
            }}
          >
            <span
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: '#6B7280',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              Question {qIndex + 1} of {total}
            </span>
            {qIndex > 0 && (
              <button
                onClick={onBack}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 13,
                  color: '#9CA3AF',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                }}
              >
                ← Back
              </button>
            )}
          </div>
          <div
            style={{
              height: 6,
              background: '#F3F4F6',
              borderRadius: 6,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #7C3AED, #2563EB)',
                borderRadius: 6,
                transition: 'width 0.4s ease',
              }}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '32px 20px 40px',
        }}
      >
        <div style={{ maxWidth: 640, width: '100%' }}>
          <div style={{ marginBottom: 28 }}>
            {question.note && (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  background: '#FEF3C7',
                  border: '1px solid #FDE68A',
                  borderRadius: 20,
                  padding: '4px 12px',
                  fontSize: 12,
                  color: '#92400E',
                  fontWeight: 600,
                  marginBottom: 12,
                }}
              >
                ℹ️ {question.note}
              </div>
            )}
            <h2
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(22px, 4vw, 30px)',
                fontWeight: 700,
                color: '#1B1B2F',
                lineHeight: 1.35,
                margin: 0,
              }}
            >
              {question.text}
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {question.options.map((opt) => {
              const isSel = selected === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => onAnswer(question.id, opt.value)}
                  style={{
                    background: isSel
                      ? 'linear-gradient(135deg, #7C3AED12, #2563EB10)'
                      : '#fff',
                    border: `2px solid ${isSel ? '#7C3AED' : '#E5E7EB'}`,
                    borderRadius: 14,
                    padding: '16px 20px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: 15,
                    color: isSel ? '#5B21B6' : '#374151',
                    fontWeight: isSel ? 700 : 500,
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    lineHeight: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    boxShadow: isSel ? '0 0 0 3px #7C3AED22' : 'none',
                  }}
                >
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      border: `2px solid ${isSel ? '#7C3AED' : '#D1D5DB'}`,
                      background: isSel ? '#7C3AED' : 'transparent',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {isSel && (
                      <div
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: '#fff',
                        }}
                      />
                    )}
                  </div>
                  {opt.text}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Results (Teaser / Freemium) ───────────────────────────────────────────
function ResultsScreen({ top3, scores, onRestart }) {
  // Replace this URL with your actual Gumroad product link
  const GUMROAD_URL = 'https://gumroad.com/your-product-link';
  const medals = ['🥇', '🥈', '🥉'];
  const rankLabels = ['Best Match', 'Strong Match', 'Good Match'];
  const maxScore = Math.max(...Object.values(scores));

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#FAFAF9',
        fontFamily: 'Plus Jakarta Sans, sans-serif',
      }}
    >
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(160deg, #0F0C29 0%, #302B63 100%)',
          padding: '40px 20px 50px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 600,
            height: 300,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, #7C3AED33 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div style={{ position: 'relative', maxWidth: 600, margin: '0 auto' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🎉</div>
          <h1
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(28px, 6vw, 42px)',
              fontWeight: 900,
              color: '#fff',
              margin: '0 0 12px',
              lineHeight: 1.2,
            }}
          >
            Your Results Are In!
          </h1>
          <p
            style={{
              fontSize: 16,
              color: '#94A3B8',
              margin: '0 0 24px',
              lineHeight: 1.6,
            }}
          >
            Based on your answers, here are your top 3 most-fitting
            entrepreneurial paths.
          </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: 10,
            }}
          >
            {top3.map((key, i) => (
              <div
                key={key}
                style={{
                  background: '#ffffff14',
                  border: '1px solid #ffffff22',
                  borderRadius: 30,
                  padding: '8px 18px',
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#E2E8F0',
                }}
              >
                {medals[i]} {CATS[key].name}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{ maxWidth: 640, margin: '0 auto', padding: '32px 16px 60px' }}
      >
        {/* Teaser cards */}
        {top3.map((key, i) => {
          const cat = CATS[key];
          return (
            <div
              key={key}
              style={{
                borderRadius: 20,
                border: `2px solid ${cat.color}33`,
                background: '#fff',
                marginBottom: 16,
                overflow: 'hidden',
                boxShadow: '0 2px 12px #00000008',
              }}
            >
              {/* Visible header */}
              <div
                style={{
                  background: cat.color,
                  padding: '18px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                }}
              >
                <span style={{ fontSize: 28 }}>{medals[i]}</span>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: '#ffffff99',
                      marginBottom: 2,
                    }}
                  >
                    {rankLabels[i]}
                  </div>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      color: '#fff',
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                    }}
                  >
                    {cat.emoji} {cat.name}
                  </div>
                  <div
                    style={{ fontSize: 13, color: '#ffffffcc', marginTop: 2 }}
                  >
                    {cat.tagline}
                  </div>
                </div>
              </div>

              {/* Locked preview */}
              <div style={{ position: 'relative' }}>
                {/* Blurred fake content */}
                <div
                  style={{
                    padding: '20px',
                    filter: 'blur(5px)',
                    userSelect: 'none',
                    pointerEvents: 'none',
                    opacity: 0.6,
                  }}
                >
                  <div
                    style={{
                      background: cat.accent,
                      borderRadius: 10,
                      padding: '12px 14px',
                      marginBottom: 14,
                    }}
                  >
                    <div
                      style={{
                        height: 12,
                        background: cat.color + '44',
                        borderRadius: 6,
                        marginBottom: 8,
                        width: '90%',
                      }}
                    />
                    <div
                      style={{
                        height: 12,
                        background: cat.color + '44',
                        borderRadius: 6,
                        marginBottom: 8,
                        width: '75%',
                      }}
                    />
                    <div
                      style={{
                        height: 12,
                        background: cat.color + '44',
                        borderRadius: 6,
                        width: '60%',
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                    {['████████', '██████', '█████████', '███████'].map(
                      (t, j) => (
                        <div
                          key={j}
                          style={{
                            background: '#E5E7EB',
                            borderRadius: 20,
                            padding: '6px 14px',
                            fontSize: 13,
                            color: '#E5E7EB',
                          }}
                        >
                          {t}
                        </div>
                      )
                    )}
                  </div>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: 10,
                    }}
                  >
                    {[1, 2].map((n) => (
                      <div
                        key={n}
                        style={{
                          background: '#F9FAFB',
                          borderRadius: 10,
                          padding: '12px',
                        }}
                      >
                        <div
                          style={{
                            height: 10,
                            background: '#E5E7EB',
                            borderRadius: 6,
                            marginBottom: 8,
                            width: '60%',
                          }}
                        />
                        <div
                          style={{
                            height: 10,
                            background: '#E5E7EB',
                            borderRadius: 6,
                            width: '80%',
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lock overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background:
                      'linear-gradient(to bottom, #ffffff00 0%, #ffffffee 40%, #ffffff 100%)',
                    borderRadius: '0 0 18px 18px',
                  }}
                >
                  <div style={{ textAlign: 'center', padding: '0 20px 20px' }}>
                    <div style={{ fontSize: 32, marginBottom: 8 }}>🔒</div>
                    <p
                      style={{
                        margin: '0 0 16px',
                        fontSize: 15,
                        fontWeight: 700,
                        color: '#1B1B2F',
                        lineHeight: 1.5,
                      }}
                    >
                      Unlock your full{' '}
                      <span style={{ color: cat.color }}>{cat.name}</span>{' '}
                      breakdown
                    </p>
                    <p
                      style={{
                        margin: '0 0 18px',
                        fontSize: 13,
                        color: '#6B7280',
                        lineHeight: 1.6,
                      }}
                    >
                      See who it fits, 6 business ideas, startup difficulty,
                      time needed, low-cost ways to start, and your first 3
                      steps.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Main CTA */}
        <div
          style={{
            background: 'linear-gradient(135deg, #1B1B2F, #302B63)',
            borderRadius: 24,
            padding: '32px 24px',
            textAlign: 'center',
            marginBottom: 24,
            boxShadow: '0 8px 40px #302B6344',
          }}
        >
          <div style={{ fontSize: 36, marginBottom: 12 }}>📋</div>
          <h2
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 26,
              fontWeight: 900,
              color: '#fff',
              margin: '0 0 12px',
              lineHeight: 1.3,
            }}
          >
            Get Your Full Breakdown Report
          </h2>
          <p
            style={{
              fontSize: 15,
              color: '#94A3B8',
              lineHeight: 1.7,
              margin: '0 0 8px',
            }}
          >
            Your personalized PDF includes complete details for all 3 of your
            top matches:
          </p>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              marginBottom: 24,
              textAlign: 'left',
            }}
          >
            {[
              '✅ Who each path fits — and why it matched you',
              '✅ 6 real business ideas for each category',
              '✅ Startup difficulty rating + weekly time estimate',
              '✅ Low-cost ways to begin (even at $0)',
              '✅ Your first 3 concrete steps to start',
              '✅ Side-by-side comparison of your top 3 options',
            ].map((item) => (
              <div
                key={item}
                style={{
                  background: '#ffffff0a',
                  borderRadius: 10,
                  padding: '10px 14px',
                  fontSize: 14,
                  color: '#CBD5E1',
                  fontWeight: 500,
                }}
              >
                {item}
              </div>
            ))}
          </div>
          <div style={{ marginBottom: 16 }}>
            <span
              style={{
                fontSize: 13,
                color: '#64748B',
                textDecoration: 'line-through',
                marginRight: 8,
              }}
            >
              $27
            </span>
            <span style={{ fontSize: 28, fontWeight: 800, color: '#A78BFA' }}>
              $9
            </span>
            <span style={{ fontSize: 13, color: '#64748B', marginLeft: 6 }}>
              one-time
            </span>
          </div>
          <a
            href={GUMROAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              background: 'linear-gradient(135deg, #7C3AED, #2563EB)',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: 14,
              padding: '18px 32px',
              fontSize: 17,
              fontWeight: 800,
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              boxShadow: '0 8px 32px #7C3AED55',
              marginBottom: 12,
            }}
          >
            Unlock My Full Report — $9 →
          </a>
          <p style={{ margin: 0, fontSize: 12, color: '#475569' }}>
            📥 Instant download after purchase • No subscription
          </p>
        </div>

        {/* Score bar chart (still visible for free) */}
        <div
          style={{
            background: '#fff',
            borderRadius: 20,
            border: '1px solid #E5E7EB',
            padding: '24px 20px',
            marginBottom: 24,
          }}
        >
          <h3
            style={{
              margin: '0 0 6px',
              fontSize: 16,
              fontWeight: 700,
              color: '#1B1B2F',
            }}
          >
            📊 Your Compatibility Overview
          </h3>
          <p style={{ margin: '0 0 18px', fontSize: 13, color: '#9CA3AF' }}>
            How you scored across all 8 categories
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {Object.entries(scores)
              .sort((a, b) => b[1] - a[1])
              .map(([key, score]) => {
                const cat = CATS[key];
                const pct = maxScore > 0 ? (score / maxScore) * 100 : 0;
                return (
                  <div key={key}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: 4,
                        fontSize: 13,
                        fontWeight: 600,
                        color: '#374151',
                      }}
                    >
                      <span>
                        {cat.emoji} {cat.name}
                      </span>
                      <span style={{ color: '#9CA3AF' }}>{score} pts</span>
                    </div>
                    <div
                      style={{
                        height: 8,
                        background: '#F3F4F6',
                        borderRadius: 8,
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: `${pct}%`,
                          background: cat.color,
                          borderRadius: 8,
                          transition: 'width 0.6s ease',
                        }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Retake */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={onRestart}
            style={{
              background: 'none',
              border: '2px solid #E5E7EB',
              borderRadius: 12,
              padding: '12px 28px',
              fontSize: 14,
              color: '#6B7280',
              cursor: 'pointer',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontWeight: 600,
            }}
          >
            ↺ Retake the Assessment
          </button>
        </div>
      </div>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [top3, setTop3] = useState([]);
  const [scores, setScores] = useState({});
  const [fade, setFade] = useState(true);

  const handleAnswer = (qId, value) => {
    const newAnswers = { ...answers, [qId]: value };
    setAnswers(newAnswers);
    setFade(false);
    setTimeout(() => {
      if (currentQ < QUESTIONS.length - 1) {
        setCurrentQ((q) => q + 1);
        setFade(true);
      } else {
        const s = computeScores(newAnswers);
        setScores(s);
        setTop3(getTop3(s));
        setScreen('results');
        setFade(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 180);
  };

  const handleBack = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentQ((q) => Math.max(0, q - 1));
      setFade(true);
    }, 180);
  };

  const handleRestart = () => {
    setScreen('intro');
    setCurrentQ(0);
    setAnswers({});
    setTop3([]);
    setScores({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {screen === 'intro' && <IntroScreen onStart={() => setScreen('quiz')} />}
      {screen === 'quiz' && (
        <div
          style={{
            opacity: fade ? 1 : 0,
            transform: fade ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.18s ease, transform 0.18s ease',
          }}
        >
          <QuestionScreen
            question={QUESTIONS[currentQ]}
            qIndex={currentQ}
            total={QUESTIONS.length}
            onAnswer={handleAnswer}
            selected={answers[QUESTIONS[currentQ]?.id]}
            onBack={handleBack}
          />
        </div>
      )}
      {screen === 'results' && (
        <ResultsScreen top3={top3} scores={scores} onRestart={handleRestart} />
      )}
    </div>
  );
}
