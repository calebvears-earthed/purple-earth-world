import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "An electrician's guide",
  description: "How a protective earth works, what to look for at a socket, and when to call a licensed electrician. General information from Adelaide.",
};

export default function GuidePage() {
  return (
    <article className="reading">
      <div className="section">
        <p className="kicker">The electrician&apos;s guide</p>
        <h1>Earth, in the electrical sense.</h1>
        <div className="prose">
          <p>Written by Caleb, a licensed electrician in Adelaide. This is general information. It is not advice for a particular house, and it is not a reason to open a switchboard.</p>
          <p>Licensed electricians in Australia work to the Wiring Rules, AS/NZS 3000. If you are unsure, call one.</p>
        </div>
        <h2>What the earth wire is for</h2>
        <div className="prose">
          <p>A protective earth is a wire. In a fault, it gives current a path back to the source so a safety switch can open, and so exposed metal does not stay live. It is there for the installation. It is not a treatment for a person.</p>
          <p>On a typical Australian plug, the earth pin is the longer flat pin. It meets the socket before the other pins. Active and neutral do the ordinary work of the circuit. Earth waits for a fault.</p>
        </div>
        <h2>A socket, looked at and not opened</h2>
        <div className="prose">
          <p>Look at the faceplate. It should sit firm. Cracks, scorch marks, heat, a buzzing sound, a burning smell, or a pin that will not hold a plug are reasons to stop using that outlet.</p>
          <p>Do not take the plate off. Do not put a tool or a pin into the slots. Do not join wires. That work is for a licensed electrician.</p>
        </div>
        <h2>The safety switch</h2>
        <div className="prose">
          <p>Most homes have a residual current device in the switchboard. People often call it a safety switch. It watches for current that leaves on a path it should not take.</p>
          <p>The household check is the test button, used the way the maker&apos;s label describes. Press it. The switch should trip, and that circuit should go dead. Reset it with the switch.</p>
          <p>If it does not trip, if it will not reset, or if it trips again at once, leave it and call a licensed electrician. Do not hold a safety switch on. Do not replace it yourself.</p>
        </div>
        <h2>When to call</h2>
        <div className="prose">
          <p>Call a licensed electrician for any work inside a switchboard, any new circuit, any outlet that is warm or damaged, any shock, and any safety switch that fails its test. In South Australia this installing work is licensed.</p>
          <p>If someone has had a shock, or you smell burning, leave the area and call 000.</p>
        </div>
        <h2>A mat, later, as an object</h2>
        <div className="prose">
          <p>Purple Earth may later sell a mat with a lead. The lead would plug into the earth pin of a socket, and only the earth pin. It would be an electrical accessory. The Regulatory Compliance Mark, and any other mark Australian sale requires, will be shown here only when a registered product exists. None of that is held today, because the accessory does not exist yet.</p>
          <p>The clothes in Drop 01 do not use that path. They are garments, cut and sewn, with the mark on the left chest. They are not a way to connect a person to a socket. Nothing on this page is for sale.</p>
          <p>Caleb. Licensed electrician. Adelaide.</p>
          <p><Link href="/claims-policy">Claims policy</Link></p>
        </div>
      </div>
    </article>
  );
}
