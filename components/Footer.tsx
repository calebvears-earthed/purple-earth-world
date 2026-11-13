import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <p>Purple Earth is a clothing label in Adelaide. Drop 01 is ritual wear, sold as a numbered pre-order.</p>
          <p>Purple Earth Pty Ltd, registration pending. Adelaide, South Australia. ABN to be published when the company is registered.</p>
        </div>
        <div>
          <h2>Shop</h2>
          <ul>
            <li><Link href="/shop">Drop 01</Link></li>
            <li><Link href="/cart">Bag</Link></li>
            <li><Link href="/waitlist">Founding list</Link></li>
          </ul>
        </div>
        <div>
          <h2>House</h2>
          <ul>
            <li><Link href="/story">Story</Link></li>
            <li><Link href="/rituals">Journal</Link></li>
            <li><Link href="/earthed-safely">Guide</Link></li>
            <li><Link href="/club">Club</Link></li>
            <li><Link href="/account">Account</Link></li>
          </ul>
        </div>
        <div>
          <h2>Legal</h2>
          <ul>
            <li><Link href="/terms">Terms</Link></li>
            <li><Link href="/privacy">Privacy</Link></li>
            <li><Link href="/club-terms">Club terms</Link></li>
            <li><Link href="/shipping-returns">Shipping and returns</Link></li>
            <li><Link href="/claims-policy">Claims policy</Link></li>
          </ul>
        </div>
      </div>
      <p className="legal-end">Purple Earth. Adelaide. 2026.</p>
    </footer>
  );
}
