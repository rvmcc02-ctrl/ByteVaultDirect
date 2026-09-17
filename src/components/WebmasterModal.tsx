import React, { useState } from 'react';
import { 
  X, 
  Settings, 
  DollarSign, 
  MousePointerClick, 
  Eye, 
  ExternalLink, 
  Copy, 
  Check, 
  RefreshCw, 
  ShieldCheck, 
  Save, 
  Code, 
  Sparkles,
  Zap
} from 'lucide-react';
import { AdsterraSettings, MonetizationStats } from '../types';
import { 
  getStoredSettings, 
  saveStoredSettings, 
  getStoredStats, 
  updateStats, 
  triggerAdsterraDirectLink 
} from '../utils/adsterraManager';

interface WebmasterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WebmasterModal: React.FC<WebmasterModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'config' | 'analytics' | 'snippets'>('config');
  const [settings, setSettings] = useState<AdsterraSettings>(getStoredSettings());
  const [stats, setStats] = useState<MonetizationStats>(getStoredStats());
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    saveStoredSettings(settings);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
    window.dispatchEvent(new CustomEvent('adsterra_stats_updated'));
  };

  const handleSimulateTraffic = () => {
    const updated = updateStats(prev => ({
      ...prev,
      impressions: prev.impressions + 1250,
      directLinkClicks: prev.directLinkClicks + 84,
      popundersFired: prev.popundersFired + 52,
      socialBarClicks: prev.socialBarClicks + 39,
      bannerClicks: prev.bannerClicks + 28,
      simulatedEarnings: Number((prev.simulatedEarnings + 7.42).toFixed(2))
    }));
    setStats(updated);
    window.dispatchEvent(new CustomEvent('adsterra_stats_updated'));
  };

  const handleResetStats = () => {
    const reset: MonetizationStats = {
      impressions: 0,
      popundersFired: 0,
      socialBarClicks: 0,
      directLinkClicks: 0,
      bannerClicks: 0,
      simulatedEarnings: 0
    };
    localStorage.setItem('adsterra_vault_stats_v1', JSON.stringify(reset));
    setStats(reset);
    window.dispatchEvent(new CustomEvent('adsterra_stats_updated'));
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Sample production Adsterra integration template code
  const adsterraIntegrationCode = `<!-- Adsterra Windows Desktop Monetization Setup -->
<!-- 1. Adsterra Popunder Script -->
<script type='text/javascript' src='//pl12345678.highcpmgate.com/xx/xx/xx/xxxxxxxxxxxx.js'></script>

<!-- 2. Adsterra Social Bar (In-Page Push) -->
<script type='text/javascript' src='//pl87654321.highcpmgate.com/yy/yy/yy/yyyyyyyyyyyy.js'></script>

<!-- 3. Adsterra Direct Link (Attached to Windows Download buttons) -->
<a href="${settings.directLinkUrl || 'https://beta.adsterra.com/'}" target="_blank" rel="noopener noreferrer">
  Download 64-bit EXE
</a>

<!-- 4. Adsterra 728x90 Leaderboard Banner Slot -->
<script type="text/javascript">
  atOptions = {
    'key' : 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    'format' : 'iframe',
    'height' : 90,
    'width' : 728,
    'params' : {}
  };
</script>
<script type="text/javascript" src="//www.topcreativeformat.com/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/invoke.js"></script>`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        id="adsterra-webmaster-console"
        className="w-full max-w-3xl overflow-hidden rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Settings className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-['Space_Grotesk'] flex items-center gap-2">
                <span>Adsterra Publisher & Ad Unit Control Center</span>
                <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/40">
                  Windows Desktop Optimized
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Configure your Adsterra Direct Links, Popunders, Social Bar, and view live earnings.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 px-6 gap-2">
          <button
            onClick={() => setActiveTab('config')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'config'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="h-3.5 w-3.5" />
            <span>Ad Units Setup</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'analytics'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <DollarSign className="h-3.5 w-3.5" />
            <span>Live CPM & Revenue Simulator</span>
          </button>

          <button
            onClick={() => setActiveTab('snippets')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'snippets'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code className="h-3.5 w-3.5" />
            <span>Export Adsterra Snippets</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1 text-xs">
          {activeTab === 'config' && (
            <div className="space-y-5">
              {/* Direct Link Input */}
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-bold text-white flex items-center gap-1.5">
                      <ExternalLink className="h-4 w-4 text-cyan-400" />
                      <span>Adsterra Direct Link (Smartlink)</span>
                    </label>
                    <p className="text-xs text-slate-400 mt-0.5">
                      This link is triggered on download buttons, stream unlocks, and high-CTR CTA cards.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => triggerAdsterraDirectLink(settings.directLinkUrl)}
                    className="rounded-lg bg-indigo-600/30 px-3 py-1.5 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-600/50 transition-colors font-medium flex items-center gap-1"
                  >
                    <span>Test Link</span>
                    <ExternalLink className="h-3 w-3" />
                  </button>
                </div>

                <input
                  type="url"
                  value={settings.directLinkUrl}
                  onChange={(e) => setSettings({ ...settings, directLinkUrl: e.target.value })}
                  placeholder="https://beta.adsterra.com/ or https://your-direct-link.com"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              {/* Popunder Config */}
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-bold text-white flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4 text-amber-400" />
                      <span>Adsterra Popunder (On-Click)</span>
                    </span>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Triggers on first click in background window. Highest desktop eCPM.
                    </p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={settings.popunderEnabled}
                      onChange={(e) => setSettings({ ...settings, popunderEnabled: e.target.checked })}
                      className="peer sr-only"
                    />
                    <div className="h-6 w-11 rounded-full bg-slate-800 peer-checked:bg-cyan-500 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-full" />
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">
                      Popunder Frequency Capping
                    </label>
                    <select
                      value={settings.popunderFrequencyMinutes}
                      onChange={(e) => setSettings({ ...settings, popunderFrequencyMinutes: Number(e.target.value) })}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                    >
                      <option value={0}>Every Click (Maximum Aggressive)</option>
                      <option value={5}>Once every 5 minutes</option>
                      <option value={15}>Once every 15 minutes (Recommended)</option>
                      <option value={60}>Once per hour (Conservative)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">
                      Target Ad Mode
                    </label>
                    <div className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-300 flex items-center justify-between">
                      <span>Desktop Mainstream + 18+ Adult</span>
                      <span className="text-emerald-400 font-mono text-[10px]">Dual-Flow</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Bar Config */}
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-bold text-white flex items-center gap-1.5">
                      <Zap className="h-4 w-4 text-cyan-400" />
                      <span>Adsterra Social Bar (In-Page Push)</span>
                    </span>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Interactive floating desktop notification cards (20x-30x CTR over standard push).
                    </p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={settings.socialBarEnabled}
                      onChange={(e) => setSettings({ ...settings, socialBarEnabled: e.target.checked })}
                      className="peer sr-only"
                    />
                    <div className="h-6 w-11 rounded-full bg-slate-800 peer-checked:bg-cyan-500 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-full" />
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              {/* Top Stats Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-[11px]">Impressions</span>
                    <Eye className="h-4 w-4 text-cyan-400" />
                  </div>
                  <span className="text-xl font-bold text-white mt-1 block">
                    {stats.impressions.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-emerald-400">Desktop Viewability 94%</span>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-[11px]">Direct Link Clicks</span>
                    <MousePointerClick className="h-4 w-4 text-indigo-400" />
                  </div>
                  <span className="text-xl font-bold text-white mt-1 block">
                    {stats.directLinkClicks.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-indigo-300">High CTR Windows CTAs</span>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-[11px]">Popunders Fired</span>
                    <Sparkles className="h-4 w-4 text-amber-400" />
                  </div>
                  <span className="text-xl font-bold text-white mt-1 block">
                    {stats.popundersFired.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-amber-300">On-Click Tab Triggers</span>
                </div>

                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-4">
                  <div className="flex items-center justify-between text-emerald-400">
                    <span className="text-[11px] font-bold">Simulated Revenue</span>
                    <DollarSign className="h-4 w-4" />
                  </div>
                  <span className="text-xl font-extrabold text-emerald-400 mt-1 block">
                    ${stats.simulatedEarnings.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-emerald-300 font-mono">~$4.20 avg desktop CPM</span>
                </div>
              </div>

              {/* Simulation controls */}
              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-white text-sm">Traffic & Monetization Simulator</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Simulate real-time Windows desktop organic + adult traffic clicks to test conversion pipelines.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSimulateTraffic}
                    className="flex items-center gap-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 shadow-lg shadow-cyan-600/30 transition-all hover:scale-105"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span>+1,250 Visitors</span>
                  </button>
                  <button
                    onClick={handleResetStats}
                    className="rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 px-3 transition-colors"
                    title="Reset stats to 0"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'snippets' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm">Production Adsterra Integration Code</h4>
                  <p className="text-xs text-slate-400">
                    Copy and paste into your custom domain HTML or WordPress footer/header.
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard(adsterraIntegrationCode, 'integration')}
                  className="flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white py-1.5 px-3 font-semibold transition-colors"
                >
                  {copiedKey === 'integration' ? <Check className="h-3.5 w-3.5 text-emerald-300" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedKey === 'integration' ? 'Copied!' : 'Copy Snippets'}</span>
                </button>
              </div>

              <div className="relative rounded-2xl border border-slate-800 bg-black p-4 font-mono text-[11px] text-cyan-300 overflow-x-auto max-h-72">
                <pre>{adsterraIntegrationCode}</pre>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-slate-800 bg-slate-950 px-6 py-3.5">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Adsterra Anti-Adblock Compatible</span>
          </div>

          <div className="flex items-center gap-3">
            {saveSuccess && (
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1 animate-in fade-in">
                <Check className="h-3.5 w-3.5" />
                Settings Saved!
              </span>
            )}
            <button
              id="save-adsterra-settings-btn"
              onClick={handleSave}
              className="flex items-center gap-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-5 shadow-lg shadow-cyan-600/30 transition-all hover:scale-105"
            >
              <Save className="h-4 w-4" />
              <span>Save & Apply Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
