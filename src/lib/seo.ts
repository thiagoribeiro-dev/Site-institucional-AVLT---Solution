import { site } from '@/data/site';

/**
 * Dados estruturados (schema.org).
 *
 * Mantido enxuto de propósito: declarar só o que é verificável.
 * Não adicione `aggregateRating`, `review` ou `award` sem material
 * comprovando — rich snippet inventado é penalizado, e não é honesto.
 */
export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: site.name,
  alternateName: 'AVLT Solution',
  url: site.url,
  email: site.email,
  telephone: `+55${site.phone.replace(/\D/g, '')}`,
  description: site.description,
  slogan: site.tagline,
  areaServed: { '@type': 'Country', name: 'Brasil' },
  sameAs: [site.instagram],
  knowsAbout: [
    'Salesforce',
    'Salesforce Sales Cloud',
    'Salesforce Service Cloud',
    'Salesforce Marketing Cloud',
    'Salesforce Experience Cloud',
    'Agentforce',
    'Data 360',
    'MuleSoft',
    'Tableau',
    'Apex',
    'Lightning Web Components',
    'Inteligência Artificial',
    'Arquitetura de software',
    'Integração de sistemas',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Serviços AVLT - Solution',
    itemListElement: [
      'Diagnóstico e reorganização de org Salesforce',
      'Discovery e arquitetura de solução',
      'Implementação Salesforce',
      'IA aplicada ao CRM e Agentforce',
      'Integrações e APIs',
      'Governança e DevOps',
      'Evolução e sustentação',
    ].map((name) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name },
    })),
  },
};

/** Breadcrumb reutilizável nas páginas internas. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}
