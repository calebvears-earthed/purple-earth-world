"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { useCart } from "@/components/CartProvider";
import { contentIsDraft } from "@/lib/catalog";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/rituals", label: "Journal" },
  { href: "/earthed-safely", label: "Guide" },
  { href: "/club", label: "Club" },
  { href: "/story", label: "Story" },
  { href: "/account", label: "Account" },
];

export function Header() {
  const pathname = usePathname();
  const { count, ready } = useCart();
  const bag = ready && count > 0 ? `Bag ${count}` : "Bag";

  const items = (
    <>
      {links.map((link) => (
        <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined}>
          {link.label}
        </Link>
      ))}
      <Link href="/cart" aria-current={pathname === "/cart" ? "page" : undefined}>
        {bag}
      </Link>
    </>
  );

  return (
    <header>
      <a className="skip" href="#content">
        Skip to content
      </a>
      <div className="bar">
        <Logo linked width={200} />
        <nav className="nav" aria-label="Primary">
          {items}
        </nav>
        <details className="menu">
          <summary>Menu</summary>
          <nav aria-label="Primary mobile">{items}</nav>
        </details>
      </div>
      {contentIsDraft ? <p className="draft">Draft. Prices and words are for review.</p> : null}
    </header>
  );
}
