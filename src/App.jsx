import { useState, useEffect } from 'react';

(() => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href =
    'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap';
  document.head.appendChild(link);
})();

const GUMROAD_URL = 'https://bsky10.gumroad.com/l/xsvyxb';

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

const FULL_CONTENT = {
  ONL: {
    whoItFits:
      "You have a valuable skill — writing, design, social media, admin, bookkeeping, or video editing — and you want to offer it to clients remotely. You're self-motivated, tech-comfortable, and prefer working on your own schedule from home. This path lets you start earning quickly without needing a storefront, inventory, or big investment.",
    businessIdeas: [
      'Freelance copywriter or content writer',
      'Social media manager for small businesses',
      'Virtual assistant (VA)',
      'Online bookkeeper or invoicing assistant',
      'Graphic designer (logos, flyers, Canva templates)',
      'Video editor for YouTubers or course creators',
    ],
    difficulty: 'Easy',
    timeNeeded: '5–15 hrs/week to start',
    lowCostWays: [
      'Create a free profile on Fiverr or Upwork and list your skill today',
      'Post in Facebook Groups or LinkedIn offering your service to small businesses',
      'Offer 1–2 free or discounted jobs to earn your first testimonial',
    ],
    firstSteps: [
      'Write down your top 3 skills that others have complimented or paid you for',
      'Create a free profile on Fiverr, Upwork, or LinkedIn',
      'Send 5 direct messages to people or businesses who could use your help',
    ],
  },
  LOC: {
    whoItFits:
      "You enjoy working in your community and serving real people face-to-face. You're reliable, hardworking, and have a skill — or the willingness to learn one. You don't need to be online much; your reputation and word of mouth will grow your business. Local service businesses are in constant demand and easy to start with little money.",
    businessIdeas: [
      'House cleaning or deep cleaning service',
      'Lawn care and landscaping',
      'Pressure washing',
      'Mobile car detailing',
      'Childcare / babysitting service',
      'Handyman services for homes and rentals',
    ],
    difficulty: 'Easy–Medium',
    timeNeeded: '10–20 hrs/week to start',
    lowCostWays: [
      'Post in your local Facebook Group or Nextdoor offering your service',
      'Make flyers and post them in your neighborhood, church, or local laundromat',
      'Ask friends and family to be your first clients and leave you a review',
    ],
    firstSteps: [
      'Choose one specific service to start with — don\'t try to do everything at once',
      'Set your price by checking what others charge in your area',
      'Tell 10 people you know that you\'re open for business',
    ],
  },
  CRE: {
    whoItFits:
      "You have a creative gift — art, photography, design, music, writing, or content creation — and you're ready to turn it into income. You enjoy expressing yourself and building an audience. You're willing to be consistent even before the money comes, because you know that every great brand starts with one piece of content.",
    businessIdeas: [
      'YouTube channel or podcast with sponsorships',
      'Sell digital products (templates, presets, printables) on Etsy',
      'Custom portrait or logo artist',
      'Print-on-demand store (shirts, mugs, tote bags)',
      'Social media content creator / influencer',
      'Stock photography or music licensing',
    ],
    difficulty: 'Easy (takes time to grow)',
    timeNeeded: '5–10 hrs/week to start',
    lowCostWays: [
      'Open a free Etsy shop and list 3–5 digital products this week',
      'Start a YouTube or TikTok and post consistently 2–3x per week',
      'Use free tools like Canva to create and sell design templates',
    ],
    firstSteps: [
      'Pick one creative format (video, design, writing, art) and commit to it for 90 days',
      'Create 3 sample pieces to show what you can do',
      'Post your first piece of content or list your first product this week',
    ],
  },
  PRD: {
    whoItFits:
      "You're a natural deal-finder who loves the thrill of buying low and selling high. You're organized, enjoy the process of sourcing and selling, and you want a business you can run from home or on the go. You don't need to create anything — just find the right products and move them. This path can start with $0 using items you already own.",
    businessIdeas: [
      'Facebook Marketplace / OfferUp flipper (furniture, electronics)',
      'Thrift store reseller on eBay or Poshmark',
      'Amazon FBA (Fulfillment by Amazon) seller',
      'Wholesale buying and reselling on Etsy or Shopify',
      'Sports cards, sneakers, or collectibles reselling',
      'Dropshipping store (no inventory needed)',
    ],
    difficulty: 'Easy–Medium',
    timeNeeded: '5–15 hrs/week to start',
    lowCostWays: [
      'Start with items you already own — list them on Facebook Marketplace today',
      'Visit thrift stores and garage sales, flip items on eBay for profit',
      'Open a free Poshmark or Mercari account and list clothing you no longer wear',
    ],
    firstSteps: [
      'Pick one platform to start on — Facebook Marketplace is easiest for beginners',
      'Find 5 items to list this week, starting with what you have at home',
      'Research what sells well in your area or niche before buying new inventory',
    ],
  },
  CON: {
    whoItFits:
      "You've built knowledge, skills, or experience in a specific area that others want. Whether it's business, fitness, relationships, faith, or finances — people would pay to learn from you. You're confident, clear, and genuinely love helping others grow. Your life experience is your greatest asset, and this path turns it into income.",
    businessIdeas: [
      'Business or entrepreneurship coach',
      'Life coach or mindset mentor',
      'Financial literacy coach',
      'Fitness or nutrition coach',
      'Career coach / resume and interview consultant',
      'Faith-based or marriage coach',
    ],
    difficulty: 'Medium',
    timeNeeded: '10–15 hrs/week to start',
    lowCostWays: [
      'Offer 3 free "discovery calls" to practice your process and collect testimonials',
      'Create a simple offer (1-on-1 session for $50–$100) and post it on social media',
      'Start a free email list or Instagram page sharing tips in your niche',
    ],
    firstSteps: [
      'Define clearly who you help and what specific result you help them achieve',
      'Create a simple 1-page offer: what you do, who it\'s for, and the price',
      'Tell your network you\'re now offering coaching and book your first 3 calls',
    ],
  },
  TEC: {
    whoItFits:
      "You love technology, problem-solving, and building things digitally. You have — or are willing to learn — technical skills like coding, app building, automation, or AI tools. You think in systems and want to build something that can scale beyond your time. This path has some of the highest earning potential of any category.",
    businessIdeas: [
      'Website design and development for small businesses',
      'Mobile app development',
      'Automation consultant (Zapier, Make, n8n)',
      'AI tools consultant or prompt engineer',
      'SaaS (Software as a Service) product',
      'Tech support or IT services for local businesses',
    ],
    difficulty: 'Medium–Hard',
    timeNeeded: '15–25 hrs/week to start',
    lowCostWays: [
      'Build a free website for a local nonprofit or church to start your portfolio',
      'Offer website setup for small businesses at a low intro rate ($200–$500)',
      'Learn one in-demand skill (like Webflow or no-code tools) and offer it as a service',
    ],
    firstSteps: [
      'Pick one tech skill to focus on for the next 90 days — go deep, not wide',
      'Build one real project (even for free) that proves what you can do',
      'Create a simple portfolio page and start reaching out to potential clients',
    ],
  },
  HND: {
    whoItFits:
      "You're a doer. You love working with your hands, you're physically capable, and you take pride in doing quality work. Trades are in high demand and short supply — skilled hands-on workers can charge premium rates and build loyal client bases quickly. This is one of the fastest paths to full-time income for the right person.",
    businessIdeas: [
      'General handyman services',
      'Plumbing or electrical work (if licensed)',
      'Interior / exterior painting',
      'Flooring installation',
      'Fence building or deck construction',
      'HVAC maintenance or appliance repair',
    ],
    difficulty: 'Medium',
    timeNeeded: '20–40 hrs/week (most go full-time quickly)',
    lowCostWays: [
      'Start with jobs in your neighborhood — flyers and word of mouth work fast',
      'Create a free Google Business Profile to show up in local searches',
      'Ask your first 5 clients for a Google review — reviews bring more jobs',
    ],
    firstSteps: [
      'Choose your primary trade service and check if any licensing is required in your state',
      'Set your rates (hourly or per job) by researching local competitors',
      'Post on Nextdoor, local Facebook Groups, and create a Google Business Profile',
    ],
  },
  MIN: {
    whoItFits:
      "You're driven by purpose, not just profit. You want to build something that serves people, strengthens community, and reflects your faith or values. You're a natural connector and leader, and you believe your business can be a ministry — a way to love people and make a real difference. Isaiah 40:31 reminds us: those who wait on the Lord will rise on wings like eagles.",
    businessIdeas: [
      'Faith-based coaching or counseling',
      'Community event planning or coordination',
      'Nonprofit organization or community program',
      'After-school tutoring or mentoring program',
      'Church media / creative services',
      'Faith-based subscription box or merchandise brand',
    ],
    difficulty: 'Easy–Medium',
    timeNeeded: '5–15 hrs/week to start',
    lowCostWays: [
      'Start serving in your existing community — church, neighborhood, social circle',
      'Launch a free workshop, class, or event to build trust and visibility',
      'Create a simple social media page around your mission and start sharing your message',
    ],
    firstSteps: [
      'Write down the specific problem you feel called to solve and who you want to serve',
      'Host one small free event or session to test your idea and meet your people',
      'Build a simple email list or social media following of people who share your values',
    ],
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
      { text: '5–10 hours', value: 'small', scores: { ONL: 1, CRE: 1, MIN: 1 } },
      { text: '10–20 hours', value: 'medium', scores: { LOC: 1, CON: 1, HND: 1, ONL: 1 } },
      { text: "20+ hours — I'm ready to go all in", value: 'large', scores: { TEC: 2, HND: 2, LOC: 1 } },
    ],
  },
  {
    id: 'skill',
    text: 'How would you describe your skill level in your primary area of interest?',
    type: 'score',
    options: [
      { text: "Beginner — I'm just starting out", value: 'beginner', scores: { PRD: 1, MIN: 1, CRE: 1 } },
      { text: 'Intermediate — I know a fair amount', value: 'intermediate', scores: { ONL: 1, LOC: 1, CRE: 1 } },
      { text: "Advanced — I'm quite good at what I do", value: 'advanced', scores: { CON: 2, TEC: 1, LOC: 1 } },
      { text: 'Expert — I have deep knowledge and experience', value: 'expert', scores: { CON: 3, TEC: 2, HND: 1 } },
    ],
  },
  {
    id: 'experience',
    text: 'Which best describes your professional background or strongest experience area?',
    type: 'score',
    options: [
      { text: 'Corporate / Office work', value: 'corporate', scores: { CON: 2, ONL: 2 } },
      { text: 'Trades / Manual labor / Technical', value: 'trades', scores: { HND: 3, LOC: 1 } },
      { text: 'Creative / Arts / Media', value: 'creative', scores: { CRE: 3, ONL: 1 } },
      { text: 'Technology / IT / Software', value: 'tech', scores: { TEC: 3, ONL: 1 } },
      { text: 'Sales / Marketing / Business', value: 'sales', scores: { PRD: 2, CON: 1, ONL: 1 } },
      { text: 'Teaching / Training / Coaching', value: 'teaching', scores: { CON: 3, MIN: 1 } },
      { text: 'Community / Nonprofit / Ministry', value: 'ministry', scores: { MIN: 3, CON: 1 } },
      { text: "No specific background yet — I'm starting fresh", value: 'none', scores: { PRD: 1, CRE: 1, MIN: 1 } },
    ],
  },
  {
    id: 'tech',
    text: 'How comfortable are you with technology — computers, apps, online tools?',
    type: 'score',
    options: [
      { text: 'Not comfortable — I keep things simple and basic', value: 'low', scores: { HND: 2, LOC: 2, MIN: 1 } },
      { text: 'Somewhat — I can figure things out when I need to', value: 'medium_low', scores: { PRD: 1, LOC: 1, CRE: 1 } },
      { text: 'Comfortable — I use tech tools regularly', value: 'medium', scores: { ONL: 2, PRD: 1, CRE: 1 } },
      { text: 'Very comfortable — I love technology', value: 'high', scores: { TEC: 3, ONL: 2 } },
    ],
  },
  {
    id: 'social',
    text: 'How would you describe your social comfort level and communication style?',
    type: 'score',
    options: [
      { text: 'I prefer to work alone with minimal interaction', value: 'introvert', scores: { CRE: 2, TEC: 2, PRD: 1 } },
      { text: 'Some interaction is fine, but not too much', value: 'ambivert_low', scores: { ONL: 2, PRD: 1, CRE: 1 } },
      { text: 'I enjoy meeting and working with people regularly', value: 'ambivert_high', scores: { LOC: 2, CON: 1, MIN: 1 } },
      { text: 'I love connecting, networking, and building relationships', value: 'extrovert', scores: { CON: 2, MIN: 2, LOC: 1 } },
    ],
  },
  {
    id: 'physical',
    text: 'How do you feel about physical or hands-on work?',
    type: 'score',
    options: [
      { text: 'I prefer screen-based or desk work', value: 'no_physical', scores: { ONL: 2, TEC: 2, CRE: 1 } },
      { text: 'A little physical activity is fine', value: 'light', scores: { PRD: 1, LOC: 1, MIN: 1 } },
      { text: 'I enjoy a healthy mix of both', value: 'mixed', scores: { LOC: 2, CRE: 1, HND: 1 } },
      { text: 'I thrive with physical, hands-on work', value: 'loves_physical', scores: { HND: 3, LOC: 2 } },
    ],
  },
  {
    id: 'budget',
    text: 'What is your realistic starting budget for your new venture?',
    type: 'score',
    options: [
      { text: '$0–$100 — I need to start nearly free', value: 'zero', scores: { CRE: 2, ONL: 2, MIN: 1 } },
      { text: '$100–$500 — I can make a small investment', value: 'small', scores: { PRD: 1, ONL: 1, CON: 1 } },
      { text: "$500–$2,000 — I'm willing to invest moderately", value: 'medium', scores: { LOC: 2, PRD: 2, TEC: 1 } },
      { text: "$2,000+ — I'm ready to invest significantly", value: 'large', scores: { HND: 2, LOC: 1, PRD: 2 } },
    ],
  },
  {
    id: 'income',
    text: 'What is your primary income goal for this venture?',
    type: 'score',
    options: [
      { text: 'Supplemental / hobby income (under $500/mo)', value: 'hobby', scores: { CRE: 2, MIN: 2 } },
      { text: 'Side income — $500 to $1,500/month', value: 'side', scores: { ONL: 2, PRD: 2, LOC: 1 } },
      { text: 'Solid part-time income — $2,000 to $5,000/month', value: 'part_time', scores: { CON: 2, LOC: 2, HND: 1 } },
      { text: 'Replace or exceed full-time income — $5,000+/month', value: 'full_time', scores: { TEC: 3, CON: 2, HND: 2 } },
    ],
  },
  {
    id: 'risk',
    text: 'How do you personally handle financial and business risk?',
    type: 'score',
    options: [
      { text: 'Very cautious — I need things to feel stable', value: 'very_low', scores: { ONL: 1, PRD: 1, MIN: 1 } },
      { text: 'Somewhat cautious — I take small, calculated risks', value: 'low', scores: { CRE: 1, LOC: 1, CON: 1 } },
      { text: 'Moderate — I can handle some uncertainty', value: 'medium', scores: { LOC: 2, PRD: 1, HND: 1 } },
      { text: "Bold — I'm okay with risk when the reward is worth it", value: 'high', scores: { TEC: 2, CON: 1, HND: 1 } },
    ],
  },
  {
    id: 'interests',
    text: 'Which area BEST describes your deepest interests or passions?',
    type: 'score',
    options: [
      { text: 'Technology, computers, or data', value: 'tech', scores: { TEC: 3, ONL: 1 } },
      { text: 'Arts, design, music, or creativity', value: 'arts', scores: { CRE: 3, ONL: 1 } },
      { text: 'Health, fitness, or wellness', value: 'health', scores: { LOC: 2, CON: 2, HND: 1 } },
      { text: 'Teaching, mentoring, or helping people grow', value: 'teaching', scores: { CON: 3, MIN: 2 } },
      { text: 'Building, fixing, or working with your hands', value: 'building', scores: { HND: 3, LOC: 1 } },
      { text: 'Business, money, and entrepreneurship itself', value: 'business', scores: { PRD: 2, CON: 1, TEC: 1 } },
      { text: 'Faith, community, or social impact', value: 'faith', scores: { MIN: 3, CON: 1 } },
      { text: 'Writing, storytelling, or content creation', value: 'writing', scores: { CRE: 2, ONL: 2 } },
      { text: 'Fashion, beauty, or personal care', value: 'fashion', scores: { LOC: 2, CRE: 2 } },
      { text: 'Food, cooking, or hospitality', value: 'food', scores: { HND: 2, LOC: 2 } },
    ],
  },
  {
    id: 'location_pref',
    text: 'Where would you prefer to do most of your work?',
    type: 'score',
    options: [
      { text: 'From home — my couch, desk, or coffee shop', value: 'home', scores: { ONL: 2, TEC: 2, CRE: 2 } },
      { text: 'A mix of home and out in the world', value: 'mixed', scores: { CON: 2, PRD: 1, MIN: 1 } },
      { text: 'Out in the community — neighborhoods, events, local spaces', value: 'community', scores: { MIN: 2, LOC: 2 } },
      { text: "At customers' homes or job sites", value: 'client_sites', scores: { HND: 3, LOC: 2 } },
    ],
  },
  {
    id: 'motivation',
    text: 'What motivates you MOST about starting something of your own?',
    type: 'score',
    options: [
      { text: 'Financial freedom and building real wealth', value: 'money', scores: { PRD: 2, TEC: 2, CON: 1 } },
      { text: 'Helping, serving, and making a real difference', value: 'helping', scores: { MIN: 2, CON: 2 } },
      { text: 'Expressing my creativity and passion', value: 'creativity', scores: { CRE: 3, ONL: 1 } },
      { text: 'Being my own boss and controlling my time', value: 'freedom', scores: { HND: 1, LOC: 1, ONL: 1, CRE: 1 } },
      { text: 'Building something meaningful that lasts', value: 'legacy', scores: { TEC: 2, MIN: 2, HND: 1 } },
    ],
  },
  {
    id: 'client_finding',
    text: 'How would you most naturally find your first customers or clients?',
    type: 'score',
    options: [
      { text: 'Social media content and online posting', value: 'social', scores: { CRE: 2, ONL: 2 } },
      { text: 'Word of mouth and personal referrals', value: 'word', scores: { MIN: 2, LOC: 2, HND: 1 } },
      { text: 'Online platforms and marketplaces (Etsy, Fiverr, Amazon, etc.)', value: 'platforms', scores: { ONL: 2, PRD: 2, TEC: 1 } },
      { text: 'Direct outreach, cold calls, or networking events', value: 'outreach', scores: { CON: 2, LOC: 1, PRD: 1 } },
      { text: 'Community events, church, or local organizations', value: 'events', scores: { MIN: 3, LOC: 2 } },
    ],
  },
  {
    id: 'energize',
    text: 'What kind of work leaves you feeling energized and fulfilled?',
    type: 'score',
    options: [
      { text: 'Creating or making something from nothing', value: 'making', scores: { CRE: 2, HND: 2, TEC: 1 } },
      { text: 'Solving problems and building efficient systems', value: 'systems', scores: { TEC: 3, CON: 1 } },
      { text: 'Organizing, buying, or selling things', value: 'selling', scores: { PRD: 3, LOC: 1 } },
      { text: 'Connecting with people and building community', value: 'connecting', scores: { MIN: 2, CON: 2, LOC: 1 } },
      { text: 'Teaching, coaching, or empowering others to grow', value: 'teaching', scores: { CON: 3, MIN: 1 } },
    ],
  },
  {
    id: 'learning',
    text: 'How do you feel about learning new skills for your business?',
    type: 'score',
    options: [
      { text: "I'd rather work with what I already know", value: 'no_learn', scores: { HND: 1, PRD: 1, CON: 1 } },
      { text: "I'll learn when I need to, but I prefer practical over theoretical", value: 'some_learn', scores: { LOC: 1, MIN: 1, CRE: 1 } },
      { text: 'I enjoy learning and growing step-by-step', value: 'enjoy_learn', scores: { ONL: 2, CON: 2, PRD: 1 } },
      { text: 'I love learning new things — challenges excite me!', value: 'love_learn', scores: { TEC: 3, CRE: 1, CON: 1 } },
    ],
  },
  {
    id: 'workstyle',
    text: 'Which work style feels most natural and comfortable to you?',
    type: 'score',
    options: [
      { text: 'Independent solo — I work best on my own terms', value: 'solo', scores: { CRE: 2, TEC: 1, ONL: 1 } },
      { text: 'Small focused team — a trusted few working closely together', value: 'small_team', scores: { HND: 1, LOC: 1, PRD: 1 } },
      { text: 'Leader or coordinator — I love directing and organizing others', value: 'leader', scores: { CON: 2, MIN: 1, LOC: 1 } },
      { text: 'Community-centered — I thrive when serving a broader group', value: 'community', scores: { MIN: 2, LOC: 1, CON: 1 } },
    ],
  },
];

function computeScores(answers) {
  const scores = { ONL: 0, LOC: 0, CRE: 0, PRD: 0, CON: 0, TEC: 0, HND: 0, MIN: 0 };
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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #0F0C29 0%, #302B63 50%, #24243E 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, #6366f133 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', maxWidth: 580, width: '100%', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#ffffff12', border: '1px solid #ffffff22', borderRadius: 40, padding: '8px 18px', marginBottom: 28 }}>
          <span style={{ fontSize: 16 }}>✨</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#C4B5FD', letterSpacing: '0.05em' }}>FREE ASSESSMENT — 5 MINUTES</span>
        </div>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(32px, 7vw, 54px)', fontWeight: 900, color: '#fff', lineHeight: 1.15, margin: '0 0 20px' }}>
          Discover Your
          <span style={{ display: 'block', background: 'linear-gradient(90deg, #A78BFA, #60A5FA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Entrepreneurial Path
          </span>
        </h1>
        <p style={{ fontSize: 'clamp(15px, 2.5vw, 18px)', color: '#CBD5E1', lineHeight: 1.7, margin: '0 0 36px' }}>
          Not sure what type of business is right for you? Answer{' '}
          <strong style={{ color: '#A5B4FC' }}>{QUESTIONS.length} simple questions</strong>{' '}
          and discover your top 3 best-fit paths — free.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginBottom: 40 }}>
          {['Free to take', '8 business categories', 'No experience needed', 'Instant results'].map((f) => (
            <div key={f} style={{ background: '#ffffff0f', border: '1px solid #ffffff18', borderRadius: 20, padding: '6px 14px', fontSize: 13, color: '#94A3B8' }}>✓ {f}</div>
          ))}
        </div>
        <button onClick={onStart} style={{ background: 'linear-gradient(135deg, #7C3AED, #2563EB)', color: '#fff', border: 'none', borderRadius: 14, padding: '18px 48px', fontSize: 17, fontWeight: 700, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif', boxShadow: '0 8px 32px #7C3AED44' }}>
          Start My Free Assessment →
        </button>
        <p style={{ marginTop: 16, fontSize: 13, color: '#64748B' }}>No sign-up required. 100% free.</p>
      </div>
    </div>
  );
}

// ── Question ──────────────────────────────────────────────────────────────
function QuestionScreen({ question, qIndex, total, onAnswer, selected, onBack }) {
  const progress = (qIndex / total) * 100;
  return (
    <div style={{ minHeight: '100vh', background: '#FAFAF9', display: 'flex', flexDirection: 'column', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      <div style={{ background: '#fff', borderBottom: '1px solid #F3F4F6', padding: '14px 20px', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#6B7280', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Question {qIndex + 1} of {total}</span>
            {qIndex > 0 && (
              <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: '#9CA3AF', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>← Back</button>
            )}
          </div>
          <div style={{ height: 6, background: '#F3F4F6', borderRadius: 6, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #7C3AED, #2563EB)', borderRadius: 6, transition: 'width 0.4s ease' }} />
          </div>
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '32px 20px 40px' }}>
        <div style={{ maxWidth: 640, width: '100%' }}>
          <div style={{ marginBottom: 28 }}>
            {question.note && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: 20, padding: '4px 12px', fontSize: 12, color: '#92400E', fontWeight: 600, marginBottom: 12 }}>
                ℹ️ {question.note}
              </div>
            )}
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(22px, 4vw, 30px)', fontWeight: 700, color: '#1B1B2F', lineHeight: 1.35, margin: 0 }}>{question.text}</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {question.options.map((opt) => {
              const isSel = selected === opt.value;
              return (
                <button key={opt.value} onClick={() => onAnswer(question.id, opt.value)} style={{ background: isSel ? 'linear-gradient(135deg, #7C3AED12, #2563EB10)' : '#fff', border: `2px solid ${isSel ? '#7C3AED' : '#E5E7EB'}`, borderRadius: 14, padding: '16px 20px', textAlign: 'left', cursor: 'pointer', fontSize: 15, color: isSel ? '#5B21B6' : '#374151', fontWeight: isSel ? 700 : 500, fontFamily: 'Plus Jakarta Sans, sans-serif', lineHeight: 1.5, display: 'flex', alignItems: 'center', gap: 14, boxShadow: isSel ? '0 0 0 3px #7C3AED22' : 'none' }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', border: `2px solid ${isSel ? '#7C3AED' : '#D1D5DB'}`, background: isSel ? '#7C3AED' : 'transparent', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {isSel && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }} />}
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
function ResultsScreen({ top3, scores, onRestart, onUnlock }) {
  const medals = ['🥇', '🥈', '🥉'];
  const rankLabels = ['Best Match', 'Strong Match', 'Good Match'];
  const maxScore = Math.max(...Object.values(scores));

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAF9', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      <div style={{ background: 'linear-gradient(160deg, #0F0C29 0%, #302B63 100%)', padding: '40px 20px 50px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 600, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, #7C3AED33 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: 600, margin: '0 auto' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🎉</div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 6vw, 42px)', fontWeight: 900, color: '#fff', margin: '0 0 12px', lineHeight: 1.2 }}>Your Results Are In!</h1>
          <p style={{ fontSize: 16, color: '#94A3B8', margin: '0 0 24px', lineHeight: 1.6 }}>Based on your answers, here are your top 3 most-fitting entrepreneurial paths.</p>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 10 }}>
            {top3.map((key, i) => (
              <div key={key} style={{ background: '#ffffff14', border: '1px solid #ffffff22', borderRadius: 30, padding: '8px 18px', fontSize: 14, fontWeight: 600, color: '#E2E8F0' }}>
                {medals[i]} {CATS[key].name}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '32px 16px 60px' }}>
        {top3.map((key, i) => {
          const cat = CATS[key];
          return (
            <div key={key} style={{ borderRadius: 20, border: `2px solid ${cat.color}33`, background: '#fff', marginBottom: 16, overflow: 'hidden', boxShadow: '0 2px 12px #00000008' }}>
              <div style={{ background: cat.color, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{ fontSize: 28 }}>{medals[i]}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#ffffff99', marginBottom: 2 }}>{rankLabels[i]}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#fff', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{cat.emoji} {cat.name}</div>
                  <div style={{ fontSize: 13, color: '#ffffffcc', marginTop: 2 }}>{cat.tagline}</div>
                </div>
              </div>
              <div style={{ position: 'relative' }}>
                <div style={{ padding: '20px', filter: 'blur(5px)', userSelect: 'none', pointerEvents: 'none', opacity: 0.6 }}>
                  <div style={{ background: cat.accent, borderRadius: 10, padding: '12px 14px', marginBottom: 14 }}>
                    <div style={{ height: 12, background: cat.color + '44', borderRadius: 6, marginBottom: 8, width: '90%' }} />
                    <div style={{ height: 12, background: cat.color + '44', borderRadius: 6, marginBottom: 8, width: '75%' }} />
                    <div style={{ height: 12, background: cat.color + '44', borderRadius: 6, width: '60%' }} />
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                    {['████████', '██████', '█████████', '███████'].map((t, j) => (
                      <div key={j} style={{ background: '#E5E7EB', borderRadius: 20, padding: '6px 14px', fontSize: 13, color: '#E5E7EB' }}>{t}</div>
                    ))}
                  </div>
                </div>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(to bottom, #ffffff00 0%, #ffffffee 40%, #ffffff 100%)', borderRadius: '0 0 18px 18px' }}>
                  <div style={{ textAlign: 'center', padding: '0 20px 20px' }}>
                    <div style={{ fontSize: 32, marginBottom: 8 }}>🔒</div>
                    <p style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 700, color: '#1B1B2F', lineHeight: 1.5 }}>
                      Unlock your full <span style={{ color: cat.color }}>{cat.name}</span> breakdown
                    </p>
                    <p style={{ margin: '0 0 18px', fontSize: 13, color: '#6B7280', lineHeight: 1.6 }}>
                      See who it fits, 6 business ideas, startup difficulty, time needed, low-cost ways to start, and your first 3 steps.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <div style={{ background: 'linear-gradient(135deg, #1B1B2F, #302B63)', borderRadius: 24, padding: '32px 24px', textAlign: 'center', marginBottom: 24, boxShadow: '0 8px 40px #302B6344' }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>📋</div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 900, color: '#fff', margin: '0 0 12px', lineHeight: 1.3 }}>Get Your Full Breakdown Report</h2>
          <p style={{ fontSize: 15, color: '#94A3B8', lineHeight: 1.7, margin: '0 0 8px' }}>Your personalized results include complete details for all 3 of your top matches:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24, textAlign: 'left' }}>
            {[
              '✅ Who each path fits — and why it matched you',
              '✅ 6 real business ideas for each category',
              '✅ Startup difficulty rating + weekly time estimate',
              '✅ Low-cost ways to begin (even at $0)',
              '✅ Your first 3 concrete steps to start',
              '✅ Side-by-side comparison of your top 3 options',
            ].map((item) => (
              <div key={item} style={{ background: '#ffffff0a', borderRadius: 10, padding: '10px 14px', fontSize: 14, color: '#CBD5E1', fontWeight: 500 }}>{item}</div>
            ))}
          </div>
          <div style={{ marginBottom: 16 }}>
            <span style={{ fontSize: 13, color: '#64748B', textDecoration: 'line-through', marginRight: 8 }}>$27</span>
            <span style={{ fontSize: 28, fontWeight: 800, color: '#A78BFA' }}>$9</span>
            <span style={{ fontSize: 13, color: '#64748B', marginLeft: 6 }}>one-time</span>
          </div>
          <button
            onClick={onUnlock}
            style={{ display: 'block', width: '100%', background: 'linear-gradient(135deg, #7C3AED, #2563EB)', color: '#fff', border: 'none', textDecoration: 'none', borderRadius: 14, padding: '18px 32px', fontSize: 17, fontWeight: 800, fontFamily: 'Plus Jakarta Sans, sans-serif', boxShadow: '0 8px 32px #7C3AED55', marginBottom: 12, cursor: 'pointer' }}
          >
            Unlock My Full Results — $9 →
          </button>
          <p style={{ margin: 0, fontSize: 12, color: '#475569' }}>⚡ Instant access after purchase • No subscription</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #E5E7EB', padding: '24px 20px', marginBottom: 24 }}>
          <h3 style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 700, color: '#1B1B2F' }}>📊 Your Compatibility Overview</h3>
          <p style={{ margin: '0 0 18px', fontSize: 13, color: '#9CA3AF' }}>How you scored across all 8 categories</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {Object.entries(scores).sort((a, b) => b[1] - a[1]).map(([key, score]) => {
              const cat = CATS[key];
              const pct = maxScore > 0 ? (score / maxScore) * 100 : 0;
              return (
                <div key={key}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 13, fontWeight: 600, color: '#374151' }}>
                    <span>{cat.emoji} {cat.name}</span>
                    <span style={{ color: '#9CA3AF' }}>{score} pts</span>
                  </div>
                  <div style={{ height: 8, background: '#F3F4F6', borderRadius: 8, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: cat.color, borderRadius: 8, transition: 'width 0.6s ease' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button onClick={onRestart} style={{ background: 'none', border: '2px solid #E5E7EB', borderRadius: 12, padding: '12px 28px', fontSize: 14, color: '#6B7280', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600 }}>
            ↺ Retake the Assessment
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Unlocked Results ──────────────────────────────────────────────────────
function UnlockedScreen({ top3, scores, onRestart }) {
  const medals = ['🥇', '🥈', '🥉'];
  const rankLabels = ['Best Match', 'Strong Match', 'Good Match'];
  const maxScore = Math.max(...Object.values(scores));

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAF9', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(160deg, #0F0C29 0%, #302B63 100%)', padding: '40px 20px 50px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 600, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, #7C3AED33 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: 600, margin: '0 auto' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🔓</div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 6vw, 42px)', fontWeight: 900, color: '#fff', margin: '0 0 12px', lineHeight: 1.2 }}>Your Full Report Is Unlocked!</h1>
          <p style={{ fontSize: 16, color: '#94A3B8', margin: '0 0 24px', lineHeight: 1.6 }}>Here is your complete personalized breakdown for your top 3 entrepreneurial paths.</p>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 10 }}>
            {top3.map((key, i) => (
              <div key={key} style={{ background: '#ffffff14', border: '1px solid #ffffff22', borderRadius: 30, padding: '8px 18px', fontSize: 14, fontWeight: 600, color: '#E2E8F0' }}>
                {medals[i]} {CATS[key].name}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '32px 16px 60px' }}>

        {/* Full category cards */}
        {top3.map((key, i) => {
          const cat = CATS[key];
          const content = FULL_CONTENT[key];
          return (
            <div key={key} style={{ borderRadius: 20, border: `2px solid ${cat.color}33`, background: '#fff', marginBottom: 24, overflow: 'hidden', boxShadow: '0 4px 20px #00000010' }}>
              {/* Header */}
              <div style={{ background: cat.color, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{ fontSize: 32 }}>{medals[i]}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#ffffff99', marginBottom: 2 }}>{rankLabels[i]}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>{cat.emoji} {cat.name}</div>
                  <div style={{ fontSize: 13, color: '#ffffffcc', marginTop: 2 }}>{cat.tagline}</div>
                </div>
              </div>

              <div style={{ padding: '24px' }}>
                {/* Who it fits */}
                <div style={{ background: cat.accent, borderRadius: 12, padding: '16px', marginBottom: 20 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: cat.color, marginBottom: 8 }}>👤 Who This Fits</div>
                  <p style={{ margin: 0, fontSize: 14, color: '#374151', lineHeight: 1.7 }}>{content.whoItFits}</p>
                </div>

                {/* Business ideas */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#6B7280', marginBottom: 12 }}>💡 6 Business Ideas</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 8 }}>
                    {content.businessIdeas.map((idea, j) => (
                      <div key={j} style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#374151', fontWeight: 500 }}>
                        {j + 1}. {idea}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Difficulty + Time */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
                  <div style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 12, padding: '14px' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9CA3AF', marginBottom: 6 }}>⚡ Startup Difficulty</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: cat.color }}>{content.difficulty}</div>
                  </div>
                  <div style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 12, padding: '14px' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9CA3AF', marginBottom: 6 }}>⏱ Time Needed</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: cat.color }}>{content.timeNeeded}</div>
                  </div>
                </div>

                {/* Low-cost ways */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#6B7280', marginBottom: 12 }}>💰 Low-Cost Ways to Start</div>
                  {content.lowCostWays.map((way, j) => (
                    <div key={j} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-start' }}>
                      <div style={{ width: 22, height: 22, borderRadius: '50%', background: cat.color, color: '#fff', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>{j + 1}</div>
                      <p style={{ margin: 0, fontSize: 14, color: '#374151', lineHeight: 1.6 }}>{way}</p>
                    </div>
                  ))}
                </div>

                {/* First 3 steps */}
                <div style={{ background: 'linear-gradient(135deg, #1B1B2F, #302B63)', borderRadius: 12, padding: '18px' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#A78BFA', marginBottom: 12 }}>🚀 Your First 3 Steps</div>
                  {content.firstSteps.map((step, j) => (
                    <div key={j} style={{ display: 'flex', gap: 12, marginBottom: j < 2 ? 12 : 0, alignItems: 'flex-start' }}>
                      <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #2563EB)', color: '#fff', fontSize: 12, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                        {j + 1}
                      </div>
                      <p style={{ margin: 0, fontSize: 14, color: '#CBD5E1', lineHeight: 1.6 }}>{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}

        {/* Score chart */}
        <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #E5E7EB', padding: '24px 20px', marginBottom: 24 }}>
          <h3 style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 700, color: '#1B1B2F' }}>📊 Your Compatibility Overview</h3>
          <p style={{ margin: '0 0 18px', fontSize: 13, color: '#9CA3AF' }}>How you scored across all 8 categories</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {Object.entries(scores).sort((a, b) => b[1] - a[1]).map(([key, score]) => {
              const cat = CATS[key];
              const pct = maxScore > 0 ? (score / maxScore) * 100 : 0;
              return (
                <div key={key}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 13, fontWeight: 600, color: '#374151' }}>
                    <span>{cat.emoji} {cat.name}</span>
                    <span style={{ color: '#9CA3AF' }}>{score} pts</span>
                  </div>
                  <div style={{ height: 8, background: '#F3F4F6', borderRadius: 8, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: cat.color, borderRadius: 8, transition: 'width 0.6s ease' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scripture */}
        <div style={{ background: 'linear-gradient(135deg, #1B1B2F, #302B63)', borderRadius: 20, padding: '28px 24px', textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 28, marginBottom: 12 }}>🌿</div>
          <p style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontStyle: 'italic', color: '#E2E8F0', lineHeight: 1.7, margin: '0 0 8px' }}>
            "But those who wait on the Lord shall renew their strength; they shall mount up with wings like eagles."
          </p>
          <p style={{ fontSize: 13, color: '#64748B', margin: 0 }}>— Isaiah 40:31</p>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button onClick={onRestart} style={{ background: 'none', border: '2px solid #E5E7EB', borderRadius: 12, padding: '12px 28px', fontSize: 14, color: '#6B7280', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600 }}>
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

  // Check if returning from Gumroad after payment
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('paid') === 'true') {
      const saved = localStorage.getItem('deeproots_results');
      if (saved) {
        const { top3: savedTop3, scores: savedScores } = JSON.parse(saved);
        setTop3(savedTop3);
        setScores(savedScores);
        setScreen('unlocked');
        window.history.replaceState({}, '', window.location.pathname);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, []);

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
    localStorage.removeItem('deeproots_results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUnlock = () => {
    // Save results to localStorage before redirecting to Gumroad
    localStorage.setItem('deeproots_results', JSON.stringify({ top3, scores }));
    window.location.href = GUMROAD_URL;
  };

  return (
    <div>
      {screen === 'intro' && <IntroScreen onStart={() => setScreen('quiz')} />}
      {screen === 'quiz' && (
        <div style={{ opacity: fade ? 1 : 0, transform: fade ? 'translateY(0)' : 'translateY(8px)', transition: 'opacity 0.18s ease, transform 0.18s ease' }}>
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
        <ResultsScreen top3={top3} scores={scores} onRestart={handleRestart} onUnlock={handleUnlock} />
      )}
      {screen === 'unlocked' && (
        <UnlockedScreen top3={top3} scores={scores} onRestart={handleRestart} />
      )}
    </div>
  );
}
