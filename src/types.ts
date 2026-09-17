export type AudienceMode = 'all' | 'mainstream' | 'adult';

export type ContentCategory = 
  | 'all'
  | 'pc_software'
  | 'pc_games'
  | 'adult_games'
  | 'adult_webtoons'
  | 'live_cams'
  | 'media_players';

export interface ContentItem {
  id: string;
  title: string;
  category: ContentCategory;
  isAdult: boolean;
  rating: number;
  votes: number;
  badge?: string;
  fileSize?: string;
  version?: string;
  compatibility: string; // e.g. "Windows 11 / 10 (64-bit)"
  image: string;
  previewVideo?: string;
  description: string;
  tags: string[];
  downloadsCount: string;
  developerOrHost: string;
  directDownloadName: string;
  requirements?: {
    os: string;
    ram: string;
    graphics: string;
  };
}

export interface AdsterraSettings {
  directLinkUrl: string;
  popunderEnabled: boolean;
  popunderScript: string;
  popunderFrequencyMinutes: number; // 0 = every click, 15 = every 15 min, etc.
  socialBarEnabled: boolean;
  socialBarScript: string;
  banner728x90Script: string;
  banner300x250Script: string;
  nativeBannerScript: string;
  simulationMode: boolean; // if true, simulates clicks & impressions with realistic mock ads
  antiAdblockWarning: boolean;
}

export interface MonetizationStats {
  impressions: number;
  popundersFired: number;
  socialBarClicks: number;
  directLinkClicks: number;
  bannerClicks: number;
  simulatedEarnings: number; // in USD
}

export interface SocialBarNotification {
  id: string;
  title: string;
  message: string;
  iconType: 'download' | 'chat' | 'video' | 'bell' | 'adult';
  avatarUrl?: string;
  timeAgo: string;
  actionText: string;
  isAdult: boolean;
}
