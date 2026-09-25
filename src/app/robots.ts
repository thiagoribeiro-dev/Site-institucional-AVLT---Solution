import type { MetadataRoute } from 'next';
import { site } from '@/data/site';

/** Exigido por `output: 'export'`: o arquivo é gerado no build, não sob demanda. */
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
