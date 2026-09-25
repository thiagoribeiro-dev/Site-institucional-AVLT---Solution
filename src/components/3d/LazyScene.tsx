'use client';

import dynamic from 'next/dynamic';
import type { ComponentProps } from 'react';
import type SceneCanvas from './SceneCanvas';

/**
 * Ponto único de entrada do 3D no site.
 *
 * `ssr: false` mantém three.js, R3F e drei inteiramente fora do bundle do
 * servidor e fora do JS do primeiro paint — o chunk do 3D só é baixado
 * quando o componente é realmente montado no cliente.
 *
 * Use SEMPRE este wrapper; nunca importe SceneCanvas direto numa página.
 */
const SceneCanvas3D = dynamic(() => import('./SceneCanvas'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
      <div className="logo-fallback h-[58%] w-[58%] max-w-[480px] rounded-full opacity-40" />
    </div>
  ),
});

export default function LazyScene(props: ComponentProps<typeof SceneCanvas>) {
  return <SceneCanvas3D {...props} />;
}
