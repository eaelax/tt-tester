export interface CreatorData {
  username: string;
  displayName: string;
  category: string;
  categorySlug: string;
  followers: string;
  followerCount: number;
  likes: string;
  heartCount: number;
  bio: string;
  verified: boolean;
  avatar: string;
  country: string;
}

export interface CategoryData {
  slug: string;
  name: string;
  title: string;
  iconName: string;
  shortDescription: string;
  seoDescription: string;
  creatorUsernames: string[];
  trendingTags: string[];
  faqs: { question: string; answer: string }[];
}

export const CATEGORIES: CategoryData[] = [
  {
    slug: 'comedy',
    name: 'Comedy & Entertainment',
    title: 'Top TikTok Comedians & Viral Sketch Creators',
    iconName: 'Laugh',
    shortDescription:
      'Discover the funniest TikTok creators, viral parodies, and life-hack debunkers.',
    seoDescription:
      'Explore trending TikTok comedy creators, view engagement stats, and download funny clips in HD watermark-free MP4 and MP3 audio.',
    creatorUsernames: [
      'khaby.lame',
      'zachking',
      'mrbeast',
      'spencerx',
      'jasonderulo',
      'kallmekris',
    ],
    trendingTags: ['#funny', '#comedy', '#humor', '#meme', '#sketch', '#lol'],
    faqs: [
      {
        question: 'Who is the most followed comedy creator on TikTok?',
        answer:
          'Khaby Lame (@khaby.lame) is the most followed comedy creator on TikTok with over 160 million followers, famous for his silent reactions to overcomplicated life hacks.',
      },
      {
        question: 'Can I download TikTok comedy clips without watermarks?',
        answer:
          'Yes. Using Tik Profiles Viewer, you can download any public TikTok comedy video in original HD MP4 quality without the bouncing TikTok watermark logo.',
      },
      {
        question: 'How do TikTok comedians achieve high engagement rates?',
        answer:
          'Comedy creators often maintain 8 to 15 percent engagement rates because funny short videos drive high rewatch counts, active comments, and shares.',
      },
    ],
  },
  {
    slug: 'food-cooking',
    name: 'Food & Cooking',
    title: 'Best TikTok Chefs, Foodies & Recipe Creators',
    iconName: 'Utensils',
    shortDescription:
      'Watch mouthwatering culinary creations, quick 15-minute recipes, and restaurant reviews.',
    seoDescription:
      'Browse the top culinary and recipe creators on TikTok. View follower counts, stream recipes without watermarks, and save audio tracks.',
    creatorUsernames: [
      'cznburak',
      'gordonramsayofficial',
      'the_pastaqueen',
      'bayashi.tiktok',
      'albert_cancook',
      'joshuaweissman',
    ],
    trendingTags: [
      '#foodtiktok',
      '#recipe',
      '#easyrecipe',
      '#cheflife',
      '#foodie',
      '#delicious',
    ],
    faqs: [
      {
        question: 'How do I download TikTok recipe videos to cook later?',
        answer:
          'Search any food creator on Tik Profiles Viewer (like @gordonramsayofficial or @cznburak) and click Download HD Video to save the cooking tutorial directly to your device.',
      },
      {
        question: 'Who are the top chefs on TikTok?',
        answer:
          'Notable chefs on TikTok include Gordon Ramsay (@gordonramsayofficial), Burak Özdemir (@cznburak), Bayashi (@bayashi.tiktok), and Albert Cancook (@albert_cancook).',
      },
    ],
  },
  {
    slug: 'tech-ai',
    name: 'Tech & AI',
    title: 'Top TikTok Tech Reviewers, AI Hacks & Gadget Creators',
    iconName: 'Cpu',
    shortDescription:
      'Stay ahead of the curve with AI tools, smartphone reviews, PC setups, and software tricks.',
    seoDescription:
      'Discover premier tech and AI creators on TikTok. View stats, download tutorial videos without watermarks, and analyze engagement metrics.',
    creatorUsernames: [
      'mkbhd',
      'supersaf',
      'mrwhosetheboss',
      'ijustine',
      'linustech',
    ],
    trendingTags: ['#techtok', '#gadgets', '#apple', '#techreview', '#ai', '#productivity'],
    faqs: [
      {
        question: 'Can I download TikTok tech tutorials to watch offline?',
        answer:
          'Yes, Tik Profiles Viewer allows instant watermark-free MP4 downloads so you can watch software tutorials, coding tips, and hardware guides offline.',
      },
      {
        question: 'What is the best way to analyze a tech creator on TikTok?',
        answer:
          'Use the Tik Profiles Viewer Analytics tool to check average view counts, engagement percentage, and total likes across their public posts.',
      },
    ],
  },
  {
    slug: 'gaming',
    name: 'Gaming & Esports',
    title: 'Best TikTok Gamers, Streamers & Esports Highlights',
    iconName: 'Gamepad2',
    shortDescription:
      'Watch intense gaming clips, speedruns, funny glitches, and esports tournament highlights.',
    seoDescription:
      'Explore top TikTok gaming personalities. Stream clips without watermarks, download sound effects in MP3, and view gamer profile statistics.',
    creatorUsernames: ['ninja', 'pokimane', 'timthetatman', 'tfue', 'sypherpk'],
    trendingTags: ['#gaming', '#gamer', '#gamertok', '#esports', '#fortnite', '#minecraft'],
    faqs: [
      {
        question: 'How do I extract TikTok gaming sound clips in MP3 format?',
        answer:
          'Open the gamer profile on Tik Profiles Viewer, select any video card, and click Download Audio (MP3) to save the background music or sound clip.',
      },
      {
        question: 'Can I view gamer TikTok profiles without having an account?',
        answer:
          'Yes. Tik Profiles Viewer is 100% anonymous and free. No TikTok login, app installation, or personal account is required.',
      },
    ],
  },
  {
    slug: 'fitness-sports',
    name: 'Fitness & Sports',
    title: 'Top TikTok Fitness Coaches, Athletes & Workout Routines',
    iconName: 'Dumbbell',
    shortDescription:
      'Get inspired by gym workout routines, calisthenics, mobility drills, and athletic stunts.',
    seoDescription:
      'Find leading fitness coaches and athletes on TikTok. Download workout tutorials in watermark-free HD to follow along at the gym.',
    creatorUsernames: [
      'demibagby',
      'leanbeefpatty',
      'chris_heria',
      'hybridcalisthenics',
      'cbum',
    ],
    trendingTags: [
      '#gymtok',
      '#fitnesstips',
      '#workout',
      '#calisthenics',
      '#bodybuilding',
      '#health',
    ],
    faqs: [
      {
        question: 'How can I save TikTok workout videos to my phone gallery?',
        answer:
          'Enter the fitness creator username on Tik Profiles Viewer, tap on the workout routine video, and click Download HD Video. The MP4 saves directly to your device storage.',
      },
      {
        question: 'Are fitness videos downloaded with watermarks?',
        answer:
          'No. All videos downloaded through Tik Profiles Viewer are clean, high-definition streams with zero watermark or creator overlays.',
      },
    ],
  },
  {
    slug: 'dance-music',
    name: 'Dance & Music',
    title: 'Trending TikTok Dancers, Choreographers & Musical Artists',
    iconName: 'Music',
    shortDescription:
      'Learn viral dance trends, watch choreography, and extract trending sound tracks.',
    seoDescription:
      'Discover viral TikTok dance creators and musicians. Download HD choreography videos and extract original trending audio files in MP3 format.',
    creatorUsernames: [
      'charlidamelio',
      'bellapoarch',
      'addisonre',
      'michael.le',
      'dixiedamelio',
    ],
    trendingTags: [
      '#dance',
      '#dancetrend',
      '#music',
      '#choreography',
      '#trendingdance',
      '#pop',
    ],
    faqs: [
      {
        question: 'How do I download the original sound from a viral TikTok dance?',
        answer:
          'Select the dance video in Tik Profiles Viewer and click Download Audio (MP3) to download the clean audio file directly.',
      },
      {
        question: 'Who are the biggest dance influencers on TikTok?',
        answer:
          'Charli D’Amelio (@charlidamelio), Addison Rae (@addisonre), and Michael Le (@michael.le) are among the most famous dance creators in TikTok history.',
      },
    ],
  },
  {
    slug: 'beauty-fashion',
    name: 'Beauty & Fashion',
    title: 'Top TikTok Beauty Creators, Makeup Artists & Style Icons',
    iconName: 'Sparkles',
    shortDescription:
      'Explore makeup tutorials, skincare routines, outfit inspiration, and fashion trends.',
    seoDescription:
      'Browse popular beauty and fashion creators on TikTok. View profiles anonymously and download tutorial clips in watermark-free HD.',
    creatorUsernames: [
      'mikaylanogueira',
      'jamescharles',
      'hyram',
      'abbyroberts',
      'wisdomkaye',
    ],
    trendingTags: ['#beautytok', '#makeup', '#skincare', '#fashion', '#ootd', '#style'],
    faqs: [
      {
        question: 'How do I save TikTok makeup tutorials without watermarks?',
        answer:
          'Search any beauty creator username on Tik Profiles Viewer, select the tutorial clip, and click Download HD Video to save the clean MP4 file.',
      },
      {
        question: 'Can I browse fashion creators anonymously?',
        answer:
          'Yes. You do not need a TikTok login, and creators never see your profile visits.',
      },
    ],
  },
  {
    slug: 'education-science',
    name: 'Education & Science',
    title: 'Top TikTok Science Communicators, Teachers & Fact Creators',
    iconName: 'GraduationCap',
    shortDescription:
      'Learn space facts, physics experiments, language tips, and bite-sized science lessons.',
    seoDescription:
      'Discover top educational and science creators on TikTok. Watch explainers smoothly and save study clips in HD MP4 without watermarks.',
    creatorUsernames: [
      'hankgreen',
      'markrober',
      'nilered',
      'astro_alexandra',
      'billnye',
    ],
    trendingTags: ['#edutok', '#science', '#learnontiktok', '#facts', '#space', '#physics'],
    faqs: [
      {
        question: 'Can teachers and students save educational TikTok clips offline?',
        answer:
          'Yes. Use Tik Profiles Viewer to save public educational explainers in clean HD MP4 for offline classroom or study review.',
      },
      {
        question: 'Who are the most popular science creators on TikTok?',
        answer:
          'Creators like Hank Green (@hankgreen), Mark Rober (@markrober), and NileRed (@nilered) share widely watched science explainers and experiments.',
      },
    ],
  },
  {
    slug: 'travel-adventure',
    name: 'Travel & Lifestyle',
    title: 'Best TikTok Travel Creators, Photographers & Explorers',
    iconName: 'Compass',
    shortDescription:
      'Discover hidden travel destinations, city guides, scenic cinematography, and lifestyle vlogs.',
    seoDescription:
      'Explore top travel creators on TikTok. Watch destination guides without lag and download scenic HD clips without watermarks.',
    creatorUsernames: [
      'samkolder',
      'drewbinsky',
      'nasdaily',
      'yes_theory',
      'lexie.limitless',
    ],
    trendingTags: ['#traveltok', '#travel', '#wanderlust', '#explore', '#adventure', '#vlog'],
    faqs: [
      {
        question: 'How can I save TikTok travel guides before a trip?',
        answer:
          'Open the travel creator profile on Tik Profiles Viewer and download their destination clips in clean MP4 so you can watch offline while traveling.',
      },
      {
        question: 'Can I extract travel vlog background songs in MP3?',
        answer:
          'Yes. Click any travel video and choose Download Audio (MP3) to save the original sound track.',
      },
    ],
  },
  {
    slug: 'pets-animals',
    name: 'Pets & Animals',
    title: 'Top TikTok Pet Accounts, Cute Dogs, Cats & Wildlife Creators',
    iconName: 'Heart',
    shortDescription:
      'Watch heartwarming pet moments, clever animal tricks, and rescue stories on TikTok.',
    seoDescription:
      'Browse the cutest pet and animal creators on TikTok. Watch clips anonymously and download watermark-free HD videos.',
    creatorUsernames: [
      'thatlittlepuff',
      'tuckerbudzyn',
      'jiffpom',
      'itsdougthepug',
      'nala_cat',
    ],
    trendingTags: ['#petsoftiktok', '#dogsoftiktok', '#catsoftiktok', '#animals', '#cute'],
    faqs: [
      {
        question: 'Who is the most popular pet creator on TikTok?',
        answer:
          'That Little Puff (@thatlittlepuff) and Tucker Budzyn (@tuckerbudzyn) are among the largest pet creator accounts on TikTok with tens of millions of followers.',
      },
      {
        question: 'Can I download funny pet videos without the TikTok watermark?',
        answer:
          'Yes. Click any video on the creator profile and select Download HD Video to save the clean MP4.',
      },
    ],
  },
];

export const CREATORS: CreatorData[] = [
  // Comedy & Entertainment
  {
    username: 'khaby.lame',
    displayName: 'Khaby Lame',
    category: 'Comedy & Entertainment',
    categorySlug: 'comedy',
    followers: '162.8M',
    followerCount: 162800000,
    likes: '2.5B',
    heartCount: 2500000000,
    bio: 'If you want to laugh, you are in the right place! Italian-Senegalese creator known for silent life-hack debunking.',
    verified: true,
    avatar: '/api/avatar?username=khaby.lame',
    country: 'Italy',
  },
  {
    username: 'mrbeast',
    displayName: 'MrBeast',
    category: 'Comedy & Entertainment',
    categorySlug: 'comedy',
    followers: '104.2M',
    followerCount: 104200000,
    likes: '1.1B',
    heartCount: 1100000000,
    bio: 'I want to make the world a better place before I die. Philanthropist and creator of high-stakes challenges.',
    verified: true,
    avatar: '/api/avatar?username=mrbeast',
    country: 'United States',
  },
  {
    username: 'zachking',
    displayName: 'Zach King',
    category: 'Comedy & Entertainment',
    categorySlug: 'comedy',
    followers: '82.3M',
    followerCount: 82300000,
    likes: '1.2B',
    heartCount: 1200000000,
    bio: 'Bringing a little more wonder into the world. Master of digital sleight of hand and illusion videos.',
    verified: true,
    avatar: '/api/avatar?username=zachking',
    country: 'United States',
  },
  {
    username: 'spencerx',
    displayName: 'Spencer X',
    category: 'Comedy & Entertainment',
    categorySlug: 'comedy',
    followers: '55.3M',
    followerCount: 55300000,
    likes: '1.3B',
    heartCount: 1300000000,
    bio: 'One-man beatbox powerhouse producing mind-blowing tracks entirely with his mouth.',
    verified: true,
    avatar: '/api/avatar?username=spencerx',
    country: 'United States',
  },
  {
    username: 'jasonderulo',
    displayName: 'Jason Derulo',
    category: 'Comedy & Entertainment',
    categorySlug: 'comedy',
    followers: '60.4M',
    followerCount: 60400000,
    likes: '1.4B',
    heartCount: 1400000000,
    bio: 'Savage Love! Singer, entertainer, and creator of viral culinary and dance skits.',
    verified: true,
    avatar: '/api/avatar?username=jasonderulo',
    country: 'United States',
  },
  {
    username: 'kallmekris',
    displayName: 'Kris Collins (Kallmekris)',
    category: 'Comedy & Entertainment',
    categorySlug: 'comedy',
    followers: '51.2M',
    followerCount: 51200000,
    likes: '2.4B',
    heartCount: 2400000000,
    bio: 'Canadian comedy creator famous for multi-character family skits and relatable humor.',
    verified: true,
    avatar: '/api/avatar?username=kallmekris',
    country: 'Canada',
  },

  // Food & Cooking
  {
    username: 'cznburak',
    displayName: 'Burak Özdemir (CznBurak)',
    category: 'Food & Cooking',
    categorySlug: 'food-cooking',
    followers: '75.2M',
    followerCount: 75200000,
    likes: '1.5B',
    heartCount: 1500000000,
    bio: 'Smiley chef preparing giant kebabs, burgers, and Turkish feasts with a constant smile.',
    verified: true,
    avatar: '/api/avatar?username=cznburak',
    country: 'Turkey',
  },
  {
    username: 'bayashi.tiktok',
    displayName: 'Bayashi',
    category: 'Food & Cooking',
    categorySlug: 'food-cooking',
    followers: '54.8M',
    followerCount: 54800000,
    likes: '1.6B',
    heartCount: 1600000000,
    bio: 'ASMR fast-paced cooking tutorials featuring deep-fried cheeses, meats, and delicious comfort food.',
    verified: true,
    avatar: '/api/avatar?username=bayashi.tiktok',
    country: 'Japan',
  },
  {
    username: 'gordonramsayofficial',
    displayName: 'Gordon Ramsay',
    category: 'Food & Cooking',
    categorySlug: 'food-cooking',
    followers: '40.6M',
    followerCount: 40600000,
    likes: '620M',
    heartCount: 620000000,
    bio: 'Always judging your cooking. Multi-Michelin starred chef and TV personality.',
    verified: true,
    avatar: '/api/avatar?username=gordonramsayofficial',
    country: 'United Kingdom',
  },
  {
    username: 'albert_cancook',
    displayName: 'Albert Niazhvinski (Albert Cancook)',
    category: 'Food & Cooking',
    categorySlug: 'food-cooking',
    followers: '15.8M',
    followerCount: 15800000,
    likes: '380M',
    heartCount: 380000000,
    bio: 'Fast-cut culinary creator turning iconic movie dishes and restaurant classics into home recipes.',
    verified: true,
    avatar: '/api/avatar?username=albert_cancook',
    country: 'United States',
  },
  {
    username: 'the_pastaqueen',
    displayName: 'Nadia Caterina Munno (The Pasta Queen)',
    category: 'Food & Cooking',
    categorySlug: 'food-cooking',
    followers: '3.6M',
    followerCount: 3600000,
    likes: '64M',
    heartCount: 64000000,
    bio: 'Italian cookbook author sharing authentic pasta recipes, sauces, and dramatic Mediterranean cooking.',
    verified: true,
    avatar: '/api/avatar?username=the_pastaqueen',
    country: 'Italy',
  },
  {
    username: 'joshuaweissman',
    displayName: 'Joshua Weissman',
    category: 'Food & Cooking',
    categorySlug: 'food-cooking',
    followers: '9.4M',
    followerCount: 9400000,
    likes: '240M',
    heartCount: 240000000,
    bio: 'Chef and cookbook author making gourmet "But Better" versions of popular fast food classics.',
    verified: true,
    avatar: '/api/avatar?username=joshuaweissman',
    country: 'United States',
  },

  // Tech & AI
  {
    username: 'mkbhd',
    displayName: 'Marques Brownlee (MKBHD)',
    category: 'Tech & AI',
    categorySlug: 'tech-ai',
    followers: '3.8M',
    followerCount: 3800000,
    likes: '68M',
    heartCount: 68000000,
    bio: 'Crisp tech reviews, smartphone blind camera tests, and deep dives into the future of technology.',
    verified: true,
    avatar: '/api/avatar?username=mkbhd',
    country: 'United States',
  },
  {
    username: 'mrwhosetheboss',
    displayName: 'Arun Maini (Mrwhosetheboss)',
    category: 'Tech & AI',
    categorySlug: 'tech-ai',
    followers: '3.1M',
    followerCount: 3100000,
    likes: '59M',
    heartCount: 59000000,
    bio: 'UK-based technology reviewer testing smartphones, weird gadgets, and next-gen AI hardware.',
    verified: true,
    avatar: '/api/avatar?username=mrwhosetheboss',
    country: 'United Kingdom',
  },
  {
    username: 'supersaf',
    displayName: 'Safwan Ahmedmia (SuperSaf)',
    category: 'Tech & AI',
    categorySlug: 'tech-ai',
    followers: '1.2M',
    followerCount: 1200000,
    likes: '21M',
    heartCount: 21000000,
    bio: 'Smartphone camera comparisons, unboxings, and consumer gadget insights.',
    verified: true,
    avatar: '/api/avatar?username=supersaf',
    country: 'United Kingdom',
  },
  {
    username: 'ijustine',
    displayName: 'Justine Ezarik (iJustine)',
    category: 'Tech & AI',
    categorySlug: 'tech-ai',
    followers: '1.4M',
    followerCount: 1400000,
    likes: '28M',
    heartCount: 28000000,
    bio: 'Tech creator covering Apple releases, studio gear, gaming setups, and electric vehicles.',
    verified: true,
    avatar: '/api/avatar?username=ijustine',
    country: 'United States',
  },
  {
    username: 'linustech',
    displayName: 'Linus Tech Tips',
    category: 'Tech & AI',
    categorySlug: 'tech-ai',
    followers: '2.4M',
    followerCount: 2400000,
    likes: '45M',
    heartCount: 45000000,
    bio: 'PC hardware builds, server experiments, and consumer electronics explainers.',
    verified: true,
    avatar: '/api/avatar?username=linustech',
    country: 'Canada',
  },

  // Gaming & Esports
  {
    username: 'ninja',
    displayName: 'Tyler Blevins (Ninja)',
    category: 'Gaming & Esports',
    categorySlug: 'gaming',
    followers: '19.2M',
    followerCount: 19200000,
    likes: '180M',
    heartCount: 180000000,
    bio: 'World famous gaming streamer, competitive battle royale pioneer, and content creator.',
    verified: true,
    avatar: '/api/avatar?username=ninja',
    country: 'United States',
  },
  {
    username: 'pokimane',
    displayName: 'Imane Anys (Pokimane)',
    category: 'Gaming & Esports',
    categorySlug: 'gaming',
    followers: '6.7M',
    followerCount: 6700000,
    likes: '85M',
    heartCount: 85000000,
    bio: 'Gaming enthusiast, variety streamer, and co-founder of RTS talent agency.',
    verified: true,
    avatar: '/api/avatar?username=pokimane',
    country: 'Canada',
  },
  {
    username: 'timthetatman',
    displayName: 'TimTheTatman',
    category: 'Gaming & Esports',
    categorySlug: 'gaming',
    followers: '4.3M',
    followerCount: 4300000,
    likes: '72M',
    heartCount: 72000000,
    bio: 'Variety FPS streamer sharing funny squad highlights and live reaction moments.',
    verified: true,
    avatar: '/api/avatar?username=timthetatman',
    country: 'United States',
  },
  {
    username: 'sypherpk',
    displayName: 'Ali Hassan (SypherPK)',
    category: 'Gaming & Esports',
    categorySlug: 'gaming',
    followers: '7.5M',
    followerCount: 7500000,
    likes: '140M',
    heartCount: 140000000,
    bio: 'Competitive Fortnite creator sharing map updates, tournament tips, and gameplay breakdowns.',
    verified: true,
    avatar: '/api/avatar?username=sypherpk',
    country: 'United States',
  },
  {
    username: 'tfue',
    displayName: 'Turner Tenney (Tfue)',
    category: 'Gaming & Esports',
    categorySlug: 'gaming',
    followers: '7.9M',
    followerCount: 7900000,
    likes: '95M',
    heartCount: 95000000,
    bio: 'Esports veteran known for high-skill shooter gameplay and speedrun clips.',
    verified: true,
    avatar: '/api/avatar?username=tfue',
    country: 'United States',
  },

  // Fitness & Sports
  {
    username: 'demibagby',
    displayName: 'Demi Bagby',
    category: 'Fitness & Sports',
    categorySlug: 'fitness-sports',
    followers: '14.5M',
    followerCount: 14500000,
    likes: '340M',
    heartCount: 340000000,
    bio: 'Crossfit athlete, stunt enthusiast, and calisthenics adventurer spreading positive energy.',
    verified: true,
    avatar: '/api/avatar?username=demibagby',
    country: 'United States',
  },
  {
    username: 'leanbeefpatty',
    displayName: 'Patty (LeanBeefPatty)',
    category: 'Fitness & Sports',
    categorySlug: 'fitness-sports',
    followers: '8.2M',
    followerCount: 8200000,
    likes: '215M',
    heartCount: 215000000,
    bio: 'Strength athlete and fitness creator mixing gym training tips with lighthearted humor.',
    verified: true,
    avatar: '/api/avatar?username=leanbeefpatty',
    country: 'United States',
  },
  {
    username: 'chris_heria',
    displayName: 'Chris Heria',
    category: 'Fitness & Sports',
    categorySlug: 'fitness-sports',
    followers: '3.4M',
    followerCount: 3400000,
    likes: '42M',
    heartCount: 42000000,
    bio: 'Calisthenics coach sharing bodyweight workouts, handstand progressions, and home routines.',
    verified: true,
    avatar: '/api/avatar?username=chris_heria',
    country: 'United States',
  },
  {
    username: 'hybridcalisthenics',
    displayName: 'Hampton (Hybrid Calisthenics)',
    category: 'Fitness & Sports',
    categorySlug: 'fitness-sports',
    followers: '5.1M',
    followerCount: 5100000,
    likes: '110M',
    heartCount: 110000000,
    bio: 'Encouraging, beginner-friendly bodyweight fitness and mobility guides for every age.',
    verified: true,
    avatar: '/api/avatar?username=hybridcalisthenics',
    country: 'United States',
  },
  {
    username: 'cbum',
    displayName: 'Chris Bumstead (CBum)',
    category: 'Fitness & Sports',
    categorySlug: 'fitness-sports',
    followers: '9.8M',
    followerCount: 9800000,
    likes: '165M',
    heartCount: 165000000,
    bio: 'Classic Physique champion sharing bodybuilding training splits, mindset, and prep clips.',
    verified: true,
    avatar: '/api/avatar?username=cbum',
    country: 'Canada',
  },

  // Dance & Music
  {
    username: 'charlidamelio',
    displayName: 'Charli D’Amelio',
    category: 'Dance & Music',
    categorySlug: 'dance-music',
    followers: '155.4M',
    followerCount: 155400000,
    likes: '11.6B',
    heartCount: 11600000000,
    bio: 'All smiles here :) Viral dancer, creator, and entrepreneur from Connecticut.',
    verified: true,
    avatar: '/api/avatar?username=charlidamelio',
    country: 'United States',
  },
  {
    username: 'bellapoarch',
    displayName: 'Bella Poarch',
    category: 'Dance & Music',
    categorySlug: 'dance-music',
    followers: '94.1M',
    followerCount: 94100000,
    likes: '2.3B',
    heartCount: 2300000000,
    bio: 'Navy veteran, singer, and creator of the most liked video in TikTok history (M to the B).',
    verified: true,
    avatar: '/api/avatar?username=bellapoarch',
    country: 'United States',
  },
  {
    username: 'addisonre',
    displayName: 'Addison Rae',
    category: 'Dance & Music',
    categorySlug: 'dance-music',
    followers: '88.5M',
    followerCount: 88500000,
    likes: '5.9B',
    heartCount: 5900000000,
    bio: 'Pop singer, actress, and dance icon from Louisiana.',
    verified: true,
    avatar: '/api/avatar?username=addisonre',
    country: 'United States',
  },
  {
    username: 'dixiedamelio',
    displayName: 'Dixie D’Amelio',
    category: 'Dance & Music',
    categorySlug: 'dance-music',
    followers: '55.8M',
    followerCount: 55800000,
    likes: '3.3B',
    heartCount: 3300000000,
    bio: 'Singer and digital creator sharing behind-the-scenes studio clips and music releases.',
    verified: true,
    avatar: '/api/avatar?username=dixiedamelio',
    country: 'United States',
  },
  {
    username: 'michael.le',
    displayName: 'Michael Le (JustMaiko)',
    category: 'Dance & Music',
    categorySlug: 'dance-music',
    followers: '51.4M',
    followerCount: 51400000,
    likes: '1.5B',
    heartCount: 1500000000,
    bio: 'Choreographer and dancer known for escalator routines and synchronized group trends.',
    verified: true,
    avatar: '/api/avatar?username=michael.le',
    country: 'United States',
  },

  // Beauty & Fashion
  {
    username: 'mikaylanogueira',
    displayName: 'Mikayla Nogueira',
    category: 'Beauty & Fashion',
    categorySlug: 'beauty-fashion',
    followers: '15.9M',
    followerCount: 15900000,
    likes: '1.4B',
    heartCount: 1400000000,
    bio: 'Makeup artist sharing detailed product reviews, glam transformations, and foundation tests.',
    verified: true,
    avatar: '/api/avatar?username=mikaylanogueira',
    country: 'United States',
  },
  {
    username: 'jamescharles',
    displayName: 'James Charles',
    category: 'Beauty & Fashion',
    categorySlug: 'beauty-fashion',
    followers: '38.7M',
    followerCount: 38700000,
    likes: '1.1B',
    heartCount: 1100000000,
    bio: 'Beauty creator known for editorial eyeshadow looks, transitions, and cosmetics tutorials.',
    verified: true,
    avatar: '/api/avatar?username=jamescharles',
    country: 'United States',
  },
  {
    username: 'hyram',
    displayName: 'Hyram Yarbro',
    category: 'Beauty & Fashion',
    categorySlug: 'beauty-fashion',
    followers: '6.1M',
    followerCount: 6100000,
    likes: '280M',
    heartCount: 280000000,
    bio: 'Skincare specialist breaking down ingredient lists and affordable daily routines.',
    verified: true,
    avatar: '/api/avatar?username=hyram',
    country: 'United States',
  },
  {
    username: 'abbyroberts',
    displayName: 'Abby Roberts',
    category: 'Beauty & Fashion',
    categorySlug: 'beauty-fashion',
    followers: '16.8M',
    followerCount: 16800000,
    likes: '1.3B',
    heartCount: 1300000000,
    bio: 'UK makeup artist famous for optical illusion face paint and creative transformation videos.',
    verified: true,
    avatar: '/api/avatar?username=abbyroberts',
    country: 'United Kingdom',
  },
  {
    username: 'wisdomkaye',
    displayName: 'Wisdom Kaye',
    category: 'Beauty & Fashion',
    categorySlug: 'beauty-fashion',
    followers: '11.4M',
    followerCount: 11400000,
    likes: '420M',
    heartCount: 420000000,
    bio: 'Fashion model and stylist creating high-fashion outfit challenges and runway aesthetics.',
    verified: true,
    avatar: '/api/avatar?username=wisdomkaye',
    country: 'United States',
  },

  // Education & Science
  {
    username: 'hankgreen',
    displayName: 'Hank Green',
    category: 'Education & Science',
    categorySlug: 'education-science',
    followers: '8.2M',
    followerCount: 8200000,
    likes: '710M',
    heartCount: 710000000,
    bio: 'Science communicator answering everyday biology, astronomy, and curious internet questions.',
    verified: true,
    avatar: '/api/avatar?username=hankgreen',
    country: 'United States',
  },
  {
    username: 'markrober',
    displayName: 'Mark Rober',
    category: 'Education & Science',
    categorySlug: 'education-science',
    followers: '12.6M',
    followerCount: 12600000,
    likes: '190M',
    heartCount: 190000000,
    bio: 'Former NASA engineer building creative science experiments, obstacle courses, and gadgets.',
    verified: true,
    avatar: '/api/avatar?username=markrober',
    country: 'United States',
  },
  {
    username: 'nilered',
    displayName: 'Nigel Braun (NileRed)',
    category: 'Education & Science',
    categorySlug: 'education-science',
    followers: '4.6M',
    followerCount: 4600000,
    likes: '130M',
    heartCount: 130000000,
    bio: 'Chemistry creator turning everyday materials into surprising compounds in lab experiments.',
    verified: true,
    avatar: '/api/avatar?username=nilered',
    country: 'Canada',
  },
  {
    username: 'astro_alexandra',
    displayName: 'Alexandra Doten (Astro Alexandra)',
    category: 'Education & Science',
    categorySlug: 'education-science',
    followers: '1.9M',
    followerCount: 1900000,
    likes: '62M',
    heartCount: 62000000,
    bio: 'Space communicator explaining telescope discoveries, planets, and aerospace news.',
    verified: true,
    avatar: '/api/avatar?username=astro_alexandra',
    country: 'United States',
  },
  {
    username: 'billnye',
    displayName: 'Bill Nye',
    category: 'Education & Science',
    categorySlug: 'education-science',
    followers: '9.5M',
    followerCount: 9500000,
    likes: '145M',
    heartCount: 145000000,
    bio: 'Science educator sharing quick physics demonstrations and climate explainers.',
    verified: true,
    avatar: '/api/avatar?username=billnye',
    country: 'United States',
  },

  // Travel & Lifestyle
  {
    username: 'nasdaily',
    displayName: 'Nuseir Yassin (Nas Daily)',
    category: 'Travel & Lifestyle',
    categorySlug: 'travel-adventure',
    followers: '8.7M',
    followerCount: 8700000,
    likes: '185M',
    heartCount: 185000000,
    bio: 'One-minute stories highlighting extraordinary people, cultures, and places around the globe.',
    verified: true,
    avatar: '/api/avatar?username=nasdaily',
    country: 'United Arab Emirates',
  },
  {
    username: 'drewbinsky',
    displayName: 'Drew Binsky',
    category: 'Travel & Lifestyle',
    categorySlug: 'travel-adventure',
    followers: '2.8M',
    followerCount: 2800000,
    likes: '68M',
    heartCount: 68000000,
    bio: 'World traveler documenting every country with cultural stories and local street food guides.',
    verified: true,
    avatar: '/api/avatar?username=drewbinsky',
    country: 'United States',
  },
  {
    username: 'samkolder',
    displayName: 'Sam Kolder',
    category: 'Travel & Lifestyle',
    categorySlug: 'travel-adventure',
    followers: '1.6M',
    followerCount: 1600000,
    likes: '24M',
    heartCount: 24000000,
    bio: 'Travel filmmaker creating cinematic drone transitions and nature expedition reels.',
    verified: true,
    avatar: '/api/avatar?username=samkolder',
    country: 'Canada',
  },
  {
    username: 'yes_theory',
    displayName: 'Yes Theory',
    category: 'Travel & Lifestyle',
    categorySlug: 'travel-adventure',
    followers: '4.1M',
    followerCount: 4100000,
    likes: '98M',
    heartCount: 98000000,
    bio: 'Seek discomfort through spontaneous travel adventures and meeting strangers worldwide.',
    verified: true,
    avatar: '/api/avatar?username=yes_theory',
    country: 'United States',
  },
  {
    username: 'lexie.limitless',
    displayName: 'Lexie Alford (Lexie Limitless)',
    category: 'Travel & Lifestyle',
    categorySlug: 'travel-adventure',
    followers: '1.1M',
    followerCount: 1100000,
    likes: '19M',
    heartCount: 19000000,
    bio: 'Global explorer sharing solo travel safety tips, itineraries, and road trip adventures.',
    verified: true,
    avatar: '/api/avatar?username=lexie.limitless',
    country: 'United States',
  },

  // Pets & Animals
  {
    username: 'thatlittlepuff',
    displayName: 'That Little Puff',
    category: 'Pets & Animals',
    categorySlug: 'pets-animals',
    followers: '33.6M',
    followerCount: 33600000,
    likes: '650M',
    heartCount: 650000000,
    bio: 'Adorable cooking and life-hack cat famous for miniature kitchen inventions.',
    verified: true,
    avatar: '/api/avatar?username=thatlittlepuff',
    country: 'United States',
  },
  {
    username: 'tuckerbudzyn',
    displayName: 'Tucker Budzyn',
    category: 'Pets & Animals',
    categorySlug: 'pets-animals',
    followers: '11.4M',
    followerCount: 11400000,
    likes: '340M',
    heartCount: 340000000,
    bio: 'Expressive Golden Retriever tasting funny treats and reacting to hilarious challenges.',
    verified: true,
    avatar: '/api/avatar?username=tuckerbudzyn',
    country: 'United States',
  },
  {
    username: 'jiffpom',
    displayName: 'Jiffpom',
    category: 'Pets & Animals',
    categorySlug: 'pets-animals',
    followers: '20.4M',
    followerCount: 20400000,
    likes: '515M',
    heartCount: 515000000,
    bio: 'World famous Pomeranian performing cute tricks, outfits, and seasonal skits.',
    verified: true,
    avatar: '/api/avatar?username=jiffpom',
    country: 'United States',
  },
  {
    username: 'itsdougthepug',
    displayName: 'Doug The Pug',
    category: 'Pets & Animals',
    categorySlug: 'pets-animals',
    followers: '6.1M',
    followerCount: 6100000,
    likes: '140M',
    heartCount: 140000000,
    bio: 'King of Pop Culture pug starring in cozy lifestyle and snack videos.',
    verified: true,
    avatar: '/api/avatar?username=itsdougthepug',
    country: 'United States',
  },
  {
    username: 'nala_cat',
    displayName: 'Nala Cat',
    category: 'Pets & Animals',
    categorySlug: 'pets-animals',
    followers: '2.3M',
    followerCount: 2300000,
    likes: '48M',
    heartCount: 48000000,
    bio: 'Rescue Siamese-tabby mix sharing heartwarming daily moments and cat tips.',
    verified: true,
    avatar: '/api/avatar?username=nala_cat',
    country: 'United States',
  },
];

export function getCreatorByUsername(username: string): CreatorData | undefined {
  const clean = username.toLowerCase().replace(/^@/, '').trim();
  return CREATORS.find((c) => c.username.toLowerCase() === clean);
}

export function getCategoryBySlug(slug: string): CategoryData | undefined {
  return CATEGORIES.find((c) => c.slug.toLowerCase() === slug.toLowerCase());
}

export function getCreatorsByCategory(categorySlug: string): CreatorData[] {
  return CREATORS.filter((c) => c.categorySlug === categorySlug);
}

export function getRelatedCreators(
  username: string,
  categorySlug?: string,
  limit = 6
): CreatorData[] {
  const clean = username.toLowerCase().replace(/^@/, '').trim();
  const sameCategory = categorySlug
    ? CREATORS.filter(
        (c) =>
          c.categorySlug === categorySlug &&
          c.username.toLowerCase() !== clean
      )
    : [];

  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  const seen = new Set<string>([
    clean,
    ...sameCategory.map((c) => c.username.toLowerCase()),
  ]);
  const fallback = CREATORS.filter((c) => !seen.has(c.username.toLowerCase()));
  return [...sameCategory, ...fallback].slice(0, limit);
}