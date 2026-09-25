import LazyScene from '@/components/3d/LazyScene';
import MagneticButton from '@/components/ui/MagneticButton';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { finalCta, site } from '@/data/site';

/**
 * CTA final — fecha o site com o mesmo sistema 3D do Hero,
 * em escala menor e opacidade mais baixa.
 */
export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t border-[var(--color-border)] py-32">
      <div className="absolute inset-0">
        <LazyScene scale={0.85} opacity={0.34} withParticles={false} />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(680px circle at 50% 50%, rgba(122,92,250,0.14), transparent 62%)',
        }}
      />

      <div className="shell relative z-10 text-center">
        <ScrollReveal>
          <span className="eyebrow">Próximo passo</span>
          <h2 className="mx-auto mt-6 max-w-3xl font-display text-[clamp(2rem,4.8vw,3.4rem)] font-bold leading-[1.08]">
            {finalCta.headline}
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-[clamp(1rem,1.7vw,1.1875rem)] leading-relaxed text-[var(--color-text-secondary)]">
            {finalCta.body}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.12} className="mt-11 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton href="/#contato" variant="primary">
            {finalCta.cta}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14m-6-7 7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </MagneticButton>
          <MagneticButton href={`tel:${site.phoneHref}`} variant="ghost">
            {site.phone}
          </MagneticButton>
        </ScrollReveal>
      </div>
    </section>
  );
}
