"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { useCart } from "@/components/CartProvider";
import { contentIsDraft } from "@/lib/catalog";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/lookbook", label: "Lookbook" },
  { href: "/rituals", label: "Journal" },
  { href: "/story", label: "Story" },
  { href: "/club", label: "Club" },
  { href: "/earthed-safely", label: "Guide" },
];

export function Header() {
  const pathname = usePathname();
  const { count, ready } = useCart();
  const bag = ready && count > 0 ? `Bag ${count}` : "Bag";
  const [stuck, setStuck] = useState(false);
  const overlay = pathname === "/" && !stuck;

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = (
    <>
      {links.map((link) => (
        <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined}>
          {link.label}
        </Link>
      ))}
      <Link href="/account" aria-current={pathname === "/account" ? "page" : undefined}>
        Account
      </Link>
      <Link href="/cart" aria-current={pathname === "/cart" ? "page" : undefined}>
        {bag}
      </Link>
    </>
  );

  return (
    <header className={overlay ? "header-overlay" : "header-solid"}>
      <a className="skip" href="#content">
        Skip to content
      </a>
      <div className="bar">
        <Logo linked variant="lockup-reverse" width={86} />
        <nav className="nav" aria-label="Primary">
          {items}
          {contentIsDraft ? <span className="draft-inline">Draft</span> : null}
        </nav>
        <details className="menu">
          <summary>Menu</summary>
          <nav aria-label="Primary mobile">{items}</nav>
        </details>
      </div>
    </header>
  );
}
