import { Play, Pause } from "lucide-react";

interface MainTimerControlProps {
  isActive: boolean;
  progress: number;
  onStart: () => void;
  onStop: () => void;
}

export default function MainTimerControl({ isActive, progress, onStart, onStop }: MainTimerControlProps) {
  const circumference = 339.29; // 2 * π * 54
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex justify-center" data-testid="main-timer-control">
      <div className="relative">
        {/* Progress Ring SVG */}
        <svg className="w-32 h-32 absolute inset-0 pointer-events-none" viewBox="0 0 120 120" data-testid="progress-ring">
          <circle 
            cx="60" 
            cy="60" 
            r="54" 
            stroke="hsl(220 13% 91%)" 
            strokeWidth="4" 
            fill="none" 
          />
          <circle 
            cx="60" 
            cy="60" 
            r="54"
            stroke="hsl(142 86% 28%)"
            strokeWidth="4"
            fill="none"
            className="progress-ring"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        
        {/* Main Control Button */}
        <button
          className={`timer-circle w-32 h-32 rounded-full bg-card hover:bg-secondary border-2 border-border flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 ${
            isActive ? "active" : ""
          }`}
          onClick={isActive ? onStop : onStart}
          data-testid="button-timer-control"
        >
          <div className="text-center">
            <div className="w-8 h-8 mx-auto mb-1 flex items-center justify-center">
              {isActive ? (
                <Pause className="w-6 h-6 text-primary-foreground" data-testid="icon-pause" />
              ) : (
                <Play className="w-6 h-6 text-foreground" data-testid="icon-play" />
              )}
            </div>
            <span className="text-xs font-medium text-muted-foreground" data-testid="text-button-label">
              {isActive ? "Stop" : "Start"}
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}
