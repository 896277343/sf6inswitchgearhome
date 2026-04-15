'use client';

import React from 'react';

export function ResizeObserverErrorHandler() {
  React.useEffect(() => {
    const isResizeObserverMessage = (message?: string) =>
      message?.includes("ResizeObserver loop completed with undelivered notifications") ||
      message?.includes("ResizeObserver loop limit exceeded");

    const extractMessage = (value: unknown): string | undefined => {
      if (typeof value === "string") {
        return value;
      }

      if (value instanceof Error) {
        return value.message;
      }

      if (
        value &&
        typeof value === "object" &&
        "message" in value &&
        typeof (value as { message?: unknown }).message === "string"
      ) {
        return (value as { message: string }).message;
      }

      return undefined;
    };

    const resizeObserverErrHandler = (e: ErrorEvent) => {
      if (isResizeObserverMessage(extractMessage(e.error) ?? e.message)) {
        e.stopImmediatePropagation();
        e.preventDefault();
      }
    };

    const rejectionHandler = (event: PromiseRejectionEvent) => {
      const reason = extractMessage(event.reason);

      if (isResizeObserverMessage(reason)) {
        event.preventDefault();
      }
    };

    const OriginalResizeObserver = window.ResizeObserver;
    const originalConsoleError = window.console.error;
    const originalReportError = window.reportError;

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

    window.console.error = (...args: unknown[]) => {
      const hasResizeObserverMessage = args.some((arg) =>
        isResizeObserverMessage(extractMessage(arg))
      );

      if (hasResizeObserverMessage) {
        return;
      }

      originalConsoleError(...args);
    };

    window.reportError = (error: unknown) => {
      if (isResizeObserverMessage(extractMessage(error))) {
        return;
      }

      originalReportError?.(error);
    };

    window.addEventListener('error', resizeObserverErrHandler, true);
    window.addEventListener('unhandledrejection', rejectionHandler);

    return () => {
      window.removeEventListener('error', resizeObserverErrHandler, true);
      window.removeEventListener('unhandledrejection', rejectionHandler);
      window.console.error = originalConsoleError;

      if (OriginalResizeObserver) {
        window.ResizeObserver = OriginalResizeObserver;
      }

      if (originalReportError) {
        window.reportError = originalReportError;
      }
    };
  }, []);

  return null;
}
