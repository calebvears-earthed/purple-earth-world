import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <p className="kicker">404</p>
      <h1>This page is not here.</h1>
      <p className="links">
        <Link href="/">Back to the start</Link>
      </p>
    </section>
  );
}
