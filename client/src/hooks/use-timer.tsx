import { useState, useEffect, useRef, useCallback } from "react";

interface TimerState {
  isRunning: boolean;
  remainingTime: number;
  totalTime: number;
  start: (duration: number) => void;
  stop: () => void;
  progress: number;
  formatTime: (seconds: number) => string;
}

export function useTimer(onComplete?: () => void): TimerState {
  const [isRunning, setIsRunning] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = useCallback((seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const start = useCallback((duration: number) => {
    setIsRunning(true);
    setRemainingTime(duration);
    setTotalTime(duration);
  }, []);

  const stop = useCallback(() => {
    setIsRunning(false);
    setRemainingTime(0);
    setTotalTime(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const progress = totalTime > 0 ? ((totalTime - remainingTime) / totalTime) * 100 : 0;

  useEffect(() => {
    if (isRunning && remainingTime > 0) {
      intervalRef.current = setInterval(() => {
        setRemainingTime(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            onComplete?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, remainingTime, onComplete]);

  return {
    isRunning,
    remainingTime,
    totalTime,
    start,
    stop,
    progress,
    formatTime
  };
}
