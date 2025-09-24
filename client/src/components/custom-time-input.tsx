interface CustomTimeInputProps {
  customHours: number;
  customMinutes: number;
  onCustomTimeChange: (hours: number, minutes: number) => void;
}

export default function CustomTimeInput({ customHours, customMinutes, onCustomTimeChange }: CustomTimeInputProps) {
  const handleHoursChange = (hours: number) => {
    // Restrict hours to 0-99
    const validHours = Math.max(0, Math.min(99, hours));
    onCustomTimeChange(validHours, customMinutes);
  };

  const handleMinutesChange = (minutes: number) => {
    // Restrict minutes to 0-59
    const validMinutes = Math.max(0, Math.min(59, minutes));
    onCustomTimeChange(customHours, validMinutes);
  };

  return (
    <div className="space-y-4" data-testid="custom-time-input">
      <div className="flex items-center justify-center gap-2">
        <input
          type="number"
          placeholder="0"
          min="0"
          max="99"
          value={customHours || ""}
          onChange={(e) => handleHoursChange(parseInt(e.target.value) || 0)}
          className="w-20 px-3 py-2 text-center bg-input border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          data-testid="input-custom-hours"
        />
        <span className="text-muted-foreground">hours</span>
        
        <input
          type="number"
          placeholder="0"
          min="0"
          max="59"
          value={customMinutes || ""}
          onChange={(e) => handleMinutesChange(parseInt(e.target.value) || 0)}
          className="w-20 px-3 py-2 text-center bg-input border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          data-testid="input-custom-minutes"
        />
        <span className="text-muted-foreground">minutes</span>
      </div>
    </div>
  );
}
