export default function FAQSection() {
  return (
    <section className="px-4 py-12 max-w-2xl mx-auto" data-testid="faq-section">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground text-center mb-8" data-testid="text-faq-title">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-4">
          <details className="bg-card rounded-lg border border-border overflow-hidden" data-testid="faq-how-to-use">
            <summary className="px-6 py-4 cursor-pointer hover:bg-muted transition-colors font-medium text-foreground">
              How do I use AwakeKeeper?
            </summary>
            <div className="px-6 py-4 pt-0 text-muted-foreground border-t border-border">
              Click the central button to start or stop keeping your screen awake. You can select preset durations or enter a custom time to prevent your screen from sleeping.
            </div>
          </details>

          <details className="bg-card rounded-lg border border-border overflow-hidden" data-testid="faq-not-working">
            <summary className="px-6 py-4 cursor-pointer hover:bg-muted transition-colors font-medium text-foreground">
              Why doesn't my screen stay awake?
            </summary>
            <div className="px-6 py-4 pt-0 text-muted-foreground border-t border-border">
              Ensure this tab stays in the foreground (desktop) or unlocked (mobile) and that you grant the wake-lock permission when prompted by your browser.
            </div>
          </details>

          <details className="bg-card rounded-lg border border-border overflow-hidden" data-testid="faq-mobile-support">
            <summary className="px-6 py-4 cursor-pointer hover:bg-muted transition-colors font-medium text-foreground">
              Does this work on mobile devices?
            </summary>
            <div className="px-6 py-4 pt-0 text-muted-foreground border-t border-border">
              Yes! AwakeKeeper works on both desktop and mobile browsers that support the Screen Wake Lock API. Keep the tab active and your device unlocked for best results.
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
