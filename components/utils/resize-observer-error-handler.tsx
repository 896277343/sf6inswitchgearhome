'use client';

import React from 'react';

export function ResizeObserverErrorHandler() {
  React.useEffect(() => {
    const isResizeObserverMessage = (message?: string) =>
      message?.includes('ResizeObserver loop completed with undelivered notifications') ||
      message?.includes('ResizeObserver loop limit exceeded');

    const resizeObserverErrHandler = (e: ErrorEvent) => {
      if (isResizeObserverMessage(e.message)) {
        e.stopImmediatePropagation();
        e.preventDefault();
      }
    };

    const rejectionHandler = (event: PromiseRejectionEvent) => {
      const reason =
        typeof event.reason === 'string'
          ? event.reason
          : typeof event.reason?.message === 'string'
            ? event.reason.message
            : undefined;

      if (isResizeObserverMessage(reason)) {
        event.preventDefault();
      }
    };

    const OriginalResizeObserver = window.ResizeObserver;

    if (OriginalResizeObserver) {
      window.ResizeObserver = class extends OriginalResizeObserver {
        constructor(callback: ResizeObserverCallback) {
          super((entries, observer) => {
            window.requestAnimationFrame(() => {
              callback(entries, observer);
            });
          });
        }
      };
    }

    window.addEventListener('error', resizeObserverErrHandler, true);
    window.addEventListener('unhandledrejection', rejectionHandler);

    return () => {
      window.removeEventListener('error', resizeObserverErrHandler, true);
      window.removeEventListener('unhandledrejection', rejectionHandler);

      if (OriginalResizeObserver) {
        window.ResizeObserver = OriginalResizeObserver;
      }
    };
  }, []);

  return null;
}
