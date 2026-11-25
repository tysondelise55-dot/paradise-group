import type { MetadataRoute } from 'next';
import { pageMeta } from '@/lib/data';
import { abs } from '@/lib/seo';

// Fixed date: Cache Components forbids new Date() at build. Update on content changes.
const LAST_MODIFIED = '2026-11-25';

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(pageMeta).map((m) => ({
    url: abs(m.path),
    lastModified: LAST_MODIFIED,
    changeFrequency: 'monthly',
    priority: m.path === '/' ? 1 : 0.8,
  }));
}
