"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { useI18n } from "./provider";

type Props = ComponentProps<typeof NextLink>;

export default function LocalizedLink({ href, ...props }: Props) {
  const { href: localizedHref } = useI18n();
  const localized =
    typeof href === "string" && href.startsWith("/") && !href.startsWith("//")
      ? localizedHref(href)
      : href;
  return <NextLink href={localized} {...props} />;
}
