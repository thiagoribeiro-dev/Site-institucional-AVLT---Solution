/**
 * Geometria vetorial do símbolo AVLT usada no elemento 3D.
 *
 * O símbolo da marca combina quatro gestos: o chevron do "A", a seta
 * ascendente que o atravessa, o arco da nuvem (Salesforce) e o nó de
 * conexão (IA). Cada gesto vira uma peça 3D própria, com profundidade e
 * cor da paleta oficial, montadas como um único objeto flutuante.
 *
 * As coordenadas estão num plano 100×100 com origem no canto superior
 * esquerdo (convenção SVG). O componente inverte o eixo Y e centraliza.
 *
 * PARA TROCAR O SÍMBOLO: substitua os paths abaixo pelos do SVG da marca
 * (apenas o `d` de cada `<path>`, em um viewBox 0 0 100 100).
 */

export type LogoPiece = {
  id: string;
  /** Path SVG no espaço 0 0 100 100. */
  d: string;
  /** Profundidade da extrusão, em unidades de cena. */
  depth: number;
  /** Deslocamento em Z — separa as peças e cria parallax interno. */
  z: number;
  /** Cor da paleta oficial AVLT. */
  color: string;
  /** Intensidade de emissão — mantém o objeto legível em fundo escuro. */
  emissive: number;
  /**
   * Peça luminosa: renderizada com material que ignora iluminação, para a
   * cor sair pura. Os nós de IA usam isto — com material de transmissão
   * eles perdiam a saturação e viravam manchas escuras no fundo navy.
   */
  glow?: boolean;
};

export const logoPieces: LogoPiece[] = [
  {
    // Perna esquerda do "A" — o gesto de base da marca.
    id: 'a-left',
    d: 'M 8 88 L 34 12 L 47 12 L 21 88 Z',
    depth: 3.2,
    z: 0,
    color: '#00A1E0',
    emissive: 0.35,
  },
  {
    // Perna direita do "A", ligeiramente à frente.
    id: 'a-right',
    d: 'M 34 12 L 47 12 L 73 88 L 60 88 Z',
    depth: 3.2,
    z: 1.2,
    color: '#3D8BE8',
    emissive: 0.3,
  },
  {
    // Seta ascendente que atravessa o "A": crescimento e trajetória.
    id: 'arrow',
    d: 'M 16 74 C 34 66, 50 56, 64 38 L 56 33 L 82 26 L 78 52 L 70 46 C 54 66, 38 76, 22 84 Z',
    depth: 2.4,
    z: 3.4,
    color: '#7A5CFA',
    emissive: 0.5,
  },
  {
    // Arco da nuvem — a camada Salesforce.
    id: 'cloud',
    d: 'M 44 40 C 42 28, 54 20, 62 26 C 70 17, 84 23, 84 35 C 91 37, 91 47, 83 47 L 52 47 C 44 47, 41 44, 44 40 Z',
    depth: 2,
    z: -2.6,
    color: '#A78BFA',
    emissive: 0.25,
  },
  {
    // Nó de conexão — a camada de IA.
    id: 'node',
    d: 'M 86 14 m -7 0 a 7 7 0 1 0 14 0 a 7 7 0 1 0 -14 0 Z',
    depth: 2.6,
    z: 4.2,
    color: '#FF7A00',
    emissive: 1.15,
    glow: true,
  },
  {
    id: 'node-dot-a',
    d: 'M 72 8 m -3 0 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0 Z',
    depth: 1.8,
    z: 4.6,
    color: '#FFA14D',
    emissive: 1.3,
    glow: true,
  },
  {
    id: 'node-dot-b',
    d: 'M 95 27 m -2.4 0 a 2.4 2.4 0 1 0 4.8 0 a 2.4 2.4 0 1 0 -4.8 0 Z',
    depth: 1.6,
    z: 4.4,
    color: '#38BDF8',
    emissive: 1.3,
    glow: true,
  },
];

/**
 * Escala do plano SVG (100 un.) para o espaço de cena.
 *
 * Calibrada contra a câmera de SceneCanvas (z = 16, fov = 42°), que
 * enxerga ~12,3 unidades de altura no plano z = 0. Com 0.062, o símbolo
 * de ~80 unidades de altura ocupa cerca de 40% do enquadramento — presente,
 * sem nunca encostar no texto. Ao mudar a câmera, recalibre este número.
 */
export const LOGO_SCALE = 0.062;
/** Centro do viewBox, usado para pivotar a rotação no meio do símbolo. */
export const LOGO_CENTER: [number, number] = [53, 48];
