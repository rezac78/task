import type {NextConfig} from "next";

const nextConfig: NextConfig = {
 images: {
  remotePatterns: [
   {
    protocol: "https",
    // hostname: "randomuser.me",
    hostname: "sm.ign.com",
   },
  ],
 },
};

export default nextConfig;
