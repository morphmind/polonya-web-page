'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const STORAGE_KEY = 'cookie-consent';

function getStoredPreferences(): CookiePreferences | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CookiePreferences) : null;
  } catch {
    return null;
  }
}

function storePreferences(prefs: CookiePreferences) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
}

export default function CookieBanner() {
  const t = useTranslations('cookie');

  const [visible, setVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const stored = getStoredPreferences();
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
    setPreferences(stored);
  }, []);

  const accept = useCallback(() => {
    const prefs: CookiePreferences = { necessary: true, analytics: true, marketing: true };
    storePreferences(prefs);
    setPreferences(prefs);
    setVisible(false);
    setShowModal(false);
  }, []);

  const reject = useCallback(() => {
    const prefs: CookiePreferences = { necessary: true, analytics: false, marketing: false };
    storePreferences(prefs);
    setPreferences(prefs);
    setVisible(false);
    setShowModal(false);
  }, []);

  const saveCustom = useCallback(() => {
    storePreferences(preferences);
    setVisible(false);
    setShowModal(false);
  }, [preferences]);

  if (!visible) return null;

  return (
    <>
      {/* Banner */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 transform transition-transform duration-500 ease-out ${
          showModal ? '-translate-y-full opacity-0' : 'translate-y-0'
        }`}
      >
        <div className="mx-auto max-w-5xl px-4 pb-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1">
                <h3 className="text-base font-semibold text-gray-900">{t('title')}</h3>
                <p className="mt-1 text-sm text-gray-500">{t('description')}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setShowModal(true)}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  {t('managePreferences')}
                </button>
                <button
                  onClick={reject}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  {t('rejectAll')}
                </button>
                <button
                  onClick={accept}
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
                >
                  {t('acceptAll')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preferences Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />

          {/* Modal */}
          <div className="relative w-full max-w-lg animate-in rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              aria-label="Close"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-lg font-semibold text-gray-900">{t('title')}</h3>
            <p className="mt-1 text-sm text-gray-500">{t('description')}</p>

            <div className="mt-6 space-y-4">
              {/* Necessary */}
              <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">{t('necessary')}</p>
                  <p className="mt-0.5 text-xs text-gray-500">{t('necessaryDesc')}</p>
                </div>
                <div className="relative">
                  <div className="h-6 w-11 rounded-full bg-primary" />
                  <div className="absolute top-0.5 left-[22px] h-5 w-5 rounded-full bg-white shadow" />
                </div>
              </div>

              {/* Analytics */}
              <label className="flex cursor-pointer items-center justify-between rounded-xl bg-gray-50 p-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">{t('analytics')}</p>
                  <p className="mt-0.5 text-xs text-gray-500">{t('analyticsDesc')}</p>
                </div>
                <button
                  role="switch"
                  aria-checked={preferences.analytics}
                  onClick={() =>
                    setPreferences((p) => ({ ...p, analytics: !p.analytics }))
                  }
                  className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                    preferences.analytics ? 'bg-primary' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                      preferences.analytics ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </label>

              {/* Marketing */}
              <label className="flex cursor-pointer items-center justify-between rounded-xl bg-gray-50 p-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">{t('marketing')}</p>
                  <p className="mt-0.5 text-xs text-gray-500">{t('marketingDesc')}</p>
                </div>
                <button
                  role="switch"
                  aria-checked={preferences.marketing}
                  onClick={() =>
                    setPreferences((p) => ({ ...p, marketing: !p.marketing }))
                  }
                  className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                    preferences.marketing ? 'bg-primary' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                      preferences.marketing ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </label>
            </div>

            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                onClick={reject}
                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                {t('rejectAll')}
              </button>
              <button
                onClick={accept}
                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                {t('acceptAll')}
              </button>
              <button
                onClick={saveCustom}
                className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                {t('savePreferences')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
