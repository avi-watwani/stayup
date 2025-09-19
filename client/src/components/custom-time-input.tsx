interface CustomTimeInputProps {
  customMinutes: number;
  onCustomMinutesChange: (minutes: number) => void;
}

export default function CustomTimeInput({ customMinutes, onCustomMinutesChange }: CustomTimeInputProps) {
  return (
    <div className="space-y-4" data-testid="custom-time-input">
      <div className="flex items-center justify-center gap-2">
        <input
          type="number"
          placeholder="Minutes"
          min="1"
          max="999"
          value={customMinutes || ""}
          onChange={(e) => onCustomMinutesChange(parseInt(e.target.value) || 0)}
          className="w-24 px-3 py-2 text-center bg-input border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          data-testid="input-custom-minutes"
        />
        <span className="text-muted-foreground">minutes</span>
      </div>
    </div>
  );
}
