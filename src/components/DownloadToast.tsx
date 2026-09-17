import React, { useState, useEffect } from 'react';
import { Download, CheckCircle2, ShieldCheck, X, HardDrive } from 'lucide-react';
import { ContentItem } from '../types';

interface DownloadToastProps {
  item: ContentItem | null;
  onClose: () => void;
}

export const DownloadToast: React.FC<DownloadToastProps> = ({ item, onClose }) => {
  const [progress, setProgress] = useState(10);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!item) return;
    setProgress(15);
    setIsComplete(false);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          return 100;
        }
        return prev + Math.floor(Math.random() * 25) + 15;
      });
    }, 400);

    return () => clearInterval(interval);
  }, [item]);

  if (!item) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 w-80 animate-in slide-in-from-bottom-4 duration-300">
      <div className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/95 p-4 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-1.5 text-xs font-bold text-white">
            {isComplete ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            ) : (
              <Download className="h-4 w-4 text-cyan-400 animate-bounce" />
            )}
            <span>{isComplete ? 'Download Ready for Windows' : 'Downloading Installer (x64)...'}</span>
          </div>

          <button
            onClick={onClose}
            className="rounded p-1 text-slate-400 hover:text-white"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-slate-300">
            <span className="font-mono text-cyan-300 truncate max-w-[180px]">
              {item.directDownloadName}
            </span>
            <span className="font-semibold">{progress}%</span>
          </div>

          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${
                isComplete ? 'bg-emerald-400' : 'bg-gradient-to-r from-blue-500 to-cyan-400'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
            <span className="flex items-center gap-1">
              <HardDrive className="h-3 w-3 text-slate-400" />
              {item.fileSize || 'Direct Stream'} • 94.2 MB/s
            </span>
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="h-3 w-3" />
              SmartScreen Safe
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
