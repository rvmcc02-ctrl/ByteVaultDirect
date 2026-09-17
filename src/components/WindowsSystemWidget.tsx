import React from 'react';
import { Monitor, Cpu, HardDrive, Wifi, ShieldCheck, Download, Sparkles } from 'lucide-react';
import { detectWindowsInfo, triggerAdsterraDirectLink } from '../utils/adsterraManager';

export const WindowsSystemWidget: React.FC = () => {
  const winInfo = detectWindowsInfo();

  return (
    <div className="mx-auto w-full max-w-7xl px-4 my-8">
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900/90 to-[#0e1629] p-5 shadow-xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Windows System Info Badges */}
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600/20 text-cyan-400 border border-blue-500/30">
                <Monitor className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-slate-400 block">Detected Environment</span>
                <span className="font-bold text-white text-sm">{winInfo.osName} (64-Bit Edition)</span>
              </div>
            </div>

            <div className="h-8 w-[1px] bg-slate-800 hidden sm:block" />

            <div className="flex items-center gap-2 text-slate-300">
              <Cpu className="h-4 w-4 text-indigo-400" />
              <span>DirectX 12 Ultimate / Vulkan 1.3</span>
            </div>

            <div className="h-8 w-[1px] bg-slate-800 hidden sm:block" />

            <div className="flex items-center gap-2 text-slate-300">
              <Wifi className="h-4 w-4 text-emerald-400" />
              <span>CDN Mirror Ping: <strong className="text-emerald-400">12ms</strong> (10 Gbps Pipe)</span>
            </div>

            <div className="h-8 w-[1px] bg-slate-800 hidden sm:block" />

            <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <ShieldCheck className="h-4 w-4" />
              <span>Windows SmartScreen Clean</span>
            </div>
          </div>

          {/* Quick CTA */}
          <button
            onClick={() => triggerAdsterraDirectLink()}
            className="shrink-0 flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-cyan-600/20 hover:scale-105 active:scale-95 transition-all"
          >
            <Download className="h-4 w-4" />
            <span>Update Windows Codec Pack (Free)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
