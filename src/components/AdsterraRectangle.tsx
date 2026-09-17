import React from 'react';
import { ExternalLink, ShieldCheck, Download, Sparkles, Flame, Eye } from 'lucide-react';
import { AudienceMode } from '../types';
import { triggerAdsterraDirectLink, updateStats } from '../utils/adsterraManager';

interface AdsterraRectangleProps {
  audienceMode: AudienceMode;
  slotPosition?: string;
}

export const AdsterraRectangle: React.FC<AdsterraRectangleProps> = ({
  audienceMode,
  slotPosition = 'Sidebar'
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    updateStats(prev => ({
      ...prev,
      bannerClicks: prev.bannerClicks + 1,
      simulatedEarnings: Number((prev.simulatedEarnings + 0.048).toFixed(3))
    }));
    triggerAdsterraDirectLink();
  };

  return (
    <div className="w-full max-w-[320px] mx-auto rounded-xl border border-slate-800 bg-slate-900/90 overflow-hidden shadow-xl">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-950/80 px-3 py-1 text-[10px] text-slate-400">
        <span className="font-mono text-cyan-400">Adsterra 300x250 {slotPosition}</span>
        <span className="text-slate-500">Sponsored Ad</span>
      </div>

      {/* 300x250 Content */}
      <div 
        onClick={handleClick}
        className="group cursor-pointer p-4 text-center flex flex-col items-center justify-between min-h-[250px] transition-colors hover:bg-slate-800/40"
      >
        {audienceMode === 'adult' ? (
          <>
            <div className="relative w-full h-28 rounded-lg overflow-hidden mb-3">
              <img 
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80" 
                alt="18+ Adult Dating & Games"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-2 left-2 rounded bg-rose-600/90 px-1.5 py-0.5 text-[10px] font-bold text-white shadow">
                18+ ADULTS ONLY
              </span>
              <span className="absolute bottom-2 right-2 rounded bg-black/80 backdrop-blur px-1.5 py-0.5 text-[10px] font-medium text-rose-300 flex items-center gap-1">
                <Flame className="h-3 w-3 text-rose-400" />
                Uncensored RPG
              </span>
            </div>

            <div>
              <h5 className="font-bold text-sm text-white group-hover:text-rose-300 transition-colors">
                Play Without Downloading!
              </h5>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                Join over 45,000 players online right now. Full 3D interactive graphics for Windows PC.
              </p>
            </div>

            <button
              type="button"
              className="mt-3 w-full rounded-lg bg-gradient-to-r from-rose-600 to-pink-600 py-2 px-3 text-xs font-bold text-white shadow-lg shadow-rose-600/30 group-hover:scale-102 transition-transform flex items-center justify-center gap-1.5"
            >
              <span>Play Now Free (18+)</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </button>
          </>
        ) : (
          <>
            <div className="relative w-full h-28 rounded-lg overflow-hidden mb-3 bg-gradient-to-br from-indigo-900/60 to-cyan-900/40 border border-slate-700/60 flex items-center justify-center">
              <div className="text-center p-2">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/30 text-cyan-400 border border-cyan-500/40 mb-1">
                  <Sparkles className="h-5 w-5" />
                </div>
                <span className="text-[11px] font-bold text-cyan-300">
                  DirectX 12 Video Engine x64
                </span>
              </div>
              <span className="absolute top-2 left-2 rounded bg-emerald-600/90 px-1.5 py-0.5 text-[9px] font-bold text-white">
                VERIFIED 64-BIT
              </span>
            </div>

            <div>
              <h5 className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                Ultra 4K AV1 Codec Player
              </h5>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                Play any video format without lag on Windows 11 & 10. Zero bloatware, 100% clean install.
              </p>
            </div>

            <button
              type="button"
              className="mt-3 w-full rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 py-2 px-3 text-xs font-bold text-white shadow-lg shadow-blue-600/30 group-hover:scale-102 transition-transform flex items-center justify-center gap-1.5"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Direct Download (.EXE)</span>
            </button>
          </>
        )}

        <div className="mt-2 flex items-center gap-1 text-[10px] text-slate-500">
          <ShieldCheck className="h-3 w-3 text-emerald-400" />
          <span>Windows Defender & SmartScreen Safe</span>
        </div>
      </div>
    </div>
  );
};
