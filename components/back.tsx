"use client";

import { T } from "@/components/i18n/text";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button variant="outline" size="sm" onClick={() => router.back()}>
      <T id="b8d99df1066e6562" />
    </Button>
  );
}
