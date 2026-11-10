// Filtro SVG de duotone roxo (DESIGN_SPEC §7: sombras roxo-900, luzes branco).
// Valores = --purple-900 (#241046) e --white (#F4F2FA) em 0–1.
export function DuotoneFilter() {
  return <svg className="sr-only" aria-hidden="true" focusable="false" width="0" height="0">
    <filter id="duotone" colorInterpolationFilters="sRGB">
      <feColorMatrix type="matrix" values=".2126 .7152 .0722 0 0  .2126 .7152 .0722 0 0  .2126 .7152 .0722 0 0  0 0 0 1 0" />
      <feComponentTransfer>
        <feFuncR type="table" tableValues=".141 .957" />
        <feFuncG type="table" tableValues=".063 .949" />
        <feFuncB type="table" tableValues=".275 .980" />
      </feComponentTransfer>
    </filter>
  </svg>
}
