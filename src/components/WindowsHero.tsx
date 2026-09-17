import React from 'react';
import { 
  Download, 
  Play, 
  ShieldCheck, 
  CheckCircle2, 
  HardDrive, 
  Monitor, 
  Sparkles, 
  Flame, 
  Star, 
  Users,
  Cpu
} from 'lucide-react';
import { AudienceMode, ContentItem } from '../types';
import { triggerAdsterraDirectLink } from '../utils/adsterraManager';

interface WindowsHeroProps {
  audienceMode: AudienceMode;
  onOpenVideoModal: (item: ContentItem) => void;
  featuredItem: ContentItem;
  onInitiateDownload: (item: ContentItem) => void;
}

export const WindowsHero: React.FC<WindowsHeroProps> = ({
  audienceMode,
  onOpenVideoModal,
  featuredItem,
  onInitiateDownload
}) => {
  const isAdult = featuredItem.isAdult;

  const handleDirectDownload = () => {
    onInitiateDownload(featuredItem);
    triggerAdsterraDirectLink();
  };

  return (
    <div className="relative mx-auto w-full max-w-7xl px-4 py-6">
      <div className="relative overflow-hidden rounded-3xl border border-slate-800/90 bg-gradient-to-b from-[#0e1629] via-[#0c1222] to-[#080d1a] p-6 lg:p-10 shadow-2xl">
        {/* Glow ambient background */}
        <div className={`absolute -top-24 -right-24 h-96 w-96 rounded-full blur-3xl opacity-20 pointer-events-none ${
          isAdult ? 'bg-pink-600' : 'bg-cyan-500'
        }`} />
        <div className={`absolute -bottom-24 -left-24 h-96 w-96 rounded-full blur-3xl opacity-15 pointer-events-none ${
          isAdult ? 'bg-rose-600' : 'bg-blue-600'
        }`} />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Metadata & High-CTR CTAs */}
          <div className="lg:col-span-7 space-y-5">
            {/* Top Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                isAdult
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              }`}>
                {isAdult ? <Flame className="h-3.5 w-3.5 text-rose-400" /> : <Sparkles className="h-3.5 w-3.5 text-cyan-400" />}
                {featuredItem.badge || (isAdult ? '18+ Featured Spotlight' : 'Windows Editor Choice')}
              </span>

              <span className="inline-flex items-center gap-1 rounded-full bg-slate-800/80 px-2.5 py-1 text-xs text-slate-300 border border-slate-700">
                <Monitor className="h-3.5 w-3.5 text-blue-400" />
                {featuredItem.compatibility}
              </span>

              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/30">
                <ShieldCheck className="h-3.5 w-3.5" />
                SmartScreen Clean (0/72)
              </span>
            </div>

            {/* Title & Description */}
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-['Space_Grotesk']">
                {featuredItem.title}
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                {featuredItem.description}
              </p>
            </div>

            {/* System Requirements / Features Pill Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-2.5">
                <span className="text-[11px] text-slate-400 block">File Size & Speed</span>
                <span className="text-xs font-bold text-white flex items-center gap-1 mt-0.5">
                  <HardDrive className="h-3.5 w-3.5 text-cyan-400" />
                  {featuredItem.fileSize || 'Direct Stream'} • 98 MB/s
                </span>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-2.5">
                <span className="text-[11px] text-slate-400 block">Rating & Community</span>
                <span className="text-xs font-bold text-amber-300 flex items-center gap-1 mt-0.5">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  {featuredItem.rating} / 5.0 ({featuredItem.votes.toLocaleString()} votes)
                </span>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-2.5 col-span-2 sm:col-span-1">
                <span className="text-[11px] text-slate-400 block">Windows Support</span>
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 mt-0.5">
                  <Cpu className="h-3.5 w-3.5" />
                  DirectX 12 / 64-bit
                </span>
              </div>
            </div>

            {/* High CTR Call-to-Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                id="hero-direct-download-btn"
                onClick={handleDirectDownload}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white shadow-xl transition-all hover:scale-102 active:scale-98 ${
                  isAdult
                    ? 'bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 shadow-rose-600/30 hover:from-rose-500 hover:to-pink-500'
                    : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 shadow-blue-600/30 hover:from-blue-500 hover:to-cyan-500'
                }`}
              >
                <Download className="h-4 w-4" />
                <span>
                  {isAdult ? 'Download & Play 18+ (Win64)' : 'Download Free for Windows'}
                </span>
              </button>

              <button
                id="hero-preview-btn"
                onClick={() => onOpenVideoModal(featuredItem)}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-5 py-3.5 text-sm font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
              >
                <Play className="h-4 w-4 text-cyan-400 fill-cyan-400" />
                <span>Watch 4K Preview</span>
              </button>
            </div>

            {/* Micro-assurances */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                No registration required
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                SHA-256 Integrity Verified
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5 text-indigo-400" />
                {featuredItem.downloadsCount} Active Users
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl group">
              <img
                src={featuredItem.image}
                alt={featuredItem.title}
                className="h-72 w-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              {/* Overlay with play trigger */}
              <div 
                onClick={() => onOpenVideoModal(featuredItem)}
                className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-center justify-center cursor-pointer opacity-90 group-hover:opacity-100 transition-opacity"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/90 text-slate-950 shadow-2xl shadow-cyan-500/50 backdrop-blur group-hover:scale-110 transition-transform">
                  <Play className="h-7 w-7 fill-slate-950 ml-1" />
                </div>
              </div>

              {/* Bottom tag inside card */}
              <div className="absolute bottom-0 inset-x-0 p-4 bg-slate-950/80 backdrop-blur border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono text-cyan-400 block">
                    {featuredItem.directDownloadName}
                  </span>
                  <span className="text-xs text-slate-300 font-semibold">
                    {featuredItem.developerOrHost}
                  </span>
                </div>
                <button
                  onClick={handleDirectDownload}
                  className="rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white p-2 transition-colors shadow"
                  title="Direct Download"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
