interface TimerPresetsProps {
  selectedPreset: number | null;
  onSelectPreset: (duration: number | null) => void;
}

const presets = [
  { label: "30 min", duration: 1800 },
  { label: "1 hr", duration: 3600 },
  { label: "2 hr", duration: 7200 },
];

export default function TimerPresets({ selectedPreset, onSelectPreset }: TimerPresetsProps) {
  return (
    <div className="flex justify-center gap-3 flex-wrap" data-testid="timer-presets">
      {presets.map((preset) => (
        <button
          key={preset.duration}
          className={`preset-btn px-4 py-2 rounded-full font-medium text-sm transition-colors ${
            selectedPreset === preset.duration
              ? "active bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-muted"
          }`}
          onClick={() => onSelectPreset(selectedPreset === preset.duration ? null : preset.duration)}
          data-testid={`button-preset-${preset.label.replace(" ", "-")}`}
        >
          {preset.label}
        </button>
      ))}
    </div>
  );
}
