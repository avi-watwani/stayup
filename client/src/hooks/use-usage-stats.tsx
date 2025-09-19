import { useState, useEffect, useCallback } from "react";

interface UsageStats {
  todayMinutes: number;
  thisWeekMinutes: number;
  formatStats: (minutes: number) => string;
  addTime: (minutes: number) => void;
  reset: () => void;
}

interface StoredStats {
  todayMinutes: number;
  thisWeekMinutes: number;
  lastDate: string;
  weekStart: string;
}

export function useUsageStats(): UsageStats {
  const [stats, setStats] = useState<StoredStats>({
    todayMinutes: 0,
    thisWeekMinutes: 0,
    lastDate: new Date().toDateString(),
    weekStart: getWeekStart(new Date()).toDateString()
  });

  const formatStats = useCallback((minutes: number): string => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} hr ${remainingMinutes} min`;
  }, []);

  const loadStats = useCallback(() => {
    try {
      const stored = localStorage.getItem('awakekeeper-stats');
      if (stored) {
        const parsedStats: StoredStats = JSON.parse(stored);
        const today = new Date().toDateString();
        const currentWeekStart = getWeekStart(new Date()).toDateString();

        // Reset daily stats if it's a new day
        if (parsedStats.lastDate !== today) {
          parsedStats.todayMinutes = 0;
          parsedStats.lastDate = today;
        }

        // Reset weekly stats if it's a new week
        if (parsedStats.weekStart !== currentWeekStart) {
          parsedStats.thisWeekMinutes = 0;
          parsedStats.weekStart = currentWeekStart;
        }

        setStats(parsedStats);
      }
    } catch (error) {
      console.error('Failed to load usage stats:', error);
    }
  }, []);

  const saveStats = useCallback((newStats: StoredStats) => {
    try {
      localStorage.setItem('awakekeeper-stats', JSON.stringify(newStats));
    } catch (error) {
      console.error('Failed to save usage stats:', error);
    }
  }, []);

  const addTime = useCallback((minutes: number) => {
    setStats(prev => {
      const updated = {
        ...prev,
        todayMinutes: prev.todayMinutes + minutes,
        thisWeekMinutes: prev.thisWeekMinutes + minutes,
        lastDate: new Date().toDateString(),
        weekStart: getWeekStart(new Date()).toDateString()
      };
      saveStats(updated);
      return updated;
    });
  }, [saveStats]);

  const reset = useCallback(() => {
    const resetStats: StoredStats = {
      todayMinutes: 0,
      thisWeekMinutes: 0,
      lastDate: new Date().toDateString(),
      weekStart: getWeekStart(new Date()).toDateString()
    };
    setStats(resetStats);
    saveStats(resetStats);
  }, [saveStats]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  return {
    todayMinutes: stats.todayMinutes,
    thisWeekMinutes: stats.thisWeekMinutes,
    formatStats,
    addTime,
    reset
  };
}

function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  return new Date(d.setDate(diff));
}
