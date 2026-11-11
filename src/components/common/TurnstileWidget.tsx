import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef, useCallback } from 'react';
import { ShieldCheck, RefreshCw, Lock, AlertTriangle } from 'lucide-react';

export interface TurnstileWidgetHandle {
  reset: () => void;
  remove: () => void;
}

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: (error?: any) => void;
  theme?: 'dark' | 'light' | 'auto';
  size?: 'normal' | 'compact' | 'flexible';
  className?: string;
  action?: string;
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          theme?: 'dark' | 'light' | 'auto';
          size?: 'normal' | 'compact' | 'flexible';
          action?: string;
          callback?: (token: string) => void;
          'error-callback'?: (error?: any) => void;
          'expired-callback'?: () => void;
        }
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
    onTurnstileLoaded?: () => void;
  }
}

// Fallback to provided key if environment variable is not defined
const TURNSTILE_SITE_KEY =
  (import.meta as any).env?.VITE_TURNSTILE_SITE_KEY || '0x4AAAAAAFzeyC3yJiAmD_LY';

// How long to wait before offering a manual retry.
const SCRIPT_TIMEOUT_MS = 12000; // Cloudflare script failed to load
const VERIFY_TIMEOUT_MS = 20000; // widget rendered but never returned a token

export const TurnstileWidget = forwardRef<TurnstileWidgetHandle, TurnstileWidgetProps>(
  (
    {
      onVerify,
      onExpire,
      onError,
      theme = 'dark',
      size = 'flexible', // Default to full-width flexible sizing
      className = '',
      action = 'form_submit'
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const widgetIdRef = useRef<string | null>(null);

    // Keep the latest callbacks in refs so the widget can mount ONCE and never
    // be torn down just because the parent re-rendered with new inline handlers
    // (that churn is what leaves Turnstile stuck on "Verifying..." forever).
    const onVerifyRef = useRef(onVerify);
    const onExpireRef = useRef(onExpire);
    const onErrorRef = useRef(onError);
    useEffect(() => {
      onVerifyRef.current = onVerify;
      onExpireRef.current = onExpire;
      onErrorRef.current = onError;
    });

    const [isScriptReady, setIsScriptReady] = useState<boolean>(false);
    const [widgetRendered, setWidgetRendered] = useState<boolean>(false);
    const [verified, setVerified] = useState<boolean>(false);
    const [timedOut, setTimedOut] = useState<boolean>(false);
    // Bumped by the retry button to force the script + widget to re-initialise.
    const [attempt, setAttempt] = useState<number>(0);

    // Provide reset and remove methods to parent components
    useImperativeHandle(ref, () => ({
      reset: () => {
        if (window.turnstile && widgetIdRef.current) {
          try {
            window.turnstile.reset(widgetIdRef.current);
            setVerified(false);
            setTimedOut(false);
          } catch (e) {
            console.warn('Turnstile reset error:', e);
          }
        }
      },
      remove: () => {
        if (window.turnstile && widgetIdRef.current) {
          try {
            window.turnstile.remove(widgetIdRef.current);
            widgetIdRef.current = null;
            setWidgetRendered(false);
          } catch (e) {
            console.warn('Turnstile remove error:', e);
          }
        }
      }
    }));

    // Ensure Cloudflare Turnstile script is loaded in DOM (single source of truth).
    useEffect(() => {
      if (typeof window === 'undefined') return;

      if (window.turnstile) {
        setIsScriptReady(true);
        return;
      }

      const scriptId = 'cf-turnstile-script';
      let script = document.getElementById(scriptId) as HTMLScriptElement | null;

      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
        script.async = true;
        script.defer = true;
        script.onload = () => setIsScriptReady(true);
        script.onerror = (err) => {
          console.error('Failed to load Cloudflare Turnstile API:', err);
          setTimedOut(true);
          onErrorRef.current?.(err);
        };
        document.head.appendChild(script);
      } else {
        // Script tag exists but window.turnstile not ready yet — poll briefly.
        const interval = setInterval(() => {
          if (window.turnstile) {
            setIsScriptReady(true);
            clearInterval(interval);
          }
        }, 100);
        return () => clearInterval(interval);
      }
      // `attempt` re-runs this so a retry can recover from a failed script load.
    }, [attempt]);

    // Render Turnstile widget once script and container are ready
    useEffect(() => {
      if (!isScriptReady || !containerRef.current || !window.turnstile) return;

      // Clean up previous instance if any
      if (widgetIdRef.current) {
        try {
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        } catch {
          // ignore
        }
      }

      // Empty inner content of container before rendering
      containerRef.current.innerHTML = '';

      try {
        const id = window.turnstile.render(containerRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          theme,
          size,
          action,
          callback: (token: string) => {
            setVerified(true);
            setTimedOut(false);
            onVerifyRef.current(token);
          },
          'expired-callback': () => {
            setVerified(false);
            onExpireRef.current?.();
          },
          'error-callback': (err: any) => {
            console.warn('Turnstile verification error:', err);
            setTimedOut(true);
            onErrorRef.current?.(err);
          }
        });

        widgetIdRef.current = id;
        setWidgetRendered(true);
      } catch (err) {
        console.error('Error rendering Cloudflare Turnstile widget:', err);
        setTimedOut(true);
        onErrorRef.current?.(err);
      }

      return () => {
        if (window.turnstile && widgetIdRef.current) {
          try {
            window.turnstile.remove(widgetIdRef.current);
            widgetIdRef.current = null;
          } catch {
            // ignore
          }
        }
      };
      // NOTE: callbacks are read from refs, so they are intentionally NOT deps.
      // The widget must mount once and survive parent re-renders.
    }, [isScriptReady, theme, size, action, attempt]);

    // Watchdog: if the script never loads, offer a retry instead of an endless spinner.
    useEffect(() => {
      if (isScriptReady) return;
      const t = setTimeout(() => {
        if (!window.turnstile) setTimedOut(true);
      }, SCRIPT_TIMEOUT_MS);
      return () => clearTimeout(t);
    }, [isScriptReady, attempt]);

    // Watchdog: if the widget renders but never returns a token, offer a retry.
    useEffect(() => {
      if (!widgetRendered || verified) return;
      const t = setTimeout(() => {
        if (!verified) setTimedOut(true);
      }, VERIFY_TIMEOUT_MS);
      return () => clearTimeout(t);
    }, [widgetRendered, verified, attempt]);

    const handleRetry = useCallback(() => {
      setTimedOut(false);
      setVerified(false);
      if (window.turnstile && widgetIdRef.current) {
        try {
          window.turnstile.reset(widgetIdRef.current);
          return;
        } catch (e) {
          console.warn('Turnstile retry reset failed, re-initialising:', e);
        }
      }
      // Script or widget never came up — force a full re-init.
      setIsScriptReady(!!window.turnstile);
      setWidgetRendered(false);
      setAttempt((n) => n + 1);
    }, []);

    const showSpinner = !widgetRendered && !timedOut;

    return (
      <div className={`turnstile-wrapper w-full my-3 ${className}`}>
        <div className="w-full rounded-2xl bg-[#FFFFFF]/90 border border-slate-200/80 hover:border-blue-600/40 p-3 sm:p-4 transition-all duration-300 shadow-inner group">

          {/* Header pill label */}
          <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-200/80 text-[11px]">
            <div className="flex items-center space-x-2 text-slate-700">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <span className="font-semibold text-[#102039]">Security Verification</span>
            </div>
            <div className="flex items-center space-x-1.5 text-[10px] text-blue-600/80 font-mono bg-blue-50/40 px-2 py-0.5 rounded border border-blue-600/20">
              <Lock className="w-2.5 h-2.5" />
              <span>Full-Width Turnstile</span>
            </div>
          </div>

          {/* Turnstile Container - Full Width */}
          <div
            ref={containerRef}
            className="w-full min-h-[65px] flex items-center justify-center [&>iframe]:w-full [&>iframe]:min-w-full [&>div]:w-full overflow-hidden"
          />

          {/* Loading state indicator */}
          {showSpinner && (
            <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-600 py-3">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-600" />
              <span>Connecting to Cloudflare Turnstile verification network...</span>
            </div>
          )}

          {/* Timeout / error state with manual retry */}
          {timedOut && !verified && (
            <div className="flex flex-col items-center justify-center space-y-2 text-[11px] py-3">
              <div className="flex items-center space-x-2 text-amber-400">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Verification is taking longer than expected.</span>
              </div>
              <button
                type="button"
                onClick={handleRetry}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-600 text-white font-semibold transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry verification</span>
              </button>
            </div>
          )}

          {/* Security badge footer */}
          <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-slate-200 text-[10px] text-slate-500">
            <span className="text-slate-600">Anti-Spam &amp; Automated Bot Defense</span>
            <span className="text-[9px] uppercase tracking-wider text-slate-500 font-mono">Cloudflare Powered</span>
          </div>
        </div>
      </div>
    );
  }
);

TurnstileWidget.displayName = 'TurnstileWidget';
export default TurnstileWidget;
