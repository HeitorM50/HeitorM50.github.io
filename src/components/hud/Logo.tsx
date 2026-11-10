// Logotipo stencil (design/assets). Cor sempre por currentColor.
const H = <><polygon points="0,10 10,0 22,0 22,100 0,100" /><polygon points="58,0 80,0 80,90 70,100 58,100" /><rect x="26" y="39" width="28" height="22" /></>
const R = <><rect x="0" y="0" width="22" height="100" /><path d="M26,0 H56 L72,16 V44 L56,60 H26 V38 H50 V22 H26 Z" /><polygon points="30,64 54,64 72,90 72,100 56,100" /></>

export function Monogram({ className, title }: { className?: string; title?: string }) {
  return <svg className={className} viewBox="0 0 164 100" role={title ? 'img' : undefined} aria-hidden={title ? undefined : true} aria-label={title} focusable="false">
    <g fill="currentColor">{H}<g transform="translate(92,0)">{R}</g></g>
  </svg>
}

export function Wordmark({ className, title }: { className?: string; title?: string }) {
  return <svg className={className} viewBox="0 0 456 100" role={title ? 'img' : undefined} aria-hidden={title ? undefined : true} aria-label={title} focusable="false">
    <g fill="currentColor">
      <g>{H}</g>
      <g transform="translate(92,0)"><polygon points="0,12 12,0 22,0 22,100 0,100" /><polygon points="26,0 66,0 54,22 26,22" /><rect x="26" y="39" width="30" height="22" /><rect x="26" y="78" width="40" height="22" /></g>
      <g transform="translate(170,0)"><polygon points="0,0 22,0 22,38 0,50" /><polygon points="0,56 22,44 22,100 0,100" /></g>
      <g transform="translate(204,0)"><polygon points="0,0 76,0 76,12 66,22 0,22" /><rect x="27" y="26" width="22" height="74" /></g>
      <g transform="translate(292,0)"><polygon points="38,0 16,0 0,16 0,84 16,100 38,100 38,78 22,78 22,22 38,22" /><polygon points="42,0 64,0 80,16 80,84 64,100 42,100 42,78 58,78 58,22 42,22" /></g>
      <g transform="translate(384,0)">{R}</g>
    </g>
  </svg>
}
