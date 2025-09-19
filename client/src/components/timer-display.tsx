interface TimerDisplayProps {
  timer: {
    remainingTime: number;
    isRunning: boolean;
    formatTime: (seconds: number) => string;
  };
  isActive: boolean;
}

export default function TimerDisplay({ timer, isActive }: TimerDisplayProps) {
  const displayTime = timer.remainingTime > 0 ? timer.formatTime(timer.remainingTime) : "00:00";
  const status = isActive ? "Active" : "Ready";

  return (
    <div className="text-center" data-testid="timer-display">
      <div className="text-6xl sm:text-7xl font-light text-foreground mb-2" data-testid="text-timer">
        {displayTime}
      </div>
      <div className="text-muted-foreground text-sm uppercase tracking-wider" data-testid="text-status">
        {status}
      </div>
    </div>
  );
}
