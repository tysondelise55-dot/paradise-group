import path from 'node:path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // This app lives in sites/paradise-group inside a repo with its own lockfile
  // at the root; pin the root so Next doesn't guess the workspace.
  turbopack: { root: path.resolve(import.meta.dirname) },
  outputFileTracingRoot: path.resolve(import.meta.dirname),
};

export default nextConfig;
