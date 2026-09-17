import React from 'react';
import { 
  Download, 
  Play, 
  Star, 
  HardDrive, 
  Monitor, 
  Flame, 
  Sparkles, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react';
import { ContentItem } from '../types';
import { triggerAdsterraDirectLink } from '../utils/adsterraManager';

interface ContentCardProps {
  item: ContentItem;
  onOpenVideoModal: (item: ContentItem) => void;
  onInitiateDownload: (item: ContentItem) => void;
}

export const ContentCard: React.FC<ContentCardProps> = ({
  item,
  onOpenVideoModal,
  onInitiateDownload
}) => {
  const isAdult = item.isAdult;

  const handleDownloadClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onInitiateDownload(item);
    triggerAdsterraDirectLink();
  };

  const handleCardClick = () => {
    onOpenVideoModal(item);
  };

  return (
    <div 
      id={`content-card-${item.id}`}
      onClick={handleCardClick}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 transition-all duration-300 hover:-translate-y-1 hover:border-slate-700 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col justify-between"
    >
      {/* Top Media Image */}
      <div>
        <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40" />

          {/* Top Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
            {isAdult ? (
              <span className="rounded bg-rose-600/90 backdrop-blur px-2 py-0.5 text-[10px] font-bold text-white shadow flex items-center gap-1">
                <Flame className="h-3 w-3 text-rose-200" />
                18+ ADULTS ONLY
              </span>
            ) : (
              <span className="rounded bg-blue-600/90 backdrop-blur px-2 py-0.5 text-[10px] font-bold text-white shadow flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-cyan-200" />
                WINDOWS x64
              </span>
            )}
            
            {item.badge && (
              <span className="rounded bg-slate-900/80 backdrop-blur px-2 py-0.5 text-[10px] font-medium text-slate-200 border border-slate-700">
                {item.badge}
              </span>
            )}
          </div>

          {/* Quick Play Trigger Icon */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/90 text-slate-950 shadow-xl backdrop-blur transform group-hover:scale-110 transition-transform">
              <Play className="h-5 w-5 fill-slate-950 ml-0.5" />
            </div>
          </div>

          {/* Bottom stats within media */}
          <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-slate-300">
            <span className="flex items-center gap-1 bg-black/60 backdrop-blur px-2 py-0.5 rounded font-medium">
              <HardDrive className="h-3 w-3 text-cyan-400" />
              {item.fileSize || 'Instant 4K'}
            </span>
            <span className="flex items-center gap-1 bg-black/60 backdrop-blur px-2 py-0.5 rounded font-semibold text-amber-300">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              {item.rating}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 space-y-2.5">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="truncate max-w-[170px] text-[11px] font-mono text-cyan-400">
              {item.developerOrHost}
            </span>
            <span className="text-[11px]">{item.version || 'Latest'}</span>
          </div>

          <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
            {item.title}
          </h3>

          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {item.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 pt-1">
            {item.tags.slice(0, 3).map((tag, idx) => (
              <span 
                key={idx}
                className="rounded bg-slate-800/80 px-2 py-0.5 text-[10px] text-slate-300 border border-slate-700/60"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="p-4 pt-0">
        <div className="border-t border-slate-800/80 pt-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span className="truncate">{item.compatibility.split('(')[0].trim()}</span>
          </div>

          <button
            type="button"
            onClick={handleDownloadClick}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold text-white shadow transition-all hover:scale-105 active:scale-95 ${
              isAdult
                ? 'bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 shadow-rose-600/30'
                : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 shadow-blue-600/30'
            }`}
          >
            <Download className="h-3.5 w-3.5" />
            <span>{isAdult ? 'Play / Stream 18+' : 'Download .EXE'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
