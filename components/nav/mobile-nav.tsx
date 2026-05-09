import Link from "next/link";
import { Menu, ArrowRightSquare } from "lucide-react";

import { mainMenu, contentMenu } from "@/menu.config";
import { siteConfig } from "@/site.config";

export function MobileNav() {
  return (
    <details className="relative md:hidden">
      <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-md border bg-white text-slate-900 marker:content-none">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </summary>
      <div className="absolute right-0 top-[calc(100%+0.75rem)] z-50 w-[min(20rem,calc(100vw-2rem))] rounded-lg border bg-white p-5 text-slate-900 shadow-xl">
        <Link href="/" className="flex items-center text-sm font-medium">
          <ArrowRightSquare className="mr-2 h-4 w-4" />
          <span>{siteConfig.site_name}</span>
        </Link>
        <div className="mt-5 space-y-5">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Menu</h3>
            <div className="mt-3 space-y-1 border-t pt-3">
              {Object.entries(mainMenu).map(([key, href]) => (
                <Link
                  key={key}
                  href={href}
                  className="block rounded-md px-2 py-2.5 text-base text-slate-900 hover:bg-slate-50"
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Blog Menu</h3>
            <div className="mt-3 space-y-1 border-t pt-3">
              {Object.entries(contentMenu).map(([key, href]) => (
                <Link
                  key={key}
                  href={href}
                  className="block rounded-md px-2 py-2.5 text-base text-slate-900 hover:bg-slate-50"
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </details>
  );
}
