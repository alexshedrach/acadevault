/** @type {import('next').NextConfig} */
const remotePatterns = [
  {
    protocol: "http",
    hostname: "localhost",
    port: "9000",
    pathname: "/**",
  },
  {
    protocol: "http",
    hostname: "localhost",
    port: "9000",
    pathname: "/media/**",
  },
  {
    protocol: "https",
    hostname: "acadevault.com",
    pathname: "/**",
  },
  {
    protocol: "https",
    hostname: "via.placeholder.com",
    port: "",
    pathname: "/**", // allow any path
  },
];

// Dynamically add API domain (if present and not localhost)
const apiDomain =
  process.env.NEXT_PUBLIC_API_URL &&
  new URL(process.env.NEXT_PUBLIC_API_URL).hostname;

if (apiDomain && !["localhost", "127.0.0.1"].includes(apiDomain)) {
  remotePatterns.push({
    protocol: "https",
    hostname: apiDomain,
    pathname: "/**",
  });
}

const nextConfig = {
  images: {
    remotePatterns,
  },
};

export default nextConfig;