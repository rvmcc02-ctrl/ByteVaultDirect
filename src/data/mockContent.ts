import { ContentItem, SocialBarNotification } from '../types';

export const CONTENT_ITEMS: ContentItem[] = [
  // MAINSTREAM: PC Software & Media Players
  {
    id: 'sw-1',
    title: 'UltraCodec 4K Pro Media Suite x64',
    category: 'media_players',
    isAdult: false,
    rating: 4.9,
    votes: 48920,
    badge: 'Editor Choice',
    fileSize: '48.2 MB',
    version: 'v8.4.2 (2026)',
    compatibility: 'Windows 11 / 10 / 8.1 (x64)',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    description: 'Hardware-accelerated 4K HDR and AV1 video player with direct streaming renderer, subtitle sync, and 8K audio boost for Windows desktop.',
    tags: ['4K Player', 'Hardware Accel', 'AV1 / HEVC', 'DirectX 12'],
    downloadsCount: '1.4M+',
    developerOrHost: 'OmniAudio Labs',
    directDownloadName: 'UltraCodec_v8.4_x64_Setup.exe',
    requirements: {
      os: 'Windows 10/11 64-bit',
      ram: '4 GB RAM',
      graphics: 'Intel HD 4000 / NVIDIA GTX 750 or higher'
    }
  },
  {
    id: 'sw-2',
    title: 'NovaBoost Gaming Optimizer Pro',
    category: 'pc_software',
    isAdult: false,
    rating: 4.8,
    votes: 31200,
    badge: 'Trending PC Utility',
    fileSize: '32.6 MB',
    version: 'v5.1.0',
    compatibility: 'Windows 11 / 10 (x64)',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    description: 'Instantly frees up RAM, optimizes CPU thread priorities for AAA games, eliminates stutter, and updates DirectX/Vulkan runtimes in 1 click.',
    tags: ['FPS Boost', 'RAM Cleaner', 'Low Latency', 'DirectX 12'],
    downloadsCount: '890K+',
    developerOrHost: 'NovaTech Gaming',
    directDownloadName: 'NovaBoost_Pro_Setup_Win64.exe',
    requirements: {
      os: 'Windows 10/11 64-bit',
      ram: '2 GB RAM',
      graphics: 'Any DirectX compatible GPU'
    }
  },
  {
    id: 'game-1',
    title: 'CyberVanguard: Neon Genesis 2088',
    category: 'pc_games',
    isAdult: false,
    rating: 4.9,
    votes: 62400,
    badge: 'AAA PC Modpack',
    fileSize: '4.8 GB',
    version: 'v1.6.2 RTX',
    compatibility: 'Windows 11 / 10 (x64)',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
    description: 'High-octane cyberpunk tactical shooter with raytracing shaders, custom weapon overhauls, and smooth unlocked desktop framerates.',
    tags: ['Cyberpunk', 'Raytracing', 'Multiplayer', 'Mod Ready'],
    downloadsCount: '2.1M+',
    developerOrHost: 'Vanguard Studios',
    directDownloadName: 'CyberVanguard_Installer_Win64.exe',
    requirements: {
      os: 'Windows 10/11 64-bit',
      ram: '8 GB RAM',
      graphics: 'GTX 1060 / AMD RX 580 or higher'
    }
  },
  {
    id: 'sw-3',
    title: 'StreamMaster Desktop 4K Screen Recorder',
    category: 'pc_software',
    isAdult: false,
    rating: 4.7,
    votes: 19800,
    badge: 'Zero Watermark',
    fileSize: '65.4 MB',
    version: 'v3.9.4',
    compatibility: 'Windows 11 / 10 / 8 (x64)',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    description: 'Ultra-low CPU usage 60FPS/120FPS desktop screen & audio recorder with instant MP4/MKV export, webcam PIP, and hotkey recording.',
    tags: ['Screen Recorder', 'No Lag', '60FPS', 'Free Windows Tool'],
    downloadsCount: '620K+',
    developerOrHost: 'Kroma Software',
    directDownloadName: 'StreamMaster_Setup_x64.msi',
    requirements: {
      os: 'Windows 10/11 64-bit',
      ram: '4 GB RAM',
      graphics: 'DirectX 11 compliant'
    }
  },
  {
    id: 'game-2',
    title: 'Shadow Realm: Awakening Online',
    category: 'pc_games',
    isAdult: false,
    rating: 4.8,
    votes: 27500,
    badge: 'Free-to-Play',
    fileSize: '3.1 GB',
    version: 'Season 4',
    compatibility: 'Windows 11 / 10 (x64)',
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80',
    description: 'Dark fantasy open-world action RPG. Explore sprawling dungeons, slay leviathans, and forge legendary artifacts on PC.',
    tags: ['Action RPG', 'Open World', 'Co-op', 'Desktop Client'],
    downloadsCount: '780K+',
    developerOrHost: 'Mythic Interactive',
    directDownloadName: 'ShadowRealm_Launcher_Win64.exe',
    requirements: {
      os: 'Windows 10/11 64-bit',
      ram: '8 GB RAM',
      graphics: 'NVIDIA GTX 970 / AMD RX 470'
    }
  },

  // ADULT 18+: Interactive Games, Dating Sims, Webtoons & Sensual Streaming Lounges
  {
    id: 'adult-1',
    title: 'Lust & Shadows: Cyber City 18+',
    category: 'adult_games',
    isAdult: true,
    rating: 4.95,
    votes: 84300,
    badge: '18+ Hot Pick',
    fileSize: '1.2 GB',
    version: 'Build 2026.4',
    compatibility: 'Windows 11 / 10 (64-bit)',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
    description: 'High-definition 3D interactive adult RPG with branch choices, motion-captured animations, voice acting, and full desktop resolution.',
    tags: ['18+ Adults Only', '3D Interactive', 'Visual Novel', 'Uncensored Mod'],
    downloadsCount: '1.8M+',
    developerOrHost: 'SinCity Interactive',
    directDownloadName: 'LustShadows_Uncensored_Win64.exe',
    requirements: {
      os: 'Windows 10/11 64-bit',
      ram: '8 GB RAM',
      graphics: 'GTX 1050Ti or better'
    }
  },
  {
    id: 'adult-2',
    title: 'Secret Temptations: Interactive Webtoon 18+',
    category: 'adult_webtoons',
    isAdult: true,
    rating: 4.88,
    votes: 56100,
    badge: 'Updated Weekly',
    fileSize: 'Cloud HD Reader',
    version: 'Chapters 1 - 85',
    compatibility: 'Windows Desktop Web Reader',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    description: 'Critically acclaimed full-color adult romance webtoon with dynamic panel scrolling, audio soundtrack, and uncensored gallery unlocks.',
    tags: ['18+ Webtoon', 'Full Color', 'Uncensored', 'Instant Read'],
    downloadsCount: '940K+',
    developerOrHost: 'Studio Velvet',
    directDownloadName: 'SecretTemptations_HD_Reader.exe',
    requirements: {
      os: 'Windows 10/11 Browser or Desktop App',
      ram: '2 GB RAM',
      graphics: 'Any'
    }
  },
  {
    id: 'adult-3',
    title: 'Velvet Lounge: Live Sensual Cam Streams 18+',
    category: 'live_cams',
    isAdult: true,
    rating: 4.92,
    votes: 112000,
    badge: '18+ Live Now (4,210 Active)',
    fileSize: 'Direct Ultra HD Stream',
    version: '4K Ultra 60fps',
    compatibility: 'Windows Desktop HD Streamer',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    description: 'Private 1-on-1 and interactive group cam shows with HD audio, direct messaging, toy sync support, and no subscription needed.',
    tags: ['18+ Live Cams', 'Private Chat', '4K 60FPS', 'Free Preview'],
    downloadsCount: '3.4M+ Visitors',
    developerOrHost: 'Velvet Live Network',
    directDownloadName: 'VelvetStream_Win64_Player.exe',
    requirements: {
      os: 'Windows 10/11 Desktop',
      ram: '4 GB RAM',
      graphics: 'WebRTC / H.264 support'
    }
  },
  {
    id: 'adult-4',
    title: 'Neon Desire: 18+ Dating Simulator 3D',
    category: 'adult_games',
    isAdult: true,
    rating: 4.86,
    votes: 41800,
    badge: 'New Release',
    fileSize: '890 MB',
    version: 'v2.1',
    compatibility: 'Windows 11 / 10 (x64)',
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
    description: 'Experience futuristic romances with 12 distinct character paths, interactive minigames, full 4K desktop graphics, and unlockable galleries.',
    tags: ['18+ Dating Sim', '3D Graphics', 'Anime Style', 'Full Game'],
    downloadsCount: '520K+',
    developerOrHost: 'Pulse Erotica Studios',
    directDownloadName: 'NeonDesire_Setup_Win64.exe',
    requirements: {
      os: 'Windows 10/11 64-bit',
      ram: '4 GB RAM',
      graphics: 'NVIDIA GT 1030 or equivalent'
    }
  },
  {
    id: 'adult-5',
    title: 'Midnight Vixens: 4K VR & Desktop Stream',
    category: 'live_cams',
    isAdult: true,
    rating: 4.91,
    votes: 69400,
    badge: '18+ VR & Desktop',
    fileSize: 'Instant HD Web & VR',
    version: 'DirectX VR Ready',
    compatibility: 'Windows 11 / 10 & VR Headsets',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    description: 'Immersive 180° / 360° VR and Ultra-wide desktop video stream with interactive webcam models, whispering ASMR audio, and private room chats.',
    tags: ['18+ VR Ready', '360 Video', 'ASMR Audio', 'Desktop Player'],
    downloadsCount: '1.1M+',
    developerOrHost: 'VixenVR Media',
    directDownloadName: 'VixenVR_Streamer_x64.exe',
    requirements: {
      os: 'Windows 10/11 64-bit',
      ram: '8 GB RAM',
      graphics: 'GTX 1060 (VR) or any GPU (Desktop)'
    }
  },
  {
    id: 'sw-4',
    title: 'DirectX 12 Ultimate Runtime Pack 2026',
    category: 'pc_software',
    isAdult: false,
    rating: 4.94,
    votes: 95400,
    badge: 'Essential for PC',
    fileSize: '94.2 MB',
    version: 'v12.4 Redist',
    compatibility: 'Windows 11 / 10 (64-bit)',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    description: 'Complete offline redistributable runtime libraries including DirectX 9/11/12, Visual C++ 2015-2026, and Vulkan RT for flawless PC gaming.',
    tags: ['DirectX 12', 'Visual C++', 'Fix Missing DLLs', 'Windows All'],
    downloadsCount: '4.8M+',
    developerOrHost: 'OmniVault Tools',
    directDownloadName: 'DirectX12_AllInOne_Redist.exe',
    requirements: {
      os: 'Windows 7/8/10/11 (32/64-bit)',
      ram: '1 GB RAM',
      graphics: 'Any'
    }
  }
];

export const MOCK_SOCIAL_BAR_NOTIFICATIONS: SocialBarNotification[] = [
  {
    id: 'sb-1',
    title: 'Windows 11 / 10 Update Detected',
    message: 'UltraCodec 4K Video Player update is ready to download (64-bit).',
    iconType: 'download',
    timeAgo: 'Just now',
    actionText: 'Download (48 MB)',
    isAdult: false
  },
  {
    id: 'sb-2',
    title: 'Private Message from Scarlett (21)',
    message: '"Hey, I just went live in the private cam lounge! Join free?"',
    iconType: 'adult',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    timeAgo: '2m ago',
    actionText: 'Open Private Room 18+',
    isAdult: true
  },
  {
    id: 'sb-3',
    title: 'Game Ready Driver: +35% FPS Boost',
    message: 'NovaBoost detected your GPU. Optimize desktop shaders now?',
    iconType: 'bell',
    timeAgo: '5m ago',
    actionText: 'Boost FPS Now',
    isAdult: false
  },
  {
    id: 'sb-4',
    title: '18+ Secret Webtoon Chapter 86',
    message: 'New uncensored chapter unlocked! Read in high resolution.',
    iconType: 'adult',
    timeAgo: '12m ago',
    actionText: 'Read Free',
    isAdult: true
  },
  {
    id: 'sb-5',
    title: '4K Desktop Stream Available',
    message: 'High bitrate 60FPS stream unlocked for your Windows IP.',
    iconType: 'video',
    timeAgo: '15m ago',
    actionText: 'Watch in 4K',
    isAdult: false
  }
];

export const DEMO_ADSTERRA_DEFAULT_DIRECT_LINK = "";
