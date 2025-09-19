import { useState, useEffect, useRef } from "react";

interface WakeLockState {
  isSupported: boolean;
  isActive: boolean;
  request: () => Promise<boolean>;
  release: () => Promise<void>;
  error: string | null;
}

export function useWakeLock(): WakeLockState {
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

  const isSupported = 'wakeLock' in navigator;

  const request = async (): Promise<boolean> => {
    if (!isSupported) {
      setError("Wake Lock API is not supported in this browser");
      return false;
    }

    try {
      const wakeLock = await navigator.wakeLock.request('screen');
      wakeLockRef.current = wakeLock;
      setIsActive(true);
      setError(null);

      wakeLock.addEventListener('release', () => {
        setIsActive(false);
        wakeLockRef.current = null;
      });

      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to request wake lock';
      setError(errorMessage);
      setIsActive(false);
      return false;
    }
  };

  const release = async (): Promise<void> => {
    if (wakeLockRef.current) {
      try {
        await wakeLockRef.current.release();
        wakeLockRef.current = null;
        setIsActive(false);
        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to release wake lock';
        setError(errorMessage);
      }
    }
  };

  // Re-request wake lock when page becomes visible again
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isActive && !wakeLockRef.current) {
        request();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isActive]);

  return {
    isSupported,
    isActive,
    request,
    release,
    error
  };
}
