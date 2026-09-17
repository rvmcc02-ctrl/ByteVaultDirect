import React from 'react';
import { Download, Heart, ExternalLink, Zap, Info } from 'lucide-react';
import { AudienceMode } from '../types';
import { triggerAdsterraDirectLink, updateStats } from '../utils/adsterraManager';

interface AdsterraLeaderboardProps {
  audienceMode: AudienceMode;
  customScript?: string;
}

export const AdsterraLeaderboard: React.FC<AdsterraLeaderboardProps> = ({
  audienceMode,
  customScript
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    updateStats(prev => ({
      ...prev,
      bannerClicks: prev.bannerClicks + 1,
      simulatedEarnings: Number((prev.simulatedEarnings + 0.052).toFixed(3))
    }));
    triggerAdsterraDirectLink();
  };

  return (
    <div className="mx-auto my-4 w-full max-w-5xl px-4">
      <div className="relative overflow-hidden rounded-xl border border-dashed border-slate-700/80 bg-slate-900/90 shadow-md">
        {/* Top Tag */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/60 px-3 py-0.5 text-[10px] text-slate-400">
          <span className="flex items-center gap-1 font-mono">
            <Info className="h-3 w-3 text-cyan-400" />
            Adsterra High-CTR Leaderboard (728x90 Desktop Slot)
          </span>
          <span className="text-emerald-400 font-semibold">Tier-1 Desktop CPM Active</span>
        </div>

        {/* Banner Content Container (728x90 aspect ratio on desktop) */}
        <div 
          onClick={handleClick}
          className="group cursor-pointer flex flex-col sm:flex-row items-center justify-between p-3.5 sm:px-6 transition-colors hover:bg-slate-800/40"
        >
          {audienceMode === 'adult' ? (
            // Adult Mode 18+ High CTR Banner
            <div className="flex items-center gap-4 w-full justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-lg shadow-rose-500/20">
                  <Heart className="h-6 w-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-rose-500/20 px-1.5 py-0.5 text-[10px] font-bold text-rose-300 border border-rose-500/40">
                      18+ LIVE CAMS
                    </span>
                    <h4 className="text-sm font-bold text-white group-hover:text-rose-300 transition-colors">
                      Secret Cam Roulette: 2,490 Verified Singles Online Now
                    </h4>
                  </div>
                  <p className="text-xs text-slate-400">
                    No Credit Card Required • Instant 1-on-1 HD Video Chat • Windows Desktop Compatible
                  </p>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <button
                  type="button"
                  className="rounded-lg bg-gradient-to-r from-rose-600 to-pink-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-rose-600/30 group-hover:scale-105 transition-transform flex items-center gap-1.5"
                >
                  <span>Start Free Chat</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ) : (
            // Mainstream Mode High CTR Banner (Windows Software / Driver / Booster)
            <div className="flex items-center gap-4 w-full justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/20">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-500/40">
                      WINDOWS 11 / 10 COMPATIBLE
                    </span>
                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                      Fix Windows Slowdown & Free Up 25GB Storage in 60 Seconds
                    </h4>
                  </div>
                  <p className="text-xs text-slate-400">
                    Direct-X 12 Runtime & Shader Cache Optimizer • Official Certified Windows 64-bit Edition
                  </p>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <button
                  type="button"
                  className="rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-blue-600/30 group-hover:scale-105 transition-transform flex items-center gap-1.5"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Free Instant Scan</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
