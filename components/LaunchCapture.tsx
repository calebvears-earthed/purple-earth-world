import { WaitlistForm } from "@/components/WaitlistForm";
import { registrationOpen } from "@/lib/integrations";

export function LaunchCapture() {
  return (
    <section className="launch" aria-labelledby="launch-heading">
      <div className="launch-grid">
        <div>
          <p className="kicker">Launch notes</p>
          <h2 id="launch-heading">When the drop can be paid.</h2>
          <p className="muted">One note when checkout opens, and one when the next drop is cut. Nothing else.</p>
        </div>
        <WaitlistForm
          source="launch-updates"
          compact
          open={registrationOpen()}
          button="Send the notes"
          consent="Send me launch notes. I can unsubscribe at any time."
        />
      </div>
    </section>
  );
}
