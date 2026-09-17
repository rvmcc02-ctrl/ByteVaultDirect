import React from 'react';
import { 
  Layers, 
  Cpu, 
  Gamepad2, 
  Film, 
  Flame, 
  BookOpen, 
  Video, 
  Sparkles,
  ArrowUpDown
} from 'lucide-react';
import { ContentCategory, AudienceMode } from '../types';

interface CategoryFilterProps {
  selectedCategory: ContentCategory;
  onSelectCategory: (cat: ContentCategory) => void;
  audienceMode: AudienceMode;
  sortBy: 'trending' | 'downloads' | 'rating';
  onSortChange: (sort: 'trending' | 'downloads' | 'rating') => void;
  totalResultsCount: number;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  audienceMode,
  sortBy,
  onSortChange,
  totalResultsCount
}) => {
  const categories: { id: ContentCategory; label: string; icon: React.ReactNode; isAdultOnly?: boolean; isMainstreamOnly?: boolean }[] = [
    { id: 'all', label: 'All Catalog', icon: <Layers className="h-3.5 w-3.5" /> },
    { id: 'pc_software', label: 'Windows Software & Utilities', icon: <Cpu className="h-3.5 w-3.5" />, isMainstreamOnly: true },
    { id: 'media_players', label: '4K Players & Codecs', icon: <Film className="h-3.5 w-3.5" />, isMainstreamOnly: true },
    { id: 'pc_games', label: 'PC Games & Modpacks', icon: <Gamepad2 className="h-3.5 w-3.5" />, isMainstreamOnly: true },
    { id: 'adult_games', label: '18+ Adult Games & 3D Sims', icon: <Flame className="h-3.5 w-3.5 text-rose-400" />, isAdultOnly: true },
    { id: 'adult_webtoons', label: '18+ Uncensored Webtoons', icon: <BookOpen className="h-3.5 w-3.5 text-rose-400" />, isAdultOnly: true },
    { id: 'live_cams', label: '18+ Sensual Live Cams', icon: <Video className="h-3.5 w-3.5 text-rose-400" />, isAdultOnly: true },
  ];

  const visibleCategories = categories.filter(c => {
    if (audienceMode === 'adult') {
      return !c.isMainstreamOnly;
    }
    if (audienceMode === 'mainstream') {
      return !c.isAdultOnly;
    }
    return true;
  });

  return (
    <div className="mx-auto w-full max-w-7xl px-4 my-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {visibleCategories.map(cat => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                  isSelected
                    ? cat.isAdultOnly
                      ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                      : 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Sort Controls & Count */}
        <div className="flex items-center gap-3 text-xs text-slate-400 self-end md:self-auto">
          <span className="font-mono text-cyan-400 font-semibold">
            {totalResultsCount} Verified Results
          </span>

          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5">
            <ArrowUpDown className="h-3.5 w-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as any)}
              className="bg-transparent text-white text-xs font-medium focus:outline-none cursor-pointer"
            >
              <option value="trending" className="bg-slate-900 text-white">Trending / Editor Choice</option>
              <option value="downloads" className="bg-slate-900 text-white">Most Downloaded</option>
              <option value="rating" className="bg-slate-900 text-white">Highest User Rating</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
