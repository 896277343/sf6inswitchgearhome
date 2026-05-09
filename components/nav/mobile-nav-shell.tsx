"use client";

import dynamic from "next/dynamic";

const MobileNav = dynamic(
  () => import("@/components/nav/mobile-nav").then((mod) => mod.MobileNav),
  {
    ssr: false,
  }
);

export function MobileNavShell() {
  return <MobileNav />;
}
