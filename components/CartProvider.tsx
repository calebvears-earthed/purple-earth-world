"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { products, sizes, type Size } from "@/lib/catalog";

export type BagLine = { handle: string; size: Size; qty: number };

type CartValue = {
  lines: BagLine[];
  count: number;
  ready: boolean;
  add: (line: BagLine) => void;
  setQty: (handle: string, size: Size, qty: number) => void;
  remove: (handle: string, size: Size) => void;
  clear: () => void;
};

const CartContext = createContext<CartValue | null>(null);
const KEY = "purple-earth-bag";

function valid(line: BagLine) {
  return products.some((product) => product.handle === line.handle) && sizes.includes(line.size) && line.qty >= 1 && line.qty <= 4;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<BagLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(KEY) || "[]") as BagLine[];
      if (Array.isArray(stored)) setLines(stored.filter(valid));
    } catch {
      setLines([]);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify(lines));
  }, [lines, ready]);

  const value = useMemo<CartValue>(() => {
    return {
      lines,
      count: lines.reduce((sum, line) => sum + line.qty, 0),
      ready,
      add: (line) => {
        if (!valid(line)) return;
        setLines((current) => {
          const index = current.findIndex((item) => item.handle === line.handle && item.size === line.size);
          if (index === -1) return [...current, line];
          return current.map((item, i) => (i === index ? { ...item, qty: Math.min(4, item.qty + line.qty) } : item));
        });
      },
      setQty: (handle, size, qty) => {
        setLines((current) => current.map((item) => (item.handle === handle && item.size === size ? { ...item, qty: Math.min(4, Math.max(1, qty)) } : item)));
      },
      remove: (handle, size) => setLines((current) => current.filter((item) => item.handle !== handle || item.size !== size)),
      clear: () => setLines([]),
    };
  }, [lines, ready]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("Cart is missing.");
  return value;
}
