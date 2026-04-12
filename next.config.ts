import type { NextConfig } from "next";

const wordpressHostname = process.env.WORDPRESS_HOSTNAME;
const wordpressUrl = process.env.WORDPRESS_URL;
const parsedWordpressHostname = wordpressUrl ? new URL(wordpressUrl).hostname : undefined;
const imageHostnames = Array.from(
  new Set(
    [wordpressHostname, parsedWordpressHostname]
      .filter((hostname): hostname is string => Boolean(hostname))
      .flatMap((hostname) => {
        const normalizedHostname = hostname.replace(/^https?:\/\//, "");
        return normalizedHostname.startsWith("www.")
          ? [normalizedHostname, normalizedHostname.replace(/^www\./, "")]
          : [normalizedHostname, `www.${normalizedHostname}`];
      })
  )
);

const nextConfig: NextConfig = {
  distDir: ".next-local",
  output: "standalone",
  images: {
    remotePatterns: imageHostnames.map((hostname) => ({
      protocol: "https",
      hostname,
      port: "",
      pathname: "/**",
    })),
  },
  async redirects() {
    return [];
  },
};

export default nextConfig;
