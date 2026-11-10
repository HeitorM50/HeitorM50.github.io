export const glyphNames = ['mira', 'estrela', 'no', 'orbita', 'anel', 'matriz', 'faders', 'senoide', 'velocidade', 'avanco', 'chave', 'globo', 'explosao', 'pulso', 'foco', 'alerta'] as const
export type GlyphName = typeof glyphNames[number]

// Glifo do sprite /assets/glyphs.svg. Sempre decorativo: o texto ao lado carrega o sentido.
export function Glyph({ name, className }: { name: GlyphName; className?: string }) {
  return <svg className={className ? `glyph ${className}` : 'glyph'} aria-hidden="true" focusable="false"><use href={`/assets/glyphs.svg#g-${name}`} /></svg>
}
