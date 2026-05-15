"use client";

import dynamic from "next/dynamic";

const CartDrawer  = dynamic(() => import("@/components/cart/CartDrawer"),   { ssr: false });
const SlashCursor = dynamic(() => import("@/components/SlashCursor"),       { ssr: false });

export default function DeferredOverlays() {
  return (
    <>
      <CartDrawer />
      <SlashCursor />
    </>
  );
}
