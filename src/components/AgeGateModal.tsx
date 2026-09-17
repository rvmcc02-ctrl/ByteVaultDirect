import React from 'react';
import { ShieldAlert, Check, X, Flame, Lock } from 'lucide-react';
import { triggerAdsterraDirectLink } from '../utils/adsterraManager';

interface AgeGateModalProps {
  isOpen: boolean;
  onConfirmAdult: () => void;
  onCancel: () => void;
}

export const AgeGateModal: React.FC<AgeGateModalProps> = ({
  isOpen,
  onConfirmAdult,
  onCancel
}) => {
  if (!isOpen) return null;

  const handleAgree = () => {
    onConfirmAdult();
    // In Adsterra affiliate flows, confirming age-gate also triggers a background direct link / popunder opportunity
    triggerAdsterraDirectLink();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        id="age-verification-modal"
        className="w-full max-w-md overflow-hidden rounded-3xl border border-rose-500/40 bg-slate-950 p-6 shadow-2xl text-center relative"
      >
        {/* Glow */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600" />

        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 shadow-lg shadow-rose-500/20">
          <Flame className="h-8 w-8" />
        </div>

        <span className="rounded-full bg-rose-500/20 px-3 py-1 text-xs font-bold text-rose-300 border border-rose-500/40 uppercase tracking-wider">
          Age Restricted Content (18+)
        </span>

        <h3 className="mt-3 text-xl font-bold text-white font-['Space_Grotesk']">
          Are you 18 years of age or older?
        </h3>

        <p className="mt-2 text-xs text-slate-300 leading-relaxed">
          The following section contains adult 18+ games, visual novels, uncensored webtoons, and live sensual cam streams intended strictly for consenting adults.
        </p>

        <div className="mt-6 flex flex-col gap-2.5">
          <button
            id="age-gate-confirm-btn"
            onClick={handleAgree}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 py-3 px-4 text-xs font-bold text-white shadow-xl shadow-rose-600/30 hover:from-rose-500 hover:to-pink-500 transition-all hover:scale-102"
          >
            <Check className="h-4 w-4" />
            <span>I am 18 or Older — Enter Lounge</span>
          </button>

          <button
            id="age-gate-cancel-btn"
            onClick={onCancel}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900 py-2.5 px-4 text-xs font-semibold text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
            <span>Under 18 — Return to Mainstream PC</span>
          </button>
        </div>

        <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
          <Lock className="h-3 w-3" />
          <span>Windows Desktop Compliant • Privacy Protected</span>
        </div>
      </div>
    </div>
  );
};
