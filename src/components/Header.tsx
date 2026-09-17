import React, { useState, useEffect } from 'react';
import { 
  Monitor, 
  ShieldAlert, 
  Flame, 
  Sparkles, 
  Search, 
  SlidersHorizontal, 
  DollarSign, 
  Layers, 
  Cpu
} from 'lucide-react';
import { AudienceMode } from '../types';
import { detectWindowsInfo, getStoredStats } from '../utils/adsterraManager';

interface HeaderProps {
  audienceMode: AudienceMode;
  onSelectAudienceMode: (mode: AudienceMode) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenWebmasterModal: () => void;
  onOpenAgeGatePrompt: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  audienceMode,
  onSelectAudienceMode,
  searchQuery,
  onSearchChange,
  onOpenWebmasterModal,
  onOpenAgeGatePrompt
}) => {
  const [stats, setStats] = useState(getStoredStats());
  const winInfo = detectWindowsInfo();

  useEffect(() => {
    const handleUpdate = () => {
      setStats(getStoredStats());
    };
    window.addEventListener('adsterra_stats_updated', handleUpdate);
    return () => window.removeEventListener('adsterra_stats_updated', handleUpdate);
  }, []);

  const handleModeClick = (mode: AudienceMode) => {
    if (mode === 'adult') {
      onOpenAgeGatePrompt();
    } else {
      onSelectAudienceMode(mode);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0c1222]/90 backdrop-blur-md">
      {/* Top Windows System & Monetization Bar */}
      <div className="border-b border-slate-800/50 bg-[#080d1a] px-4 py-1.5 text-xs text-slate-400">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 font-medium text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {winInfo.osName} ({winInfo.is64Bit ? 'x64' : 'x86'}) Verified
            </span>
            <span className="hidden sm:inline-block text-slate-600">|</span>
            <span className="hidden sm:flex items-center gap-1 text-slate-300">
              <Cpu className="h-3 w-3 text-cyan-400" />
              DirectX 12 / Vulkan Ready
            </span>
            <span className="hidden md:inline-block text-slate-600">|</span>
            <span className="hidden md:inline-block text-slate-400">
              High-Speed Desktop CDN (Fast Mirror US-East 10 Gbps)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-slate-300 bg-slate-900/90 px-2 py-0.5 rounded border border-slate-800">
              <DollarSign className="h-3 w-3 text-amber-400" />
              <span className="text-slate-400">Adsterra Revenue:</span>
              <span className="font-semibold text-emerald-400">${stats.simulatedEarnings.toFixed(2)}</span>
            </div>
            
            <button
              id="header-webmaster-btn"
              onClick={onOpenWebmasterModal}
              className="flex items-center gap-1.5 rounded bg-indigo-600/20 px-2 py-0.5 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-600/30 transition-colors font-medium text-[11px]"
              title="Configure Adsterra Popunders, Social Bar, Banners, and Direct Links"
            >
              <SlidersHorizontal className="h-3 w-3" />
              <span>Adsterra Config</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-blue-600 to-cyan-500 shadow-lg shadow-indigo-500/20 text-white font-bold">
            <Monitor className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-extrabold tracking-tight text-white font-['Space_Grotesk']">
                OmniVault<span className="text-cyan-400">PC</span>
              </span>
              <span className="rounded bg-indigo-500/20 px-1.5 py-0.5 text-[10px] font-bold text-indigo-300 border border-indigo-500/30 uppercase tracking-wider">
                Win Desktop
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Mainstream PC Utilities & 18+ Adult Desktop Entertainment
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-md hidden md:block">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            id="desktop-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search Windows software, 4K codecs, games, 18+ titles... (Ctrl+K)"
            className="w-full rounded-lg border border-slate-700/80 bg-slate-900/90 pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 border border-slate-700">
            Ctrl+K
          </kbd>
        </div>

        {/* Dual Mode Switcher: Mainstream vs Adult 18+ */}
        <div className="flex items-center gap-1.5 rounded-xl bg-slate-900/90 p-1 border border-slate-800">
          <button
            id="mode-mainstream-btn"
            onClick={() => handleModeClick('mainstream')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              audienceMode === 'mainstream'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
            <span>Mainstream PC</span>
          </button>

          <button
            id="mode-adult-btn"
            onClick={() => handleModeClick('adult')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              audienceMode === 'adult'
                ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md shadow-pink-600/30'
                : 'text-rose-300/80 hover:text-rose-200 hover:bg-rose-950/40'
            }`}
          >
            <Flame className="h-3.5 w-3.5 text-rose-400" />
            <span>18+ Adult Lounge</span>
            <span className="rounded bg-rose-500/30 px-1 py-0.2 text-[9px] font-bold text-rose-200">
              HOT
            </span>
          </button>

          <button
            id="mode-all-btn"
            onClick={() => handleModeClick('all')}
            className={`hidden sm:flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all ${
              audienceMode === 'all'
                ? 'bg-slate-700 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>All</span>
          </button>
        </div>
      </div>
    </header>
  );
};
