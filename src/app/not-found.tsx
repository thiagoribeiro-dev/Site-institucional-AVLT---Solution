import MagneticButton from '@/components/ui/MagneticButton';

export default function NotFound() {
  return (
    <section className="flex min-h-[70svh] items-center py-32">
      <div className="shell text-center">
        <p className="font-mono text-[0.75rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
          Erro 404
        </p>
        <h1 className="mt-5 font-display text-[clamp(2.25rem,5vw,3.5rem)] font-bold">
          Essa página <span className="text-gradient">não existe</span>.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-[var(--color-text-secondary)]">
          O endereço pode ter mudado. Volte para a página inicial ou veja os projetos.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <MagneticButton href="/" variant="primary">
            Página inicial
          </MagneticButton>
          <MagneticButton href="/projetos" variant="ghost">
            Projetos de sucesso
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
