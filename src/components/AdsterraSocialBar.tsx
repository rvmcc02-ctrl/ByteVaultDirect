import React, { useState, useEffect } from 'react';
import { 
  X, 
  Download, 
  MessageCircle, 
  Video, 
  Bell, 
  Heart, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { SocialBarNotification, AudienceMode } from '../types';
import { MOCK_SOCIAL_BAR_NOTIFICATIONS } from '../data/mockContent';
import { triggerAdsterraDirectLink, updateStats, getStoredSettings } from '../utils/adsterraManager';

interface AdsterraSocialBarProps {
  audienceMode: AudienceMode;
}

export const AdsterraSocialBar: React.FC<AdsterraSocialBarProps> = ({ audienceMode }) => {
  const [activeNotification, setActiveNotification] = useState<SocialBarNotification | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);

  // Filter notifications by mode
  const filteredNotifications = MOCK_SOCIAL_BAR_NOTIFICATIONS.filter(n => {
    if (audienceMode === 'adult') return n.isAdult;
    if (audienceMode === 'mainstream') return !n.isAdult;
    return true;
  });

  useEffect(() => {
    const settings = getStoredSettings();
    if (!settings.socialBarEnabled) {
      setIsVisible(false);
      return;
    }

    // Pick first non-dismissed
    const available = filteredNotifications.filter(n => !dismissedIds.includes(n.id));
    if (available.length === 0) {
      // Reset if all dismissed
      setDismissedIds([]);
      return;
    }

    const timer = setTimeout(() => {
      setActiveNotification(available[0]);
      setIsVisible(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, [audienceMode, dismissedIds]);

  // Periodic rotation
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      const available = filteredNotifications.filter(n => n.id !== activeNotification?.id);
      if (available.length > 0) {
        const next = available[Math.floor(Math.random() * available.length)];
        setActiveNotification(next);
      }
    }, 24000);

    return () => clearInterval(interval);
  }, [isVisible, activeNotification, filteredNotifications]);

  if (!isVisible || !activeNotification) return null;

  const handleClick = () => {
    updateStats(prev => ({
      ...prev,
      socialBarClicks: prev.socialBarClicks + 1,
      simulatedEarnings: Number((prev.simulatedEarnings + 0.055).toFixed(3))
    }));
    triggerAdsterraDirectLink();
    setIsVisible(false);
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDismissedIds(prev => [...prev, activeNotification.id]);
    setIsVisible(false);
  };

  return (
    <div 
      id="adsterra-social-bar-widget"
      className="fixed bottom-4 right-4 z-50 max-w-sm w-[92vw] sm:w-[380px] animate-in slide-in-from-bottom-5 duration-300"
    >
      <div 
        onClick={handleClick}
        className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/95 p-3.5 shadow-2xl backdrop-blur-xl transition-all hover:border-cyan-500/60 hover:shadow-cyan-500/10"
      >
        {/* Top Header Label */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 text-[10px] text-slate-400">
          <div className="flex items-center gap-1.5 font-mono">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-semibold text-slate-300">
              {activeNotification.isAdult ? '🔞 18+ Private Room Invite' : '⚡ Windows Notification'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span>{activeNotification.timeAgo}</span>
            <button
              onClick={handleDismiss}
              className="rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
              title="Close notification"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="mt-2.5 flex items-start gap-3">
          {/* Avatar or Icon */}
          <div className="relative shrink-0">
            {activeNotification.avatarUrl ? (
              <img
                src={activeNotification.avatarUrl}
                alt="Avatar"
                className="h-11 w-11 rounded-full object-cover ring-2 ring-rose-500"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                activeNotification.iconType === 'download' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                activeNotification.iconType === 'adult' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
              }`}>
                {activeNotification.iconType === 'download' && <Download className="h-5 w-5" />}
                {activeNotification.iconType === 'chat' && <MessageCircle className="h-5 w-5" />}
                {activeNotification.iconType === 'video' && <Video className="h-5 w-5" />}
                {activeNotification.iconType === 'bell' && <Bell className="h-5 w-5" />}
                {activeNotification.iconType === 'adult' && <Heart className="h-5 w-5" />}
              </div>
            )}
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-slate-900"></span>
          </div>

          <div className="flex-1 min-w-0">
            <h5 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
              {activeNotification.title}
            </h5>
            <p className="text-[11px] text-slate-300 mt-0.5 line-clamp-2">
              {activeNotification.message}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-800/80">
          <span className="text-[10px] text-slate-500 font-mono">Adsterra Social Bar™</span>
          <div className="flex items-center gap-1 text-xs font-bold text-cyan-400 group-hover:text-cyan-300">
            <span>{activeNotification.actionText}</span>
            <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};
