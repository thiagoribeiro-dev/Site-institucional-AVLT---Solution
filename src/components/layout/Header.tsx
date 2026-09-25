'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Logo from '@/components/ui/Logo';
import MagneticButton from '@/components/ui/MagneticButton';
import { navigation, site } from '@/data/site';

/**
 * Header fixo.
 * Transparente no topo; ao rolar 24px adquire vidro, blur e a borda
 * inferior discreta. No mobile, menu hamburger em tela cheia.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Fecha o menu ao navegar e trava o scroll enquanto ele está aberto.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-[var(--color-border)] bg-[rgba(10,16,32,0.78)] backdrop-blur-xl backdrop-saturate-150'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        {/* Linha de gradiente da marca, revelada com o scroll */}
        <div
          aria-hidden="true"
          className="bar-gradient h-[2px] w-full transition-opacity duration-500"
          style={{ opacity: scrolled ? 0.9 : 0 }}
        />

        <div className="shell flex h-[72px] items-center justify-between gap-6">
          <Logo size={32} />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegação principal">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-full px-4 py-2 text-[0.9375rem] transition-colors duration-300 ${
                  isActive(item.href)
                    ? 'text-[var(--color-text)]'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
                }`}
              >
                {item.label}
                {isActive(item.href) && (
                  <motion.span
                    layoutId="nav-active"
                    className="bar-gradient absolute inset-x-4 -bottom-0.5 h-[2px] rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <MagneticButton href="/#contato" variant="primary" className="!px-6 !py-3 !text-sm">
              Contato
            </MagneticButton>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="relative z-50 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border-strong)] lg:hidden"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
          >
            <span className="relative block h-3.5 w-5">
              <span
                className={`absolute left-0 h-[1.5px] w-5 rounded bg-[var(--color-text)] transition-all duration-300 ${
                  open ? 'top-[6px] rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 top-[6px] h-[1.5px] w-5 rounded bg-[var(--color-text)] transition-all duration-300 ${
                  open ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-0 h-[1.5px] w-5 rounded bg-[var(--color-text)] transition-all duration-300 ${
                  open ? 'top-[6px] -rotate-45' : 'top-[12px]'
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-40 bg-[rgba(7,13,28,0.97)] backdrop-blur-2xl lg:hidden"
          >
            <div className="shell flex h-full flex-col justify-center gap-2 pb-16">
              {navigation.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={item.href}
                    className={`block border-b border-[var(--color-border)] py-5 font-display text-[1.75rem] font-semibold ${
                      isActive(item.href) ? 'text-gradient' : 'text-[var(--color-text)]'
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34, duration: 0.4 }}
                className="mt-10 flex flex-col gap-4"
              >
                <MagneticButton href="/#contato" variant="primary">
                  Falar com um especialista
                </MagneticButton>
                <a
                  href={`mailto:${site.email}`}
                  className="font-mono text-sm text-[var(--color-text-secondary)]"
                >
                  {site.email}
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
