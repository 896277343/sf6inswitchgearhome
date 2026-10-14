"use client";

import { useI18n } from "./provider";

export function T({ id }: { id: string }) {
  const { catalog } = useI18n();
  return <>{catalog[id] ?? ""}</>;
}

export function TV({ children }: { children: React.ReactNode }) {
  const { translateValue } = useI18n();
  return <>{translateValue(children)}</>;
}
