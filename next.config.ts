
import type {NextConfig} from 'next';

const remotePatternsConfig = [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'asknursealice.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ketogenic.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'chefjackovens.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'kelvinskitchen.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.mashed.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'jamiecooksitup.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i0.wp.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 't3.ftcdn.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'classpass.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'st4.depositphotos.com', // Added new domain
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.squarespace-cdn.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'static.vecteezy.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.torrinomedica.it',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'iooutwzkflsjrsnclhap.supabase.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'bettercheatmeals.com',
        port: '',
        pathname: '/**',
      },
       {
        protocol: 'https',
        hostname: 'www.coles.com.au',
        port: '',
        pathname: '/**',
      },
       {
        protocol: 'https',
        hostname: 'insidefmcg.com.au',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'image-cdn.essentiallysports.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.bonappetit.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'sdmntpreastus2.oaiusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'sdmntprnortheu.oaiusercontent.com',
        port: '',
        pathname: '/**',
      }
    ];

// Log the hostnames being configured when the server starts
console.log("🚀 next.config.ts: Initializing with image remote patterns for hostnames:", JSON.stringify(remotePatternsConfig.map(p => p.hostname)));

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: remotePatternsConfig,
  },
};

export default nextConfig;

    
