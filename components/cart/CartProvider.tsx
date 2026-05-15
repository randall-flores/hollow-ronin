"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type CartItem = {
  handle:  string;   // Shopify product handle (source of truth for checkout)
  name:    string;
  size:    string;
  price:   number;
  image:   string;
  qty:     number;
};

type CartContextValue = {
  items:    CartItem[];
  count:    number;
  subtotal: number;
  isOpen:   boolean;
  open:     () => void;
  close:    () => void;
  toggle:   () => void;
  add:      (item: Omit<CartItem, "qty"> & { qty?: number }) => void;
  remove:   (handle: string, size: string) => void;
  setQty:   (handle: string, size: string, qty: number) => void;
  clear:    () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

// Bump on storage shape change. Old "hollow-ronin-cart" carts stored local
// editorial slugs instead of Shopify handles and could not be checked out.
const STORAGE_KEY = "hollow-ronin-cart-v2";
const LEGACY_KEY  = "hollow-ronin-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items,  setItems]  = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
      // Drop legacy cart — contained editorial slugs that won't check out.
      localStorage.removeItem(LEGACY_KEY);
    } catch { /* ignore */ }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch { /* ignore */ }
  }, [items, hydrated]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const add = useCallback((item: Omit<CartItem, "qty"> & { qty?: number }) => {
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.handle === item.handle && p.size === item.size);
      const qty = item.qty ?? 1;
      if (idx >= 0) {
        const next = [...prev];
        next[idx]  = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      }
      return [...prev, { ...item, qty }];
    });
    setIsOpen(true);
  }, []);

  const remove = useCallback((handle: string, size: string) => {
    setItems((prev) => prev.filter((p) => !(p.handle === handle && p.size === size)));
  }, []);

  const setQty = useCallback((handle: string, size: string, qty: number) => {
    setItems((prev) =>
      prev
        .map((p) => (p.handle === handle && p.size === size ? { ...p, qty } : p))
        .filter((p) => p.qty > 0)
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const count    = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items]);
  const subtotal = useMemo(() => items.reduce((s, i) => s + i.qty * i.price, 0), [items]);

  const value = useMemo<CartContextValue>(() => ({
    items, count, subtotal, isOpen,
    open:   () => setIsOpen(true),
    close:  () => setIsOpen(false),
    toggle: () => setIsOpen((o) => !o),
    add, remove, setQty, clear,
  }), [items, count, subtotal, isOpen, add, remove, setQty, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
