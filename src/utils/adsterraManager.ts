import { AdsterraSettings, MonetizationStats } from '../types';
import { DEMO_ADSTERRA_DEFAULT_DIRECT_LINK } from '../data/mockContent';

const SETTINGS_KEY = 'adsterra_vault_settings_v1';
const STATS_KEY = 'adsterra_vault_stats_v1';
const LAST_POPUNDER_KEY = 'adsterra_last_popunder_time';

export const DEFAULT_ADSTERRA_SETTINGS: AdsterraSettings = {
  directLinkUrl: DEMO_ADSTERRA_DEFAULT_DIRECT_LINK,
  popunderEnabled: true,
  popunderScript: '',
  popunderFrequencyMinutes: 15,
  socialBarEnabled: true,
  socialBarScript: '',
  banner728x90Script: '',
  banner300x250Script: '',
  nativeBannerScript: '',
  simulationMode: true,
  antiAdblockWarning: true,
};

export const DEFAULT_STATS: MonetizationStats = {
  impressions: 1420,
  popundersFired: 89,
  socialBarClicks: 47,
  directLinkClicks: 168,
  bannerClicks: 32,
  simulatedEarnings: 12.84,
};

export function getStoredSettings(): AdsterraSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_ADSTERRA_SETTINGS;
    return { ...DEFAULT_ADSTERRA_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_ADSTERRA_SETTINGS;
  }
}

export function saveStoredSettings(settings: AdsterraSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (err) {
    console.warn('Failed to save Adsterra settings:', err);
  }
}

export function getStoredStats(): MonetizationStats {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (!raw) return DEFAULT_STATS;
    return { ...DEFAULT_STATS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_STATS;
  }
}

export function updateStats(updater: (prev: MonetizationStats) => MonetizationStats): MonetizationStats {
  try {
    const prev = getStoredStats();
    const updated = updater(prev);
    localStorage.setItem(STATS_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return DEFAULT_STATS;
  }
}

/**
 * Triggers the Adsterra direct link in a new tab or background window,
 * and updates real-time analytics.
 */
export function triggerAdsterraDirectLink(customUrl?: string): void {
  const settings = getStoredSettings();
  const targetUrl = customUrl || settings.directLinkUrl || DEMO_ADSTERRA_DEFAULT_DIRECT_LINK;

  // Track click & estimate revenue increment (~$0.045 per Windows desktop direct click)
  updateStats(prev => ({
    ...prev,
    directLinkClicks: prev.directLinkClicks + 1,
    impressions: prev.impressions + 1,
    simulatedEarnings: Number((prev.simulatedEarnings + 0.045).toFixed(3))
  }));

  // Dispatch custom event for UI updates
  window.dispatchEvent(new CustomEvent('adsterra_stats_updated'));

  // Open direct link
  try {
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  } catch (e) {
    console.warn('Pop-up blocked or error opening direct link', e);
  }
}

/**
 * Triggers Popunder if enabled and respects frequency capping
 */
export function tryTriggerPopunder(): boolean {
  const settings = getStoredSettings();
  if (!settings.popunderEnabled) return false;

  const now = Date.now();
  const lastTime = Number(localStorage.getItem(LAST_POPUNDER_KEY) || '0');
  const cooldownMs = (settings.popunderFrequencyMinutes || 0) * 60 * 1000;

  if (cooldownMs > 0 && now - lastTime < cooldownMs) {
    return false; // Still within frequency cooldown
  }

  // Record timestamp
  localStorage.setItem(LAST_POPUNDER_KEY, String(now));

  // If live script is provided and injected, let script handle it.
  // Otherwise open direct link in new tab or popup window
  const targetUrl = settings.directLinkUrl || DEMO_ADSTERRA_DEFAULT_DIRECT_LINK;

  updateStats(prev => ({
    ...prev,
    popundersFired: prev.popundersFired + 1,
    impressions: prev.impressions + 2,
    simulatedEarnings: Number((prev.simulatedEarnings + 0.038).toFixed(3))
  }));
  window.dispatchEvent(new CustomEvent('adsterra_stats_updated'));

  try {
    const pop = window.open(targetUrl, '_blank', 'noopener,noreferrer');
    if (pop) {
      pop.blur();
      window.focus();
    }
  } catch {
    // blocked by browser
  }

  return true;
}

/**
 * Detects Windows Desktop environment and version for realistic UI badges
 */
export function detectWindowsInfo(): {
  isWindows: boolean;
  osName: string;
  is64Bit: boolean;
  deviceType: 'Desktop' | 'Laptop / Mobile';
} {
  if (typeof window === 'undefined') {
    return { isWindows: true, osName: 'Windows 11 / 10', is64Bit: true, deviceType: 'Desktop' };
  }

  const ua = navigator.userAgent;
  const isWin = /Windows/i.test(ua);
  const is64 = /WOW64|Win64|x86_64|x64/i.test(ua) || (navigator as any).userAgentData?.architecture === 'x86';

  let osName = 'Windows 11 / 10';
  if (/Windows NT 10.0/i.test(ua)) {
    osName = 'Windows 11 / 10 Pro';
  } else if (/Windows NT 6.3/i.test(ua)) {
    osName = 'Windows 8.1';
  } else if (/Windows NT 6.1/i.test(ua)) {
    osName = 'Windows 7 SP1';
  }

  return {
    isWindows: isWin || true, // default to true since this target site is built for Windows desktop users
    osName,
    is64Bit: is64 || true,
    deviceType: 'Desktop'
  };
}
