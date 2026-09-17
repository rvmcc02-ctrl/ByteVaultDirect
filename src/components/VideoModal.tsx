import React, { useState, useEffect } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Download, 
  ShieldCheck, 
  Flame, 
  Monitor, 
  ExternalLink,
  Lock,
  Sparkles
} from 'lucide-react';
import { ContentItem } from '../types';
import { triggerAdsterraDirectLink } from '../utils/adsterraManager';

interface VideoModalProps {
  item: ContentItem | null;
  onClose: () => void;
  onInitiateDownload: (item: ContentItem) => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  item,
  onClose,
  onInitiateDownload
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(35);
  const [showPaywallPrompt, setShowPaywallPrompt] = useState(false);

  useEffect(() => {
    // Show high CTR unlock prompt after 4 seconds of preview
    const timer = setTimeout(() => {
      setShowPaywallPrompt(true);
    }, 4500);

    return () => clearTimeout(timer);
  }, [item]);

  useEffect(() => {
    let interval: any;
    if (isPlaying && !showPaywallPrompt) {
      interval = setInterval(() => {
        setProgress(prev => (prev >= 98 ? 15 : prev + 1));
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, showPaywallPrompt]);

  if (!item) return null;

  const isAdult = item.isAdult;

  const handleUnlockClick = () => {
    onInitiateDownload(item);
    triggerAdsterraDirectLink();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        id="desktop-video-player-modal"
        className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl"
      >
        {/* Windows Fluent Style Window Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-500/80 cursor-pointer" onClick={onClose} />
              <span className="h-3 w-3 rounded-full bg-amber-500/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
            </div>
            <span className="ml-2 text-xs font-mono text-slate-300 truncate max-w-md">
              OmniPlayer x64 — {item.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded bg-cyan-500/20 px-2 py-0.5 text-[10px] font-bold text-cyan-300 border border-cyan-500/30">
              4K ULTRA 60FPS
            </span>
            <button
              onClick={onClose}
              className="rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Video Stage Area */}
        <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center">
          <img
            src={item.image}
            alt={item.title}
            className={`h-full w-full object-cover transition-all duration-700 ${
              showPaywallPrompt ? 'filter blur-sm scale-105 opacity-60' : 'opacity-90'
            }`}
            referrerPolicy="no-referrer"
          />

          {/* High Conversion Unlock Overlay */}
          {showPaywallPrompt ? (
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-in zoom-in-95 duration-300">
              <div className={`mb-3 flex h-14 w-14 items-center justify-center rounded-2xl ${
                isAdult 
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30 shadow-lg shadow-rose-500/20' 
                  : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/20'
              }`}>
                {isAdult ? <Flame className="h-7 w-7" /> : <Lock className="h-7 w-7" />}
              </div>

              <h4 className="text-xl font-bold text-white font-['Space_Grotesk']">
                {isAdult ? '🔞 Unlock Full 4K Uncensored Stream' : '⚡ Complete Windows Download Ready'}
              </h4>

              <p className="mt-1.5 text-xs text-slate-300 max-w-md leading-relaxed">
                {isAdult
                  ? 'The free preview is paused. Download the full 64-bit client or launch direct private chat with no restrictions.'
                  : 'Your high-speed 10 Gbps Windows desktop download is prepared. Click below to initiate instant installation.'}
              </p>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                <button
                  id="modal-unlock-cta-btn"
                  onClick={handleUnlockClick}
                  className={`flex items-center gap-2 rounded-xl px-6 py-3 text-xs font-bold text-white shadow-xl transition-all hover:scale-105 ${
                    isAdult
                      ? 'bg-gradient-to-r from-rose-600 to-pink-600 shadow-rose-600/30'
                      : 'bg-gradient-to-r from-blue-600 to-cyan-600 shadow-blue-600/30'
                  }`}
                >
                  <Download className="h-4 w-4" />
                  <span>
                    {isAdult ? 'Unlock Instant Access (18+)' : `Download ${item.directDownloadName}`}
                  </span>
                </button>

                <button
                  onClick={() => setShowPaywallPrompt(false)}
                  className="rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-xs font-semibold text-slate-300 hover:bg-slate-700 transition-colors"
                >
                  Resume Preview
                </button>
              </div>

              <div className="mt-4 flex items-center gap-4 text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  Direct-X 12 / Win 11 & 10
                </span>
                <span className="flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                  Hardware Accel (AV1 / HEVC)
                </span>
              </div>
            </div>
          ) : (
            // Live video controls overlay
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur hover:bg-cyan-500 hover:text-slate-950 transition-colors shadow-2xl"
              >
                {isPlaying ? <Pause className="h-7 w-7" /> : <Play className="h-7 w-7 ml-1 fill-current" />}
              </button>
            </div>
          )}

          {/* Bottom Video Controls Bar */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-3 pt-6 flex flex-col gap-2">
            {/* Seek Bar */}
            <div className="relative w-full h-1.5 bg-slate-700/80 rounded-full overflow-hidden cursor-pointer">
              <div 
                className="h-full bg-cyan-400 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="hover:text-cyan-400 transition-colors"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />}
                </button>

                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className="hover:text-cyan-400 transition-colors"
                >
                  {isMuted ? <VolumeX className="h-4 w-4 text-rose-400" /> : <Volume2 className="h-4 w-4" />}
                </button>

                <span className="text-[11px] font-mono text-slate-400">
                  01:24 / 04:50 (4K Stream)
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleUnlockClick}
                  className="flex items-center gap-1 text-[11px] font-bold text-cyan-400 hover:underline"
                >
                  <Download className="h-3 w-3" />
                  <span>Download for Windows (64-bit)</span>
                </button>

                <button className="hover:text-cyan-400 transition-colors">
                  <Maximize2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Description */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h5 className="text-sm font-bold text-white">{item.title}</h5>
            <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{item.description}</p>
          </div>

          <button
            onClick={handleUnlockClick}
            className={`shrink-0 flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold text-white shadow ${
              isAdult
                ? 'bg-rose-600 hover:bg-rose-500 shadow-rose-600/30'
                : 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/30'
            }`}
          >
            <Download className="h-3.5 w-3.5" />
            <span>Direct Link (Adsterra)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
