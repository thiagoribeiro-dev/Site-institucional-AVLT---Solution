'use client';

import { useState } from 'react';
import SectionTitle from '@/components/ui/SectionTitle';
import ScrollReveal from '@/components/ui/ScrollReveal';

/**
 * Arquitetura visual.
 *
 * SVG inline, sem biblioteca de diagrama: o desenho é semântico, escala
 * sem perda e responde ao hover sem custo de layout. Representa o fluxo
 * real de uma arquitetura Salesforce enterprise — cliente → experiências
 * → plataforma → dados/IA/automação → integração → ecossistema.
 */

type NodeId = 'clientes' | 'exp' | 'sf' | 'data' | 'ai' | 'auto' | 'int' | 'eco';

const descriptions: Record<NodeId, { title: string; detail: string }> = {
  clientes: {
    title: 'Clientes',
    detail: 'Quem liga, compra, reclama e renova. Todo o resto existe por causa deles.',
  },
  exp: {
    title: 'Experiências',
    detail: 'Portal, site, app, WhatsApp, e-mail, telefone. Canais diferentes, mesmo cliente.',
  },
  sf: {
    title: 'Salesforce',
    detail: 'O núcleo transacional: modelo de dados, processo, permissão e metadado versionado.',
  },
  data: {
    title: 'Data',
    detail: 'Ingestão, harmonização e perfil unificado. A base que decide se a IA funciona.',
  },
  ai: {
    title: 'AI',
    detail: 'Agentes e modelos operando dentro do processo, com guardrails e custo medido.',
  },
  auto: {
    title: 'Automation',
    detail: 'Flow, Apex e aprovações eliminando o trabalho que ninguém deveria estar fazendo.',
  },
  int: {
    title: 'Integração',
    detail: 'REST, SOAP, Platform Events e middleware ligando ERP, legado e nuvem.',
  },
  eco: {
    title: 'Ecossistema',
    detail: 'ERP, financeiro, logística, BI e o que mais a operação já usa — sem ilha de dado.',
  },
};

const boxBase =
  'cursor-default transition-all duration-300';

export default function ArchitectureDiagram() {
  const [hover, setHover] = useState<NodeId | null>(null);
  const info = hover ? descriptions[hover] : null;

  const nodeProps = (id: NodeId) => ({
    onMouseEnter: () => setHover(id),
    onMouseLeave: () => setHover((c) => (c === id ? null : c)),
    onFocus: () => setHover(id),
    onBlur: () => setHover((c) => (c === id ? null : c)),
    tabIndex: 0,
    role: 'img' as const,
    'aria-label': `${descriptions[id].title}: ${descriptions[id].detail}`,
    className: boxBase,
    opacity: hover && hover !== id ? 0.42 : 1,
  });

  return (
    <section id="arquitetura" className="relative scroll-mt-24 py-28">
      <div className="shell">
        <SectionTitle
          eyebrow="Arquitetura"
          title={
            <>
              Como as peças <span className="text-gradient">conversam</span>.
            </>
          }
          subtitle="A plataforma quase nunca é o problema. O jeito como ela foi construída, quase sempre. Este é o desenho que usamos como referência — passe o cursor por uma camada."
        />

        <ScrollReveal delay={0.1} className="mt-14">
          <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[rgba(255,255,255,0.022)] p-6 backdrop-blur-xl sm:p-10">
            {/* A caixa ECOSSISTEMA termina em y=570: o viewBox precisa de folga
                abaixo disso, senão o último nó do diagrama aparece cortado. */}
            <svg
              viewBox="0 0 860 586"
              className="w-full"
              style={{ minHeight: 320 }}
              aria-label="Diagrama de arquitetura: clientes, experiências, Salesforce, dados, IA, automação, integração e ecossistema"
            >
              <defs>
                <linearGradient id="arch-brand" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#00A1E0" />
                  <stop offset="55%" stopColor="#7A5CFA" />
                  <stop offset="100%" stopColor="#FF7A00" />
                </linearGradient>
                <marker
                  id="arch-arrow"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M0 0 L10 5 L0 10 z" fill="rgba(148,163,184,0.7)" />
                </marker>
              </defs>

              {/* Conexões */}
              <g
                fill="none"
                stroke="rgba(148,163,184,0.35)"
                strokeWidth="1.5"
                markerEnd="url(#arch-arrow)"
              >
                <path d="M430 60 V96" />
                <path d="M430 152 V190" />
                <path d="M430 262 V300 M430 282 H190 V300 M430 282 H670 V300" />
                <path d="M190 362 V400 H430 M430 362 V400 M670 362 V400 H430" markerEnd="" />
                <path d="M430 400 V436" />
                <path d="M430 492 V528" />
              </g>

              {/* Clientes */}
              <g {...nodeProps('clientes')}>
                <rect x="320" y="18" width="220" height="42" rx="21" fill="rgba(0,161,224,0.12)" stroke="rgba(0,161,224,0.45)" />
                <text x="430" y="45" textAnchor="middle" fill="#e2e8f0" fontSize="15" fontFamily="Poppins, sans-serif" fontWeight="600">
                  CLIENTES
                </text>
              </g>

              {/* Experiências */}
              <g {...nodeProps('exp')}>
                <rect x="290" y="96" width="280" height="56" rx="14" fill="rgba(255,255,255,0.04)" stroke="rgba(226,232,240,0.18)" />
                <text x="430" y="122" textAnchor="middle" fill="#e2e8f0" fontSize="14" fontFamily="Poppins, sans-serif" fontWeight="600">
                  EXPERIÊNCIAS
                </text>
                <text x="430" y="140" textAnchor="middle" fill="#64748b" fontSize="11" fontFamily="Roboto Mono, monospace">
                  portal · app · whatsapp · e-mail · voz
                </text>
              </g>

              {/* Salesforce — núcleo */}
              <g {...nodeProps('sf')}>
                <rect x="230" y="190" width="400" height="72" rx="16" fill="rgba(122,92,250,0.1)" stroke="url(#arch-brand)" strokeWidth="2" />
                <text x="430" y="222" textAnchor="middle" fill="#f8fafc" fontSize="19" fontFamily="Poppins, sans-serif" fontWeight="700">
                  SALESFORCE
                </text>
                <text x="430" y="244" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="Roboto Mono, monospace">
                  platform · metadado · governança
                </text>
              </g>

              {/* Três colunas: Data / AI / Automation */}
              {(
                [
                  { id: 'data' as NodeId, x: 90, label: 'DATA', sub: 'data 360', color: '0,161,224' },
                  { id: 'ai' as NodeId, x: 330, label: 'AI', sub: 'agentforce', color: '122,92,250' },
                  { id: 'auto' as NodeId, x: 570, label: 'AUTOMATION', sub: 'flow · apex', color: '255,122,0' },
                ]
              ).map((col) => (
                <g key={col.id} {...nodeProps(col.id)}>
                  <rect
                    x={col.x}
                    y="300"
                    width="200"
                    height="62"
                    rx="14"
                    fill={`rgba(${col.color},0.1)`}
                    stroke={`rgba(${col.color},0.5)`}
                  />
                  <text x={col.x + 100} y="326" textAnchor="middle" fill="#e2e8f0" fontSize="14" fontFamily="Poppins, sans-serif" fontWeight="600">
                    {col.label}
                  </text>
                  <text x={col.x + 100} y="345" textAnchor="middle" fill="#64748b" fontSize="10.5" fontFamily="Roboto Mono, monospace">
                    {col.sub}
                  </text>
                </g>
              ))}

              {/* Integração */}
              <g {...nodeProps('int')}>
                <rect x="290" y="436" width="280" height="56" rx="14" fill="rgba(255,255,255,0.04)" stroke="rgba(226,232,240,0.18)" />
                <text x="430" y="462" textAnchor="middle" fill="#e2e8f0" fontSize="14" fontFamily="Poppins, sans-serif" fontWeight="600">
                  INTEGRAÇÃO
                </text>
                <text x="430" y="480" textAnchor="middle" fill="#64748b" fontSize="11" fontFamily="Roboto Mono, monospace">
                  rest · soap · events · mulesoft
                </text>
              </g>

              {/* Ecossistema */}
              <g {...nodeProps('eco')}>
                <rect x="320" y="528" width="220" height="42" rx="21" fill="rgba(255,122,0,0.1)" stroke="rgba(255,122,0,0.42)" />
                <text x="430" y="555" textAnchor="middle" fill="#e2e8f0" fontSize="15" fontFamily="Poppins, sans-serif" fontWeight="600">
                  ECOSSISTEMA
                </text>
              </g>
            </svg>

            {/* Legenda reativa — altura fixa para não deslocar o layout */}
            <div className="mt-6 flex min-h-[74px] items-start border-t border-[var(--color-border)] pt-6">
              {info ? (
                <div>
                  <p className="font-display text-[0.9375rem] font-semibold text-[var(--color-text)]">
                    {info.title}
                  </p>
                  <p className="mt-1.5 max-w-2xl text-[0.875rem] leading-relaxed text-[var(--color-text-secondary)]">
                    {info.detail}
                  </p>
                </div>
              ) : (
                <p className="text-[0.875rem] text-[var(--color-text-muted)]">
                  Passe o cursor por uma camada do diagrama para ver o que ela resolve.
                </p>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
