// next.config.mjs

let userConfig = undefined
try {
  userConfig = await import('./v0-user-next.config')
} catch (e) {
  // ignore error
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuração de produção: habilitar standalone para containerização
  output: 'standalone',
  
  // Ignorar verificações durante build para evitar falhas
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Configuração de imagens otimizada para produção
  images: {
    unoptimized: true, // Mantido como true para compatibilidade
    domains: ['localhost'],
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
    ],
  },
  
  // Otimização de webpack
  webpack(config, { isServer }) {
    // Otimização para produção
    if (!isServer) {
      // Otimizar chunking para melhor cacheing
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000
      };
    }
    
    return config;
  },
  
  // Desligar experimentais que podem causar problemas
  experimental: {
    webpackBuildWorker: false,
    parallelServerBuildTraces: false,
    parallelServerCompiles: false,
    // Habilitar estas opções pode melhorar o desempenho em produção
    serverMinification: true,
    serverSourceMaps: false,
  },
  
  // Melhorias para produção
  poweredByHeader: false, // Remove o header X-Powered-By para segurança
  reactStrictMode: false, // Desabilitar para produção
  compress: true, // Garantir que a compressão gzip esteja ativada
  generateEtags: true, // Habilitar ETags para caching
}

mergeConfig(nextConfig, userConfig)

function mergeConfig(nextConfig, userConfig) {
  if (!userConfig) {
    return
  }

  for (const key in userConfig) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...userConfig[key],
      }
    } else {
      nextConfig[key] = userConfig[key]
    }
  }
}

export default nextConfig