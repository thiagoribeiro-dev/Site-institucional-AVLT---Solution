import Hero from '@/components/sections/Hero';
import Stats from '@/components/sections/Stats';
import SalesforceEcosystem from '@/components/sections/SalesforceEcosystem';
import AISection from '@/components/sections/AISection';
import Agentforce from '@/components/sections/Agentforce';
import ArchitectureDiagram from '@/components/sections/ArchitectureDiagram';
import Method from '@/components/sections/Method';
import Expertise from '@/components/sections/Expertise';
import ProjectsPreview from '@/components/sections/ProjectsPreview';
import ContactSection from '@/components/sections/ContactSection';

/**
 * Página principal.
 *
 * A ordem das seções é a jornada definida no briefing: o visitante
 * entende em poucos segundos quem somos, o que fazemos, que somos
 * especialistas em Salesforce, que trabalhamos com IA, que temos
 * experiência real — e como falar com a gente.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <SalesforceEcosystem />
      <AISection />
      <Agentforce />
      <ArchitectureDiagram />
      <Method />
      <Expertise />
      <ProjectsPreview />
      <ContactSection />
    </>
  );
}
