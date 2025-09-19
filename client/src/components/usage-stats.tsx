interface UsageStatsProps {
  stats: {
    todayMinutes: number;
    thisWeekMinutes: number;
    formatStats: (minutes: number) => string;
    reset: () => void;
  };
}

export default function UsageStats({ stats }: UsageStatsProps) {
  const handleReset = () => {
    if (confirm("Are you sure you want to reset your usage statistics?")) {
      stats.reset();
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-4" data-testid="usage-stats">
      <h3 className="text-lg font-medium text-foreground" data-testid="text-stats-title">
        Usage Statistics
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-2xl font-semibold text-primary" data-testid="text-today-stats">
            {stats.formatStats(stats.todayMinutes)}
          </div>
          <div className="text-sm text-muted-foreground">Today</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-semibold text-primary" data-testid="text-week-stats">
            {stats.formatStats(stats.thisWeekMinutes)}
          </div>
          <div className="text-sm text-muted-foreground">This Week</div>
        </div>
      </div>
      <button
        className="w-full text-center text-sm text-destructive hover:text-destructive/80 transition-colors"
        onClick={handleReset}
        data-testid="button-reset-stats"
      >
        Reset Statistics
      </button>
    </div>
  );
}
