import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import { ShieldCheck, RefreshCw, Lock } from 'lucide-react';

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
    const [isScriptReady, setIsScriptReady] = useState<boolean>(false);
    const [widgetRendered, setWidgetRendered] = useState<boolean>(false);

    // Provide reset and remove methods to parent components
    useImperativeHandle(ref, () => ({
      reset: () => {
        if (window.turnstile && widgetIdRef.current) {
          try {
            window.turnstile.reset(widgetIdRef.current);
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

    // Ensure Cloudflare Turnstile script is loaded in DOM
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
        script.onload = () => {
          setIsScriptReady(true);
        };
        script.onerror = (err) => {
          console.error('Failed to load Cloudflare Turnstile API:', err);
          onError?.(err);
        };
        document.head.appendChild(script);
      } else {
        const interval = setInterval(() => {
          if (window.turnstile) {
            setIsScriptReady(true);
            clearInterval(interval);
          }
        }, 100);

        return () => clearInterval(interval);
      }
    }, [onError]);

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
            onVerify(token);
          },
          'expired-callback': () => {
            onExpire?.();
          },
          'error-callback': (err: any) => {
            console.warn('Turnstile verification error:', err);
            onError?.(err);
          }
        });

        widgetIdRef.current = id;
        setWidgetRendered(true);
      } catch (err) {
        console.error('Error rendering Cloudflare Turnstile widget:', err);
        onError?.(err);
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
    }, [isScriptReady, theme, size, action, onVerify, onExpire, onError]);

    return (
      <div className={`turnstile-wrapper w-full my-3 ${className}`}>
        <div className="w-full rounded-2xl bg-[#08101E]/90 border border-slate-800/80 hover:border-cyan-500/40 p-3 sm:p-4 transition-all duration-300 shadow-inner group">
          
          {/* Header pill label */}
          <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-800/80 text-[11px]">
            <div className="flex items-center space-x-2 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="font-semibold text-white">Security Verification</span>
            </div>
            <div className="flex items-center space-x-1.5 text-[10px] text-cyan-400/80 font-mono bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/20">
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
          {!widgetRendered && (
            <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-400 py-3">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-400" />
              <span>Connecting to Cloudflare Turnstile verification network...</span>
            </div>
          )}

          {/* Security badge footer */}
          <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-slate-900 text-[10px] text-slate-500">
            <span className="text-slate-400">Anti-Spam & Automated Bot Defense</span>
            <span className="text-[9px] uppercase tracking-wider text-slate-500 font-mono">Cloudflare Powered</span>
          </div>
        </div>
      </div>
    );
  }
);

TurnstileWidget.displayName = 'TurnstileWidget';
export default TurnstileWidget;
