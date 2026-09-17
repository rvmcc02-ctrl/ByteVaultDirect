import React from 'react';
import { Monitor, ShieldAlert, Heart, DollarSign, ExternalLink, Cpu } from 'lucide-react';
import { triggerAdsterraDirectLink } from '../utils/adsterraManager';

interface FooterProps {
  onOpenWebmasterModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenWebmasterModal }) => {
  return (
    <footer className="border-t border-slate-800/80 bg-[#080d1a] py-12 text-xs text-slate-400">
      <div className="mx-auto max-w-7xl px-4 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold">
                <Monitor className="h-4 w-4" />
              </div>
              <span className="text-base font-extrabold tracking-tight text-white font-['Space_Grotesk']">
                OmniVault<span className="text-cyan-400">PC</span> Windows Desktop
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              High-performance Windows desktop portal featuring verified PC utilities, 4K media codecs, direct-X modpacks, and adult 18+ interactive web entertainment. Built for high-volume Adsterra monetization on Windows desktop environments.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={onOpenWebmasterModal}
                className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold"
              >
                <span>⚙️ Adsterra Publisher Settings</span>
                <ExternalLink className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h5 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Mainstream PC Hub
            </h5>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => triggerAdsterraDirectLink()} className="hover:text-cyan-400">
                  4K UltraCodec Media Player x64
                </button>
              </li>
              <li>
                <button onClick={() => triggerAdsterraDirectLink()} className="hover:text-cyan-400">
                  DirectX 12 Runtime Packs
                </button>
              </li>
              <li>
                <button onClick={() => triggerAdsterraDirectLink()} className="hover:text-cyan-400">
                  NovaBoost PC FPS Optimizer
                </button>
              </li>
              <li>
                <button onClick={() => triggerAdsterraDirectLink()} className="hover:text-cyan-400">
                  ScreenMaster Desktop 60FPS
                </button>
              </li>
            </ul>
          </div>

          {/* 18+ Lounge Links */}
          <div>
            <h5 className="font-bold text-rose-400 text-xs uppercase tracking-wider mb-3 flex items-center gap-1">
              <span>Adult 18+ Lounge</span>
            </h5>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => triggerAdsterraDirectLink()} className="hover:text-rose-400">
                  18+ Cyber City Visual Novels
                </button>
              </li>
              <li>
                <button onClick={() => triggerAdsterraDirectLink()} className="hover:text-rose-400">
                  Uncensored Webtoon HD Reader
                </button>
              </li>
              <li>
                <button onClick={() => triggerAdsterraDirectLink()} className="hover:text-rose-400">
                  Velvet Live Cams & Private Chat
                </button>
              </li>
              <li>
                <button onClick={() => triggerAdsterraDirectLink()} className="hover:text-rose-400">
                  3D Dating Sims for Windows
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Compliance Disclaimers */}
        <div className="border-t border-slate-800/80 pt-6 space-y-3 text-[11px] text-slate-500 leading-relaxed">
          <p>
            <strong className="text-slate-400">18+ Compliance Statement:</strong> All models, webcam presenters, and depicted characters within the adult sections are 18 years of age or older pursuant to 18 U.S.C. 2257 record-keeping requirements. Access to adult areas is strictly prohibited for individuals under the legal age of majority in their jurisdiction.
          </p>
          <p>
            <strong className="text-slate-400">Windows Desktop Safety:</strong> All hosted utilities, executable packages, and launchers are pre-scanned against standard antivirus databases (SmartScreen / VirusTotal clean). Windows is a registered trademark of Microsoft Corporation in the United States and other countries.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 text-slate-400">
            <span>© {new Date().getFullYear()} OmniVault Windows Network. All Rights Reserved.</span>
            <span className="font-mono text-cyan-400">Adsterra Desktop Partner Tier-1</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
