import Link from 'next/link';
import Logo from '@/components/ui/Logo';
import { site } from '@/data/site';

const columns = [
  {
    title: 'Plataforma',
    links: [
      { label: 'Ecossistema Salesforce', href: '/#salesforce' },
      { label: 'Inteligência Artificial', href: '/#ia' },
      { label: 'Agentforce', href: '/#agentforce' },
      { label: 'Arquitetura', href: '/#arquitetura' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Projetos de Sucesso', href: '/projetos' },
      { label: 'Material de Apoio', href: '/materiais' },
      { label: 'Sobre nós', href: '/sobre' },
      { label: 'Como trabalhamos', href: '/#metodo' },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[var(--color-border)] bg-[var(--color-background-deep)]">
      <div aria-hidden="true" className="bar-gradient h-[2px] w-full opacity-70" />

      <div className="shell py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo size={36} />
            <p className="mt-6 max-w-xs text-[0.9375rem] leading-relaxed text-[var(--color-text-secondary)]">
              Consultoria boutique em Salesforce e Inteligência Artificial. Arquitetura,
              governança, engenharia e IA — do diagnóstico à sustentação.
            </p>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[0.9375rem] text-[var(--color-text-secondary)] transition-colors duration-300 hover:text-[var(--color-text)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
              Contato
            </h3>
            <ul className="mt-5 space-y-3 text-[0.9375rem]">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text)]"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phoneHref}`}
                  className="font-mono text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text)]"
                >
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text)]"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
                  </svg>
                  {site.instagramHandle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-[var(--color-border)] pt-8 text-[0.8125rem] text-[var(--color-text-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>
              © {year} {site.name}. Todos os direitos reservados.
            </span>
            <span aria-hidden="true" className="text-[var(--color-border-strong)]">
              ·
            </span>
            <Link
              href="/privacidade"
              className="underline underline-offset-4 transition-colors hover:text-[var(--color-text)]"
            >
              Política de privacidade
            </Link>
          </p>
          <p className="max-w-xl text-[0.75rem] leading-relaxed">
            Salesforce, Agentforce, Data 360, Tableau, MuleSoft e Slack são marcas da
            Salesforce, Inc. A AVLT - Solution é uma consultoria independente e não
            possui vínculo societário com a Salesforce.
          </p>
        </div>
      </div>
    </footer>
  );
}
