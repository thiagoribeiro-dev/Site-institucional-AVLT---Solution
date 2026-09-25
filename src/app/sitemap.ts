import type { MetadataRoute } from 'next';
import { site } from '@/data/site';

/**
 * Sitemap gerado no build. Ao criar uma página nova, adicione a rota aqui.
 */
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: `${site.url}/`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${site.url}/projetos/`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${site.url}/materiais/`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${site.url}/sobre/`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
  ];
}
