import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { WindowsHero } from './components/WindowsHero';
import { CategoryFilter } from './components/CategoryFilter';
import { ContentCard } from './components/ContentCard';
import { AdsterraLeaderboard } from './components/AdsterraLeaderboard';
import { AdsterraRectangle } from './components/AdsterraRectangle';
import { AdsterraSocialBar } from './components/AdsterraSocialBar';
import { WindowsSystemWidget } from './components/WindowsSystemWidget';
import { VideoModal } from './components/VideoModal';
import { AgeGateModal } from './components/AgeGateModal';
import { WebmasterModal } from './components/WebmasterModal';
import { DownloadToast } from './components/DownloadToast';
import { Footer } from './components/Footer';

import { AudienceMode, ContentCategory, ContentItem } from './types';
import { CONTENT_ITEMS } from './data/mockContent';
import { tryTriggerPopunder } from './utils/adsterraManager';
import { Flame, Sparkles, Monitor, Download, ShieldCheck, Zap } from 'lucide-react';

export default function App() {
  const [audienceMode, setAudienceMode] = useState<AudienceMode>('mainstream');
  const [selectedCategory, setSelectedCategory] = useState<ContentCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'trending' | 'downloads' | 'rating'>('trending');

  // Modals & widgets
  const [activeVideoItem, setActiveVideoItem] = useState<ContentItem | null>(null);
  const [downloadingItem, setDownloadingItem] = useState<ContentItem | null>(null);
  const [isWebmasterModalOpen, setIsWebmasterModalOpen] = useState(false);
  const [isAgeGateOpen, setIsAgeGateOpen] = useState(false);
  const [hasAgreedAdult, setHasAgreedAdult] = useState(false);

  // Global popunder listener on first user interaction
  useEffect(() => {
    const handleGlobalClick = () => {
      tryTriggerPopunder();
    };

    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  // Keyboard shortcut listener (Ctrl+K for search, Ctrl+M for Webmaster modal, Esc to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('desktop-search-input');
        searchInput?.focus();
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'm') {
        e.preventDefault();
        setIsWebmasterModalOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setActiveVideoItem(null);
        setIsWebmasterModalOpen(false);
        setIsAgeGateOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle switching to 18+ mode
  const handleAudienceSelect = (mode: AudienceMode) => {
    if (mode === 'adult' && !hasAgreedAdult) {
      setIsAgeGateOpen(true);
      return;
    }
    setAudienceMode(mode);
    setSelectedCategory('all');
  };

  const handleConfirmAdult = () => {
    setHasAgreedAdult(true);
    setIsAgeGateOpen(false);
    setAudienceMode('adult');
    setSelectedCategory('all');
  };

  // Filter items based on audience mode, category, and search query
  const filteredItems = useMemo(() => {
    return CONTENT_ITEMS.filter(item => {
      // Audience filter
      if (audienceMode === 'adult' && !item.isAdult) return false;
      if (audienceMode === 'mainstream' && item.isAdult) return false;

      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesTags = item.tags.some(t => t.toLowerCase().includes(q));
        const matchesDev = item.developerOrHost.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesTags && !matchesDev) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'downloads') return b.votes - a.votes;
      return b.votes * b.rating - a.votes * a.rating;
    });
  }, [audienceMode, selectedCategory, searchQuery, sortBy]);

  // Featured spotlight item
  const featuredItem = useMemo(() => {
    if (audienceMode === 'adult') {
      return CONTENT_ITEMS.find(i => i.id === 'adult-1') || CONTENT_ITEMS[0];
    }
    return CONTENT_ITEMS.find(i => i.id === 'sw-1') || CONTENT_ITEMS[0];
  }, [audienceMode]);

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-slate-100 flex flex-col font-['Plus_Jakarta_Sans']">
      {/* Top Header */}
      <Header
        audienceMode={audienceMode}
        onSelectAudienceMode={handleAudienceSelect}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenWebmasterModal={() => setIsWebmasterModalOpen(true)}
        onOpenAgeGatePrompt={() => setIsAgeGateOpen(true)}
      />

      {/* Adsterra High-CTR Leaderboard 728x90 */}
      <AdsterraLeaderboard audienceMode={audienceMode} />

      {/* Hero Spotlight */}
      <main className="flex-1">
        <WindowsHero
          audienceMode={audienceMode}
          featuredItem={featuredItem}
          onOpenVideoModal={(item) => setActiveVideoItem(item)}
          onInitiateDownload={(item) => setDownloadingItem(item)}
        />

        {/* Windows System Environment Bar */}
        <WindowsSystemWidget />

        {/* Category Navigation & Sort Filter */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          audienceMode={audienceMode}
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalResultsCount={filteredItems.length}
        />

        {/* Main Content Grid with In-Feed Adsterra Rectangle Slot */}
        <div className="mx-auto w-full max-w-7xl px-4 py-4">
          {filteredItems.length === 0 ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-12 text-center my-8">
              <p className="text-slate-400 text-sm">
                No items match your search or filter criteria.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-3 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-500 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* First half of cards */}
              {filteredItems.slice(0, 3).map(item => (
                <ContentCard
                  key={item.id}
                  item={item}
                  onOpenVideoModal={(i) => setActiveVideoItem(i)}
                  onInitiateDownload={(i) => setDownloadingItem(i)}
                />
              ))}

              {/* High eCPM In-Feed 300x250 Adsterra Ad Unit */}
              <div className="flex items-center justify-center">
                <AdsterraRectangle
                  audienceMode={audienceMode}
                  slotPosition="In-Feed"
                />
              </div>

              {/* Remaining cards */}
              {filteredItems.slice(3).map(item => (
                <ContentCard
                  key={item.id}
                  item={item}
                  onOpenVideoModal={(i) => setActiveVideoItem(i)}
                  onInitiateDownload={(i) => setDownloadingItem(i)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Secondary Bottom Leaderboard */}
        <div className="my-8">
          <AdsterraLeaderboard audienceMode={audienceMode} />
        </div>
      </main>

      {/* Footer with 18+ and Windows desktop disclaimers */}
      <Footer onOpenWebmasterModal={() => setIsWebmasterModalOpen(true)} />

      {/* Floating Adsterra Social Bar In-Page Push Widget */}
      <AdsterraSocialBar audienceMode={audienceMode} />

      {/* Interactive Desktop Video Player Modal */}
      {activeVideoItem && (
        <VideoModal
          item={activeVideoItem}
          onClose={() => setActiveVideoItem(null)}
          onInitiateDownload={(item) => setDownloadingItem(item)}
        />
      )}

      {/* 18+ Age Compliance Verification Modal */}
      <AgeGateModal
        isOpen={isAgeGateOpen}
        onConfirmAdult={handleConfirmAdult}
        onCancel={() => {
          setIsAgeGateOpen(false);
          setAudienceMode('mainstream');
        }}
      />

      {/* Adsterra Webmaster Publisher Control Center */}
      <WebmasterModal
        isOpen={isWebmasterModalOpen}
        onClose={() => setIsWebmasterModalOpen(false)}
      />

      {/* Windows Desktop Download Progress Toast */}
      <DownloadToast
        item={downloadingItem}
        onClose={() => setDownloadingItem(null)}
      />
    </div>
  );
}
