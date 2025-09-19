import { useState } from "react";
import { useWakeLock } from "@/hooks/use-wake-lock";
import { useTimer } from "@/hooks/use-timer";
import { useUsageStats } from "@/hooks/use-usage-stats";
import { useToast } from "@/hooks/use-toast";
import TimerDisplay from "@/components/timer-display";
import TimerPresets from "@/components/timer-presets";
import CustomTimeInput from "@/components/custom-time-input";
import MainTimerControl from "@/components/main-timer-control";
import UsageStats from "@/components/usage-stats";
import FAQSection from "@/components/faq-section";

export default function Home() {
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const [customMinutes, setCustomMinutes] = useState<number>(0);
  
  const { toast } = useToast();
  const wakeLock = useWakeLock();
  const usageStats = useUsageStats();
  
  const timer = useTimer(() => {
    wakeLock.release();
    toast({
      title: "Timer completed!",
      description: "Your screen wake lock has been released.",
    });
  });

  const handleStart = async () => {
    const duration = selectedPreset || customMinutes * 60;
    
    if (duration <= 0) {
      toast({
        title: "Please select a duration",
        description: "Choose a preset or enter custom minutes.",
        variant: "destructive"
      });
      return;
    }

    const success = await wakeLock.request();
    if (success) {
      timer.start(duration);
      toast({
        title: "Wake lock activated",
        description: "Your screen will stay awake for the selected duration.",
      });
    } else {
      toast({
        title: "Wake lock failed",
        description: wakeLock.error || "Failed to activate wake lock. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleStop = () => {
    timer.stop();
    wakeLock.release();
    
    // Add elapsed time to stats (in minutes)
    if (timer.totalTime > 0) {
      const elapsedMinutes = Math.floor((timer.totalTime - timer.remainingTime) / 60);
      usageStats.addTime(elapsedMinutes);
    }
    
    toast({
      title: "Timer stopped",
      description: "Wake lock has been released.",
    });
  };

  if (!wakeLock.isSupported) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-semibold text-foreground mb-4">Wake Lock Not Supported</h1>
          <p className="text-muted-foreground">
            Your browser doesn't support the Screen Wake Lock API. Please try using a modern browser like Chrome, Edge, or Safari.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="w-full py-6 px-4" data-testid="header">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl font-semibold text-foreground mb-2" data-testid="title">
            AwakeKeeper
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base" data-testid="subtitle">
            Keep your screen awake with a simple click
          </p>
        </div>
      </header>

      {/* Main App */}
      <main className="flex-1 px-4 py-8" data-testid="main-app">
        <div className="max-w-md mx-auto space-y-8">
          
          <TimerDisplay 
            timer={timer}
            isActive={timer.isRunning}
          />

          <TimerPresets 
            selectedPreset={selectedPreset}
            onSelectPreset={setSelectedPreset}
          />

          <CustomTimeInput 
            customMinutes={customMinutes}
            onCustomMinutesChange={setCustomMinutes}
          />

          <MainTimerControl 
            isActive={timer.isRunning}
            progress={timer.progress}
            onStart={handleStart}
            onStop={handleStop}
          />

          <UsageStats 
            stats={usageStats}
          />

        </div>
      </main>

      <FAQSection />

      {/* Footer */}
      <footer className="border-t border-border py-8" data-testid="footer">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            Built with the Screen Wake Lock API • Privacy-focused • No data collection
          </p>
          <div className="mt-4">
            <a href="#" className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors" data-testid="link-coffee">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
                <path d="M11 7h2v2h-2zm0 4h2v6h-2z"/>
              </svg>
              Buy me a coffee
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
