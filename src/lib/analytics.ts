type AnalyticsParameters = Record<string, string | number>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, parameters: AnalyticsParameters = {}) {
  window.gtag?.('event', name, {
    page_path: window.location.pathname,
    ...parameters,
  });
}
