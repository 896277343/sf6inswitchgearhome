import type { NextConfig } from "next";

const wordpressHostname = process.env.WORDPRESS_HOSTNAME;
const wordpressUrl = process.env.WORDPRESS_URL;
const parsedWordpressHostname = wordpressUrl ? new URL(wordpressUrl).hostname : undefined;
const imageHostnames = Array.from(
  new Set(
    [wordpressHostname, parsedWordpressHostname]
      .filter((hostname): hostname is string => Boolean(hostname))
      .reduce<string[]>((hostnames, hostname) => {
        const normalizedHostname = hostname.replace(/^https?:\/\//, "");
        if (normalizedHostname.startsWith("www.")) {
          hostnames.push(normalizedHostname, normalizedHostname.replace(/^www\./, ""));
        } else {
          hostnames.push(normalizedHostname, `www.${normalizedHostname}`);
        }
        return hostnames;
      }, [])
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
